from sqlalchemy.sql import text
from .. import db
from flask import current_app
import os
import uuid

# ===========================================
# FIND ALL (NÃO ESTÁ EM USO - APENAS TESTE)
# ===========================================
def find_all_comentarios():
    """
    Lista todos os comentários existentes.
    """

    sql_query = text("""
        SELECT 
            id AS comentario_id,
            tipo_informacao,
            convenio_siafi,
            autor,
            data_criacao,
            texto,
            relevancia_comentario
        FROM table_comentarios
        ORDER BY data_criacao DESC
    """)

    try:
        result = db.session.execute(sql_query)
        return [row._asdict() for row in result.fetchall()]
    except Exception as e:
        print(f"Erro ao listar comentários: {e}")
        raise

# ===========================================
# FIND dados por convênio
# ===========================================
def find_dados_comentarios_by_convenio(convenio_siafi):
    """
    Busca todos os comentários associados a um convênio específico.
    """
    sql_query = text("""
        SELECT 
            id AS comentario_id,
            tipo_informacao,
            convenio_siafi,
            autor,
            data_criacao,
            texto,
            relevancia_comentario
        FROM table_comentarios
        WHERE convenio_siafi = :convenio_param
        ORDER BY data_criacao DESC
    """)

    try:
        result = db.session.execute(sql_query, {"convenio_param": convenio_siafi})
        rows = result.fetchall()
        return [row._asdict() for row in rows] if rows else []
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao buscar comentários: {e}")
        raise

# ===========================================
# INSERT (ADICIONAR)
# ===========================================

def insert_comentario(data):
    """
    Insere um novo comentário e retorna o ID gerado.
    """

    sql_insert = text("""
        INSERT INTO table_comentarios (
            tipo_informacao, convenio_siafi, autor, data_criacao,
            texto, relevancia_comentario
        )
        VALUES (
            :tipo_informacao, :convenio_siafi, :autor, NOW(),
            :texto, :relevancia_comentario
        )
        RETURNING id
    """)

    try:
        result = db.session.execute(sql_insert, data)
        db.session.commit()
        new_id = result.fetchone()[0]
        return {"message": "Comentário inserido com sucesso.", "id": new_id}
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao inserir comentário: {e}")
        raise

# ===========================================
# UPDATE (EDITAR)
# ===========================================
def update_comentario(id_comentario, convenio_siafi, update_data):
    """
    Atualiza um comentário específico de um convênio.
    """

    sql = text("""
        UPDATE table_comentarios
        SET
            texto = :texto,
            tipo_informacao = :tipo_informacao,
            relevancia_comentario = :relevancia_comentario
        WHERE id = :id_comentario
          AND convenio_siafi = :convenio_siafi
        RETURNING *;
    """)

    params = {
        "texto": update_data.get("texto"),
        "tipo_informacao": update_data.get("tipo_informacao"),
        "relevancia_comentario": update_data.get("relevancia_comentario"),
        "id_comentario": id_comentario,
        "convenio_siafi": convenio_siafi
    }

    try:
        with db.engine.begin() as conn:
            result = conn.execute(sql, params)
            row = result.fetchone()

            if row is None:
                return None

            # mapping necessária pq row não é dict nativo
            return dict(row._mapping)

    except Exception as e:
        import traceback
        traceback.print_exc()
        print("ERRO update_comentario:", e)
        raise


# ===========================================
# DELETE (EXCLUIR)
# ===========================================
def delete_comentario(id_comentario, convenio_siafi):
    """
    Apaga um comentário pelo ID e convênio.
    """

    sql = text("""
        DELETE FROM table_comentarios
        WHERE id = :id_comentario
          AND convenio_siafi = :convenio_siafi
        RETURNING id;
    """)

    try:
        result = db.session.execute(sql, {
            "id_comentario": id_comentario,
            "convenio_siafi": convenio_siafi
        })

        deleted = result.fetchone()
        db.session.commit()

        return deleted is not None

    except Exception as e:
        db.session.rollback()
        print("Erro ao deletar comentário:", e)
        raise


# ===========================================
#
# FUNÇÕES PARA LIDAR COM ARQUIVOS DOS COMENTÁRIOS
#
# ===========================================


# ===========================================
# UPLOAD DE ARQUIVOS
# ===========================================
def salvar_arquivo_comentario(comentario_id, convenio_siafi, file, usuario):
    """
    Salva arquivo em disco e registra no banco.
    """

    uploads_dir = current_app.config.get("UPLOAD_FOLDER", "uploads")
    os.makedirs(uploads_dir, exist_ok=True)

    original_filename = file.filename
    unique_filename = f"{uuid.uuid4()}_{original_filename}"
    file_path = os.path.join(uploads_dir, unique_filename)

    file.save(file_path)

    file_size = os.path.getsize(file_path)

    # INSERT no banco
    sql = text("""
        INSERT INTO table_arquivos_comentarios (
            comentario_id, convenio_siafi, nome_original,
            nome_arquivo, tipo_arquivo, tamanho_bytes,
            caminho_arquivo, usuario_upload
        ) VALUES (
            :comentario_id, :convenio_siafi, :nome_original,
            :nome_arquivo, :tipo_arquivo, :tamanho_bytes,
            :caminho_arquivo, :usuario_upload
        )
        RETURNING arquivo_id
    """)

    params = {
        'comentario_id': comentario_id,
        'convenio_siafi': convenio_siafi,
        'nome_original': original_filename,
        'nome_arquivo': unique_filename,
        'tipo_arquivo': file.content_type,
        'tamanho_bytes': file_size,
        'caminho_arquivo': file_path,
        'usuario_upload': usuario
    }

    try:
        result = db.session.execute(sql, params)
        db.session.commit()
        arquivo_id = result.fetchone()[0]
        
        return {
            "arquivo_id": arquivo_id,
            "nome": original_filename,
            "tamanho": file_size,
            "status": "sucesso"
        }
    except Exception as e:
        db.session.rollback()
        # Se falhou no banco, deletar arquivo do disco
        if os.path.exists(file_path):
            os.remove(file_path)
        print("Erro ao salvar arquivo:", e)
        raise


# ===========================================
# BUSCA ARQUIVOS POR COMENTÁRIO
# ===========================================
def get_arquivos_por_comentario(comentario_id):
    """
    Retorna registros de arquivos anexados ao comentário.
    Formato esperado pelo frontend: arquivo_id, nome, tamanho, tipo
    """

    sql = text("""
        SELECT
            arquivo_id,
            nome_original,
            tamanho_bytes,
            tipo_arquivo,
            data_upload
        FROM table_arquivos_comentarios
        WHERE comentario_id = :id
        ORDER BY data_upload DESC
    """)

    try:
        result = db.session.execute(sql, {"id": comentario_id})
        arquivos = []
        
        for row in result:
            arquivos.append({
                "arquivo_id": row[0],
                "nome": row[1],
                "tamanho": row[2],
                "tipo": row[3],
                "data_upload": row[4].isoformat() if row[4] else None
            })
        
        return arquivos
        
    except Exception as e:
        print("Erro ao listar arquivos:", e)
        raise


# ===========================================
# DELETE ARQUIVO
# ===========================================
def delete_arquivo(arquivo_id, comentario_id=None):
    """
    Remove arquivo do disco e do banco.
    comentario_id é opcional para validação adicional.
    """

    # Buscar info do arquivo
    if comentario_id:
        sql_find = text("""
            SELECT caminho_arquivo
            FROM table_arquivos_comentarios
            WHERE arquivo_id = :arquivo_id AND comentario_id = :comentario_id
            LIMIT 1
        """)
        res = db.session.execute(sql_find, {
            "arquivo_id": arquivo_id,
            "comentario_id": comentario_id
        }).fetchone()
    else:
        sql_find = text("""
            SELECT caminho_arquivo
            FROM table_arquivos_comentarios
            WHERE arquivo_id = :arquivo_id
            LIMIT 1
        """)
        res = db.session.execute(sql_find, {"arquivo_id": arquivo_id}).fetchone()

    if res is None:
        raise ValueError("Arquivo não encontrado")

    caminho = res[0]

    # Remover do banco
    sql_delete = text("""
        DELETE FROM table_arquivos_comentarios
        WHERE arquivo_id = :arquivo_id
    """)

    try:
        db.session.execute(sql_delete, {"arquivo_id": arquivo_id})
        db.session.commit()

        # Excluir arquivo físico
        if caminho and os.path.exists(caminho):
            os.remove(caminho)

        return {"status": "arquivo deletado"}

    except Exception as e:
        db.session.rollback()
        print("Erro ao deletar arquivo:", e)
        raise


# ===========================================
# ALIASES PARA COMPATIBILIDADE COM ROUTES.PY
# ===========================================
def save_arquivo(file, comentario_id, convenio_siafi, usuario):
    """Alias para salvar_arquivo_comentario - compatibilidade com routes.py"""
    return salvar_arquivo_comentario(comentario_id, convenio_siafi, file, usuario)

def get_arquivos_comentario(comentario_id):
    """Alias para get_arquivos_por_comentario - compatibilidade com routes.py"""
    return get_arquivos_por_comentario(comentario_id)
