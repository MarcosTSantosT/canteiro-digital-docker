# Guia Completo: Implementação OAuth Google no Projeto

## 🎯 Objetivo

Implementar autenticação OAuth do Google com JWT no projeto **APP CANTEIRO DIGITAL**, permitindo que usuários façam login com suas contas Google.

## 📋 Estrutura de Arquivos

```
src/
├── context/
│   ├── AuthContext.jsx       ← Context do React
│   ├── AuthProvider.jsx      ← Provider com lógica de auth
│   └── useAuth.js             ← Hook personalizado
├── utils/
│   └── authFetch.js           ← Fetch com autenticação
├── pages/
│   └── OAuthCallback.jsx      ← Página de callback OAuth
├── components/
│   ├── Header/
│   │   └── Header.jsx         ← Header com UserMenu
│   └── UserMenu/
│       ├── UserMenu.jsx       ← Menu do usuário
│       └── UserMenu.css       ← Estilos do menu
└── main.jsx                   ← Entry point com routing
```

## 🔄 Fluxo Completo de Autenticação

### 1. Usuário Clica em "Logar usuário"

**SourcePanel.jsx (já implementado):**
```javascript
const handleItemClick = (source) => {
  if (source.id === 4) {
    window.location.replace("http://localhost:5000/api/auth/login");
    return;
  }
  // ... resto do código
};
```

### 2. Backend Redireciona para Google

**Backend: routes.py - /api/auth/login:**
```python
@bp.route("/api/auth/login")
def login():
    redirect_uri = url_for("routes.auth_callback", _external=True)
    
    # Gera state manual para segurança
    state = uuid4().hex
    session['oauth_state'] = state
    session.modified = True
    
    # Redireciona para Google OAuth
    return oauth.google.authorize_redirect(
        redirect_uri=redirect_uri,
        state=state
    )
```

**O que acontece:**
- Usuário é redirecionado para: `https://accounts.google.com/o/oauth2/auth?...`
- Google mostra tela de consentimento
- Usuário autoriza o app

### 3. Google Retorna para Backend

**Backend: routes.py - /api/auth/callback:**
```python
@bp.route("/api/auth/callback")
def auth_callback():
    # Obtém token do Google
    token = oauth.google.authorize_access_token()
    
    # Busca dados do usuário
    resp = oauth.google.get("userinfo")
    user_info = resp.json()
    
    # Cria JWT interno
    payload = {
        'sub': user_info['sub'],
        'name': user_info.get('name'),
        'email': user_info.get('email'),
        'exp': int((datetime.now(timezone.utc) + timedelta(hours=2)).timestamp())
    }
    
    JWT_SECRET = current_app.config["JWT_SECRET"]
    encoded_jwt = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    
    # Redireciona para frontend com token
    return redirect(f"http://localhost:5173/api/auth/callback?token={encoded_jwt}")
```

### 4. Frontend Captura Token

**OAuthCallback.jsx:**
```javascript
useEffect(() => {
  // Captura token da URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  
  if (token) {
    // Faz login
    const success = login(token);
    
    if (success) {
      // Redireciona para home
      window.location.href = "/";
    }
  }
}, [login]);
```

### 5. AuthProvider Armazena Usuário

**AuthProvider.jsx:**
```javascript
const login = (token) => {
  // Salva token
  localStorage.setItem("jwt_token", token);
  
  // Decodifica payload
  const payload = JSON.parse(atob(token.split(".")[1]));
  
  // Atualiza estado
  setUser({
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: payload.picture || null,
  });
  
  return true;
};
```

### 6. UserMenu Exibe Usuário

**UserMenu.jsx:**
```javascript
const { user, logout, isAuthenticated } = useAuth();

if (!isAuthenticated()) {
  return null; // Não mostra nada se não logado
}

return (
  <div className="user-menu-container">
    <button className="user-menu-button">
      <img src={user.picture} alt={user.name} />
      <span>{user.name}</span>
    </button>
    {/* Dropdown com opção de logout */}
  </div>
);
```

## 🛠️ Passo a Passo de Instalação

### 1. Instalar Dependências

```bash
npm install react-router-dom
```

### 2. Criar Estrutura de Pastas

```bash
mkdir -p src/context
mkdir -p src/utils
mkdir -p src/pages
mkdir -p src/components/UserMenu
```

### 3. Copiar Arquivos

**Context:**
- `AuthContext.jsx` → `src/context/`
- `AuthProvider.jsx` → `src/context/`
- `useAuth.js` → `src/context/`

**Utils:**
- `authFetch.js` → `src/utils/`

**Pages:**
- `OAuthCallback.jsx` → `src/pages/`

**Components:**
- `UserMenu.jsx` → `src/components/UserMenu/`
- `UserMenu.css` → `src/components/UserMenu/`
- `Header.jsx` → `src/components/Header/` (substituir)

**Root:**
- `main.jsx` → `src/` (substituir)

### 4. Verificar Configuração Backend

**Arquivo: config.py**
```python
# OAuth Google
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
JWT_SECRET = os.environ.get("JWT_SECRET", "chave_jwt_dev")
```

**Arquivo: .env**
```env
GOOGLE_CLIENT_ID=seu_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu_client_secret
JWT_SECRET=sua_chave_secreta_jwt
```

### 5. Configurar OAuth Google Console

1. Acesse: https://console.cloud.google.com/
2. Crie um projeto (ou selecione existente)
3. Vá em: **APIs e Serviços** → **Credenciais**
4. Crie **OAuth 2.0 Client ID**:
   - Tipo: **Aplicativo da Web**
   - URIs de redirecionamento autorizados:
     - `http://localhost:5000/api/auth/callback`
   - Origens JavaScript autorizadas:
     - `http://localhost:5173`
     - `http://localhost:5000`

5. Copie **Client ID** e **Client Secret** para o `.env`

## 🧪 Testando a Implementação

### 1. Iniciar Backend

```bash
python app.py
```

**Verificar no terminal:**
```
CLIENTE ID CARREGADO: 123456789...
SECRET CARREGADO: GOCSPX-...
 * Running on http://127.0.0.1:5000
```

### 2. Iniciar Frontend

```bash
npm run dev
```

**Deve abrir em:** `http://localhost:5173`

### 3. Testar Login

1. Clique no menu esquerdo: **"Logar usuário"**
2. Será redirecionado para Google
3. Faça login com sua conta Google
4. Autorize o aplicativo
5. Será redirecionado de volta para o app
6. **UserMenu** deve aparecer no Header com seu nome e foto

### 4. Verificar Estado

**DevTools → Application → Local Storage → localhost:5173:**
```
jwt_token: eyJhbGciOiJIUzI1NiIs...
```

**Console do navegador:**
```
Usuário autenticado: Seu Nome
```

### 5. Testar Logout

1. Clique no **UserMenu** (seu nome no Header)
2. Clique em **"Sair"**
3. Token deve ser removido
4. UserMenu deve desaparecer
5. Página recarrega

## 🔐 Protegendo Rotas

### Decorator @jwt_required no Backend

**Já implementado em routes.py:**
```python
@bp.route("/api/auth/me")
@jwt_required
def me():
    return jsonify({
        "id": g.user["sub"],
        "name": g.user["name"],
        "email": g.user["email"]
    })
```

### Usando fetchWithAuth no Frontend

**Exemplo:**
```javascript
import { fetchWithAuth } from '../utils/authFetch';

// Requisição autenticada
const response = await fetchWithAuth('http://localhost:5000/api/auth/me');
const userData = await response.json();
```

**Ou com helper:**
```javascript
import { fetchJSONWithAuth } from '../utils/authFetch';

// Mais simples
const userData = await fetchJSONWithAuth('http://localhost:5000/api/auth/me');
```

## 📊 Estrutura do JWT

### Token JWT Completo

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwiZXhwIjoxNzM2NzgwNDAwfQ.signature
```

### Partes do Token

**Header (parte 1):**
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload (parte 2):**
```json
{
  "sub": "google_user_id_123456",
  "name": "Seu Nome",
  "email": "seuemail@gmail.com",
  "picture": "https://lh3.googleusercontent.com/...",
  "exp": 1736780400
}
```

**Signature (parte 3):**
- Assinado com `JWT_SECRET`
- Garante integridade do token

## 🎨 Personalizando UserMenu

### Adicionar Foto Circular

**UserMenu.css:**
```css
.user-avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
```

### Adicionar Menu Items

**UserMenu.jsx:**
```javascript
<button className="user-menu-item">
  <Settings className="menu-item-icon" />
  Configurações
</button>

<button className="user-menu-item">
  <User className="menu-item-icon" />
  Perfil
</button>

<div className="user-menu-divider"></div>

<button className="user-menu-item logout" onClick={handleLogout}>
  <LogOut className="menu-item-icon" />
  Sair
</button>
```

## ⚠️ Troubleshooting

### Erro: "Token ausente"

**Causa:** JWT não está sendo enviado
**Solução:** Use `fetchWithAuth` ao invés de `fetch` direto

### Erro: "Token expirado"

**Causa:** JWT expirou (2 horas)
**Solução:** Sistema faz logout automático, usuário deve logar novamente

### Erro: "redirect_uri_mismatch"

**Causa:** URI de callback não configurada no Google Console
**Solução:** 
1. Google Cloud Console → Credenciais
2. Editar OAuth Client
3. Adicionar: `http://localhost:5000/api/auth/callback`

### UserMenu não aparece

**Verificar:**
1. ✅ Token em localStorage?
   - DevTools → Application → Local Storage
2. ✅ AuthProvider envolve App?
   - Ver `main.jsx`
3. ✅ Header importa UserMenu?
   - Ver `Header.jsx`

### Estado do usuário não persiste

**Causa:** AuthProvider não carrega token do localStorage
**Solução:** Verificar `useEffect` no `AuthProvider.jsx`:
```javascript
useEffect(() => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    // decodifica e atualiza user
  }
}, []);
```

## 📝 Checklist Final

### Backend:
- [ ] `.env` com `GOOGLE_CLIENT_ID` e `GOOGLE_CLIENT_SECRET`
- [ ] Rotas OAuth funcionando (`/api/auth/login`, `/api/auth/callback`)
- [ ] JWT_SECRET configurado
- [ ] Backend rodando em `http://localhost:5000`

### Google Console:
- [ ] Projeto criado
- [ ] OAuth Client ID configurado
- [ ] URIs de redirecionamento adicionados
- [ ] Credenciais copiadas para `.env`

### Frontend:
- [ ] `react-router-dom` instalado
- [ ] Estrutura de pastas criada
- [ ] Arquivos copiados para lugares corretos
- [ ] `main.jsx` atualizado com `AuthProvider` e rotas
- [ ] `Header.jsx` atualizado com `UserMenu`
- [ ] Frontend rodando em `http://localhost:5173`

### Testes:
- [ ] Clicar em "Logar usuário" redireciona para Google
- [ ] Após login, volta para aplicação
- [ ] UserMenu aparece no Header
- [ ] Nome e foto do usuário corretos
- [ ] Dropdown do UserMenu funciona
- [ ] Logout remove token e recarrega página

## 🚀 Resultado Final

### Antes do Login:
```
Header: [Logo] [Title] [Search] [Settings]
```

### Depois do Login:
```
Header: [Logo] [Title] [Search] [Settings] [UserMenu com foto e nome]
```

### UserMenu Dropdown:
```
┌─────────────────────────┐
│ 👤 Seu Nome             │
│    seuemail@gmail.com   │
├─────────────────────────┤
│ 🚪 Sair                 │
└─────────────────────────┘
```

## ✨ Próximos Passos (Opcional)

1. **Persistir preferências do usuário**
2. **Adicionar página de perfil**
3. **Proteger rotas sensíveis**
4. **Implementar refresh token**
5. **Adicionar outros providers (GitHub, Microsoft)**
6. **Melhorar tratamento de erros**
7. **Adicionar loading states**
8. **Implementar rate limiting**

---

✅ **Com esta implementação, seu app terá autenticação OAuth Google completa e funcional!** 🎉
