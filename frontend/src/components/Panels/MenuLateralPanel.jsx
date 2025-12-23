import React, { useState } from 'react';
import { ChevronLeft, Search, Briefcase, Database, LogIn, AlertTriangle } from 'lucide-react';
import ResizablePanel from './ResizablePanel';
import SourceItem from '../UI/SourceItem';
import './MenuLateralPanel.css';
import { API_URL } from '../../services/Api';

const SourcePanel = ({ onCollapse, onItemClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [sources] = useState([
    { id: 1, title: "Pesquisar operação por id", icon: Search, type: 'action' },
    { id: 2, title: "Pesquisar na carteira", icon: Briefcase, type: 'action' },
    { id: 3, title: "Monitorar atualizações da base", icon: AlertTriangle, type: 'action' },
    { id: 4, title: "Atualizar base de dados", icon: Database, type: 'action' },
    { id: 5, title: "Logar usuário", icon: LogIn, type: 'action' },
  ]);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    if (onCollapse) {
      onCollapse(newState);
    }
  };

  const handleItemClick = (source) => {
    console.log('🔷 [SourcePanel] Item clicado:', source.id, '-', source.title);
    
    // Se for o botão de login (id 5), redireciona para a página de login
    if (source.id === 5) {
      console.log('🔷 [SourcePanel] É botão de LOGIN!');
      console.log('🔷 [SourcePanel] Redirecionando para:', `${API_URL}/api/auth/login`);
      
      try {
        window.location.replace(`${API_URL}/api/auth/login`);
        console.log('🔷 [SourcePanel] Redirecionamento executado');
      } catch (error) {
        console.error('❌ [SourcePanel] Erro ao redirecionar:', error);
      }
      
      return;
    }
    
    // Para os outros itens, chama o callback normal
    console.log('🔷 [SourcePanel] Chamando callback onItemClick...');
    if (onItemClick) {
      onItemClick(source);
    }
  };

  return (
    <ResizablePanel className="full-height">
      {!isCollapsed ? (
        <>
          <div className="panel-body-with-collapse">
            <button className="collapse-button-inline" onClick={toggleCollapse} title="Recolher painel">
              <ChevronLeft className="small-icon" />
            </button>
            <div className="sources-list">
              {sources.map(source => (
                <SourceItem 
                  key={source.id} 
                  title={source.title} 
                  icon={source.icon}
                  onClick={() => handleItemClick(source)}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="collapsed-content">
          <button className="icon-button-collapsed" onClick={toggleCollapse} title="Expandir painel">
            <ChevronLeft className="collapsed-icon rotated" />
          </button>
          <div className="collapsed-items">
            {sources.map(source => {
              const IconComponent = source.icon;
              return (
                <button 
                  key={source.id} 
                  className="collapsed-item-button"
                  title={source.title}
                  onClick={() => handleItemClick(source)}
                >
                  <IconComponent className="collapsed-item-icon" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </ResizablePanel>
  );
};

export default SourcePanel;
