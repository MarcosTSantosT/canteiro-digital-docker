# Notebook App - Frontend

Aplicação React inspirada no NotebookLM com painéis redimensionáveis e interface moderna.

## 🚀 Tecnologias

- React 18
- Tailwind CSS
- Lucide React (ícones)
- CSS Modules

## 📦 Instalação

```bash
# Criar o projeto
npx create-react-app frontend
cd frontend

# Instalar dependências
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer

# Inicializar Tailwind CSS
npx tailwindcss init -p
```

## 🗂️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header/          # Cabeçalho da aplicação
│   │   ├── Footer/          # Rodapé
│   │   ├── Resizer/         # Componentes de redimensionamento
│   │   ├── Panels/          # Painéis principais
│   │   └── UI/              # Componentes de interface
│   ├── App.js               # Componente principal
│   └── index.js             # Entrada da aplicação
└── public/                  # Arquivos estáticos
```

## 🎨 Recursos

- ✅ Layout com 3 colunas redimensionáveis
- ✅ Painéis com divisão horizontal redimensionável
- ✅ Design moderno com cantos arredondados
- ✅ Componentes reutilizáveis e modulares
- ✅ Separação clara de responsabilidades
- ✅ CSS organizado por componente

## 🖥️ Como Executar

```bash
# Desenvolvimento
npm start

# Build para produção
npm run build

# Testes
npm test
```

## 📝 Funcionalidades

### Painéis

1. **Painel Esquerdo (Fontes)**
   - Lista de documentos com checkboxes
   - Redimensionável horizontalmente

2. **Painel Central Superior (Conteúdo)**
   - Visualização do conteúdo principal
   - Redimensionável vertical e horizontalmente

3. **Painel Central Inferior (Chat)**
   - Interface de conversação
   - Campo de entrada de mensagens

4. **Painel Direito Superior (Estudo)**
   - Guias de estudo e recursos
   - Redimensionável vertical e horizontalmente

5. **Painel Direito Inferior (Recursos)**
   - Quiz e flashcards
   - Materiais complementares

### Redimensionamento

- **Separadores Verticais**: Arraste entre colunas para ajustar largura
- **Separadores Horizontais**: Arraste para ajustar altura dos painéis
- **Limites**: Largura mínima/máxima de 200px-500px; altura 30%-70%

## 🎯 Próximos Passos

- [ ] Integração com backend
- [ ] Persistência de preferências de layout
- [ ] Sistema de chat funcional
- [ ] Upload de documentos
- [ ] Modo escuro
- [ ] Responsividade mobile

## 📄 Licença

Este projeto é livre para uso educacional e pessoal.
