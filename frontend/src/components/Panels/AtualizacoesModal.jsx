import React, { useState } from 'react';
import { X, AlertTriangle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import './AtualizacoesModal.css';

const AlertsModal = ({ isOpen, onClose, convenioSiafi, alteracoes }) => {
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  // ==========================================
  // FUNÇÃO DE EXPORTAÇÃO PARA EXCEL
  // ==========================================
  const exportToExcel = () => {
    if (!alteracoes || alteracoes.length === 0) {
      alert('Nenhuma alteração para exportar');
      return;
    }

    setIsExporting(true);

    setTimeout(() => {
      try {
        const dataToExport = alteracoes.map(alteracao => ({
          'Convênio SIAFI': convenioSiafi,
          'Campo': alteracao.campo,
          'Valor Anterior': alteracao.valor_antigo || 'vazio',
          'Valor Novo': alteracao.valor_novo || 'vazio',
          'Data Registro': new Date(alteracao.data_deteccao_upload).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        worksheet['!cols'] = [
          { wch: 15 },  // Convênio SIAFI
          { wch: 30 },  // Campo
          { wch: 35 },  // Valor Anterior
          { wch: 35 },  // Valor Novo
          { wch: 20 }   // Data Registro
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alterações');

        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const filename = `Altualizacoes_${convenioSiafi}_${dataFormatada}.xlsx`;

        XLSX.writeFile(workbook, filename);
      } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar arquivo. Tente novamente.');
      } finally {
        setIsExporting(false);
      }
    }, 300);
  };

  const hasAlteracoes = alteracoes && alteracoes.length > 0;

  return (
    <div className="alerts-modal-overlay" onClick={onClose}>
      <div className="alerts-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header do Modal */}
        <div className="alerts-modal-header">
          <div className="alerts-modal-title-section">
            <AlertTriangle className="alerts-modal-icon" />
            <h2 className="alerts-modal-title">Registro de Alterações</h2>
          </div>
          <div className="alerts-modal-header-actions">
            <span className="alerts-modal-convenio">Convênio: {convenioSiafi || '-'}</span>
            <button
              onClick={exportToExcel}
              className="alerts-modal-export-btn"
              disabled={!hasAlteracoes || isExporting}
              title={hasAlteracoes ? `Exportar ${alteracoes.length} alterações para Excel` : 'Nenhuma alteração para exportar'}
            >
              <Download className="alerts-modal-btn-icon" />
              {isExporting ? 'Exportando...' : 'Exportar'}
            </button>
          </div>
          <button 
            className="alerts-modal-close"
            onClick={onClose}
            title="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="alerts-modal-body">
          
          {/* Empty State */}
          {!hasAlteracoes && (
            <div className="alerts-empty">
              <AlertTriangle size={48} className="alerts-empty-icon" />
              <p className="alerts-empty-text">
                Nenhuma alteração detectada
              </p>
              <p className="alerts-empty-subtext">
                As mudanças nos dados da operação aparecerão aqui
              </p>
            </div>
          )}

          {/* Lista de Alterações */}
          {hasAlteracoes && (
            <div className="alerts-list">
              {alteracoes.map((alteracao, index) => (
                <div key={alteracao.alteracao_id || index} className="alert-card">
                  
                  {/* Header do Card */}
                  <div className="alert-card-header">
                    <div className="alert-card-numero">
                      Alteração #{index + 1}
                    </div>
                    <div className="alert-card-date">
                      {new Date(alteracao.data_deteccao_upload).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  {/* Campo Alterado */}
                  <div className="alert-card-field">
                    <div className="alert-field-label">Campo:</div>
                    <div className="alert-field-value">{alteracao.campo}</div>
                  </div>

                  {/* Mudanças - Valores antes/depois */}
                  <div className="alert-card-changes">
                    <div className="alert-change alert-old">
                      <span className="alert-change-label">Valor Anterior:</span>
                      <span className="alert-change-value">
                        {alteracao.valor_antigo || <em className="alert-empty">vazio</em>}
                      </span>
                    </div>
                    
                    <div className="alert-arrow">→</div>
                    
                    <div className="alert-change alert-new">
                      <span className="alert-change-label">Valor Novo:</span>
                      <span className="alert-change-value">
                        {alteracao.valor_novo || <em className="alert-empty">vazio</em>}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

          {/* Contador de Alterações */}
          {hasAlteracoes && (
            <div className="alerts-footer">
              <span className="alerts-count">
                {alteracoes.length} {alteracoes.length === 1 ? 'alteração encontrada' : 'alterações encontradas'}
              </span>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default AlertsModal;
