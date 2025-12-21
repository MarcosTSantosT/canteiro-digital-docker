import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, FileSearch } from 'lucide-react';
import * as XLSX from 'xlsx';
import ResizablePanel from './ResizablePanel';
import ProcessosModal from './ProcessosModal';
import './Panels.css';

const DetailsPanel = ({ data, onBack }) => {
  const [isExportingJSON, setIsExportingJSON] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  
  // Estados para o modal de processos
  const [isProcessosModalOpen, setIsProcessosModalOpen] = useState(false);
  const [processos, setProcessos] = useState([]);
  const [totalProcessos, setTotalProcessos] = useState(0);
  const [isLoadingProcessos, setIsLoadingProcessos] = useState(false);

  // ==========================================
  // FUNÇÃO PARA BUSCAR PROCESSOS
  // ==========================================
  const fetchProcessos = async () => {
    if (!data || !data.convenio_siafi) {
      alert('Nenhum convênio selecionado');
      return;
    }

    setIsProcessosModalOpen(true);
    setIsLoadingProcessos(true);

    try {
      // ROTA CORRETA: /operacao/{convenio_siafi}/processos
      const response = await fetch(`http://localhost:5000/api/operacao/${data.convenio_siafi}/processos`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar processos');
      }

      const responseData = await response.json();
      
      // Extrair array de processos e total da estrutura aninhada
      // Estrutura esperada: { convenio_siafi, total, processos: [...] }
      const processosArray = responseData.processos || [];
      const total = responseData.total || 0;
      
      setProcessos(processosArray);
      setTotalProcessos(total);
      
      console.log(`Encontrados ${total} processos para convênio ${data.convenio_siafi}`);
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
      setProcessos([]);
      setTotalProcessos(0);
      // Não fecha o modal, apenas mostra vazio
    } finally {
      setIsLoadingProcessos(false);
    }
  };

  // ==========================================
  // FUNÇÃO DE EXPORTAÇÃO PARA JSON
  // ==========================================
  const exportToJSON = () => {
    if (!data) {
      alert('Nenhum dado para exportar');
      return;
    }

    setIsExportingJSON(true);

    setTimeout(() => {
      try {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const convenioSiafi = data.convenio_siafi || 'operacao';
        link.download = `Detalhes_Operacao_${convenioSiafi}_${dataFormatada}.json`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar arquivo. Tente novamente.');
      } finally {
        setIsExportingJSON(false);
      }
    }, 300);
  };

  // ==========================================
  // FUNÇÃO DE EXPORTAÇÃO PARA EXCEL
  // ==========================================
  const exportToExcel = () => {
    if (!data) {
      alert('Nenhum dado para exportar');
      return;
    }

    setIsExportingExcel(true);

    setTimeout(() => {
      try {
        const flattenObject = (obj, prefix = '') => {
          return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            
            if (value === null || value === undefined) {
              acc[newKey] = '';
            } else if (typeof value === 'object' && !Array.isArray(value)) {
              Object.assign(acc, flattenObject(value, newKey));
            } else if (Array.isArray(value)) {
              acc[newKey] = value.join(', ');
            } else {
              acc[newKey] = value;
            }
            
            return acc;
          }, {});
        };

        const flatData = flattenObject(data);
        const tableData = Object.keys(flatData).map(key => ({
          'Campo': key,
          'Valor': flatData[key]
        }));

        const worksheet = XLSX.utils.json_to_sheet(tableData);
        worksheet['!cols'] = [
          { wch: 40 },
          { wch: 60 }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Detalhes');

        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const convenioSiafi = data.convenio_siafi || 'operacao';
        const filename = `Detalhes_Operacao_${convenioSiafi}_${dataFormatada}.xlsx`;

        XLSX.writeFile(workbook, filename);
      } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar arquivo. Tente novamente.');
      } finally {
        setIsExportingExcel(false);
      }
    }, 300);
  };

  // ==========================================
  // FUNÇÃO PARA FORMATAR VALORES
  // ==========================================
  const formatValue = (value, type = 'auto') => {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    if (type === 'convenio') {
      return Math.floor(Number(value)).toString();
    }

    if (type === 'currency') {
      const num = typeof value === 'number' ? value : parseFloat(value);
      if (isNaN(num)) return value;
      return `R$ ${num.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      })}`;
    }

    if (type === 'percentage') {
      let num = typeof value === 'number' ? value : parseFloat(value);
      if (isNaN(num)) return value;
      
      if (num > 0 && num <= 1) {
        num = num * 100;
      }
      
      return `${num.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} %`;
    }

    if (type === 'date') {
      const date = new Date(value);
      if (isNaN(date)) return value;
      
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }

    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
      const date = new Date(value);
      if (!isNaN(date)) {
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    }

    return String(value);
  };

  // ==========================================
  // RENDERIZAR CAMPO
  // ==========================================
  const renderField = (label, value, type = 'auto') => {
    const formattedValue = formatValue(value, type);
    
    return (
      <div className="details-field">
        <div className="details-label">{label}:</div>
        <div className="details-value">{formattedValue || '-'}</div>
      </div>
    );
  };

  // ==========================================
  // RENDERIZAR SEÇÃO COM GRID
  // ==========================================
  const renderSection = (title, fields, columns = 3) => {
    return (
      <div className="details-section">
        <h3 className="details-section-title">{title}</h3>
        <div className="details-section-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {fields}
        </div>
      </div>
    );
  };

  if (!data) {
    return (
      <ResizablePanel className="full-height">
        <div className="details-panel">
          <div className="details-header-clean">
            <h2 className="details-title-clean details-title-inactive">Resultados da busca</h2>
            
            <div className="details-export-buttons">
              <button
                className="comments-btn comments-btn-primary"
                disabled={true}
                title="Selecione uma operação para visualizar processos"
              >
                <FileSearch className="comments-btn-icon" />
                Processos
              </button>

              <button
                className="comments-btn comments-btn-add"
                disabled={true}
                title="Selecione uma operação para exportar"
              >
                <FileSpreadsheet className="comments-btn-icon" />
                Excel
              </button>

              <button
                className="comments-btn comments-btn-add"
                disabled={true}
                title="Selecione uma operação para exportar"
              >
                <Download className="comments-btn-icon" />
                JSON
              </button>
            </div>
          </div>

          <div className="details-empty-state">
            <FileText className="details-empty-icon" />
            <p className="details-empty-text">
              Nenhuma operação selecionada. Faça uma busca para visualizar os detalhes.
            </p>
          </div>
        </div>
      </ResizablePanel>
    );
  }

  return (
    <ResizablePanel className="full-height">
      <div className="details-panel">
        {/* Header */}
        <div className="details-header-clean">
          <h2 className="details-title-clean">Resultados da busca</h2>
          
          <div className="details-export-buttons">
            {/* BOTÃO PROCESSOS - AZUL */}
            <button
              onClick={fetchProcessos}
              className="comments-btn comments-btn-primary"
              title="Visualizar processos relacionados a este convênio"
            >
              <FileSearch className="comments-btn-icon" />
              Processos
            </button>

            <button
              onClick={exportToExcel}
              className="comments-btn comments-btn-add"
              disabled={isExportingExcel}
              title="Exportar detalhes em formato Excel"
            >
              <FileSpreadsheet className="comments-btn-icon" />
              {isExportingExcel ? 'Exportando...' : 'Excel'}
            </button>

            <button
              onClick={exportToJSON}
              className="comments-btn comments-btn-add"
              disabled={isExportingJSON}
              title="Exportar detalhes completos em JSON"
            >
              <Download className="comments-btn-icon" />
              {isExportingJSON ? 'Exportando...' : 'JSON'}
            </button>
          </div>
        </div>

        {/* Conteúdo em seções verticais */}
        <div className="details-content-vertical">
          
          {/* SEÇÃO 1: IDENTIFICAÇÃO */}
          {renderSection('IDENTIFICAÇÃO', (
            <>
              {renderField('Convênio SIAFI', data.convenio_siafi, 'convenio')}
              {renderField('Operação', data.operacao)}
              {renderField('DV', data.dv)}
              {renderField('Convenente', data.convenente)}
              {renderField('Proponente', data.proponente)}
              {renderField('UF', data.uf)}
              {renderField('Objeto', data.objeto)}
            </>
          ), 3)}

          {/* SEÇÃO 2: VALORES FINANCEIROS */}
          {renderSection('VALORES FINANCEIROS', (
            <>
              {renderField('Investimento', data.valor_investimento, 'currency')}
              {renderField('Repasse', data.valor_repasse, 'currency')}
              {renderField('Contrapartida', data.valor_contrapartida, 'currency')}
              {renderField('Desbloqueado', data.valor_desbloqueado, 'currency')}
              {renderField('Desembolsado', data.valor_desembolsado, 'currency')}
            </>
          ), 3)}

          {/* SEÇÃO 3: DATAS */}
          {renderSection('DATAS', (
            <>
              {renderField('Assinatura', data.data_assinatura, 'date')}
              {renderField('Vigência', data.data_vigencia, 'date')}
              {renderField('Último Desbloqueio', data.data_ultimo_desbloqueio, 'date')}
              {renderField('Data AIO', data.data_aio, 'date')}
              {renderField('Último Boletim de Medição', data.data_ultimo_bm, 'date')}
              {renderField('Última Vistoria', data.data_ultima_vistoria, 'date')}
              {renderField('Término da Obra', data.data_termino_obra, 'date')}
              {renderField('Atualização Situação', data.dt_atualizacao_situacao_atual, 'date')}
            </>
          ), 4)}

          {/* SEÇÃO 4: SITUAÇÃO */}
          {renderSection('SITUAÇÃO', (
            <>
              {renderField('Situação do Contrato', data.situacao_contrato)}
              {renderField('Situação Atual', data.situacao_atual)}
              {renderField('Carteira Ativa', data.carteira_ativa ? 'Sim' : 'Não')}
              {renderField('Situação da Obra', data.situacao_obra)}
            </>
          ), 2)}

          {/* SEÇÃO 5: PERCENTUAIS */}
          {renderSection('PERCENTUAIS DE EXECUÇÃO', (
            <>
              {renderField('Físico Informado', data.percentual_fisico_informado, 'percentage')}
              {renderField('Físico Aferido', data.percentual_fisico_aferido, 'percentage')}
              {renderField('Financeiro Desbloqueado', data.percentual_financeiro_desbloqueado, 'percentage')}
            </>
          ), 3)}

          {/* SEÇÃO 6: FISCALIZAÇÃO */}
          {renderSection('FISCALIZAÇÃO', (
            <>
              {renderField('Candidato à Fiscalização', data.candidato_fiscalizacao ? 'Sim' : 'Não')}
              {renderField('Observação', data.observacao_candidato_fiscalizacao)}
            </>
          ), 2)}

          {/* SEÇÃO 7: RISCOS E IRREGULARIDADES */}
          {renderSection('RISCOS E IRREGULARIDADES', (
            <>
              {renderField('Risco de Irregularidade', data.risco_irregularidade ? 'Sim' : 'Não')}
              {renderField('Observação', data.observacao_risco_irregularidade)}
            </>
          ), 2)}

          {/* SEÇÃO 8: INTERESSE SOCIOECONÔMICO */}
          {renderSection('INTERESSE SOCIOECONÔMICO', (
            <>
              {renderField('Possui Interesse', data.interesse_socioeconomico ? 'Sim' : 'Não')}
              {renderField('Observação', data.observacao_interesse_socioeconomico)}
            </>
          ), 2)}

          {/* SEÇÃO 9: DESTAQUE NA MÍDIA */}
          {renderSection('DESTAQUE NA MÍDIA', (
            <>
              {renderField('Destaque na Mídia', data.destaque_midia ? 'Sim' : 'Não')}
              {renderField('Observação', data.observacao_destaque_midia)}
            </>
          ), 2)}

          {/* SEÇÃO 10: DENÚNCIA/REPRESENTAÇÃO */}
          {renderSection('DENÚNCIA/REPRESENTAÇÃO', (
            <>
              {renderField('Objeto de Denúncia', data.objeto_denuncia_representacao ? 'Sim' : 'Não')}
              {renderField('Observação', data.observacao_objeto_denuncia_representacao)}
            </>
          ), 2)}

          {/* SEÇÃO 11: CONTROLE EXTERNO */}
          {renderSection('CONTROLE EXTERNO', (
            <>
              {renderField('Controle Órgão Externo', data.objeto_controle_orgao_externo ? 'Sim' : 'Não')}
              {renderField('Observação', data.observacao_objeto_controle_orgao_externo)}
            </>
          ), 2)}

        </div>

        {/* Modal de Processos */}
        <ProcessosModal
          isOpen={isProcessosModalOpen}
          onClose={() => setIsProcessosModalOpen(false)}
          processos={processos}
          totalProcessos={totalProcessos}
          convenioSiafi={data.convenio_siafi}
          isLoading={isLoadingProcessos}
        />
      </div>
    </ResizablePanel>
  );
};

export default DetailsPanel;
