import os

class Config:
    BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

    # ============================
    # SECRET KEY
    # ============================
    # SECRET_KEY é usado pelo Flask internamente (sessões, cookies, CSRF).
    SECRET_KEY = os.environ.get("SECRET_KEY", "chave_insegura_dev")

    # ============================
    # JWT SECRET KEY
    # ============================
    # JWT_SECRET é a chave que você usa para assinar seus tokens JWT..
    JWT_SECRET = os.environ.get("JWT_SECRET", "chave_jwt_dev")


    # ============================
    # BANCO DE DADOS
    # ============================

    # Primeiro tenta pegar DATABASE_URL completa (Postgres / SQLite)
    DATABASE_URL = os.environ.get("DATABASE_URL")

    if DATABASE_URL:
        SQLALCHEMY_DATABASE_URI = DATABASE_URL
    else:
        # Se não tiver DATABASE_URL completa, monta a URI a partir das variáveis
        # os.environ.get() e os.getenv() são equivalentes na prática.
        DB_USER = os.environ.get("DB_USER", "postgres")
        DB_PASSWORD = os.environ.get("DB_PASSWORD", "postgres_password")
        DB_HOST = os.environ.get("DB_HOST", "localhost")
        DB_PORT = os.environ.get("DB_PORT", "5432")
        DB_NAME = os.environ.get("DB_NAME", "acompanhamento_obras_db")

        SQLALCHEMY_DATABASE_URI = (
            f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
        )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ============================
    # CSV / ARQUIVOS
    # ============================
    CSV_FILE_PATH = os.path.join(BASE_DIR, "data", "dadosBasicos_mini.csv")

    # ============================
    # JSON / UTF-8
    # ============================
    JSON_AS_ASCII = False

    # ============================
    # OAuth Google
    # ============================
    GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
    GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
    GOOGLE_REDIRECT_URI = os.environ.get("GOOGLE_REDIRECT_URI")

    print("CLIENTE ID CARREGADO:", os.environ.get("GOOGLE_CLIENT_ID"))
    print("SECRET CARREGADO:", os.environ.get("GOOGLE_CLIENT_SECRET"))
    print("REDIRECT URI:", os.environ.get("GOOGLE_REDIRECT_URI"))

    # ============================
    # CORS
    # ============================
    CORS_ALLOWED_ORIGINS = os.environ.get("CORS_ALLOWED_ORIGINS", "*")

    # ============================
    # Docker
    # ============================
    APP_PORT = os.environ.get("APP_PORT", 5000)


#O Authlib gera um state aleatório e guarda na sessão do Flask (cookie do browser).
#O usuário é redirecionado para o Google.
#Google retorna para /api/auth/callback com state.
#O Authlib compara state recebido com state salvo na sessão.