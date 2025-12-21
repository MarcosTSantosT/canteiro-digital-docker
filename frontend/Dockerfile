# 1️⃣ Imagem base Node
FROM node:20-alpine

# 2️⃣ Define o diretório de trabalho dentro do container
WORKDIR /app

# 3️⃣ Copia apenas package.json e package-lock.json para instalar dependências
COPY package*.json ./

# 4️⃣ Instala dependências do projeto
RUN npm install

# 5️⃣ Copia todo o código do frontend para dentro do container
COPY . .

# 6️⃣ Expõe a porta do Vite (desenvolvimento)
EXPOSE 5173

# 7️⃣ Comando para rodar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
