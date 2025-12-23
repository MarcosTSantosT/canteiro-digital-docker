# ------------------------------------------------------------
# --- ESTÁGIO 1: BASE E DESENVOLVIMENTO (dev-stage) ---
# ------------------------------------------------------------

# Usa a imagem estável do Node no Alpine Linux (mais leve)
FROM node:20-alpine AS dev-stage

# Define onde os arquivos ficarão dentro do container
WORKDIR /app

# Recebe a URL da API do GitHub Actions (Opção B) ou do Docker Compose
ARG VITE_API_URL
# Transforma o argumento em variável de ambiente para o Vite ler no build
ENV VITE_API_URL=$VITE_API_URL

# Copia os arquivos de dependências primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala todas as bibliotecas listadas no package.json
RUN npm install

# Copia o restante dos arquivos do seu computador para o container
COPY . .

# Informa que o Vite usará a 5173 (útil para documentação local)
EXPOSE 5173

# Comando padrão caso o container seja iniciado sem especificar outro (uso local)
# O --host garante que o Vite aceite conexões de fora do container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# ------------------------------------------------------------
# --- ESTÁGIO 2: COMPILAÇÃO (build-stage) ---
# ------------------------------------------------------------

# Parte do estágio anterior para gerar os arquivos prontos para a web
FROM dev-stage AS build-stage

# Executa o comando que gera a pasta /dist (arquivos HTML, JS e CSS otimizados)
RUN npm run build


# ------------------------------------------------------------
# --- ESTÁGIO 3: PRODUÇÃO COM NGINX (production-stage) ---
# ------------------------------------------------------------

# Usa o Nginx, um servidor web de alta performance, para entregar o site no Azure
FROM nginx:stable-alpine AS production-stage

# Remove os arquivos pesados do Node e copia apenas o que o site precisa para rodar
# Tira da pasta /app/dist do estágio anterior e joga na pasta pública do Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Porta padrão para tráfego Web que o Azure espera
EXPOSE 80

# Inicia o servidor Nginx em primeiro plano para o container não fechar
CMD ["nginx", "-g", "daemon off;"]