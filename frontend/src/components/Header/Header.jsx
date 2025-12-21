// src/components/Header/Header.jsx
import React, { useEffect } from 'react';
import { BookOpen, User, LogOut } from 'lucide-react';
import useAuth from '../../context/useAuth';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();

  useEffect(() => {
    console.log("📊 [Header] Estado de autenticação:", {
      loading,
      user,
      isAuthenticated: isAuthenticated()
    });
  }, [user, loading]);

  const handleLogout = () => {
    console.log("🔴 [Header] Botão de logout clicado");
    if (window.confirm('Deseja realmente sair?')) {
      console.log("🔴 [Header] Logout confirmado pelo usuário");
      logout();
    } else {
      console.log("⚪ [Header] Logout cancelado pelo usuário");
    }
  };

  console.log("🎨 [Header] Renderizando - Usuário logado?", isAuthenticated());

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <BookOpen className="logo-icon" />
        </div>
        <div className="header-title-section">
          <h1 className="header-title">APP CANTEIRO DIGITAL</h1>
          <p className="header-subtitle">Aplicação para monitoramento de obras públicas da carteira da Caixa Econômica Federal</p>
        </div>
      </div>
      
      <div className="header-right">
        <div className="auth-indicator">
          {loading ? (
            <div className="auth-loading">Carregando...</div>
          ) : isAuthenticated() ? (
            <div className="auth-user-badge">
              <div className="auth-user-avatar-placeholder">
                <User size={16} />
              </div>
              <div className="auth-user-info">
                <span className="auth-user-name">{user?.name || 'Usuário'}</span>
                <span className="auth-user-email">{user?.email}</span>
              </div>
              <button 
                className="auth-logout-button"
                onClick={handleLogout}
                title="Sair"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-not-logged">
              <div className="auth-status-icon">
                <User size={16} />
              </div>
              <span className="auth-status-text">Usuário não logado</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
