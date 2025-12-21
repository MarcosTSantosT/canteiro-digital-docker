import React from 'react';
import { X, FileText, AlertCircle } from 'lucide-react';
import './ProcessosModal.css';

const ProcessosModal = ({ isOpen, onClose, processos, totalProcessos, convenioSiafi, isLoading }) => {
  if (!isOpen) return null;

  // Formatar data
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Renderizar campo
  const renderField = (label, value) => {
    return (
      <div className="processo-field">
        <div className="processo-label">{label}:</div>
        <div className="processo-value">{value || '-'}</div>
      </div>
    );
  };

  return (
    <div className="processos-modal-overlay" onClick={onClose}>
      <div className="processos-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header do Modal */}
        <div className="processos-modal-header">
          <div className="processos-modal-title-section">
            <FileText className="processos-modal-icon" />
            <h2 className="processos-modal-title">Processos Relacionados</h2>
          </div>
          <span className="processos-modal-convenio">Convênio: {convenioSiafi || '-'}</span>
          <button 
            className="processos-modal-close"
            onClick={onClose}
            title="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="processos-modal-body">
          
          {/* Loading State */}
          {isLoading && (
            <div className="processos-loading">
              <div className="processos-loading-spinner"></div>
              <p>Carregando processos...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && (!processos || processos.length === 0) && (
            <div className="processos-empty">
              <AlertCircle size={48} className="processos-empty-icon" />
              <p className="processos-empty-text">
                Nenhum processo encontrado para este convênio.
              </p>
            </div>
          )}

          {/* Lista de Processos */}
          {!isLoading && processos && processos.length > 0 && (
            <div className="processos-list">
              {processos.map((processo, index) => (
                <div key={index} className="processo-card">
                  
                  {/* Cabeçalho do Card */}
                  <div className="processo-card-header">
                    <div className="processo-numero">
                      Processo #{index + 1}
                    </div>
                    <div className={`processo-status ${(processo.status_processo || '').toLowerCase().replace(/\s+/g, '-')}`}>
                      {processo.status_processo || 'Sem Status'}
                    </div>
                  </div>

                  {/* Grid de Informações (2 colunas) */}
                  <div className="processo-card-grid">
                    {renderField('Órgão do Processo', processo.orgao_processo)}
                    {renderField('Código de Identificação', processo.codigo_identificacao)}
                    {renderField('Tipo de Processo', processo.tipo_processo)}
                    {renderField('Data da Informação', formatDate(processo.data_informacao))}
                  </div>

                  {/* Observações (largura completa) */}
                  {processo.observacoes && (
                    <div className="processo-observacoes">
                      <div className="processo-label">Observações:</div>
                      <div className="processo-value processo-observacoes-text">
                        {processo.observacoes}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

          {/* Contador de Processos */}
          {!isLoading && processos && processos.length > 0 && (
            <div className="processos-footer">
              <span className="processos-count">
                {totalProcessos || processos.length} {(totalProcessos || processos.length) === 1 ? 'processo encontrado' : 'processos encontrados'}
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProcessosModal;
