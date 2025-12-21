import React, { useEffect, useState, useRef } from "react";
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import ResizablePanel from './ResizablePanel';
import './Panels.css';

const DetailsTablePanel = ({ data, onSelectOperacao }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

  // Filtros individuais por coluna (38 colunas)
  const [colFilters, setColFilters] = useState({
    convenio_siafi: "",
    operacao: "",
    dv: "",
    convenente: "",
    objeto: "",
    proponente: "",
    uf: "",
    valor_investimento: "",
    valor_repasse: "",
    valor_contrapartida: "",
    valor_desbloqueado: "",
    data_ultimo_desbloqueio: "",
    valor_desembolsado: "",
    data_assinatura: "",
    data_vigencia: "",
    situacao_contrato: "",
    situacao_atual: "",
    dt_atualizacao_situacao_atual: "",
    carteira_ativa: "",
    data_aio: "",
    situacao_obra: "",
    percentual_fisico_informado: "",
    percentual_fisico_aferido: "",
    percentual_financeiro_desbloqueado: "",
    data_ultimo_bm: "",
    data_ultima_vistoria: "",
    data_termino_obra: "",
    candidato_fiscalizacao: "",
    observacao_candidato_fiscalizacao: "",
    risco_irregularidade: "",
    observacao_risco_irregularidade: "",
    interesse_socioeconomico: "",
    observacao_interesse_socioeconomico: "",
    destaque_midia: "",
    observacao_destaque_midia: "",
    objeto_denuncia_representacao: "",
    observacao_objeto_denuncia_representacao: "",
    objeto_controle_orgao_externo: "",
    observacao_objeto_controle_orgao_externo: ""
  });

  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("desc");

  // Larguras das colunas
  const [columnWidths, setColumnWidths] = useState({
    convenio_siafi: 120,
    operacao: 100,
    dv: 50,
    convenente: 200,
    objeto: 250,
    proponente: 200,
    uf: 60,
    valor_investimento: 130,
    valor_repasse: 130,
    valor_contrapartida: 130,
    valor_desbloqueado: 130,
    data_ultimo_desbloqueio: 130,
    valor_desembolsado: 130,
    data_assinatura: 120,
    data_vigencia: 120,
    situacao_contrato: 150,
    situacao_atual: 150,
    dt_atualizacao_situacao_atual: 130,
    carteira_ativa: 100,
    data_aio: 120,
    situacao_obra: 150,
    percentual_fisico_informado: 100,
    percentual_fisico_aferido: 100,
    percentual_financeiro_desbloqueado: 100,
    data_ultimo_bm: 120,
    data_ultima_vistoria: 120,
    data_termino_obra: 120,
    candidato_fiscalizacao: 120,
    observacao_candidato_fiscalizacao: 200,
    risco_irregularidade: 120,
    observacao_risco_irregularidade: 200,
    interesse_socioeconomico: 150,
    observacao_interesse_socioeconomico: 200,
    destaque_midia: 120,
    observacao_destaque_midia: 200,
    objeto_denuncia_representacao: 150,
    observacao_objeto_denuncia_representacao: 200,
    objeto_controle_orgao_externo: 150,
    observacao_objeto_controle_orgao_externo: 200
  });
  
  const [resizingColumn, setResizingColumn] = useState(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Ordem das colunas
  const columnOrder = [
    'convenio_siafi',
    'operacao',
    'dv',
    'convenente',
    'objeto',
    'proponente',
    'uf',
    'valor_investimento',
    'valor_repasse',
    'valor_contrapartida',
    'valor_desbloqueado',
    'data_ultimo_desbloqueio',
    'valor_desembolsado',
    'data_assinatura',
    'data_vigencia',
    'situacao_contrato',
    'situacao_atual',
    'dt_atualizacao_situacao_atual',
    'carteira_ativa',
    'data_aio',
    'situacao_obra',
    'percentual_fisico_informado',
    'percentual_fisico_aferido',
    'percentual_financeiro_desbloqueado',
    'data_ultimo_bm',
    'data_ultima_vistoria',
    'data_termino_obra',
    'candidato_fiscalizacao',
    'observacao_candidato_fiscalizacao',
    'risco_irregularidade',
    'observacao_risco_irregularidade',
    'interesse_socioeconomico',
    'observacao_interesse_socioeconomico',
    'destaque_midia',
    'observacao_destaque_midia',
    'objeto_denuncia_representacao',
    'observacao_objeto_denuncia_representacao',
    'objeto_controle_orgao_externo',
    'observacao_objeto_controle_orgao_externo'
  ];

  // Labels das colunas
  const columnLabels = {
    convenio_siafi: 'Convênio',
    operacao: 'Operação',
    dv: 'DV',
    convenente: 'Convenente',
    objeto: 'Objeto',
    proponente: 'Proponente',
    uf: 'UF',
    valor_investimento: 'Investimento',
    valor_repasse: 'Repasse',
    valor_contrapartida: 'Contrapartida',
    valor_desbloqueado: 'Desbloqueado',
    data_ultimo_desbloqueio: 'Últ. Desbloqueio',
    valor_desembolsado: 'Desembolsado',
    data_assinatura: 'Assinatura',
    data_vigencia: 'Vigência',
    situacao_contrato: 'Situação Contrato',
    situacao_atual: 'Situação Atual',
    dt_atualizacao_situacao_atual: 'Atualização',
    carteira_ativa: 'Carteira Ativa',
    data_aio: 'Data AIO',
    situacao_obra: 'Situação Obra',
    percentual_fisico_informado: '% Físico Info',
    percentual_fisico_aferido: '% Físico Afer',
    percentual_financeiro_desbloqueado: '% Financeiro',
    data_ultimo_bm: 'Últ. BM',
    data_ultima_vistoria: 'Últ. Vistoria',
    data_termino_obra: 'Término Obra',
    candidato_fiscalizacao: 'Cand. Fiscaliz.',
    observacao_candidato_fiscalizacao: 'Obs. Fiscaliz.',
    risco_irregularidade: 'Risco Irreg.',
    observacao_risco_irregularidade: 'Obs. Risco',
    interesse_socioeconomico: 'Int. Socioecon.',
    observacao_interesse_socioeconomico: 'Obs. Interesse',
    destaque_midia: 'Destaque Mídia',
    observacao_destaque_midia: 'Obs. Mídia',
    objeto_denuncia_representacao: 'Denúncia',
    observacao_objeto_denuncia_representacao: 'Obs. Denúncia',
    objeto_controle_orgao_externo: 'Controle Ext.',
    observacao_objeto_controle_orgao_externo: 'Obs. Controle'
  };

  // Atualizar dados quando prop mudar
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setFilteredData(data);
    } else {
      setFilteredData([]);
    }
  }, [data]);

  // Aplicar filtros
  useEffect(() => {
    if (!data || !Array.isArray(data)) {
      setFilteredData([]);
      return;
    }

    let filtered = [...data];

    // Filtros por coluna
    filtered = filtered.filter((item) => {
      return Object.keys(colFilters).every((col) => {
        const filterValue = colFilters[col].toLowerCase();
        if (!filterValue) return true;
        return String(item[col] || '').toLowerCase().includes(filterValue);
      });
    });

    // Ordenar
    if (sortColumn) {
      filtered = sortData(filtered, sortColumn, sortDirection);
    }

    setFilteredData(filtered);
  }, [data, colFilters, sortColumn, sortDirection]);

  // Exportação Excel
  const exportToExcel = () => {
    setIsExporting(true);

    setTimeout(() => {
      try {
        const dataToExport = filteredData.map(item => ({
          'Convênio SIAFI': item.convenio_siafi,
          'Operação': item.operacao,
          'DV': item.dv,
          'Convenente': item.convenente,
          'Objeto': item.objeto,
          'Proponente': item.proponente,
          'UF': item.uf,
          'Investimento': formatCurrency(item.valor_investimento),
          'Repasse': formatCurrency(item.valor_repasse),
          'Contrapartida': formatCurrency(item.valor_contrapartida),
          'Desbloqueado': formatCurrency(item.valor_desbloqueado),
          'Últ. Desbloqueio': formatDate(item.data_ultimo_desbloqueio),
          'Desembolsado': formatCurrency(item.valor_desembolsado),
          'Assinatura': formatDate(item.data_assinatura),
          'Vigência': formatDate(item.data_vigencia),
          'Situação Contrato': item.situacao_contrato,
          'Situação Atual': item.situacao_atual,
          'Atualização': formatDate(item.dt_atualizacao_situacao_atual),
          'Carteira Ativa': item.carteira_ativa ? 'Sim' : 'Não',
          'Data AIO': formatDate(item.data_aio),
          'Situação Obra': item.situacao_obra,
          '% Físico Informado': formatPercentage(item.percentual_fisico_informado),
          '% Físico Aferido': formatPercentage(item.percentual_fisico_aferido),
          '% Financeiro': formatPercentage(item.percentual_financeiro_desbloqueado),
          'Últ. BM': formatDate(item.data_ultimo_bm),
          'Últ. Vistoria': formatDate(item.data_ultima_vistoria),
          'Término Obra': formatDate(item.data_termino_obra),
          'Candidato Fiscalização': item.candidato_fiscalizacao ? 'Sim' : 'Não',
          'Obs. Fiscalização': item.observacao_candidato_fiscalizacao || '',
          'Risco Irregularidade': item.risco_irregularidade ? 'Sim' : 'Não',
          'Obs. Risco': item.observacao_risco_irregularidade || '',
          'Interesse Socioeconômico': item.interesse_socioeconomico ? 'Sim' : 'Não',
          'Obs. Interesse': item.observacao_interesse_socioeconomico || '',
          'Destaque Mídia': item.destaque_midia ? 'Sim' : 'Não',
          'Obs. Mídia': item.observacao_destaque_midia || '',
          'Denúncia': item.objeto_denuncia_representacao ? 'Sim' : 'Não',
          'Obs. Denúncia': item.observacao_objeto_denuncia_representacao || '',
          'Controle Externo': item.objeto_controle_orgao_externo ? 'Sim' : 'Não',
          'Obs. Controle': item.observacao_objeto_controle_orgao_externo || ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Carteira Completa');

        const now = new Date();
        const timestamp = now.toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `Carteira_Completa_${timestamp}.xlsx`;

        XLSX.writeFile(workbook, filename);
      } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar arquivo. Tente novamente.');
      } finally {
        setIsExporting(false);
      }
    }, 300);
  };

  // Funções de formatação
  const formatCurrency = (value) => {
    if (!value && value !== 0) return '-';
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return '-';
    return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date)) return '-';
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatPercentage = (value) => {
    if (!value && value !== 0) return '-';
    let num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return '-';
    if (num > 0 && num <= 1) num = num * 100;
    return `${num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} %`;
  };

  const formatBoolean = (value) => {
    if (value === true || value === 1) return 'Sim';
    if (value === false || value === 0) return 'Não';
    return '-';
  };

  // Renderizar célula com formatação apropriada
  const renderCell = (column, value) => {
    if (column.includes('valor_')) {
      return formatCurrency(value);
    }
    if (column.includes('data_') || column.includes('dt_')) {
      return formatDate(value);
    }
    if (column.includes('percentual_')) {
      return formatPercentage(value);
    }
    if (column === 'carteira_ativa' || column.includes('candidato_') || 
        column.includes('risco_') || column.includes('interesse_') || 
        column.includes('destaque_') || column.includes('objeto_denuncia') || 
        column.includes('objeto_controle')) {
      return formatBoolean(value);
    }
    if (column === 'convenio_siafi') {
      return Math.floor(Number(value)).toString();
    }
    return value || '-';
  };

  // Ordenação
  const sortData = (data, column, direction) => {
    return [...data].sort((a, b) => {
      const valueA = String(a[column] || '');
      const valueB = String(b[column] || '');
      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortColumn === column && sortDirection === "asc") {
      direction = "desc";
    }
    setSortColumn(column);
    setSortDirection(direction);
  };

  const sortIcon = (column) => {
    if (sortColumn !== column) return "↕";
    return sortDirection === "asc" ? "↑" : "↓";
  };

  const handleRowClick = async (item) => {
    try {
      const response = await fetch(`http://localhost:5000/api/operacao/${item.convenio_siafi}`);
      if (!response.ok) throw new Error('Operação não encontrada');
      const data = await response.json();
      
      if (onSelectOperacao) {
        onSelectOperacao(
          item.convenio_siafi,
          data.comentarios || [],
          data.convenio || null,
          data.alteracoes || []
        );
      }
    } catch (error) {
      console.error("Erro ao buscar operação:", error);
    }
  };

  // Redimensionamento
  const handleResizeStart = (e, column) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingColumn(column);
    startXRef.current = e.clientX;
    startWidthRef.current = columnWidths[column];
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!resizingColumn) return;
      const diff = e.clientX - startXRef.current;
      const newWidth = Math.max(50, startWidthRef.current + diff);
      setColumnWidths(prev => ({ ...prev, [resizingColumn]: newWidth }));
    };

    const handleMouseUp = () => {
      setResizingColumn(null);
    };

    if (resizingColumn) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingColumn]);

  return (
    <ResizablePanel className="full-height">
      <div className="carteira-panel" style={{ opacity: (!data || data.length === 0) ? 0.5 : 1 }}>
        <div className="carteira-header">
          <h2 className="carteira-title">Resultados da busca</h2>
          
          <button
            onClick={exportToExcel}
            className="comments-btn comments-btn-add"
            style={{ marginLeft: 'auto' }}
            title={`Exportar ${filteredData.length} operações para Excel (39 colunas)`}
            disabled={!data || filteredData.length === 0 || isExporting}
          >
            <Download className="comments-btn-icon" />
            {isExporting ? 'Exportando...' : 'Exportar'}
          </button>
        </div>

        {!data || data.length === 0 ? (
          <div className="carteira-empty" style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
            Realize uma busca na Carteira de Operações para visualizar os resultados aqui
          </div>
        ) : (
          <div className="carteira-table-container" style={{ 
            overflowX: 'auto',
            overflowY: 'auto',
            maxHeight: 'calc(100% - 70px)'
          }}>
            <table className="carteira-table" style={{ 
              tableLayout: 'fixed',
              minWidth: '100%',
              width: 'fit-content'
            }}>
              <thead className="carteira-table-header">
                <tr>
                  {columnOrder.map((col) => (
                    <th
                      key={col}
                      className="carteira-table-th sortable resizable-th"
                      style={{ width: `${columnWidths[col]}px` }}
                      onClick={() => handleSort(col)}
                    >
                      <div className="th-content">
                        {columnLabels[col]} <span className="sort-icon">{sortIcon(col)}</span>
                      </div>
                      <div
                        className="column-resizer"
                        onMouseDown={(e) => handleResizeStart(e, col)}
                      />
                    </th>
                  ))}
                </tr>

                <tr className="carteira-filter-row">
                  {columnOrder.map((col) => (
                    <th key={col} className="carteira-table-th" style={{ width: `${columnWidths[col]}px` }}>
                      <input
                        type="text"
                        className="carteira-filter-input"
                        placeholder="Filtrar..."
                        value={colFilters[col]}
                        onChange={(e) => setColFilters({ ...colFilters, [col]: e.target.value })}
                      />
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="carteira-table-body">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="39" className="carteira-empty" style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                      Nenhuma operação corresponde aos filtros aplicados
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, i) => (
                    <tr key={i} className="carteira-table-row" onClick={() => handleRowClick(item)}>
                      {columnOrder.map((col) => (
                        <td key={col} className="carteira-table-td" style={{ width: `${columnWidths[col]}px` }}>
                          {renderCell(col, item[col])}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ResizablePanel>
  );
};

export default DetailsTablePanel;
