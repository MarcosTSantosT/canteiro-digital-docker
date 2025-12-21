import React, { useState } from 'react';
import ResizablePanel from '../ResizablePanel';
import './Panels.css';

const ChatPanel = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Mensagem enviada:', message);
      setMessage('');
    }
  };

  return (
    <ResizablePanel className="full-height">
      <div className="chat-panel">
        <div className="chat-messages">
          <p className="chat-placeholder">Comece a digitar...</p>
        </div>
        <form onSubmit={handleSubmit} className="chat-input-container">
          <input 
            type="text" 
            placeholder="Faça uma pergunta sobre suas fontes..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="chat-button">
            Enviar
          </button>
        </form>
      </div>
    </ResizablePanel>
  );
};

export default ChatPanel;
