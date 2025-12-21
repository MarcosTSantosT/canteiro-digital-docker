import os

class Config:
    # Caminho base do projeto
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

    # Configuração do Banco de Dados (POSTGRESQL)
    # 1. Defina seus parâmetros
    USUARIO = "postgres"         # O usuário do banco
    SENHA = "postgres_password"  # em pg_hba.conf verifica-se que o servidor (na memória) está rodando com scram-sha-256 e exige a senha
    HOST = "localhost"           # O endereço (o mesmo do pg_hba.conf)     HOST = "127.0.0.1"
    PORTA = "5432"              # A porta padrão
    BANCO = "acompanhamento_obras_db"  # DB criado para esta aplicação (dentro dele estão as tabelas de dados)

    # Obs.: Para encontrar o pg_hba.conf no postgres query tool: SHOW hba_file;

    # 2. Monte a URI sem a senha
    # O formato é: postgresql://USUARIO@HOST:PORTA/BANCO
    # URI pelo método for 'trust (sem solicitação de senha)
    # DATABASE_URI = f"postgresql://{USUARIO}@{HOST}:{PORTA}/{BANCO}"
    
    # outra sintaxe pelo método 'trust', a palavra 'senha' é ignorada.
    # DATABASE_URI = "postgresql://usuario:senha@localhost:5432/nome_do_banco"

    # URI com informação de senha
    DATABASE_URI = f"postgresql://{USUARIO}:{SENHA}@{HOST}:{PORTA}/{BANCO}?client_encoding=utf8"


    # Configuração do Banco de Dados (SQLALCHEMY)

    SQLALCHEMY_DATABASE_URI = DATABASE_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configurações do Projeto
    CSV_FILE_PATH = os.path.join(BASE_DIR, 'data', 'dadosBasicos_mini.csv')
    TABLE_NAME = 'caixa_dados_basicos'  # ???? O local correto para definir o nome da tabela é dentro do seu arquivo app/models.py, usando o atributo especial __tablename__

    # Diz ao Flask para não converter caracteres não-ASCII (como ç, ã)
    # para sequências de escape (\uXXXX) nas respostas JSON.
    # Ao definir JSON_AS_ASCII = False, o jsonify do Flask fará duas coisas:
    # 1 - Enviará o JSON com os caracteres especiais intactos (ex: "OBJETO": "construção...").
    # 2 - Adicionará automaticamente o cabeçalho Content-Type: application/json; charset=utf-8 à resposta, dizendo ao navegador para interpretar o texto como UTF-8.
    JSON_AS_ASCII = False


    # OBS.: A maneira correta é usar o os.environ.get() para ler as senhas e usuários do ambiente, 
    # usando os seus valores apenas como padrão (fallback) para o desenvolvimento local.
    # USUARIO = os.environ.get('DB_USER') or "postgres"
    # SENHA = os.environ.get('DB_PASSWORD') or "postgres_password" 
    # HOST = os.environ.get('DB_HOST') or "localhost"
    # PORTA = os.environ.get('DB_PORT') or "5432"
    # BANCO = os.environ.get('DB_NAME') or "acompanhamento_obras_db"

    # UPLOADS fora do app/, na raiz do backend/
    UPLOAD_FOLDER = os.path.abspath(
        os.path.join(os.path.dirname(__file__), "..", "uploads", "comentarios")
    )



    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
