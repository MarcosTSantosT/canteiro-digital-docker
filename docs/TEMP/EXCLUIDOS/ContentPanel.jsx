import React from 'react';
import { FileText } from 'lucide-react';
import ResizablePanel from './ResizablePanel';
import './Panels.css';

const ContentPanel = () => {
  return (
    <ResizablePanel className="full-height">
      <div className="content-panel">
        <div className="content-header">
          <span className="content-badge">The Economist</span>
          <h1 className="content-title">Globalização desde 1997</h1>
          <p className="content-meta">2 fontes • 3 minutos</p>
        </div>
        
        <div className="content-body">
          <p className="content-text">
            Esta coleção examina os <span className="content-link">The Economist</span> (em inglês) abrange desde a hiperglobalização dos anos 1990 até a
            mudança para a globalização da pátria. Observa as mudanças nas fluxos comerciais, na geopolítica e no
            desenvolvimento popular. Ela oferece um comentário sobre como essa mobilização se
            desenrolou, suas implicações para economias e políticas em todos os países, o debate sobre seus benefícios e
            tensões geopolíticas. Além de mapa mental para ver comentários sobre tudo, desde a transformação das
            cadeias de suprimentos globais até a rápida do dólar mundial, ou através e no fluxo no Vídeo que
            mostra a evolução da globalização ao longo do tempo. Ao aprofundar em tendências de seu interesse fazendo
            perguntas no conversa guia! Para sua escolha, você também pode obter uma visão geral com um podcast.
          </p>
          
          <p className="content-text-small">
            Assine para ter acesso total à seção semanal, os eps, aos podcasts e muito mais do <span className="content-link">The Economist</span>.
          </p>
        </div>

        <div className="content-actions">
          <button className="action-button">
            <FileText className="action-icon" />
          </button>
          <button className="action-button">👍</button>
          <button className="action-button">👎</button>
        </div>
      </div>
    </ResizablePanel>
  );
};

export default ContentPanel;
