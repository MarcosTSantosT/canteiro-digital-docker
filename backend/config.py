import os
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv

# ------------------------------------------------------------------------------
# Base do projeto
# ------------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent

# ------------------------------------------------------------------------------
# Carregar .env
# ------------------------------------------------------------------------------
load_dotenv(BASE_DIR / ".env")

# .env Armazena os valores reais (chaves, senhas, URLs)	
# config.py	Define como o app lê e usa esses valores. Vira apenas “a regra de uso”, não os valores reais.	
# O .env fornece os ingredientes, o config.py é a receita, e o create_app() é quem cozinha tudo.

# Segurança: NUNCA coloca sua senha, SECRET_KEY, tokens, client secret do Google no GitHub.
# Se fosse tudo no config.py, você seria obrigado a versionar.
# Com o .env, o arquivo fica somente no seu computador/servidor.

class Config:
    # ==========================================================================
    # AMBIENTE
    # ==========================================================================
    ENV = os.getenv("FLASK_ENV", "development")
 
    # ==========================================================================
    # SESSÃO FLASK
    # ==========================================================================
    SECRET_KEY = os.getenv("SECRET_KEY", "chave_insegura_dev")
    SESSION_TYPE = "filesystem"
    SESSION_PERMANENT = False
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_SECURE = False
    SESSION_COOKIE_DOMAIN = None
    SESSION_COOKIE_PATH = "/"
    PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)

    SESSION_FILE_DIR = str(BASE_DIR / "flask_session")

    # ==========================================================================
    # CORS
    # ==========================================================================
    CORS_ALLOWED_ORIGINS = os.getenv(
        "CORS_ALLOWED_ORIGINS",
        "http://localhost:5173"
    ).split(",")

    # ==========================================================================
    # JWT
    # ==========================================================================
    JWT_SECRET = os.getenv("JWT_SECRET", SECRET_KEY)
    JWT_ALGORITHM = "HS256"
    JWT_EXPIRATION_HOURS = 2

    # ==========================================================================
    # DATABASE (PostgreSQL)
    # ==========================================================================
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://postgres:postgres@localhost:5432/postgres"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ==========================================================================
    # CSV / UPLOADS
    # ==========================================================================
    # Arquivo que salvará o último upload da base da Caixa 
    CSV_FILE_PATH = os.getenv(
        "CSV_FILE_PATH",
        str(BASE_DIR / "data" / "Base_Caixa_Uploaded.csv")  
    )

    # Pasta em que serão salvos upload de arquivos da funcionalidade comentários
    UPLOAD_FOLDER = os.getenv(
        "UPLOAD_FOLDER",
        str(BASE_DIR / "app" / "uploads" / "comentarios")
    )

    # A base dados básicos costuma ter em torno 166 MB
    MAX_CONTENT_LENGTH = 500 * 1024 * 1024  # 500 MB


    # ==========================================================================
    # FORNTEND EM PRODUÇÃO OU LOCALHOST
    # ==========================================================================
    # Busca do ambiente, se não achar, usa o localhost como padrão
    # No ambiente de produção, essa variável deve ser configurada para o URL do frontend !!
    # O .env também tem essa variável para desenvolvimento local (FRONTEND_URL = http://localhost:5173)
    FRONTEND_URL = os.environ.get('FRONTEND_URL', 'http://localhost:5173')


    # ==========================================================================
    # GOOGLE OAUTH
    # ==========================================================================
    GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

    GOOGLE_REDIRECT_URI = os.getenv(
        "GOOGLE_REDIRECT_URI",
        "http://localhost:5000/api/auth/callback"
    )

