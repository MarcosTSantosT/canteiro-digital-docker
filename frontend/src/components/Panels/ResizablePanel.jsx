import React from 'react';
import './ResizablePanel.css';

/* 
wrapper simples que envolve conteúdo em uma <div> com classe CSS resizable-panel

children → Conteúdo a ser envolvido
className → Classes CSS extras (opcional)

Exemplo:
<div class="resizable-panel">
  <h1>Título</h1>
  <p>Conteúdo</p>
</div>

*/
const ResizablePanel = ({ children, className = "" }) => {
  return (
    <div className={`resizable-panel ${className}`}>
      {children}
    </div>
  );
};

export default ResizablePanel;

