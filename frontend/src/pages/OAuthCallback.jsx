// src/pages/OAuthCallback.jsx
import { useEffect, useRef } from 'react';
import useAuth from '../context/useAuth';

export default function OAuthCallback() {
  const { login } = useAuth();
  const processedRef = useRef(false);
  
  // CORREÇÃO DO ERRO: Inicializamos o ref com null para manter a renderização pura.
  // Atribuiremos o valor real dentro do useEffect.
  const startTime = useRef(null); 

  useEffect(() => {
    // Inicializa o timer apenas na montagem do componente
    if (!startTime.current) {
      startTime.current = Date.now();
    }

    const log = (msg) => {
      const elapsed = ((Date.now() - startTime.current) / 1000).toFixed(2);
      console.log(`[${elapsed}s] ${msg}`);
    };

    if (processedRef.current) return;

    log('🔐 INÍCIO DO CALLBACK OAUTH');

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      processedRef.current = true;
      log(`Token recebido: ${token.substring(0, 20)}...`);
      
      try {
        const t1 = Date.now();
        // O login() do AuthProvider agora já processa a 'role'
        const success = login(token); 
        const t2 = Date.now();
        
        log(`⏱️ Login processado em ${((t2 - t1) / 1000).toFixed(2)}s`);

        if (success) {
          log('✅ Sucesso! Redirecionando para Home...');
          
          // Limpa o token da URL por segurança
          window.history.replaceState({}, '', '/');
          
          // Redirecionamento rápido
          setTimeout(() => {
            window.location.href = '/';
          }, 300);
        } else {
          log('❌ Falha no método login do AuthProvider');
          window.location.href = '/?error=auth_failed';
        }
      } catch (error) {
        log(`❌ Erro crítico: ${error.message}`);
        window.location.href = '/?error=exception';
      }
    } else {
      log('⚠️ Nenhum token encontrado na URL');
      window.location.href = '/';
    }
  }, [login]); 

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem',
      backgroundColor: '#f9fafb',
      fontFamily: 'sans-serif'
    }}>
      <div className="spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ color: '#4b5563', fontWeight: '500' }}>Autenticando...</p>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}