from datetime import datetime, timedelta, timezone
import os

from flask import Blueprint, jsonify, request, session, current_app, redirect, send_file, url_for, g
from .services import db1_service, db2_service, db3_service, db4_service

from authlib.integrations.flask_client import OAuth
from app import oauth  # usar a instância inicializada (instância importada do __init__.py)
import jwt

from functools import wraps
from uuid import uuid4
from sqlalchemy.exc import SQLAlchemyError

#from app import json_utf8  # função utilitária definida em app/__init__.py
#from werkzeug.utils import secure_filename  # ← upload comentário
#import time

# ------------------------------------------------------------------------------
# Criação do Blueprint
# ------------------------------------------------------------------------------
# Objetivo:
# Centralizar e modularizar todas as rotas HTTP da aplicação Flask.
# Este Blueprint será registrado na aplicação principal (create_app).

bp = Blueprint("routes", __name__)

# ------------------------------------------------------------------------------
# Rotas básicas de teste
# ------------------------------------------------------------------------------
@bp.route('/')
# http://localhost:5000/
def index():
    """
    Rota raiz para teste de roteamento e conectividade com o PostgreSQL.
    """
    # Se queiser testa a conexão com o banco de dados: 
    #db1_service.testar_conexao_postgreSQL()
    return "Teste de roteamento: Página inicial (/)"


# -------------------------------------------------------------------------------
# ROTAS DE AUTENTICAÇÃO
# -------------------------------------------------------------------------------

# -------------------------------------------------------------------------------
# OAuth / JWT Setup
# -------------------------------------------------------------------------------
# Objetivo:
# Definir o segredo JWT e o decorator responsável por proteger rotas
# que exigem autenticação via token JWT válido.

JWT_SECRET = os.environ.get('JWT_SECRET', 'supersecret123')

def jwt_required(f):
    """
    Decorator que valida a presença e a validade de um JWT no header Authorization.
    Caso válido, injeta os dados do usuário autenticado em g.user.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', None)
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Token ausente"}), 401
        token = auth_header.split(" ")[1]
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            g.user = payload
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401
        return f(*args, **kwargs)
    return decorated

# -------------------------------------------------------------------------------
# OAuth Endpoints
# -------------------------------------------------------------------------------
# Objetivo:
# Implementar autenticação via Google OAuth 2.0, gerar JWT próprio
# e redirecionar o usuário autenticado para o frontend.

@bp.route("/api/auth/login")
def login():
    """
    OBJETIVO:
    Iniciar o processo de autenticação do usuário por meio do protocolo OAuth 2.0,
    utilizando o provedor Google como serviço de identidade.

    Esta rota é responsável por:
    - Criar uma sessão temporária no backend para controle do fluxo OAuth;
    - Gerar um identificador de estado (state) para proteção contra ataques CSRF;
    - Redirecionar o usuário para a página de autenticação do Google,
      delegando ao provedor externo a validação das credenciais.

    Não realiza autenticação local nem gera tokens próprios.
    Atua exclusivamente como ponto inicial do fluxo de login.
    """
    session.permanent = True
    redirect_uri = current_app.config["GOOGLE_REDIRECT_URI"]

    state = uuid4().hex
    session['oauth_state'] = state
    session.modified = True

    return oauth.google.authorize_redirect(
        redirect_uri=redirect_uri,
        state=state
    )

@bp.route("/api/auth/callback")
def auth_callback():
    """
    OBJETIVO:
    Finalizar o fluxo de autenticação OAuth iniciado em /api/auth/login,
    processando a resposta enviada pelo Google após a autenticação do usuário.

    Esta rota é responsável por:
    - Validar o parâmetro 'state' para garantir a integridade do fluxo OAuth;
    - Trocar o código de autorização recebido por um access token do Google;
    - Consultar a API de informações do usuário autenticado;
    - Determinar o nível de acesso (perfil) do usuário com base em regras de negócio;
    - Gerar um token JWT próprio da aplicação, contendo identidade e permissões;
    - Redirecionar o usuário ao frontend, fornecendo o JWT para uso nas requisições futuras.

    Atua como ponto central de integração entre o provedor OAuth externo
    e o mecanismo interno de autenticação e autorização da aplicação.
    """
    try:
        state_in_session = session.get('oauth_state')
        state_in_request = request.args.get('state')

        # Pega a URL centralizada na configuração do Flask
        frontend_url = current_app.config.get('FRONTEND_URL')

        if not state_in_session or state_in_session != state_in_request:
            return redirect(f"{frontend_url}?error=invalid_state")

        session.pop('oauth_state', None)

        code = request.args.get('code')
        if not code:
            return redirect(f"{frontend_url}?error=no_code")

        import requests

        token_url = "https://oauth2.googleapis.com/token"
        redirect_uri = current_app.config["GOOGLE_REDIRECT_URI"]
        
        # Checando o redirecionamento.Deve ser igula ao cadastrado no Google Cloud Console 
        # https://console.cloud.google.com/ -> [Api e serviços] -> [Credenciais] -> [URI .. Atutorizados])
        current_app.logger.info(f"OAUTH redirect_uri = {redirect_uri}")
        

        token_data = {
            'code': code,
            'client_id': current_app.config['GOOGLE_CLIENT_ID'],
            'client_secret': current_app.config['GOOGLE_CLIENT_SECRET'],
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }

        token_response = requests.post(token_url, data=token_data, timeout=10)
        token_json = token_response.json()
        access_token = token_json.get('access_token')

        userinfo_response = requests.get(
            "https://www.googleapis.com/oauth2/v3/userinfo",
            headers={'Authorization': f'Bearer {access_token}'},
            timeout=10
        )

        user_info = userinfo_response.json()

        # ----------------------------------------------------------------
        # Verifica o nível de acesso do usuário identificado
        # ----------------------------------------------------------------
        user_info = userinfo_response.json()
        user_email = user_info.get('email')

        # 1. Carrega a lista do ambiente (se vazia, ninguém será admin, mas todos logam)
        admin_env = os.environ.get('ADMIN_EMAILS', '')
        # Remove espaços em branco extras para evitar erros de comparação
        admin_list = [email.strip().lower() for email in admin_env.split(',') if email.strip()]

        # 2. Define a role: Se estiver na lista é admin, caso contrário é user
        # Isso garante que QUALQUER UM logue, mudando apenas o privilégio
        user_email = user_info.get('email').strip().lower()
        role = "admin" if user_email in admin_list else "user"

        print(f"DEBUG: Email logado: '{user_email}'") # Verifique no terminal do Flask
        print(f"DEBUG: Lista de Admins: {admin_list}")
        print(f"DEBUG: Resultado Role: {role}")

        # ----------------------------------------------------------------
        # Payload
        # ----------------------------------------------------------------

        payload = {
            'sub': user_info['sub'],
            'name': user_info.get('name'),
            'email': user_info.get('email'),
            'picture': user_info.get('picture'),
            'role': role,  # <-- ADICIONE ESTA LINHA
            'exp': int((datetime.now(timezone.utc) + timedelta(hours=2)).timestamp())
        }


        encoded_jwt = jwt.encode(payload, current_app.config["JWT_SECRET"], algorithm='HS256')

        return redirect(f"{frontend_url}/callback?token={encoded_jwt}")

    except Exception as e:
        print(f"Erro no login: {e}")
        return redirect(f"{frontend_url}?error=auth_failed")

@bp.route("/api/auth/me")
@jwt_required
def me():
    """
    OBJETIVO:
    Fornecer ao frontend informações básicas do usuário atualmente autenticado,
    com base nos dados presentes no token JWT enviado na requisição.

    Esta rota é responsável por:
    - Validar a autenticidade e validade do JWT;
    - Extrair os dados de identidade do usuário autenticado;
    - Retornar informações essenciais, como identificador, nome, e-mail e perfil de acesso.

    É utilizada principalmente para:
    - Verificação de sessão ativa no frontend;
    - Controle de acesso a funcionalidades conforme o perfil do usuário;
    - Exibição de dados do usuário logado na interface.
    """
    return jsonify({
        "id": g.user["sub"],
        "name": g.user["name"],
        "email": g.user["email"],
        "role": g.user.get("role", "user")
    })


# ------------------------------------------------------------------------------
# ROTAS FUNCIONALIDADE DO APP
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# Upload de CSV da Caixa
# ------------------------------------------------------------------------------
@bp.route("/api/upload_csv", methods=["POST"])
@jwt_required  # <-- exigência de token
def upload_csv():
    """
    Recebe um arquivo CSV, salva no servidor e processa os dados,
    registrando diferenças e atualizações no banco.
    Retorna estatísticas do processamento para o frontend.
    """
    # O Frontend impede a apresentação da tela de upload para não quem não tem acesso. 
    # Mas a segurança para o não transação dos dados está aqui!
    # Api.me também utilizará a informação de role 
    if g.user.get("role") != "admin":
        return jsonify({
            "status": "erro",
            "mensagem": "Acesso negado: Apenas administradores podem atualizar a base."
        }), 403


    try:
        file = request.files.get("file")
        if not file:
            return jsonify({
                "status": "erro",
                "mensagem": "Nenhum arquivo enviado"
            }), 400

        # Salva o arquivo no caminho configurado
        file.save(current_app.config["CSV_FILE_PATH"])

        # Processa o CSV
        result = db1_service.load_csv_with_diff_log()

        # Resposta padronizada
        return jsonify({
            "status": "sucesso",
            "mensagem": "Arquivo processado com sucesso",
            **result
        }), 200

    except Exception as e:
        current_app.logger.exception("Erro ao processar upload CSV")
        return jsonify({
            "status": "erro",
            "mensagem": str(e)
        }), 500

# ------------------------------------------------------------------------------
# Carteira completa de convênios
# ------------------------------------------------------------------------------
@bp.route("/api/operacoes_base_completa")
def get_carteira():
    """
    Retorna a lista completa de convênios da base (carteira).
    """
    data = db1_service.get_carteira()
    return jsonify(data)

# ------------------------------------------------------------------------------
# Informações para os filtros das operações
# ------------------------------------------------------------------------------
@bp.route("/api/ufs", methods=["GET"])
def listar_ufs():
    try:
        dados = db1_service.listar_ufs()
        return jsonify(dados), 200
    except SQLAlchemyError:
        return jsonify({"erro": "Erro ao buscar UFs"}), 500

@bp.route("/api/municipios", methods=["GET"])
def listar_municipios_por_uf():
    try:
        uf = request.args.get("uf")
        dados = db1_service.listar_municipios_por_uf(uf)
        return jsonify(dados), 200
    except SQLAlchemyError:
        return jsonify({"erro": "Erro ao buscar municípios"}), 500

@bp.route("/api/ufs-municipios", methods=["GET"])
def listar_ufs_municipios():
    try:
        dados = db1_service.find_ufs_municipios()
        return jsonify(dados), 200
    except SQLAlchemyError:
        return jsonify({"erro": "Erro ao buscar UFs e municípios"}), 500

@bp.route("/api/convenentes", methods=["GET"])
def listar_convenentes():
    try:
        dados = db1_service.listar_convenentes()
        return jsonify(dados), 200
    except SQLAlchemyError:
        return jsonify({"erro": "Erro ao buscar convenentes"}), 500

@bp.route("/api/situacoes-contrato", methods=["GET"])
def listar_situacoes_contrato():
    try:
        dados = db1_service.listar_situacoes_contrato()
        return jsonify(dados), 200
    except SQLAlchemyError:
        return jsonify({"erro": "Erro ao buscar situações de contrato"}), 500

@bp.route("/api/situacoes-obra", methods=["GET"])
def listar_situacoes_obra():
    try:
        dados = db1_service.listar_situacoes_obra()
        return jsonify(dados), 200
    except SQLAlchemyError:
        return jsonify({"erro": "Erro ao buscar situações de obra"}), 500

# ===========================================
# ROTA: /api/operacoes_fitros_paginacao COM PAGINAÇÃO
# ===========================================
@bp.route("/api/operacoes_fitros_paginacao", methods=["POST"])
def buscar_convenios():
    """
    Recebe filtros opcionais via JSON e retorna convênios filtrados COM PAGINAÇÃO.
    
    Parâmetros esperados no JSON:
    - filtros: dict com os filtros de busca
    - page: número da página (default: 1)
    - page_size: tamanho da página (default: 50)
    
    Retorno:
    {
        "dados": [...],           // Registros da página atual
        "total": 1234,            // Total de registros encontrados
        "page": 1,                // Página atual
        "page_size": 50,          // Tamanho da página
        "total_pages": 25         // Total de páginas
    }
    """
    try:
        # Receber JSON do body
        body = request.get_json() or {}
        
        # Extrair parâmetros de paginação
        page = body.get('page', 1)
        page_size = body.get('page_size', 50)
        
        # Validar parâmetros de paginação
        try:
            page = int(page)
            page_size = int(page_size)
        except (ValueError, TypeError):
            return jsonify({"erro": "Parâmetros page e page_size devem ser números inteiros"}), 400
        
        # Limitar page_size para evitar queries muito grandes
        if page_size > 500:
            page_size = 500
        if page_size < 1:
            page_size = 1
        if page < 1:
            page = 1
        
        # Extrair filtros (todos os campos exceto page e page_size)
        filters = {k: v for k, v in body.items() if k not in ['page', 'page_size']}
        
        # Buscar dados paginados
        resultado = db1_service.find_convenios_filtrados_paginado(
            filters=filters,
            page=page,
            page_size=page_size
        )
        
        return jsonify(resultado), 200

    except SQLAlchemyError as e:
        print(f"❌ Erro SQL ao buscar convênios: {e}")
        return jsonify({"erro": "Erro ao consultar convênios no banco de dados"}), 500
    except Exception as e:
        print(f"❌ Erro inesperado ao buscar convênios: {e}")
        return jsonify({"erro": "Erro interno ao processar requisição"}), 500

# ------------------------------------------------------------------------------
# Convênios, comentários e alterações
# ------------------------------------------------------------------------------
@bp.route("/api/operacao/<string:convenio_siafi>", methods=["GET"])
# TESTE: http://localhost:5000/api/operacao/873650
# https://app-canteiro-digital-backend.azurewebsites.net/api/operacao/873650
def get_convenio(convenio_siafi):
    """
    Retorna os dados completos de um convênio, incluindo:
    - dados básicos do convênio (db1)
    - comentários associados (db2)
    - histórico de alterações (db3)
    """
    dados_convenio = db1_service.find_dados_convenio_by_siafi(convenio_siafi)
    dados_comentarios = db2_service.find_dados_comentarios_by_convenio(convenio_siafi)
    dados_alteracoes = db3_service.find_alteracoes_by_convenio(convenio_siafi)

    return jsonify({
        "convenio": dados_convenio,
        "comentarios": dados_comentarios,
        "alteracoes": dados_alteracoes
    })

# ------------------------------------------------------------------------------
# INCLUR, EDITAR E EXCLUIR Comentários
# ------------------------------------------------------------------------------
@bp.route("/api/operacao/<string:convenio_siafi>/comentarios", methods=["POST"])
def incluir_comentario(convenio_siafi):
    """
    Cria um novo comentário associado a um convênio específico.
    """
    try:
        convenio_siafi_int = int(convenio_siafi)
    except ValueError:
        return jsonify({"erro": "convenio_siafi inválido"}), 400

    dados = request.json
    if not dados or not dados.get("texto"):
        return jsonify({"erro": "Texto obrigatório"}), 400

    dados["convenio_siafi"] = convenio_siafi_int
    result = db2_service.insert_comentario(dados)

    return jsonify(result), 201

@bp.route("/api/operacao/<string:convenio_siafi>/comentarios/<int:id_comentario>", methods=["PUT"])
def editar_comentario(convenio_siafi, id_comentario):
    """
    Atualiza o conteúdo de um comentário existente.
    """
    dados = request.json
    result = db2_service.update_comentario(id_comentario, int(convenio_siafi), dados)
    return jsonify(result), 200

@bp.route("/api/operacao/<string:convenio_siafi>/comentarios/<int:comentario_id>", methods=["DELETE"])
def excluir_comentario(convenio_siafi, comentario_id):
    """
    Remove um comentário do banco de dados.
    """
    db2_service.delete_comentario(comentario_id)
    return jsonify({"status": "comentário excluído"})

# ------------------------------------------------------------------------------
# Arquivos anexados a comentários
# ------------------------------------------------------------------------------
@bp.route("/api/comentarios/<int:comentario_id>/arquivo", methods=["POST"])
@jwt_required
def upload_arquivo(comentario_id):
    """
    Faz upload de um arquivo associado a um comentário.
    """
    file = request.files.get('file')
    convenio_siafi = request.form.get('convenio_siafi')
    usuario = g.user.get('email')
    return jsonify(db2_service.save_arquivo(file, comentario_id, convenio_siafi, usuario)), 201

@bp.route("/api/comentarios/<int:comentario_id>/arquivos", methods=["GET"])
def get_arquivos(comentario_id):
    """
    Lista todos os arquivos associados a um comentário.
    """
    return jsonify(db2_service.get_arquivos_comentario(comentario_id))

@bp.route("/api/arquivo/<int:arquivo_id>/download", methods=["GET"])
def download_arquivo(arquivo_id):
    """
    Realiza o download de um arquivo armazenado no servidor.
    """
    from sqlalchemy.sql import text
    from app import db

    query = text("""
        SELECT caminho_arquivo, nome_original
        FROM table_arquivos_comentarios
        WHERE arquivo_id = :arquivo_id
    """)

    row = db.session.execute(query, {"arquivo_id": arquivo_id}).fetchone()
    return send_file(row[0], as_attachment=True, download_name=row[1])

@bp.route("/api/comentarios/<int:comentario_id>/arquivo/<int:arquivo_id>", methods=["DELETE"])
@jwt_required
def delete_arquivo(comentario_id, arquivo_id):
    """
    Remove um arquivo associado a um comentário.
    """
    return jsonify(db2_service.delete_arquivo(arquivo_id, comentario_id))

# ------------------------------------------------------------------------------
# Atualizações
# ------------------------------------------------------------------------------
@bp.route("/api/alteracoes")
def get_alteracoes():
    """
    Retorna o histórico completo de alterações registradas.
    """
    return jsonify(db3_service.find_all_alteracoes())

# ===========================================
# ROTA: /api/atualizacoes_filtros_paginacao COM PAGINAÇÃO
# ===========================================
@bp.route("/api/atualizacoes_filtros_paginacao", methods=["POST"])
def listar_alteracoes_filtradas():
    """
    Lista alterações com filtros opcionais e PAGINAÇÃO.
    
    Body esperado:
    {
        "page": 1,                          // Número da página
        "page_size": 50,                    // Registros por página
        "data_inicio": "2024-01-01",        // Data inicial (opcional)
        "data_fim": "2024-12-31",           // Data final (opcional)
        "tipos_alteracao": ["vistoria", "aio"]  // Tipos de alteração (opcional)
    }
    
    Retorno:
    {
        "status": "ok",
        "dados": [...],           // Registros da página atual
        "total": 523,             // Total de registros encontrados
        "page": 1,                // Página atual
        "page_size": 50,          // Tamanho da página
        "total_pages": 11         // Total de páginas
    }
    """
    try:
        # Receber body
        body = request.get_json(silent=True) or {}
        
        # Extrair parâmetros de paginação
        page = body.get('page', 1)
        page_size = body.get('page_size', 50)
        
        # Validar parâmetros de paginação
        try:
            page = int(page)
            page_size = int(page_size)
        except (ValueError, TypeError):
            return jsonify({
                "status": "erro",
                "mensagem": "Parâmetros page e page_size devem ser números inteiros"
            }), 400
        
        # Limitar page_size
        if page_size > 500:
            page_size = 500
        if page_size < 1:
            page_size = 1
        if page < 1:
            page = 1
        
        # Extrair filtros (excluir page e page_size)
        filters = {k: v for k, v in body.items() if k not in ['page', 'page_size']}
        
        # Buscar dados paginados
        resultado = db3_service.find_alteracoes_filtradas_paginado(
            filters=filters,
            page=page,
            page_size=page_size
        )
        
        return jsonify({
            "status": "ok",
            "dados": resultado["dados"],
            "total": resultado["total"],
            "page": resultado["page"],
            "page_size": resultado["page_size"],
            "total_pages": resultado["total_pages"]
        }), 200
        
    except SQLAlchemyError as e:
        print(f"❌ Erro SQL ao filtrar alterações: {e}")
        return jsonify({
            "status": "erro",
            "mensagem": "Erro ao consultar alterações no banco de dados.",
            "detalhe": str(e)
        }), 500
    except Exception as e:
        print(f"❌ Erro inesperado ao filtrar alterações: {e}")
        return jsonify({
            "status": "erro",
            "mensagem": "Erro inesperado ao processar a requisição.",
            "detalhe": str(e)
        }), 500

# ------------------------------------------------------------------------------
# Processos relacionados ao convênio
# ------------------------------------------------------------------------------
@bp.route("/api/operacao/<string:convenio_siafi>/processos", methods=["GET"])
def get_processos_convenio(convenio_siafi):
    """
    Retorna os processos administrativos associados a um convênio.
    """
    processos = db4_service.find_processos_by_convenio(int(convenio_siafi))
    return jsonify({
        "convenio_siafi": int(convenio_siafi),
        "total": len(processos),
        "processos": processos
    })