# app/__init__.py
from flask import Flask, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # 1. Importe o CORS
from flask_session import Session

from authlib.integrations.flask_client import OAuth
from datetime import timedelta
import json
import os

from config import Config # config está na raiz do backend # Faz o load do .env por lá

# ------------------------------------------------------------------------------
# Instância global do SQLAlchemy (será associada ao app dentro de create_app)
# ------------------------------------------------------------------------------
db = SQLAlchemy()

# ------------------------------------------------------------------------------
# Instância global do OAuth
# ------------------------------------------------------------------------------
oauth = OAuth()  

# ------------------------------------------------------------------------------
# Application Factory 
# Função fábrica que cria e configura a aplicação Flask
# ------------------------------------------------------------------------------
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # ----------------------------------------------------------------------------
    # Diretórios necessários
    # ----------------------------------------------------------------------------
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    os.makedirs(app.config["SESSION_FILE_DIR"], exist_ok=True)

    # ----------------------------------------------------------------------------
    # CORS
    # ----------------------------------------------------------------------------
    CORS(
        app,
        supports_credentials=True,
        origins=app.config["CORS_ALLOWED_ORIGINS"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"]
    )

    # ----------------------------------------------------------------------------
    # Extensões
    # ----------------------------------------------------------------------------
    Session(app)
    db.init_app(app)
    oauth.init_app(app)

    # ----------------------------------------------------------------------------
    # OAuth Google (OIDC)
    # ----------------------------------------------------------------------------
    oauth.register(
        name="google",
        client_id=app.config["GOOGLE_CLIENT_ID"],
        client_secret=app.config["GOOGLE_CLIENT_SECRET"],
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={"scope": "openid email profile"},
        api_base_url="https://openidconnect.googleapis.com/v1/"
    )

    # ----------------------------------------------------------------------------
    # Blueprints
    # ----------------------------------------------------------------------------
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
