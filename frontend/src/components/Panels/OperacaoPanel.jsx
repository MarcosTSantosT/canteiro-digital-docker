import React, { useState } from 'react';
import { Search, Loader, FileText, Download, FileSpreadsheet, FileSearch , AlertTriangle} from 'lucide-react';
import * as XLSX from 'xlsx';
import ResizablePanel from './ResizablePanel';
import ProcessosModal from './ProcessosModal';
import AlertsModal from './AtualizacoesModal';
import './OperacaoPanel.css';

import { API_URL } from '.backend/app/services/api';

const SearchPanel = ({ onOperacaoSelecionada }) => {
  const [valorBusca, setValorBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [dadosConvenio, setDadosConvenio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExportingJSON, setIsExportingJSON] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  
  // Estados para o modal de processos
  const [isProcessosModalOpen, setIsProcessosModalOpen] = useState(false);
  const [processos, setProcessos] = useState([]);
  const [totalProcessos, setTotalProcessos] = useState(0);
  const [isLoadingProcessos, setIsLoadingProcessos] = useState(false);
  // Estados para o modal de alterações
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [alteracoes, setAlteracoes] = useState([]);


  const handleBuscar = async () => {
    if (!valorBusca.trim()) {
      setMensagem('Por favor, digite um número de operação');
      return;
    }

    setIsLoading(true);
    setMensagem('');
    setDadosConvenio(null);

    try {
      const response = await fetch(`${API_URL}/api/operacao/${valorBusca}`);
      //const response = await fetch(`http://localhost:5000/api/operacao/${valorBusca}`);      
      if (!response.ok) {
        throw new Error('Operação não encontrada');
      }

      const data = await response.json();
      
      if (!data.convenio || 
          data.convenio === null || 
          (typeof data.convenio === 'object' && Object.keys(data.convenio).length === 0)) {
        throw new Error('Operação não encontrada');
      }
      
      setDadosConvenio(data.convenio);
      setMensagem('✓ Operação encontrada!');
      setAlteracoes(data.alteracoes || []); // ADICIONAR ESTA LINHA
      
      if (onOperacaoSelecionada) {
        onOperacaoSelecionada(
          valorBusca,
          data.comentarios || [],
          data.convenio || data,
          data.alteracoes || []
        );
      }
      
    } catch (error) {
      setMensagem(`✗ ${error.message}`);
      setDadosConvenio(null);
      
      if (onOperacaoSelecionada) {
        onOperacaoSelecionada(valorBusca, [], null, []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  };

  // ==========================================
  // FUNÇÃO PARA BUSCAR PROCESSOS
  // ==========================================
  const fetchProcessos = async () => {
    if (!dadosConvenio || !dadosConvenio.convenio_siafi) {
      alert('Nenhum convênio selecionado');
      return;
    }

    setIsProcessosModalOpen(true);
    setIsLoadingProcessos(true);

    try {
      const response = await fetch(`${API_URL}/api/operacao/${dadosConvenio.convenio_siafi}/processos`);
      
      if (!response.ok) {
        throw new Error('Erro ao buscar processos');
      }

      const responseData = await response.json();
      const processosArray = responseData.processos || [];
      const total = responseData.total || 0;
      
      setProcessos(processosArray);
      setTotalProcessos(total);
      
      console.log(`Encontrados ${total} processos para convênio ${dadosConvenio.convenio_siafi}`);
    } catch (error) {
      console.error('Erro ao buscar processos:', error);
      setProcessos([]);
      setTotalProcessos(0);
    } finally {
      setIsLoadingProcessos(false);
    }
  };

  // ==========================================
  // FUNÇÃO PARA ABRIR MODAL DE ALTERAÇÕES
  // ==========================================
  const openAlertsModal = () => {
    if (!dadosConvenio || !dadosConvenio.convenio_siafi) {
      alert('Nenhum convênio selecionado');
      return;
    }
    setIsAlertsModalOpen(true);
  };


  // ==========================================
  // FUNÇÃO DE EXPORTAÇÃO PARA JSON
  // ==========================================
  const exportToJSON = () => {
    if (!dadosConvenio) {
      alert('Nenhum dado para exportar');
      return;
    }

    setIsExportingJSON(true);

    setTimeout(() => {
      try {
        const jsonString = JSON.stringify(dadosConvenio, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const convenioSiafi = dadosConvenio.convenio_siafi || 'operacao';
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
    if (!dadosConvenio) {
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

        const flatData = flattenObject(dadosConvenio);
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
        const convenioSiafi = dadosConvenio.convenio_siafi || 'operacao';
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
      <div className="search-detail-field">
        <span className="search-detail-label">{label}</span>
        <span className="search-detail-value">{formattedValue || '-'}</span>
      </div>
    );
  };

  // ==========================================
  // RENDERIZAR SEÇÃO
  // ==========================================
  const renderSection = (title, fields, columns = 3) => {
    return (
      <div className="search-detail-section">
        <h3 className="search-detail-section-title">{title}</h3>
        <div className="search-detail-section-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {fields}
        </div>
      </div>
    );
  };

  return (
    <ResizablePanel className="full-height">
      <div className="search-panel">
        {/* HEADER COM BUSCA */}
        <div className="search-header">
          <div className="search-header-left">
            <Search className="search-icon-header" />
            <h2 className="search-title">Busca de Operação</h2>
          </div>

          {/* Botões de exportação no header */}
          {dadosConvenio && (
            <div className="search-export-buttons">
              <button
                onClick={fetchProcessos}
                className="search-btn search-btn-primary"
                title="Visualizar processos relacionados a este convênio"
              >
                <FileSearch className="search-btn-icon" />
                Processos
              </button>

              <button
                onClick={openAlertsModal}
                className="search-btn search-btn-danger"
                title="Visualizar alterações desta operação"
              >
                <AlertTriangle className="search-btn-icon" />
                Alterações
              </button>

              <button
                onClick={exportToExcel}
                className="search-btn search-btn-secondary"
                disabled={isExportingExcel}
                title="Exportar detalhes em formato Excel"
              >
                <FileSpreadsheet className="search-btn-icon" />
                {isExportingExcel ? 'Exportando...' : 'Excel'}
              </button>

              <button
                onClick={exportToJSON}
                className="search-btn search-btn-secondary"
                disabled={isExportingJSON}
                title="Exportar detalhes completos em JSON"
              >
                <Download className="search-btn-icon" />
                {isExportingJSON ? 'Exportando...' : 'JSON'}
              </button>
            </div>
          )}
        </div>

        {/* SEÇÃO DE INPUT E BUSCA */}
        <div className="search-input-section">
          <input
            type="text"
            className="search-input-field"
            placeholder="Digite o número da operação e.g. 873650"
            value={valorBusca}
            onChange={(e) => setValorBusca(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />

          <button
            onClick={handleBuscar}
            className="search-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="search-button-icon spinning" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="search-button-icon" />
                Buscar
              </>
            )}
          </button>
        </div>

        {mensagem && (
          <div className={`search-message ${dadosConvenio ? 'success' : 'error'}`}>
            {mensagem}
          </div>
        )}

        {/* ÁREA DE RESULTADOS */}
        <div className="search-results-area">
          {!dadosConvenio ? (
            <div className="search-empty-state">
              <FileText className="search-empty-icon" />
              <p className="search-empty-text">
                Nenhuma operação selecionada. Digite um número de operação e clique em Buscar.
              </p>
            </div>
          ) : (
            <div className="search-details-content">
              {/* SEÇÃO 1: IDENTIFICAÇÃO */}
              {renderSection('IDENTIFICAÇÃO', (
                <>
                  {renderField('Convênio SIAFI', dadosConvenio.convenio_siafi, 'convenio')}
                  {renderField('Operação', dadosConvenio.operacao)}
                  {renderField('DV', dadosConvenio.dv)}
                  {renderField('Convenente', dadosConvenio.convenente)}
                  {renderField('Proponente', dadosConvenio.proponente)}
                  {renderField('Município Beneficiado', dadosConvenio.municipio_beneficiado)}
                  {renderField('UF', dadosConvenio.uf)}
                  {renderField('Objeto', dadosConvenio.objeto)}
                </>
              ), 3)}

              {/* SEÇÃO 2: VALORES FINANCEIROS */}
              {renderSection('VALORES FINANCEIROS', (
                <>
                  {renderField('Investimento', dadosConvenio.valor_investimento, 'currency')}
                  {renderField('Repasse', dadosConvenio.valor_repasse, 'currency')}
                  {renderField('Contrapartida', dadosConvenio.valor_contrapartida, 'currency')}
                  {renderField('Desbloqueado', dadosConvenio.valor_desbloqueado, 'currency')}
                  {renderField('Desembolsado', dadosConvenio.valor_desembolsado, 'currency')}
                </>
              ), 3)}

              {/* SEÇÃO 3: DATAS */}
              {renderSection('DATAS', (
                <>
                  {renderField('Assinatura', dadosConvenio.data_assinatura, 'date')}
                  {renderField('Vigência', dadosConvenio.data_vigencia, 'date')}
                  {renderField('Último Desbloqueio', dadosConvenio.data_ultimo_desbloqueio, 'date')}
                  {renderField('Data AIO', dadosConvenio.data_aio, 'date')}
                  {renderField('Último Boletim de Medição', dadosConvenio.data_ultimo_bm, 'date')}
                  {renderField('Última Vistoria', dadosConvenio.data_ultima_vistoria, 'date')}
                  {renderField('Término da Obra', dadosConvenio.data_termino_obra, 'date')}
                  {renderField('Atualização Situação', dadosConvenio.dt_atualizacao_situacao_atual, 'date')}
                </>
              ), 4)}

              {/* SEÇÃO 4: SITUAÇÃO */}
              {renderSection('SITUAÇÃO', (
                <>
                  {renderField('Situação do Contrato', dadosConvenio.situacao_contrato)}
                  {renderField('Situação Atual', dadosConvenio.situacao_atual)}
                  {renderField('Carteira Ativa', dadosConvenio.carteira_ativa ? 'Sim' : 'Não')}
                  {renderField('Situação da Obra', dadosConvenio.situacao_obra)}
                </>
              ), 2)}

              {/* SEÇÃO 5: PERCENTUAIS */}
              {renderSection('PERCENTUAIS DE EXECUÇÃO', (
                <>
                  {renderField('Físico Informado', dadosConvenio.percentual_fisico_informado, 'percentage')}
                  {renderField('Físico Aferido', dadosConvenio.percentual_fisico_aferido, 'percentage')}
                  {renderField('Financeiro Desbloqueado', dadosConvenio.percentual_financeiro_desbloqueado, 'percentage')}
                </>
              ), 3)}

              {/* SEÇÃO 6: FISCALIZAÇÃO */}
              {renderSection('FISCALIZAÇÃO', (
                <>
                  {renderField('Candidato à Fiscalização', dadosConvenio.candidato_fiscalizacao ? 'Sim' : 'Não')}
                  {renderField('Observação', dadosConvenio.observacao_candidato_fiscalizacao)}
                </>
              ), 2)}

              {/* SEÇÃO 7: RISCOS E IRREGULARIDADES */}
              {renderSection('RISCOS E IRREGULARIDADES', (
                <>
                  {renderField('Risco de Irregularidade', dadosConvenio.risco_irregularidade ? 'Sim' : 'Não')}
                  {renderField('Observação', dadosConvenio.observacao_risco_irregularidade)}
                </>
              ), 2)}

              {/* SEÇÃO 8: INTERESSE SOCIOECONÔMICO */}
              {renderSection('INTERESSE SOCIOECONÔMICO', (
                <>
                  {renderField('Possui Interesse', dadosConvenio.interesse_socioeconomico ? 'Sim' : 'Não')}
                  {renderField('Observação', dadosConvenio.observacao_interesse_socioeconomico)}
                </>
              ), 2)}

              {/* SEÇÃO 9: DESTAQUE NA MÍDIA */}
              {renderSection('DESTAQUE NA MÍDIA', (
                <>
                  {renderField('Destaque na Mídia', dadosConvenio.destaque_midia ? 'Sim' : 'Não')}
                  {renderField('Observação', dadosConvenio.observacao_destaque_midia)}
                </>
              ), 2)}

              {/* SEÇÃO 10: DENÚNCIA/REPRESENTAÇÃO */}
              {renderSection('DENÚNCIA/REPRESENTAÇÃO', (
                <>
                  {renderField('Objeto de Denúncia', dadosConvenio.objeto_denuncia_representacao ? 'Sim' : 'Não')}
                  {renderField('Observação', dadosConvenio.observacao_objeto_denuncia_representacao)}
                </>
              ), 2)}

              {/* SEÇÃO 11: CONTROLE EXTERNO */}
              {renderSection('CONTROLE EXTERNO', (
                <>
                  {renderField('Controle Órgão Externo', dadosConvenio.objeto_controle_orgao_externo ? 'Sim' : 'Não')}
                  {renderField('Observação', dadosConvenio.observacao_objeto_controle_orgao_externo)}
                </>
              ), 2)}
            </div>
          )}
        </div>

        {/* Modal de Processos */}
        <ProcessosModal
          isOpen={isProcessosModalOpen}
          onClose={() => setIsProcessosModalOpen(false)}
          processos={processos}
          totalProcessos={totalProcessos}
          convenioSiafi={dadosConvenio?.convenio_siafi}
          isLoading={isLoadingProcessos}
        />
        {/* Modal de Alterações */}
        <AlertsModal
          isOpen={isAlertsModalOpen}
          onClose={() => setIsAlertsModalOpen(false)}
          convenioSiafi={dadosConvenio?.convenio_siafi}
          alteracoes={alteracoes}
        />

      </div>
    </ResizablePanel>
  );
};

export default SearchPanel;
