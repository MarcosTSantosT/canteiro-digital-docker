// src/services/api.js

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// VITE_API_URL é definida em no Dockfile do Frontend (Recebe a URL da API do GitHub Actions (Opção B) ou do Docker Compose)
// O Vite vai tentar usar a URL do Azure injetada pelo GitHub Actions.
// Se não encontrar (rodando local), ele usa o localhost.


export async function getUserInfo() {
  const token = localStorage.getItem("jwt_token");
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Erro ao obter informações do usuário");
  return await response.json();
}

export { API_URL };


