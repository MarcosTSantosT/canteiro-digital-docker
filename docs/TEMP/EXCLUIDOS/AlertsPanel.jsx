// src/components/Panels/AlertsPanel.jsx
import React, { useState } from 'react';
import { AlertTriangle, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import ResizablePanel from '../ResizablePanel';
import './Panels.css';

const AlertsPanel = ({ convenioSiafi, alteracoes }) => {
  const [isExporting, setIsExporting] = useState(false);

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
        // Preparar dados para exportação - CAMPOS EXPANDIDOS
        const dataToExport = alteracoes.map(alteracao => ({
          'Convênio SIAFI': convenioSiafi,
          'ID Alteração': alteracao.alteracao_id,
          'Campo': alteracao.campo,
          'Valor Anterior': alteracao.valor_antigo || 'vazio',
          'Valor Novo': alteracao.valor_novo || 'vazio',
          'Data Registro': new Date(alteracao.data_registro).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          'Usuário': alteracao.usuario || '-',
          'Origem': alteracao.origem || '-'
        }));

        // Criar worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        // Ajustar largura das colunas
        worksheet['!cols'] = [
          { wch: 15 },  // Convênio SIAFI
          { wch: 12 },  // ID Alteração
          { wch: 30 },  // Campo
          { wch: 35 },  // Valor Anterior
          { wch: 35 },  // Valor Novo
          { wch: 20 },  // Data Registro
          { wch: 25 },  // Usuário
          { wch: 15 }   // Origem
        ];

        // Criar workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alterações');

        // Nome do arquivo
        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const filename = `Alteracoes_${convenioSiafi}_${dataFormatada}.xlsx`;

        // Salvar
        XLSX.writeFile(workbook, filename);
      } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar arquivo. Tente novamente.');
      } finally {
        setIsExporting(false);
      }
    }, 300);
  };

  // Determinar se há operação selecionada
  const hasOperacao = convenioSiafi !== null && convenioSiafi !== undefined;
  const hasAlteracoes = alteracoes && alteracoes.length > 0;

  return (
    <ResizablePanel className="full-height">
      <div className="alerts-panel">
        
        {/* Header igual ao CommentsPanel - SEM fundo cinza */}
        <div className="alerts-header">
          {/* Linha 1: Título */}
          <h3 className={`alerts-title ${!hasOperacao ? 'alerts-title-inactive' : ''}`}>
            Registro de Alterações
          </h3>
          
          {/* Linha 2: Convênio + Exportar (SEMPRE visível) */}
          <div className="alerts-actions">
            <span className={`alerts-convenio-text ${!hasOperacao ? 'alerts-convenio-inactive' : ''}`}>
              Convênio: {convenioSiafi || '---'}
            </span>
            
            <button
              onClick={exportToExcel}
              className="comments-btn comments-btn-add"
              disabled={!hasAlteracoes || isExporting}
              title={hasAlteracoes ? `Exportar ${alteracoes.length} alterações para Excel` : 'Nenhuma alteração para exportar'}
            >
              <Download className="comments-btn-icon" />
              {isExporting ? 'Exportando...' : 'Exportar'}
            </button>
          </div>
        </div>

        <div className="alerts-list">
          {/* Só mostra empty state quando HÁ operação mas SEM alterações */}
          {hasOperacao && !hasAlteracoes && (
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

          {/* Lista de alterações */}
          {hasOperacao && hasAlteracoes && (
            alteracoes.map((alteracao) => (
              <div key={alteracao.alteracao_id} className="alert-item">
                
                {/* HEADER DO CARD - Expandido com mais informações */}
                <div className="alert-header">
                  <div className="alert-header-left">
                    <span className="alert-field">
                      {alteracao.campo}
                    </span>
                    {alteracao.usuario && (
                      <span className="alert-user" title="Usuário responsável">
                        👤 {alteracao.usuario}
                      </span>
                    )}
                  </div>
                  <div className="alert-header-right">
                    <span className="alert-date">
                      {new Date(alteracao.data_registro).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                    {alteracao.origem && (
                      <span className="alert-origem" title="Origem da alteração">
                        📍 {alteracao.origem}
                      </span>
                    )}
                  </div>
                </div>

                {/* MUDANÇAS - Valores antes/depois */}
                <div className="alert-changes">
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

                {/* FOOTER - ID da alteração (opcional, para debug) */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="alert-footer">
                    <span className="alert-id">ID: {alteracao.alteracao_id}</span>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>
    </ResizablePanel>
  );
};

export default AlertsPanel;
