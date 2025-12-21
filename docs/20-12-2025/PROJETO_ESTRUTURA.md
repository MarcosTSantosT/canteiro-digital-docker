# 📁 CANTEIRO DIGITAL - Estrutura do Projeto

## 📋 Visão Geral

Sistema full-stack para monitoramento e gestão de operações de convênios da Caixa Econômica Federal.

**Stack Tecnológico:**
- **Backend:** Python Flask + SQLite
- **Frontend:** React + Vite
- **Autenticação:** OAuth 2.0
- **Containerização:** Docker

---

## 🏗️ Estrutura de Diretórios

```
CANTEIRO_DIGITAL/
├── backend/                    # Servidor Flask
├── frontend/                   # Aplicação React
└── docs/                       # Documentação (opcional)
```

---

## 🔧 Backend (Flask)

```
backend/
│
├── 📄 Arquivos de Configuração
│   ├── .env                    # Variáveis de ambiente (NÃO COMMITAR)
│   ├── .dockerignore           # Exclusões Docker
│   ├── .gitignore              # Exclusões Git
│   ├── config.py               # Configurações da aplicação
│   ├── Dockerfile              # Container backend
│   ├── requirements.txt        # Dependências Python
│   └── run.py                  # Entry point da aplicação
│
├── 📦 app/                     # Aplicação principal
│   ├── __init__.py             # Inicialização Flask
│   ├── routes.py               # Rotas da API
│   │
│   ├── services/               # Camada de serviços
│   │   ├── __init__.py
│   │   ├── Api.js              # Cliente API externo
│   │   ├── db1_service.py      # Serviço banco 1
│   │   ├── db2_service.py      # Serviço banco 2
│   │   ├── db3_service.py      # Serviço banco 3
│   │   └── db4_service.py      # Serviço banco 4
│   │
│   └── uploads/                # Arquivos enviados
│       └── comentarios/        # Anexos de comentários
│
├── 📊 data/                    # Dados da aplicação
│   ├── base_atualizada.csv     # Base atualizada
│   ├── Base_Caixa_Uploaded.csv # Base principal Caixa
│   ├── dadosBasicos.csv        # Dados completos
│   ├── dadosBasicos_medio.csv  # Dataset médio (dev)
│   ├── dadosBasicos_mini.csv   # Dataset mínimo (testes)
│   └── dadosBasicos_mini2.csv  # Dataset mínimo 2
│
├── 🗄️ instance/                # Instância da aplicação
│   └── app.db                  # Banco SQLite (NÃO COMMITAR)
│
├── 📝 sql_schema/              # Schema do banco
│   ├── 01_create_tables.sql   # Criação de tabelas
│   ├── 02_create_indexes.sql  # Índices
│   └── 03_seed_data.sql       # Dados iniciais
│
├── 🔐 flask_session/           # Sessões Flask (NÃO COMMITAR)
│
└── 📤 uploads/                 # Upload temporários
    └── comentarios/            # Anexos
```

---

## ⚛️ Frontend (React)

```
frontend/
│
├── 📄 Arquivos de Configuração
│   ├── .dockerignore           # Exclusões Docker
│   ├── .gitignore              # Exclusões Git
│   ├── .eslintrc.json          # Linting
│   ├── package.json            # Dependências Node
│   ├── package-lock.json       # Lock de versões
│   ├── vite.config.js          # Configuração Vite
│   ├── tailwind.config.js      # Tailwind CSS
│   ├── postcss.config.js       # PostCSS
│   └── index.html              # HTML principal
│
├── 🌐 public/                  # Arquivos públicos
│   ├── favicon-book-open.svg   # Favicon
│   └── index.html              # Template HTML
│
└── 📦 src/                     # Código fonte
    │
    ├── 🎨 Arquivos principais
    │   ├── main.jsx            # Entry point
    │   ├── App.jsx             # Componente raiz
    │   ├── App.css             # Estilos globais
    │   └── index.css           # Reset CSS
    │
    ├── 🖼️ assets/              # Recursos estáticos
    │   └── react.svg
    │
    ├── 🧩 components/          # Componentes React
    │   │
    │   ├── Header/             # Cabeçalho
    │   │   ├── Header.jsx
    │   │   └── Header.css
    │   │
    │   ├── Footer/             # Rodapé
    │   │   ├── Footer.jsx
    │   │   └── Footer.css
    │   │
    │   ├── Panels/             # Painéis principais
    │   │   ├── MenuLateralPanel.jsx        # Menu lateral
    │   │   ├── MenuLateralPanel.css
    │   │   ├── OperacaoPanel.jsx           # Busca de operação
    │   │   ├── OperacaoPanel.css
    │   │   ├── CarteiraPanel.jsx           # Carteira
    │   │   ├── CarteiraPanel.css
    │   │   ├── ComentariosPanel.jsx        # Comentários
    │   │   ├── ComentariosPanel.css
    │   │   ├── AtualizacoesPanel.jsx       # Monitoramento
    │   │   ├── AtualizacoesPanel.css
    │   │   ├── AtualizacoesModal.jsx       # Modal alterações
    │   │   ├── AtualizacoesModal.css
    │   │   ├── UploadPanel.jsx             # Upload de dados
    │   │   ├── UploadPanel.css
    │   │   ├── WelcomePanel.jsx            # Tela inicial
    │   │   ├── WelcomePanel.css
    │   │   ├── ProcessosModal.jsx          # Modal processos
    │   │   ├── ProcessosModal.css
    │   │   ├── ResizablePanel.jsx          # Wrapper
    │   │   ├── ResizablePanel.css
    │   │   └── Panels.css                  # Estilos compartilhados
    │   │
    │   ├── Resizer/            # Redimensionadores
    │   │   ├── Resizer.jsx
    │   │   ├── Resizer.css
    │   │   ├── VerticalResizer.jsx
    │   │   └── HorizontalResizer.jsx
    │   │
    │   ├── UI/                 # Componentes UI
    │   │   ├── SourceItem.jsx
    │   │   └── UI.css
    │   │
    │   └── UserMenu/           # Menu do usuário
    │       ├── UserMenu.jsx
    │       └── UserMenu.css
    │
    ├── 🔐 context/             # Context API
    │   ├── AuthContext.jsx     # Contexto autenticação
    │   ├── AuthProvider.jsx    # Provider autenticação
    │   └── useAuth.js          # Hook customizado
    │
    ├── 📄 pages/               # Páginas
    │   └── OAuthCallback.jsx   # Callback OAuth
    │
    └── 🛠️ utils/               # Utilitários
```

---

## 🎯 Principais Funcionalidades

### **Backend:**
- ✅ API RESTful com Flask
- ✅ Autenticação OAuth 2.0
- ✅ Gerenciamento de convênios
- ✅ Upload de arquivos
- ✅ Sistema de comentários
- ✅ Monitoramento de alterações
- ✅ Múltiplos serviços de banco

### **Frontend:**
- ✅ Interface React moderna
- ✅ Painéis redimensionáveis
- ✅ Busca de operações
- ✅ Visualização de carteira
- ✅ Sistema de comentários com anexos
- ✅ Monitoramento de atualizações
- ✅ Upload de base de dados
- ✅ Menu lateral colapsável

---

## 🔑 Arquivos Importantes

### **Backend:**
| Arquivo | Descrição |
|---------|-----------|
| `run.py` | Entry point da aplicação |
| `config.py` | Configurações gerais |
| `.env` | Variáveis de ambiente (SECRET!) |
| `routes.py` | Definição de rotas da API |
| `app.db` | Banco de dados SQLite |

### **Frontend:**
| Arquivo | Descrição |
|---------|-----------|
| `main.jsx` | Entry point React |
| `App.jsx` | Componente principal |
| `vite.config.js` | Configuração do bundler |
| `package.json` | Dependências e scripts |

---

## 🚀 Scripts Comuns

### **Backend:**
```bash
# Instalar dependências
pip install -r requirements.txt

# Executar servidor
python run.py

# Criar migrations (se usar Flask-Migrate)
flask db init
flask db migrate
flask db upgrade
```

### **Frontend:**
```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build produção
npm run build

# Preview build
npm run preview

# Linting
npm run lint
```

---

## 🐳 Docker

### **Estrutura de containers:**
```yaml
services:
  backend:
    - Porta: 5000
    - Variáveis de ambiente via .env
    
  frontend:
    - Porta: 5173 (dev) / 80 (prod)
    - Nginx ou servidor Vite
```

---

## 📊 Banco de Dados

### **SQLite (Desenvolvimento):**
- Localização: `backend/instance/app.db`
- Schema: `backend/sql_schema/`

### **Principais Tabelas:**
- `operacoes` - Convênios e operações
- `comentarios` - Comentários das operações
- `arquivos` - Anexos de comentários
- `alteracoes` - Histórico de mudanças
- `usuarios` - Dados de usuários

---

## 🔒 Segurança

### **Não commitar:**
- ❌ `.env` (credenciais)
- ❌ `app.db` (dados sensíveis)
- ❌ `flask_session/` (sessões)
- ❌ `node_modules/` (dependências)
- ❌ `uploads/` (arquivos de usuários)

### **Protegido por .gitignore e .dockerignore**

---

## 📝 Convenções de Nomenclatura

### **Backend:**
- Arquivos: `snake_case.py`
- Classes: `PascalCase`
- Funções: `snake_case()`
- Variáveis: `snake_case`

### **Frontend:**
- Componentes: `PascalCase.jsx`
- Arquivos CSS: `PascalCase.css`
- Hooks: `useCamelCase.js`
- Constantes: `UPPER_SNAKE_CASE`

---

## 🎨 Tecnologias Utilizadas

### **Backend:**
- Python 3.11+
- Flask 3.x
- SQLite 3
- Flask-Session
- OAuth2

### **Frontend:**
- React 18
- Vite 5
- Tailwind CSS
- Lucide React (ícones)
- XLSX (export Excel)

---

## 📞 Endpoints Principais da API

```
GET    /api/operacao/:siafi          # Buscar operação
GET    /api/carteira                 # Listar carteira
POST   /api/comentario               # Criar comentário
GET    /api/alteracoes               # Listar alterações
POST   /api/upload                   # Upload de base
GET    /api/auth/login               # Login OAuth
GET    /api/auth/callback            # Callback OAuth
```

---

## 🔄 Fluxo de Dados

```
┌─────────────┐
│   Cliente   │
│  (Browser)  │
└──────┬──────┘
       │
       │ HTTP/HTTPS
       ▼
┌─────────────┐
│   Frontend  │
│   (React)   │
└──────┬──────┘
       │
       │ Fetch API
       ▼
┌─────────────┐
│   Backend   │
│   (Flask)   │
└──────┬──────┘
       │
       │ SQLAlchemy
       ▼
┌─────────────┐
│   SQLite    │
│  (app.db)   │
└─────────────┘
```

---

## 📚 Documentação Adicional

- [Backend API Documentation](./docs/API.md) *(criar)*
- [Frontend Components Guide](./docs/COMPONENTS.md) *(criar)*
- [Deployment Guide](./docs/DEPLOY.md) *(criar)*
- [Contributing Guide](./CONTRIBUTING.md) *(criar)*

---

## 👥 Desenvolvido por

**Equipe de Desenvolvimento CANTEIRO DIGITAL**

---

## 📄 Licença

*[Definir licença apropriada]*

---

**Última atualização:** Dezembro 2024
