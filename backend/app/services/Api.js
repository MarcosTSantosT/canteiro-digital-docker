// src/services/api.js
const API_URL = "http://localhost:5000";

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