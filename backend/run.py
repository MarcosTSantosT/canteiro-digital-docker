# Ponto de Entrada
# executar: python run.py
# Importante não usar app.run() em app/__init__ para evitar loop infinito
# Em produção esse arquivo não é usado, apenas em desenvolvimento

from app import create_app # função definida em app/__init__.py

# Cria a instância do app chamando a "fábrica"
app = create_app()

if __name__ == '__main__':
    # (debug=True é apenas para desenvolvimento)
    app.run(debug=True)

# Acessar aplicação backend por http://localhost:5000
# Necessário estar com PostgreSQL rodando

# Frontend (React Vite) roda em outro servidor (http://localhost:5173)