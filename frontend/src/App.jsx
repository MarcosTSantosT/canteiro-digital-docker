import React, { useState, useRef } from 'react';
import './App.css';
import AuthProvider from './context/AuthProvider';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import VerticalResizer from './components/Resizer/VerticalResizer';
import HorizontalResizer from './components/Resizer/HorizontalResizer';
import SourcePanel from './components/Panels/MenuLateralPanel';
import DatabasePanel from './components/Panels/UploadPanel';
import SearchPanel from './components/Panels/OperacaoPanel';
import CarteiraPanel from './components/Panels/CarteiraPanel';
import CommentsPanel from './components/Panels/ComentariosPanel';
import AlteracoesTablePanel from './components/Panels/AtualizacoesPanel';
import WelcomePanel from './components/Panels/WelcomePanel';


function AppContent() {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(288);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [rightWidth, setRightWidth] = useState(320);
  const [currentView, setCurrentView] = useState('default');
  
  const [convenioSiafi, setConvenioSiafi] = useState(null);
  const [dadosOperacao, setDadosOperacao] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  const handleLeftCollapse = (collapsed) => {
    setIsLeftCollapsed(collapsed);
    if (collapsed) {
      setLeftWidth(60);
    } else {
      setLeftWidth(288);
    }
  };

  const handleItemClick = (source) => {
    if (source.id === 1) {
      setCurrentView('search');
      setDadosOperacao(null);
      setConvenioSiafi(null);
      setComentarios([]);
    } else if (source.id === 2) {
      setCurrentView('carteira');
      setDadosOperacao(null);
      setConvenioSiafi(null);
      setComentarios([]);
    } else if (source.id === 3) {
      setCurrentView('alteracoes');
      setDadosOperacao(null);
      setConvenioSiafi(null);
      setComentarios([]);
    } else if (source.id === 4) {
      setCurrentView('database');
    } else {
      setCurrentView('default');
    }
  };

  const handleOperacaoSelecionada = (siafi, comentariosData, operacaoData) => {
    setConvenioSiafi(siafi);
    setDadosOperacao(operacaoData);
    setComentarios(comentariosData || []);
    
    console.log(`✅ Operação carregada: ${siafi}`);
    console.log(`📝 ${comentariosData?.length || 0} comentários`);
  };

const recarregarComentarios = async () => {
    if (!convenioSiafi) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/operacao/${convenioSiafi}`);
      if (response.ok) {
        const data = await response.json();
        setComentarios(data.comentarios || []);
      }
    } catch (error) {
      console.error('Erro ao recarregar comentários:', error);
    }
  };

  const handleLeftResize = (clientX) => {
    if (containerRef.current && !isLeftCollapsed) {
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const newWidth = clientX - containerLeft - 16;
      if (newWidth >= 200 && newWidth <= 500) {
        setLeftWidth(newWidth);
      }
    }
  };

  const handleRightResize = (clientX) => {
    if (containerRef.current) {
      const containerRight = containerRef.current.getBoundingClientRect().right;
      const newWidth = containerRight - clientX - 16;
      if (newWidth >= 200 && newWidth <= 500) {
        setRightWidth(newWidth);
      }
    }
  };

  return (
    <div className="app-container">
      <Header />
      
      <div ref={containerRef} className="main-content">
        <div style={{ width: `${leftWidth}px` }} className="left-column">
          <SourcePanel onCollapse={handleLeftCollapse} onItemClick={handleItemClick} />
        </div>

        <VerticalResizer onResize={!isLeftCollapsed ? handleLeftResize : null} isDisabled={isLeftCollapsed} />

        {currentView === 'database' && (
          <div className="full-width-panel">
            <DatabasePanel />
          </div>
        )}

        {currentView === 'search' && (
          <>
            <div className="full-width-panel">
              <SearchPanel onOperacaoSelecionada={handleOperacaoSelecionada} />
            </div>

            <VerticalResizer onResize={handleRightResize} />

            <div style={{ width: `${rightWidth}px` }} className="right-column">
              <CommentsPanel 
                convenioSiafi={convenioSiafi}
                comentarios={comentarios}
                recarregarComentarios={recarregarComentarios}
                dadosOperacao={dadosOperacao}
              />
            </div>
          </>
        )}

        {currentView === 'carteira' && (
          <>
            <div className="full-width-panel">
              <CarteiraPanel onSelectOperacao={handleOperacaoSelecionada} />
            </div>

            <VerticalResizer onResize={handleRightResize} />

            <div style={{ width: `${rightWidth}px` }} className="right-column">
              <CommentsPanel 
                convenioSiafi={convenioSiafi}
                comentarios={comentarios}
                recarregarComentarios={recarregarComentarios}
                dadosOperacao={dadosOperacao}
              />
            </div>
          </>
        )}

        {currentView === 'alteracoes' && (
          <>
            <div className="full-width-panel">
              <AlteracoesTablePanel onSelectOperacao={handleOperacaoSelecionada} />
            </div>

            <VerticalResizer onResize={handleRightResize} />

            <div style={{ width: `${rightWidth}px` }} className="right-column">
              <CommentsPanel 
                convenioSiafi={convenioSiafi}
                comentarios={comentarios}
                recarregarComentarios={recarregarComentarios}
                dadosOperacao={dadosOperacao}
              />
            </div>
          </>
        )}
    
        {currentView === 'default' && (
          <div className="full-width-panel">
            <WelcomePanel />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
