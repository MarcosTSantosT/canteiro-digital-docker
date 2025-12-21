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

# 6. Exponha a porta que seu app Flask usa (ex: 5000)
# (Mude se for diferente no seu 'run.py' ou 'config.py')
EXPOSE 5000

# 7. Defina o comando para iniciar sua aplicação
# (Seu 'run.py' parece ser o ponto de entrada)
CMD ["python", "run.py"]