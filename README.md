<h1 align="center">APP Carteira Digital</h1>

> Sistema para pesquisa e integração de informações da base de obras públicas da União mantida e disponibilizada pela Caixa Econômica Federal.

[![Python](https://img.shields.io/badge/Python-3.14+-3776AB.svg?logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-3.1.2-000000.svg?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791.svg?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**🔗 Acesse em produção:** [app-canteiro-digital.azurewebsites.net/](https://app-canteiro-digital.azurewebsites.net/)

---

## 📋 Sobre o Projeto

Sistema full-stack desenvolvido para facilitar o acesso, análise e monitoramento de informações sobre obras públicas federais gerenciadas pela Caixa Econômica Federal. Oferece ferramentas avançadas de pesquisa, registro de observações, gestão documental e análise de riscos.

### ✨ Principais Funcionalidades

- 🔍 **Pesquisa Estruturada** - Consulta avançada à base de acompanhamento de obras da Caixa
- 💬 **Sistema de Comentários** - Registro de apontamentos e observações sobre empreendimentos
- 📤 **Gestão Documental** - Upload e organização de processos e documentação técnica
- 🚨 **Análise de Riscos** - Criação e gestão de flags sobre riscos socioeconômicos
- 📊 **Auditoria** - Histórico completo e auditável de atualizações da base de dados
- 🔐 **Autenticação Segura** - Login via OAuth Google

---

## 🏗️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────┐
│                    Cliente (Browser)                │
└────────────────────┬────────────────────────────────┘
                     │
                     │ HTTPS
                     ▼
┌─────────────────────────────────────────────────────┐
│         Frontend (React 18 + Vite)                  │
│  • Interface responsiva com Tailwind CSS            │
│  • Painéis redimensionáveis                         │
│  • Lucide React Icons                               │
│  • CSS Modules                                      │
└────────────────────┬────────────────────────────────┘
                     │
                     │ REST API
                     ▼
┌─────────────────────────────────────────────────────┐
│            Backend (Flask 3.1.2)                    │
│  • API RESTful                                      │
│  • OAuth 2.0 Google                                 │
│  • Gerenciamento de arquivos                        │
│  • Processamento de dados                           │
└────────────────────┬────────────────────────────────┘
                     │
                     │ SQL
                     ▼
┌─────────────────────────────────────────────────────┐
│          Database (PostgreSQL 15)                   │
│  • Operações e empreendimentos                      │
│  • Comentários e apontamentos                       │
│  • Documentos técnicos                              │
│  • Flags de risco                                   │
│  • Histórico de alterações                          │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.14+** - Linguagem principal
- **Flask 3.1.2** - Framework web
- **PostgreSQL 15** - Banco de dados relacional
- **Flask-Session** - Gerenciamento de sessões
- **Python-dotenv** - Variáveis de ambiente
- **SQLAlchemy** - ORM

### Frontend
- **React 18** - Biblioteca UI
- **Vite 5** - Build tool e bundler
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Sistema de ícones
- **CSS Modules** - Estilos modulares
- **XLSX** - Export para Excel

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Azure** - Cloud hosting

---

## 📦 Pré-requisitos

### Opção 1: Docker (Recomendado)
- Docker 20.10+
- Docker Compose 2.0+

### Opção 2: Instalação Local
- Python 3.14 ou superior
- Node.js 18 ou superior
- PostgreSQL 15+
- npm ou yarn

---

## ⚙️ Instalação

### 🐳 Opção 1: Docker (Recomendado)

```bash
# 1. Clonar o repositório
git clone https://github.com/MarcosTSantosT/APPCARTEIRADIGITAL.git
cd APPCARTEIRADIGITAL

# 2. Configurar variáveis de ambiente do backend
cp backend/.env.example backend/.env
# Editar backend/.env com suas credenciais OAuth e banco

# 3. Configurar variáveis de ambiente do frontend (opcional)
cp frontend/.env.example frontend/.env

# 4. Subir os containers
docker-compose up -d

# 5. Acessar a aplicação
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
```

---

### 💻 Opção 2: Instalação Local

#### Backend

```bash
# 1. Navegar para o backend
cd backend

# 2. Criar ambiente virtual
python -m venv venv

# 3. Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 4. Instalar dependências
pip install -r requirements.txt

# 5. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# 6. Configurar banco de dados PostgreSQL
# Criar banco: createdb carteira_digital
# Executar migrations (se houver)

# 7. Rodar servidor
python run.py
# Backend estará em http://localhost:5000
```

#### Frontend

```bash
# 1. Navegar para o frontend (em outro terminal)
cd frontend

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente (opcional)
cp .env.example .env
# Editar .env se necessário

# 4. Rodar em modo desenvolvimento
npm run dev
# Frontend estará em http://localhost:5173

# OU build para produção
npm run build
npm run preview
```

---

## 🔐 Configuração OAuth Google

Este projeto requer autenticação OAuth do Google. Siga os passos:

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione existente
3. Vá em **APIs & Services** > **Credentials**

### 2. Configurar OAuth 2.0

1. Clique em **Create Credentials** > **OAuth client ID**
2. Escolha **Web application**
3. Configure:
   - **Name:** APP Carteira Digital
   - **Authorized JavaScript origins:**
     - `http://localhost:5173` (desenvolvimento)
     - `https://app-canteiro-digital.azurewebsites.net/` (produção)
   - **Authorized redirect URIs:**
     - `http://localhost:5000/api/auth/callback` (desenvolvimento)
     - `http://www.enderecotemporario.com.br/api/auth/callback` (produção)

### 3. Obter Credenciais

1. Copie o **Client ID**
2. Copie o **Client Secret**
3. Adicione ao arquivo `.env` do backend:

```bash
OAUTH_CLIENT_ID=seu-client-id-aqui.apps.googleusercontent.com
OAUTH_CLIENT_SECRET=seu-client-secret-aqui
```

---

## 🔧 Configuração de Ambiente

### Backend (.env)

```bash
# Flask
SECRET_KEY=sua-chave-secreta-forte-aleatoria-aqui
FLASK_ENV=development
FLASK_DEBUG=True

# Database PostgreSQL
DATABASE_URL=postgresql://usuario:senha@localhost:5432/carteira_digital

# OAuth Google
OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
OAUTH_CLIENT_SECRET=seu-client-secret
OAUTH_REDIRECT_URI=http://localhost:5000/api/auth/callback

# Session
SESSION_TYPE=filesystem
PERMANENT_SESSION_LIFETIME=3600

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env) - Opcional

```bash
# API Backend
VITE_API_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000/api

# OAuth
VITE_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com

# App
VITE_APP_NAME=APP Carteira Digital
VITE_APP_VERSION=1.0.0
```

---

## 📁 Estrutura do Projetos

```
APPCARTEIRADIGITAL/
│
├── backend/                      # Servidor Flask
│   ├── app/                      # Aplicação principal
│   │   ├── services/             # Camada de serviços
│   │   │   ├── db1_service.py
│   │   │   ├── db2_service.py
│   │   │   ├── db3_service.py
│   │   │   └── db4_service.py
│   │   ├── routes.py            # Rotas da API
│   │   └── __init__.py
│   ├── data/                    # Dados CSV
│   ├── instance/                # Instância da aplicação
│   │   └── app.db              # SQLite (dev)
│   ├── sql_schema/              # Schema SQL
│   │   ├── 01_create_tables.sql
│   │   ├── 02_create_indexes.sql
│   │   └── 03_seed_data.sql
│   ├── uploads/                 # Arquivos enviados
│   │   └── comentarios/
│   ├── .env                     # Variáveis de ambiente
│   ├── .gitignore
│   ├── config.py                # Configurações
│   ├── Dockerfile
│   ├── requirements.txt         # Dependências Python
│   ├── run.py                   # Entry point localhost
│   └── wsgi.py                  # Entry point produção
│
├── frontend/                    # Aplicação React
│   ├── public/
│   │   ├── favicon-book-open.svg
│   │   └── index.html
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Panels/         # Painéis principais
│   │   │   │   ├── MenuLateralPanel.jsx
│   │   │   │   ├── OperacaoPanel.jsx
│   │   │   │   ├── CarteiraPanel.jsx
│   │   │   │   ├── ComentariosPanel.jsx
│   │   │   │   ├── AtualizacoesPanel.jsx
│   │   │   │   ├── UploadPanel.jsx
│   │   │   │   └── WelcomePanel.jsx
│   │   │   ├── Resizer/        # Redimensionadores
│   │   │   ├── UI/             # Componentes UI
│   │   │   └── UserMenu/       # Menu usuário
│   │   ├── context/            # Context API
│   │   │   ├── AuthContext.jsx
│   │   │   ├── AuthProvider.jsx
│   │   │   └── useAuth.js
│   │   ├── pages/              # Páginas
│   │   │   └── OAuthCallback.jsx
│   │   ├── App.jsx             # Componente raiz
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Estilos globais
│   ├── .env                    # Variáveis de ambiente
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json            # Dependências Node
│   ├── tailwind.config.js      # Configuração Tailwind
│   └── vite.config.js          # Configuração Vite
│
├── docker-compose.yml          # Orquestração Docker
├── README.md                   # Este arquivo
└── LICENSE                     # Licença MIT
```

---

## 🎯 Como Usar

### 1️⃣ Fazer Login

1. Acesse `http://localhost:5173` (ou URL de produção)
2. Clique em **"Logar usuário"** no menu lateral
3. Autentique com sua conta Google
4. Aguarde redirecionamento

### 2️⃣ Pesquisar Operação

1. No menu lateral, clique em **"Pesquisar operação por id"**
2. Digite o número do convênio SIAFI
3. Pressione Enter ou clique em Buscar
4. Visualize os detalhes da operação no painel central

### 3️⃣ Gerenciar Carteira

1. Clique em **"Pesquisar na carteira"**
2. Use os filtros avançados:
   - Por UF
   - Por município
   - Por status
   - Por período
3. Selecione uma operação para ver detalhes completos

### 4️⃣ Adicionar Comentários

1. Selecione uma operação (via busca ou carteira)
2. No painel direito (Comentários), clique em **"Adicionar Comentário"**
3. Preencha:
   - Tipo do comentário
   - Relevância
   - Texto do comentário
4. Anexe arquivos se necessário (arraste e solte ou clique)
5. Clique em **"Salvar"**

### 5️⃣ Criar Flags de Risco

1. Selecione uma operação
2. No painel de comentários, escolha tipo **"Alerta"** ou **"Risco"**
3. Defina a relevância (Baixa, Média, Alta, Crítica)
4. Descreva o risco identificado
5. Salve - a flag aparecerá destacada

### 6️⃣ Monitorar Alterações

1. Clique em **"Monitorar atualizações da base"**
2. Visualize todas as alterações recentes na base
3. Filtre por:
   - Período (última semana, mês, etc)
   - Tipo de alteração
   - Operação específica
4. Exporte relatório se necessário

### 7️⃣ Upload de Documentação

1. Clique em **"Atualizar base de dados"**
2. Arraste arquivo CSV ou clique para selecionar
3. Valide os dados
4. Confirme o upload
5. Aguarde processamento

---

## 🛠️ Scripts Disponíveis

### Backend

```bash
# Rodar servidor de desenvolvimento
python run.py

# Criar banco de dados (PostgreSQL)
python -c "from app import db; db.create_all()"

# Executar migrations
flask db upgrade

# Rodar testes
pytest

# Linting
flake8 app/
```

### Frontend

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linting
npm run lint

# Formatar código
npm run format

# Type checking (se usar TypeScript)
npm run type-check
```

### Docker

```bash
# Iniciar containers
docker-compose up -d

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Ver logs de serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Rebuild containers
docker-compose up -d --build

# Executar comando no container
docker-compose exec backend python -c "from app import db; db.create_all()"

# Acessar shell do container
docker-compose exec backend bash
docker-compose exec frontend sh
```

---

## 📊 API Endpoints

### Autenticação

```http
GET  /api/auth/login              # Iniciar OAuth Google
GET  /api/auth/callback           # Callback OAuth
POST /api/auth/logout             # Logout
GET  /api/auth/user               # Informações do usuário autenticado
```

### Operações e Convênios

```http
GET  /api/operacao/:siafi         # Buscar operação por SIAFI
GET  /api/carteira                # Listar carteira completa
GET  /api/carteira?uf=XX          # Filtrar por UF
GET  /api/carteira?municipio=YY   # Filtrar por município
```

### Comentários e Apontamentos

```http
GET    /api/comentarios/:siafi    # Listar comentários de operação
POST   /api/comentario            # Criar novo comentário
PUT    /api/comentario/:id        # Atualizar comentário
DELETE /api/comentario/:id        # Deletar comentário
```

### Alterações e Auditoria

```http
GET  /api/alteracoes              # Listar todas alterações
GET  /api/alteracoes/:siafi       # Alterações de operação específica
GET  /api/alteracoes?periodo=7d   # Filtrar por período
```

### Upload e Arquivos

```http
POST /api/upload                  # Upload de base CSV
GET  /api/arquivo/:id             # Download de arquivo
POST /api/arquivo                 # Upload de documento técnico
```

### Flags de Risco

```http
GET    /api/flags                 # Listar todas flags
GET    /api/flags/:siafi          # Flags de operação específica
POST   /api/flag                  # Criar nova flag
PUT    /api/flag/:id              # Atualizar flag
DELETE /api/flag/:id              # Remover flag
```

---

## 🐳 Docker e Deploy

### Configuração Docker Compose

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/carteira
    depends_on:
      - db
    volumes:
      - ./backend/uploads:/app/uploads

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:5000
    depends_on:
      - backend

  db:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=carteira_digital
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=senha_forte
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy no Azure

O projeto está configurado para deploy no Azure. Passos básicos:

1. **Azure App Service** para backend e frontend
2. **Azure Database for PostgreSQL** para banco de dados
3. **Azure Blob Storage** para arquivos (uploads)
4. **Azure AD B2C** ou OAuth Google para autenticação

Consulte a documentação de deploy específica em `/docs/DEPLOY.md` (a criar).

---

## 🔧 Desenvolvimento

### Convenções de Código

#### Backend (Python)
- **Style Guide:** PEP 8
- **Nomenclatura:**
  - Funções e variáveis: `snake_case`
  - Classes: `PascalCase`
  - Constantes: `UPPER_SNAKE_CASE`
- **Docstrings:** Google style
- **Type hints:** Usar sempre que possível

#### Frontend (JavaScript/React)
- **Style Guide:** Airbnb JavaScript Style Guide
- **Nomenclatura:**
  - Componentes: `PascalCase`
  - Funções: `camelCase`
  - Constantes: `UPPER_SNAKE_CASE`
  - Arquivos CSS: `PascalCase.css`
- **Linting:** ESLint + Prettier
- **Hooks:** Prefixo `use`

### Git Workflow

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Tipos de commit
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas gerais

# Exemplos
git commit -m "feat: adicionar busca por município"
git commit -m "fix: corrigir erro no upload de arquivos"
git commit -m "docs: atualizar README com instruções OAuth"
```

### Branches

- `main` - Produção
- `develop` - Desenvolvimento
- `feature/*` - Novas funcionalidades
- `fix/*` - Correções
- `hotfix/*` - Correções urgentes em produção

---

## 🧪 Testes

```bash
# Backend - Testes unitários
cd backend
pytest tests/

# Backend - Com cobertura
pytest --cov=app tests/

# Frontend - Testes unitários
cd frontend
npm run test

# Frontend - Testes E2E (se configurados)
npm run test:e2e

# Frontend - Cobertura
npm run test:coverage
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/MinhaFeature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'feat: adicionar MinhaFeature'
   ```
4. Push para a branch:
   ```bash
   git push origin feature/MinhaFeature
   ```
5. Abra um Pull Request

### Diretrizes

- Siga as convenções de código
- Adicione testes para novas funcionalidades
- Atualize a documentação se necessário
- Mantenha commits pequenos e focados
- Escreva mensagens de commit claras

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2024 Marcos Tiburcio dos Santos Tabosa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👥 Autor

**Marcos Tiburcio dos Santos Tabosa**
- GitHub: [@MarcosTSantosT](https://github.com/MarcosTSantosT)
- e-mail: [Marcos Tibúrcio dos Santos](marcos.tiburcio@uol.com.br)

---

## 🙏 Agradecimentos

- Caixa Econômica Federal pela disponibilização da base de dados
- Comunidade Open Source
- Contribuidores do projeto

---

## 📞 Suporte

Para suporte, questões ou sugestões:

- **Issues:** [GitHub Issues](https://github.com/MarcosTSantosT/APPCARTEIRADIGITAL/issues)
- **Email:** [Marcos Tibúrcio dos Santos](marcos.tiburcio@uol.com.br)
- **Documentação:** [Wiki do projeto](https://github.com/MarcosTSantosT/APPCARTEIRADIGITAL/wiki)

---

---

## 📈 Status do Projeto

✅ **Em Produção**

- **Ambiente:** Azure
- **URL:** https://app-canteiro-digital.azurewebsites.net/
- **Status:** Online
- **Última atualização:** Dezembro 2025

---

## 🔒 Segurança

Para reportar vulnerabilidades de segurança, por favor:

1. **NÃO** abra uma issue pública
2. Envie um email para [marcos.tiburcio@uol.com.br]
3. Descreva a vulnerabilidade em detalhes
4. Aguarde resposta em até 48h

---

<p align="center">
  Desenvolvido por <a href="https://github.com/MarcosTSantosT">Marcos Tiburcio</a>
</p>

<p align="center">
  <sub>APP Carteira Digital © 2025</sub>
</p>
