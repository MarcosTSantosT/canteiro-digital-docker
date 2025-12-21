# app/__init__.py

from flask import Flask, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # 1. Importe o CORS
from .config import Config
from authlib.integrations.flask_client import OAuth
import json


from flask_session import Session
from datetime import timedelta

# ------------------------------------------------------------------------------
# Para carregar as variáveis de ambiente (que armazena inclusive senhas)
# ------------------------------------------------------------------------------
from dotenv import load_dotenv
load_dotenv()

# ------------------------------------------------------------------------------
# Instância global do SQLAlchemy (será associada ao app dentro de create_app)
# ------------------------------------------------------------------------------
db = SQLAlchemy()

# ------------------------------------------------------------------------------
# Instância global do OAuth
# ------------------------------------------------------------------------------
oauth = OAuth()  # criar a instância global aqui

# ------------------------------------------------------------------------------
# Função fábrica que cria e configura a aplicação Flask
# ------------------------------------------------------------------------------
def create_app(config_class=Config):
    app = Flask(__name__)
    # Carrega as configurações da classe Config 
    app.config.from_object(config_class)
    
    # DOWNLOAD/UPLOAD
    import os ## esse import tem que ficar aqui
    app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(app.root_path), 'uploads', 'comentarios')
    # app.root_path é a pasta do backend

    # Cria o diretório, se não existir
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    print("\n=== UPLOAD_FOLDER ===")
    print(app.config['UPLOAD_FOLDER'])
    print("=====================\n")

    # GARANTE QUE A SECRET EXISTE ????
    app.config["SECRET_KEY"] = Config.SECRET_KEY

    # -----------------------------
    # CORS
    # -----------------------------
    # Inicialize o CORS no seu app
    # (Isso permite requisições de qualquer origem,
    #  para produção, restrinja a 'origins="http://seu-dominio.com"')
    # supports_credentials=True => Habilita cookies cross-site (essa configuração é necessária para autenticação!!)
    # Cookies NÃO atravessam domínios/portas diferentes a menos que você habilite explicitamente

    CORS(
        app,
        supports_credentials=True,
        origins=[
            "http://localhost:5173",
            "http://localhost:8080",
        ],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # ← ADICIONADO
        allow_headers=["Content-Type", "Authorization"]       # ← ADICIONADO
    )

 
    # Como seu frontend (ex: http://localhost:3000) e seu backend (ex: http://localhost:5000) rodarão em "origens" (portas) diferentes, 
    # o navegador irá bloquear as requisições por segurança
    # Para dizer ao seu backend (Flask) para permitir requisições vindas do seu frontend usa-se a biblioteca Flask-CORS
    # pip install flask-cors

    # ================================================================
    # COOKIES DE SESSÃO (IMPORTANTE PARA O STATE DO OAUTH)
    # ================================================================
    ## app.config["SESSION_COOKIE_SAMESITE"] = "None"   # necessário para cookies cross-site
    # None Permite envio de cookies em cross-site GET redirect, que é exatamente o fluxo OAuth.
    # Permite que o cookie da sessão seja enviado mesmo em redirecionamentos cross-site, que é como o OAuth opera.
    # Lax Bloqueia cookies em redirects externos → state some → login quebra.
    ## app.config["SESSION_COOKIE_SECURE"] = False      # True somente em HTTPS (produção)
    ## app.config["SESSION_COOKIE_HTTPONLY"] = True

    # ???
    ## app.config["SESSION_COOKIE_DOMAIN"] = None
    # localhost não é um domínio válido para cookies cross-site com domínio fixo.
    # Se você colocar domain="localhost", o Chrome simplesmente apaga o cookie.


    # Flask-session obrigatório # EM TESTE
    ## app.config["SESSION_TYPE"] = "filesystem"
    ## app.config["SESSION_PERMANENT"] = False

    # ================================================================
    # CONFIGURAÇÃO CORRETA DE SESSÃO PARA LOCALHOST
    # ================================================================

    # Flask-Session (obrigatório p/ armazenar state)
    app.config["SESSION_TYPE"] = "filesystem"
    app.config["SESSION_PERMANENT"] = False
    
    import os
    os.makedirs("./backend/flask_session", exist_ok=True)
    app.config["SESSION_FILE_DIR"] = "./backend/flask_session"
    
    # Cookie correto PARA FUNCIONAR EM LOCALHOST
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = False    # HTTP permite
#SameSite=None só funciona se Secure=True
#Secure=True não funciona em http, apenas https

    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_DOMAIN"] = None     # obrigatório
    app.config["SESSION_COOKIE_PATH"] = "/"

    # ← ADICIONAR APENAS ESTA LINHA:
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=30)


    Session(app) ### em teste ANTECEDE O BLUE PRINT


    # -----------------------------
    # Banco (SQLAlchemy)
    # -----------------------------
    # inicializa o SQLAlchemy com o app recém-criado.
    db.init_app(app) 




    # Inicializa OAuth
    oauth.init_app(app)

    # -----------------------------
    # OAuth - fluxo OIDC padrão.
    # -----------------------------
    oauth.register(
        name='google',
        client_id=app.config["GOOGLE_CLIENT_ID"],
        client_secret=app.config["GOOGLE_CLIENT_SECRET"],
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={'scope': 'openid email profile'},
        api_base_url='https://openidconnect.googleapis.com/v1/' 
    )
    # Obs.: Usar aspas NÃO é obrigatório, mas evita erros com caracteres especiais.


    # -----------------------------
    # Blueprint
    # -----------------------------
    # Importa e registra as rotas (Blueprint)
    # Importar dentro do contexto evita import circular
    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp)








    return app



# ------------------------------------------------------------------------------
# Função auxiliar para retornar JSON com codificação UTF-8
# ------------------------------------------------------------------------------
def json_utf8(data, status=200):
    """
    Retorna uma resposta JSON com codificação UTF-8.
    """
    return Response(
        json.dumps(data, ensure_ascii=False),
        content_type="application/json; charset=utf-8",
        status=status
    )
