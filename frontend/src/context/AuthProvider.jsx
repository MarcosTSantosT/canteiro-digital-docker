// src/context/AuthProvider.jsx
import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  // Inicialização preguiçosa: o estado já nasce com os dados ou nulo.
  // Isso elimina a necessidade de carregar o usuário no useEffect ao montar o componente.
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const now = Math.floor(Date.now() / 1000);

      // Se já estiver expirado no momento que abre o app, limpa e retorna null
      if (payload.exp && payload.exp < now) {
        localStorage.removeItem("jwt_token");
        return null;
      }

      return {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture || null,
        role: payload.role || 'user', // Garante a role vinda do backend
      };
    } catch {
      localStorage.removeItem("jwt_token");
      return null;
    }
  });

  const [loading] = useState(false);

  const login = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userData = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture || null,
        role: payload.role || 'user',
      };
      localStorage.setItem("jwt_token", token);
      setUser(userData);
      return true;
    } catch {
      return false;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("jwt_token");
    setUser(null);
  }, []);

  const isAuthenticated = useCallback(() => {
    return user !== null;
  }, [user]);

  const getToken = useCallback(() => {
    return localStorage.getItem("jwt_token");
  }, []);

  // SOLUÇÃO DO ERRO: Removida a verificação síncrona que causava cascading renders.
  // O useEffect agora apenas escuta eventos externos ou mudanças de longo prazo.
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "jwt_token" && e.newValue === null) {
        logout();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [logout]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated,
        getToken,
        loading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}