// src/components/UserMenu/UserMenu.jsx
import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import useAuth from '../../context/useAuth';
import './UserMenu.css';

const UserMenu = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Fecha menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.reload(); // Recarrega para limpar estado
  };

  // Se não estiver autenticado, não mostra nada
  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        className="user-menu-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-avatar">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="user-avatar-image" />
          ) : (
            <User className="user-avatar-icon" />
          )}
        </div>
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email}</span>
        </div>
        <ChevronDown className={`chevron-icon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-avatar-large">
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="user-avatar-image" />
              ) : (
                <User className="user-avatar-icon-large" />
              )}
            </div>
            <div className="user-info-dropdown">
              <p className="user-name-dropdown">{user.name}</p>
              <p className="user-email-dropdown">{user.email}</p>
            </div>
          </div>

          <div className="user-menu-divider"></div>

          <button 
            className="user-menu-item logout"
            onClick={handleLogout}
          >
            <LogOut className="menu-item-icon" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
