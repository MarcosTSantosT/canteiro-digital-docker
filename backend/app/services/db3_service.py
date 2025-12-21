from sqlalchemy.sql import text
from .. import db
from math import ceil # usado na paginação

# ===========================================
# FIND ALL 
# ===========================================
def find_all_alteracoes():
    """
    Retorna todas as alterações registradas em table_alteracoes,
    incluindo dados do cadastro básico.
    """
    sql_query = text("""
        SELECT
            a.id AS alteracao_id,
            a.convenio_siafi,
            a.campo,
            a.valor_antigo,
            a.valor_novo,
            a.data_deteccao_upload,

            -- Campos do cadastro básico
            b.objeto,
            b.municipio_beneficiado,
            b.uf

        FROM table_alteracoes a
        INNER JOIN table_caixa_dados_basicos b 
            ON a.convenio_siafi = b.convenio_siafi

        ORDER BY a.data_deteccao_upload DESC
    """)

    try:
        result = db.session.execute(sql_query)
        return [row._asdict() for row in result.fetchall()]

    except Exception as e:
        print(f"Erro ao listar alterações: {e}")
        raise e


# ===========================================
# FIND dados por convênio
# ===========================================
def find_alteracoes_by_convenio(convenio_siafi):
    """
    Retorna todas as alterações registradas para um convênio específico,
    incluindo dados do cadastro básico.
    """
    sql_query = text("""
        SELECT
            a.id AS alteracao_id,
            a.convenio_siafi,
            a.campo,
            a.valor_antigo,
            a.valor_novo,
            a.data_deteccao_upload,

            -- Campos do cadastro básico
            b.objeto,
            b.municipio_beneficiado,
            b.uf

        FROM table_alteracoes a
        INNER JOIN table_caixa_dados_basicos b 
            ON a.convenio_siafi = b.convenio_siafi

        WHERE a.convenio_siafi = :convenio_param
        ORDER BY a.data_deteccao_upload DESC
    """)

    try:
        result = db.session.execute(sql_query, {"convenio_param": convenio_siafi})
        rows = result.fetchall()
        if not rows:
            return []

        return [row._asdict() for row in rows]

    except Exception as e:
        db.session.rollback()
        print(f"Erro ao buscar alterações: {e}")
        raise e
    

# ===========================================
# SERVICE: Find com FILTROS
# ===========================================
def find_alteracoes_filtradas(filters: dict):
    """
    Retorna alterações com filtros opcionais aplicados dinamicamente.
    
    Filtros suportados:
    - tipos_alteracao: array de strings para filtrar por tipo de campo
    - campo: filtro direto no nome do campo
    - valor_antigo: filtro no valor antigo
    - valor_novo: filtro no valor novo
    - data_inicio: data inicial (>=)
    - data_fim: data final (<=)
    - municipio_beneficiado: filtro por município
    - uf: filtro por UF
    """
    base_sql = """
        SELECT
            a.id AS alteracao_id,
            a.convenio_siafi,
            a.campo,
            a.valor_antigo,
            a.valor_novo,
            a.data_deteccao_upload AS data_registro,
            a.usuario,
            a.origem,
            b.objeto,
            b.municipio_beneficiado,
            b.uf
        FROM table_alteracoes a
        INNER JOIN table_caixa_dados_basicos b
            ON a.convenio_siafi = b.convenio_siafi
        WHERE 1=1
    """
    
    params = {}
    where_clauses = []
    
    # -------------------------
    # FILTRO DE TIPOS DE ALTERAÇÃO
    # -------------------------
    if filters.get("tipos_alteracao") and len(filters["tipos_alteracao"]) > 0:
        tipos = filters["tipos_alteracao"]
        # Construir condições OR para cada tipo
        tipo_conditions = []
        for idx, tipo in enumerate(tipos):
            param_name = f"tipo_{idx}"
            tipo_conditions.append(f"a.campo ILIKE :{param_name}")
            params[param_name] = f"%{tipo}%"
        
        if tipo_conditions:
            where_clauses.append(f"AND ({' OR '.join(tipo_conditions)})")
    
    # -------------------------
    # FILTROS EM table_alteracoes
    # -------------------------
    if filters.get("campo"):
        where_clauses.append("AND a.campo ILIKE :campo")
        params["campo"] = f"%{filters['campo']}%"
        
    if filters.get("valor_antigo"):
        where_clauses.append("AND a.valor_antigo ILIKE :valor_antigo")
        params["valor_antigo"] = f"%{filters['valor_antigo']}%"
        
    if filters.get("valor_novo"):
        where_clauses.append("AND a.valor_novo ILIKE :valor_novo")
        params["valor_novo"] = f"%{filters['valor_novo']}%"
    
    # Datas (intervalo)
    if filters.get("data_inicio"):
        where_clauses.append("AND a.data_deteccao_upload >= :data_inicio")
        params["data_inicio"] = filters["data_inicio"]
        
    if filters.get("data_fim"):
        where_clauses.append("AND a.data_deteccao_upload <= :data_fim")
        params["data_fim"] = filters["data_fim"]
    
    # -------------------------
    # FILTROS EM cadastro básico
    # -------------------------
    if filters.get("municipio_beneficiado"):
        where_clauses.append("AND b.municipio_beneficiado ILIKE :municipio")
        params["municipio"] = f"%{filters['municipio_beneficiado']}%"
        
    if filters.get("uf"):
        where_clauses.append("AND b.uf = :uf")
        params["uf"] = filters["uf"]
    
    # -------------------------
    # SQL FINAL
    # -------------------------
    final_sql = base_sql + "\n".join(where_clauses) + """
        ORDER BY a.data_deteccao_upload DESC
    """
    
    try:
        result = db.session.execute(text(final_sql), params)
        return [row._asdict() for row in result.fetchall()]
    except Exception as e:
        print(f"Erro ao listar alterações filtradas: {e}")
        raise


    # ===========================================
# NOVA FUNÇÃO: find_alteracoes_filtradas_paginado
# ===========================================
def find_alteracoes_filtradas_paginado(filters: dict, page: int = 1, page_size: int = 50):
    """
    Retorna alterações com filtros opcionais e PAGINAÇÃO.
    
    Parâmetros:
    - filters: dicionário com filtros de busca
    - page: número da página (1-indexed)
    - page_size: quantidade de registros por página
    
    Filtros suportados:
    - tipos_alteracao: array de strings para filtrar por tipo de campo
    - campo: filtro direto no nome do campo
    - valor_antigo: filtro no valor antigo
    - valor_novo: filtro no valor novo
    - data_inicio: data inicial (>=)
    - data_fim: data final (<=)
    - municipio_beneficiado: filtro por município
    - uf: filtro por UF
    
    Retorno:
    {
        "dados": [...],           // Registros da página atual
        "total": 523,             // Total de registros encontrados
        "page": 1,                // Página atual
        "page_size": 50,          // Tamanho da página
        "total_pages": 11         // Total de páginas
    }
    """
    
    print(f"\n🔍 BUSCA PAGINADA DE ALTERAÇÕES - Página {page}, Tamanho {page_size}")
    print(f"📋 Filtros recebidos: {filters}")
    
    # ===========================================
    # 1. QUERY PARA CONTAR TOTAL DE REGISTROS
    # ===========================================
    count_sql = """
        SELECT COUNT(*) as total
        FROM table_alteracoes a
        INNER JOIN table_caixa_dados_basicos b
            ON a.convenio_siafi = b.convenio_siafi
        WHERE 1=1
    """
    
    # ===========================================
    # 2. QUERY PARA BUSCAR DADOS
    # ===========================================
    base_sql = """
        SELECT
            a.id AS alteracao_id,
            a.convenio_siafi,
            a.campo,
            a.valor_antigo,
            a.valor_novo,
            a.data_deteccao_upload,
            b.objeto,
            b.municipio_beneficiado,
            b.uf
        FROM table_alteracoes a
        INNER JOIN table_caixa_dados_basicos b
            ON a.convenio_siafi = b.convenio_siafi
        WHERE 1=1
    """
    
    # ===========================================
    # 3. CONSTRUIR FILTROS
    # ===========================================
    params = {}
    where_clauses = []
    
    # -------------------------
    # FILTRO DE TIPOS DE ALTERAÇÃO
    # -------------------------
    if filters.get("tipos_alteracao") and len(filters["tipos_alteracao"]) > 0:
        tipos = filters["tipos_alteracao"]
        tipo_conditions = []
        for idx, tipo in enumerate(tipos):
            param_name = f"tipo_{idx}"
            tipo_conditions.append(f"a.campo ILIKE :{param_name}")
            params[param_name] = f"%{tipo}%"
        
        if tipo_conditions:
            where_clauses.append(f"AND ({' OR '.join(tipo_conditions)})")
            print(f"  ✓ Filtro de tipos: {len(tipos)} tipos")
    
    # -------------------------
    # FILTROS EM table_alteracoes
    # -------------------------
    if filters.get("campo"):
        where_clauses.append("AND a.campo ILIKE :campo")
        params["campo"] = f"%{filters['campo']}%"
        print(f"  ✓ Filtro campo: {filters['campo']}")
        
    if filters.get("valor_antigo"):
        where_clauses.append("AND a.valor_antigo ILIKE :valor_antigo")
        params["valor_antigo"] = f"%{filters['valor_antigo']}%"
        print(f"  ✓ Filtro valor_antigo: {filters['valor_antigo']}")
        
    if filters.get("valor_novo"):
        where_clauses.append("AND a.valor_novo ILIKE :valor_novo")
        params["valor_novo"] = f"%{filters['valor_novo']}%"
        print(f"  ✓ Filtro valor_novo: {filters['valor_novo']}")
    
    # -------------------------
    # FILTROS DE DATA
    # -------------------------
    if filters.get("data_inicio"):
        where_clauses.append("AND a.data_deteccao_upload >= :data_inicio")
        params["data_inicio"] = filters["data_inicio"]
        print(f"  ✓ Data início: {filters['data_inicio']}")
        
    if filters.get("data_fim"):
        where_clauses.append("AND a.data_deteccao_upload <= :data_fim")
        params["data_fim"] = filters["data_fim"]
        print(f"  ✓ Data fim: {filters['data_fim']}")
    
    # -------------------------
    # FILTROS EM cadastro básico
    # -------------------------
    if filters.get("municipio_beneficiado"):
        where_clauses.append("AND b.municipio_beneficiado ILIKE :municipio")
        params["municipio"] = f"%{filters['municipio_beneficiado']}%"
        print(f"  ✓ Filtro município: {filters['municipio_beneficiado']}")
        
    if filters.get("uf"):
        where_clauses.append("AND b.uf = :uf")
        params["uf"] = filters["uf"]
        print(f"  ✓ Filtro UF: {filters['uf']}")
    
    # ===========================================
    # 4. APLICAR FILTROS NAS QUERIES
    # ===========================================
    where_sql = ""
    if where_clauses:
        where_sql = " " + " ".join(where_clauses)
    
    count_sql += where_sql
    base_sql += where_sql
    
    # ===========================================
    # 5. EXECUTAR QUERY DE CONTAGEM
    # ===========================================
    try:
        count_result = db.session.execute(text(count_sql), params)
        total_records = count_result.scalar()
        print(f"\n✅ Total de registros encontrados: {total_records}")
        
        # Se não há registros, retornar vazio
        if total_records == 0:
            return {
                "dados": [],
                "total": 0,
                "page": page,
                "page_size": page_size,
                "total_pages": 0
            }
        
        # Calcular total de páginas
        total_pages = ceil(total_records / page_size)
        print(f"✅ Total de páginas: {total_pages}")
        
        # Ajustar página se estiver fora do range
        if page > total_pages:
            page = total_pages
        
        # ===========================================
        # 6. ADICIONAR ORDER BY, LIMIT e OFFSET
        # ===========================================
        base_sql += " ORDER BY a.data_deteccao_upload DESC"
        
        # Calcular offset
        offset = (page - 1) * page_size
        base_sql += f" LIMIT :page_size OFFSET :offset"
        params["page_size"] = page_size
        params["offset"] = offset
        
        print(f"✅ Buscando registros {offset + 1} a {offset + page_size}")
        
        # ===========================================
        # 7. EXECUTAR QUERY DE DADOS
        # ===========================================
        result = db.session.execute(text(base_sql), params)
        rows = [row._asdict() for row in result.fetchall()]
        
        print(f"✅ Registros retornados: {len(rows)}")
        if rows:
            print(f"✅ Primeiro registro: convenio_siafi = {rows[0].get('convenio_siafi')}")
        
        # ===========================================
        # 8. RETORNAR RESULTADO PAGINADO
        # ===========================================
        return {
            "dados": rows,
            "total": total_records,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages
        }

    except Exception as e:
        db.session.rollback()
        print(f"\n❌ ERRO em find_alteracoes_filtradas_paginado: {e}")
        raise
