# Arquivo essencial para Gunicorn e Azure (mas, tecnicamente, para o Gunicorn, que o Azure executa).
# wsgi.py é a “porta de entrada” da aplicação para o Azure (assim como o run.py é para desenvolvimento).
# O Azure não chama seu Flask diretamente.
# Ele chama o Gunicorn, e o Gunicorn importa o wsgi.py.

from app import create_app

app = create_app()

"""
# Uso em teste local sem Azure e Gunicorn

from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "OK AZURE", 200
"""