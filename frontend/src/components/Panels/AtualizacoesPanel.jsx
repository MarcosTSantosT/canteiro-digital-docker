import React, { useEffect, useState, useRef } from "react";
import { AlertTriangle, Search, Download, ChevronDown, ChevronUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import ResizablePanel from './ResizablePanel';
import './AtualizacoesPanel.css';

const AlteracoesTablePanel = ({ onSelectOperacao }) => {
  const [alteracoesData, setAlteracoesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const contentRef = useRef(null);
  const tableScrollRef = useRef(null);
  const topScrollRef = useRef(null);

  // Filtros de período
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [usesBackendPagination, _setUsesBackendPagination] = useState(false);

  // Filtros avançados (checkboxes)
  const [advancedFilters, setAdvancedFilters] = useState({
    registros_inseridos: false,
    registros_excluidos: false,
    atualizacoes_situacao_empreendimento: false,
    atualizacoes_situacao_obra: false,
    emissao_vrpl: false,
    emissao_aio: false,
    realizacao_vistoria: false,
    realizacao_desbloqueio: false
  });

  // Filtros individuais por coluna (removido alteracao_id, usuario e origem)
  const [colFilters, setColFilters] = useState({
    convenio_siafi: "",
    objeto: "",
    municipio_beneficiado: "",
    uf: "",
    campo: "",
    valor_antigo: "",
    valor_novo: "",
    data_deteccao_upload: ""
  });

  const [sortColumn, setSortColumn] = useState('data_deteccao_upload');
  const [sortDirection, setSortDirection] = useState("desc");

  // Estados para redimensionamento de colunas (removido alteracao_id, usuario e origem)
  const [columnWidths, setColumnWidths] = useState({
    convenio_siafi: 120,
    objeto: 300,
    municipio_beneficiado: 180,
    uf: 60,
    campo: 180,
    valor_antigo: 200,
    valor_novo: 200,
    data_deteccao_upload: 160
  });
  const [resizingColumn, setResizingColumn] = useState(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  // Ordem das colunas (removido alteracao_id, usuario e origem)
  const columnOrder = [
    'convenio_siafi', 'objeto', 'municipio_beneficiado', 'uf',
    'campo', 'valor_antigo', 'valor_novo', 'data_deteccao_upload'
  ];

  // Labels das colunas
  const columnLabels = {
    convenio_siafi: 'Convênio',
    objeto: 'Objeto',
    municipio_beneficiado: 'Município',
    uf: 'UF',
    campo: 'Informações Alteradas',
    valor_antigo: 'Valor Anterior',
    valor_novo: 'Valor Novo',
    data_deteccao_upload: 'Data do Upload'
  };

  // Labels dos filtros avançados
  const advancedFilterLabels = {
    registros_inseridos: 'Registros inseridos (novos empreendimentos)',
    registros_excluidos: 'Registros excluídos',
    atualizacoes_situacao_empreendimento: 'Atualizações situação do empreendimento',
    atualizacoes_situacao_obra: 'Atualizações da situação da obra',
    emissao_vrpl: 'Emissão de VRPL',
    emissao_aio: 'Emissão de AIO',
    realizacao_vistoria: 'Realização de vistoria',
    realizacao_desbloqueio: 'Realização de desbloqueio'
  };

  // ==========================================
  // CARREGAR DADOS INICIAIS AO MONTAR COMPONENTE
  // ==========================================
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/alteracoes");
        
        if (!response.ok) {
          throw new Error("Erro ao carregar dados iniciais");
        }

        const result = await response.json();
        
        // Backend pode retornar { dados: [], total: N } ou apenas [...]
        const dataArray = Array.isArray(result) ? result : (result.dados || result.data || []);
        const totalFromBackend = result.total || dataArray.length;

        console.log('✅ Alterações carregadas:', dataArray.length, 'de', totalFromBackend, 'total');

        setAlteracoesData(dataArray);
        // NÃO seta filteredData - deixa useEffect de filtros fazer isso
        setTotalRecords(totalFromBackend);
        setTotalPages(Math.ceil(totalFromBackend / pageSize));
        setCurrentPage(1);
        
      } catch (error) {
        console.error("❌ Erro ao carregar dados iniciais:", error);
        setAlteracoesData([]);
        setTotalRecords(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [pageSize]);  // ✅ ESLint: adicionado pageSize

  // ==========================================
  // APLICAR FILTROS (Coluna + Checkboxes + Data)
  // ==========================================
  useEffect(() => {
    if (!alteracoesData || !Array.isArray(alteracoesData)) {
      setFilteredData([]);
      return;
    }

    let data = [...alteracoesData];

    // FILTRO DE DATA (dataInicio e dataFim)
    if (dataInicio || dataFim) {
      data = data.filter((item) => {
        const itemDate = item.data_deteccao_upload ? new Date(item.data_deteccao_upload) : null;
        if (!itemDate) return false;

        if (dataInicio && dataFim) {
          const inicio = new Date(dataInicio);
          const fim = new Date(dataFim);
          return itemDate >= inicio && itemDate <= fim;
        } else if (dataInicio) {
          const inicio = new Date(dataInicio);
          return itemDate >= inicio;
        } else if (dataFim) {
          const fim = new Date(dataFim);
          return itemDate <= fim;
        }
        return true;
      });
    }

    // FILTROS AVANÇADOS (Checkboxes)
    const activeFilters = Object.keys(advancedFilters).filter(key => advancedFilters[key]);
    if (activeFilters.length > 0) {
      data = data.filter((item) => {
        return activeFilters.some(filter => {
          const campo = item.campo?.toLowerCase() || '';
          
          switch(filter) {
            case 'registros_inseridos':
              return campo.includes('registro incluído');
            case 'registros_excluidos':
              return campo.includes('registro excluído');
            case 'atualizacoes_situacao_empreendimento':
              return campo.includes('alteração da situação do contrato');
            case 'atualizacoes_situacao_obra':
              return campo.includes('alteracao da situacao da obra');
            case 'emissao_vrpl':
              return campo.includes('emissao de vrpl');
            case 'emissao_aio':
              return campo.includes('emissao de aio');
            case 'realizacao_vistoria':
              return campo.includes('realizacao de vistoria');
            case 'realizacao_desbloqueio':
              return campo.includes('realizacao de desbloqueio');
            default:
              return false;
          }
        });
      });
    }

    // FILTROS POR COLUNA
    data = data.filter((item) => {
      return Object.keys(colFilters).every((col) => {
        const filterValue = colFilters[col].toLowerCase();
        if (!filterValue) return true;
        return String(item[col] || '').toLowerCase().includes(filterValue);
      });
    });

    // ORDENAR
    if (sortColumn) {
      data = sortData(data, sortColumn, sortDirection);
    }

    setFilteredData(data);
  }, [colFilters, advancedFilters, dataInicio, dataFim, alteracoesData, sortColumn, sortDirection]);

  // ==========================================
  // RECALCULAR TOTALRECORDS QUANDO FILTEREDDATA MUDAR
  // ==========================================
  useEffect(() => {
    if (!usesBackendPagination) {
      setTotalRecords(filteredData.length);
      setTotalPages(Math.ceil(filteredData.length / pageSize));
      
      if (currentPage > Math.ceil(filteredData.length / pageSize) && filteredData.length > 0) {
        setCurrentPage(1);
      }
    }
  }, [filteredData, pageSize, usesBackendPagination, currentPage]);  // ✅ ESLint: adicionado currentPage

  // ==========================================
  // ATUALIZAR LARGURA DA SCROLLBAR HORIZONTAL DO TOPO
  // ==========================================
  useEffect(() => {
    const updateScrollWidth = () => {
      if (tableScrollRef.current && topScrollRef.current && topScrollRef.current.firstChild) {
        const scrollWidth = tableScrollRef.current.scrollWidth;
        topScrollRef.current.firstChild.style.width = `${scrollWidth}px`;
      }
    };

    updateScrollWidth();
    
    // Atualizar quando janela redimensiona
    window.addEventListener('resize', updateScrollWidth);
    return () => window.removeEventListener('resize', updateScrollWidth);
  }, [filteredData, columnWidths]);

  // Funções de paginação
  // ==========================================
  // APLICAR FILTRO DE DATA
  // ==========================================
  const handleApplyDateFilter = () => {
    // Os filtros de data já estão em dataInicio e dataFim
    // O useEffect de filtros vai reagir automaticamente
    console.log('📅 Aplicando filtro de data:', { dataInicio, dataFim });
    
    // Opcional: fechar filtros avançados após aplicar
    // setShowAdvancedFilters(false);
  };

  const handleClearDateFilter = () => {
    setDataInicio('');
    setDataFim('');
    console.log('🗑️ Limpando filtro de data');
  };

  // Toggle de filtros avançados com scroll
  const handleToggleFilters = () => {
    setShowAdvancedFilters(!showAdvancedFilters);
    
    // Scroll para o topo da área de conteúdo ao abrir/fechar filtros
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setTotalPages(Math.ceil(totalRecords / newSize));
    setCurrentPage(1);
  };

  const getPaginatedData = () => {
    // Se usa paginação backend, retorna dados direto (já vêm paginados)
    if (usesBackendPagination) {
      return alteracoesData;
    }
    
    // Se usa paginação local, faz slice do filteredData
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Limpar todos os filtros
  const handleClearFilters = () => {
    setAdvancedFilters({
      registros_inseridos: false,
      registros_excluidos: false,
      atualizacoes_situacao_empreendimento: false,
      atualizacoes_situacao_obra: false,
      emissao_vrpl: false,
      emissao_aio: false,
      realizacao_vistoria: false,
      realizacao_desbloqueio: false
    });
    setDataInicio("");
    setDataFim("");
    setColFilters({
      convenio_siafi: "",
      objeto: "",
      municipio_beneficiado: "",
      uf: "",
      campo: "",
      valor_antigo: "",
      valor_novo: "",
      data_deteccao_upload: ""
    });
  };

  // Aplicar filtros e recolher
  const handleApplyFilters = async () => {
    setIsLoading(true);
    setShowAdvancedFilters(false);

    try {
      // Preparar filtros para enviar ao backend
      const backendFilters = {};
      
      // Adicionar filtros de data
      if (dataInicio) {
        backendFilters.data_inicio = dataInicio;
      }
      if (dataFim) {
        backendFilters.data_fim = dataFim;
      }
      
      // Mapear checkboxes ativos para os filtros do backend
      const activeFilters = Object.keys(advancedFilters).filter(key => advancedFilters[key]);
      
      if (activeFilters.length > 0) {
        // Enviar tipos de alteração como array
        const tiposAlteracao = [];
        
        activeFilters.forEach(filter => {
          switch(filter) {
            case 'registros_inseridos':
              tiposAlteracao.push('insert', 'novo', 'criado');
              break;
            case 'registros_excluidos':
              tiposAlteracao.push('delete', 'exclu', 'removido');
              break;
            case 'atualizacoes_situacao_empreendimento':
              tiposAlteracao.push('situacao_contrato', 'situacao_atual');
              break;
            case 'atualizacoes_situacao_obra':
              tiposAlteracao.push('situacao_obra');
              break;
            case 'emissao_vrpl':
              tiposAlteracao.push('vrpl');
              break;
            case 'emissao_aio':
              tiposAlteracao.push('aio', 'data_aio');
              break;
            case 'realizacao_vistoria':
              tiposAlteracao.push('vistoria');
              break;
            case 'realizacao_desbloqueio':
              tiposAlteracao.push('desbloqueio', 'desbloque');
              break;
          }
        });
        
        if (tiposAlteracao.length > 0) {
          backendFilters.tipos_alteracao = tiposAlteracao;
        }
      }

      const response = await fetch("http://localhost:5000/api/atualizacoes_filtros_paginacao", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(backendFilters)
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar alterações filtradas');
      }

      const result = await response.json();
      const dados = result.dados || result || [];

      setAlteracoesData(dados);
      setFilteredData(dados);
      setTotalRecords(dados.length);
      setTotalPages(Math.ceil(dados.length / pageSize));
      setCurrentPage(1);
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      alert("Erro ao buscar alterações filtradas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Exportar Base Completa do backend
  const exportCarteiraCompleta = async () => {
    setIsExporting(true);
    
    try {
      const response = await fetch("http://localhost:5000/api/alteracoes");
      
      if (!response.ok) {
        throw new Error('Erro ao buscar carteira completa');
      }

      const dados = await response.json();
      const dataArray = Array.isArray(dados) ? dados : (dados.dados || dados.data || []);

      if (dataArray.length === 0) {
        alert('Nenhum dado disponível para exportação.');
        setIsExporting(false);
        return;
      }

      const dataToExport = dataArray.map(item => ({
        'Convênio SIAFI': item.convenio_siafi,
        'Objeto': item.objeto || '-',
        'Município Beneficiado': item.municipio_beneficiado || '-',
        'UF': item.uf || '-',
        'Campo': item.campo,
        'Valor Anterior': item.valor_antigo || '',
        'Valor Novo': item.valor_novo || '',
        'Data de Alteração': formatDate(item.data_deteccao_upload)
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      worksheet['!cols'] = [
        { wch: 15 }, { wch: 50 }, { wch: 30 }, { wch: 5 },
        { wch: 25 }, { wch: 30 }, { wch: 30 }, { wch: 20 }
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Alterações Completa');

      const now = new Date();
      const dataFormatada = now.toISOString().split('T')[0];
      const filename = `Atualizacoes_Base_Completa_${dataFormatada}.xlsx`;

      XLSX.writeFile(workbook, filename);
      
      alert(`Carteira completa exportada com sucesso! ${dataArray.length} registros.`);
      
    } catch (error) {
      console.error('Erro ao Exportar Base Completa:', error);
      alert('Erro ao Exportar Base Completa. Verifique a conexão com o backend.');
    } finally {
      setIsExporting(false);
    }
  };

  // Exportação para Excel
  const exportToExcel = () => {
    setIsExporting(true);

    setTimeout(() => {
      try {
        const dataToExport = filteredData.map(item => ({
          'Convênio SIAFI': item.convenio_siafi,
          'Objeto': item.objeto || '-',
          'Município Beneficiado': item.municipio_beneficiado || '-',
          'UF': item.uf || '-',
          'Campo': item.campo,
          'Valor Anterior': item.valor_antigo || '',
          'Valor Novo': item.valor_novo || '',
          'Data de Alteração': formatDate(item.data_deteccao_upload)
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        worksheet['!cols'] = [
          { wch: 15 }, { wch: 50 }, { wch: 30 }, { wch: 5 },
          { wch: 25 }, { wch: 30 }, { wch: 30 }, { wch: 20 }
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Alterações');

        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const filename = `Atualizacoes_Resultado_Consulta_${dataFormatada}.xlsx`;

        XLSX.writeFile(workbook, filename);
      } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar arquivo. Tente novamente.');
      } finally {
        setIsExporting(false);
      }
    }, 300);
  };

  // Ordenação
  // ==========================================
  // SINCRONIZAR SCROLL HORIZONTAL - BARRA DO TOPO COM TABELA
  // ==========================================
  const handleTopScroll = (e) => {
    if (tableScrollRef.current) {
      tableScrollRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  const handleTableScroll = (e) => {
    if (topScrollRef.current) {
      topScrollRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

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
      if (!response.ok) {
        throw new Error('Operação não encontrada');
      }
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      <div className="alteracoes-panel alteracoes-panel-container">
        {/* HEADER */}
        <div className="alteracoes-header">
          <AlertTriangle className="alteracoes-icon-header" />
          <h2 className="alteracoes-title">Histórico de Alterações</h2>
          
          <button
            onClick={exportCarteiraCompleta}
            className="comments-btn comments-btn-add alteracoes-btn-auto-margin"
            title="Exportar toda a carteira de alterações do banco de dados"
            disabled={isExporting}
          >
            <Download className="comments-btn-icon" />
            {isExporting ? 'Exportando...' : 'Exportar Base Completa'}
          </button>

          <button
            onClick={exportToExcel}
            className="comments-btn comments-btn-add alteracoes-btn-margin-left"
            title={`Exportar ${filteredData.length} alterações filtradas para Excel`}
            disabled={filteredData.length === 0 || isExporting}
          >
            <Download className="comments-btn-icon" />
            {isExporting ? 'Exportando...' : 'Exportar Resultados'}
          </button>
        </div>

        {/* CONTADOR DE RESULTADOS */}
        <div className="alteracoes-count alteracoes-count-margin">
          {totalRecords} alterações encontradas
        </div>

        {/* TOGGLE FILTROS AVANÇADOS */}
        <div 
          style={{
            padding: '0.75rem 1rem',
            background: '#f3f4f6',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            transition: 'all 0.2s',
            flexShrink: 0,
            gap: '1rem'
          }}
        >
          <div 
            onClick={handleToggleFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flex: 1
            }}
          >
            <span className="alteracoes-page-info-text">
              Filtros por Tipo de Alteração
            </span>
            {showAdvancedFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {showAdvancedFilters && (
            <div className="alteracoes-page-controls-wrapper">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApplyFilters();
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Aplicar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFilters();
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'white',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Limpar
              </button>
            </div>
          )}
        </div>

        {/* ÁREA DE SCROLL UNIFICADA (Filtros + Tabela) */}
        <div ref={contentRef} style={{ 
          flex: 1, 
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0 0.5rem 0.5rem 0.5rem'
        }}>
          {/* FILTROS AVANÇADOS */}
          {showAdvancedFilters && (
            <div 
              className="alteracoes-advanced-filters"
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}
            >
              {/* FILTROS DE DATA */}
              <div className="alteracoes-details-section">
                <h4 style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#374151',
                  marginBottom: '1rem'
                }}>
                  📅 Filtro de Período
                </h4>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.75rem', 
                      fontWeight: '500',
                      color: '#6b7280',
                      marginBottom: '0.25rem'
                    }}>
                      Data Início:
                    </label>
                    <input
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      fontSize: '0.75rem', 
                      fontWeight: '500',
                      color: '#6b7280',
                      marginBottom: '0.25rem'
                    }}>
                      Data Fim:
                    </label>
                    <input
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.375rem',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                </div>

                {/* Botões de Filtro de Data */}
                <div className="alteracoes-page-controls-wrapper">
                  <button
                    onClick={handleApplyDateFilter}
                    disabled={!dataInicio && !dataFim}
                    style={{
                      padding: '0.5rem 1rem',
                      background: (dataInicio || dataFim) ? '#10b981' : '#9ca3af',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: (dataInicio || dataFim) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      if (dataInicio || dataFim) e.target.style.background = '#059669';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = (dataInicio || dataFim) ? '#10b981' : '#9ca3af';
                    }}
                  >
                    ✓ Aplicar Período
                  </button>
                  
                  <button
                    onClick={handleClearDateFilter}
                    disabled={!dataInicio && !dataFim}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'white',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: (dataInicio || dataFim) ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s',
                      opacity: (dataInicio || dataFim) ? 1 : 0.5
                    }}
                    onMouseEnter={(e) => {
                      if (dataInicio || dataFim) {
                        e.target.style.background = '#f3f4f6';
                        e.target.style.color = '#374151';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.color = '#6b7280';
                    }}
                  >
                    ✕ Limpar Datas
                  </button>
                </div>
              </div>

              {/* CHECKBOXES DE FILTROS */}
              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#374151',
                  marginBottom: '1rem'
                }}>
                  ☑️ Tipos de Alteração
                </h4>
              </div>

              <div className="alteracoes-filters-grid">
                {Object.keys(advancedFilters).map((filterKey) => (
                  <label key={filterKey} className="alteracoes-filter-checkbox">
                    <input
                      type="checkbox"
                      checked={advancedFilters[filterKey]}
                      onChange={(e) => setAdvancedFilters({
                        ...advancedFilters,
                        [filterKey]: e.target.checked
                      })}
                    />
                    <span>{advancedFilterLabels[filterKey]}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* TABELA DE RESULTADOS */}
          {isLoading ? (
            <div className="alteracoes-loading">Carregando histórico...</div>
          ) : filteredData.length === 0 ? (
            <div className="alteracoes-empty">
              Nenhuma alteração encontrada com os filtros aplicados
            </div>
          ) : (
            <>
              {/* Barra de scroll horizontal no TOPO */}
              <div 
                ref={topScrollRef}
                onScroll={handleTopScroll}
                style={{ 
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  height: '20px',
                  marginBottom: '10px',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#f9fafb'
                }}
              >
                <div style={{ 
                  height: '1px',
                  width: '100%'
                }} />
              </div>

              {/* Tabela com scroll sincronizado */}
              <div 
                ref={tableScrollRef}
                onScroll={handleTableScroll}
                style={{ overflowX: 'auto' }}
              >
                <table className="alteracoes-table" style={{ 
                tableLayout: 'fixed',
                minWidth: '100%',
                width: 'fit-content'
              }}>
                <thead className="alteracoes-table-header" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                  <tr>
                    {columnOrder.map((col) => (
                      <th
                        key={col}
                        className="alteracoes-table-th sortable resizable-th"
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

                  <tr className="alteracoes-filter-row" style={{ position: 'sticky', top: '40px', zIndex: 10 }}>
                    {columnOrder.map((col) => (
                      <th key={col} className="alteracoes-table-th" style={{ width: `${columnWidths[col]}px` }}>
                        <input
                          type="text"
                          className="alteracoes-filter-input"
                          placeholder="Filtrar..."
                          value={colFilters[col]}
                          onChange={(e) => setColFilters({ ...colFilters, [col]: e.target.value })}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="alteracoes-table-body">
                  {getPaginatedData().map((item, i) => (
                    <tr key={i} className="alteracoes-table-row" onClick={() => handleRowClick(item)}>
                      {columnOrder.map((col) => (
                        <td key={col} className="alteracoes-table-td" style={{ width: `${columnWidths[col]}px` }}>
                          {col === 'valor_antigo' || col === 'valor_novo' ? (
                            item[col] || <em style={{ color: '#999' }}>vazio</em>
                          ) : col === 'data_deteccao_upload' ? (
                            formatDate(item[col] || item.data_deteccao_upload)
                          ) : col === 'uf' ? (
                            <div style={{ textAlign: 'center' }}>{item[col] || '-'}</div>
                          ) : (
                            item[col] || '-'
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* CONTROLES DE PAGINAÇÃO */}
              <div className="alteracoes-pagination">
                  <div className="alteracoes-pagination-info">
                    <span>
                      Mostrando {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalRecords)} de {totalRecords} registros
                    </span>
                    <select
                      value={pageSize}
                      onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                      className="alteracoes-page-size-select"
                    >
                      <option value={25}>25 por página</option>
                      <option value={50}>50 por página</option>
                      <option value={100}>100 por página</option>
                      <option value={200}>200 por página</option>
                    </select>
                  </div>

                  <div className="alteracoes-pagination-controls">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="alteracoes-page-btn"
                    >
                      ««
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="alteracoes-page-btn"
                    >
                      «
                    </button>

                    {getPageNumbers().map((page, idx) => (
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="alteracoes-page-ellipsis">...</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`alteracoes-page-btn ${currentPage === page ? 'active' : ''}`}
                        >
                          {page}
                        </button>
                      )
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="alteracoes-page-btn"
                    >
                      »
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="alteracoes-page-btn"
                    >
                      »»
                    </button>
                  </div>
                </div>
            </div>
            </>
          )}
        </div>
      </div>
    </ResizablePanel>
  );
};

export default AlteracoesTablePanel;
