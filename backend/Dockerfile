# backend/Dockerfile

# 1. Use uma imagem base do Python (versão 3.11)
FROM python:3.14

# 2. Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# 3. Copie APENAS o arquivo de requisitos primeiro
# (Isso otimiza o cache do Docker)
COPY requirements.txt .

# 4. Instale as dependências (é aqui que o flask_sqlalchemy é instalado)
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copie todo o resto do código do backend para o contêiner
COPY . .

############################################################
# Rodando local em desenvolvimento
############################################################
# Descomente as linhas abaixo para rodar localmente em desenvolvimento
# 6. Exponha a porta que seu app Flask usa (ex: 5000)
# EXPOSE 5000
# 7. Defina o comando para iniciar sua aplicação
# CMD ["python", "run.py"]


############################################################
# Rodando AZURE (produção)
############################################################
# Descomente as linhas abaixo para rodar localmente em desenvolvimento
# 6. Exponha a porta que seu app Flask usa (ex: 5000)
EXPOSE 8000
# 7. Defina o comando para iniciar sua aplicação
#CMD ["gunicorn", "-b", "0.0.0.0:8000", "wsgi:app"]
##CMD ["sh", "-c", "gunicorn --bind 0.0.0.0:${PORT:-8000} --workers 1 --timeout 120 wsgi:app"]
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "1", "--timeout", "120", "wsgi:app"]

# PARA CONSTRUIR E RODAR LOCALMENTE:
# docker build -t imagem .
# docker run -p 5000:8000 imagem