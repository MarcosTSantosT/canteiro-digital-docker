import React, { useState, useRef, useEffect } from "react";
import { Briefcase, Download, ChevronDown, ChevronUp } from 'lucide-react';
import * as XLSX from 'xlsx';
import ResizablePanel from './ResizablePanel';
import './CarteiraPanel.css';
import { API_URL } from '../../services/Api';

const CarteiraPanel = ({ onSelectOperacao }) => {
  const [carteiraData, setCarteiraData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [appliedFiltersCount, setAppliedFiltersCount] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  
  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [usesBackendPagination, setUsesBackendPagination] = useState(false);

  // Estados para comboboxes
  const [convenentes, setConvenentes] = useState([]);
  const [ufs, setUfs] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [situacoesContrato, setSituacoesContrato] = useState([]);
  const [situacoesObra, setSituacoesObra] = useState([]);

  // Filtros de busca
  const [filters, setFilters] = useState({
    objeto: "",
    convenente: "",
    uf: "",
    municipio_beneficiado: "",
    situacao_contrato: "",
    situacao_obra: "",
    candidato_fiscalizacao: "",
    risco_irregularidade: "",
    interesse_socioeconomico: "",
    destaque_midia: "",
    objeto_denuncia_representacao: "",
    objeto_controle_orgao_externo: "",
    valor_investimento_min: "",
    percentual_fisico_informado_min: "",
    percentual_fisico_aferido_min: "",
    percentual_financeiro_desbloqueado_min: "",
    data_ultimo_desbloqueio_ini: "",
    data_ultimo_bm_ini: "",
    data_ultima_vistoria_ini: "",
    data_termino_obra_ini: "",
    dt_atualizacao_situacao_atual_ini: ""
  });

  // Filtros por coluna da tabela (39 colunas)
  const [colFilters, setColFilters] = useState({
    convenio_siafi: "",
    operacao: "",
    dv: "",
    convenente: "",
    objeto: "",
    proponente: "",
    uf: "",
    municipio_beneficiado: "",
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
    municipio_beneficiado: 150,
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
  const contentRef = useRef(null);
  const tableScrollRef = useRef(null);
  const topScrollRef = useRef(null);

  // Ordem das colunas
  const columnOrder = [
    'convenio_siafi', 'operacao', 'dv', 'convenente', 'objeto', 'proponente', 'uf', 'municipio_beneficiado',
    'valor_investimento', 'valor_repasse', 'valor_contrapartida', 'valor_desbloqueado', 'data_ultimo_desbloqueio',
    'valor_desembolsado', 'data_assinatura', 'data_vigencia', 'situacao_contrato', 'situacao_atual',
    'dt_atualizacao_situacao_atual', 'carteira_ativa', 'data_aio', 'situacao_obra',
    'percentual_fisico_informado', 'percentual_fisico_aferido', 'percentual_financeiro_desbloqueado',
    'data_ultimo_bm', 'data_ultima_vistoria', 'data_termino_obra',
    'candidato_fiscalizacao', 'observacao_candidato_fiscalizacao',
    'risco_irregularidade', 'observacao_risco_irregularidade',
    'interesse_socioeconomico', 'observacao_interesse_socioeconomico',
    'destaque_midia', 'observacao_destaque_midia',
    'objeto_denuncia_representacao', 'observacao_objeto_denuncia_representacao',
    'objeto_controle_orgao_externo', 'observacao_objeto_controle_orgao_externo'
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
    municipio_beneficiado: 'Município',
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

  // Carregar comboboxes
  React.useEffect(() => {
    const fetchConvenentes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/convenentes`);
        const data = await response.json();
        setConvenentes(data);
      } catch (error) {
        console.error("Erro ao carregar convenentes:", error);
      }
    };

    const fetchUfs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/ufs`);
        const data = await response.json();
        setUfs(data);
      } catch (error) {
        console.error("Erro ao carregar UFs:", error);
      }
    };

    const fetchSituacoesContrato = async () => {
      try {
        const response = await fetch(`${API_URL}/api/situacoes-contrato`);
        const data = await response.json();
        setSituacoesContrato(data);
      } catch (error) {
        console.error("Erro ao carregar situações de contrato:", error);
      }
    };

    const fetchSituacoesObra = async () => {
      try {
        const response = await fetch(`${API_URL}/api/situacoes-obra`);
        const data = await response.json();
        setSituacoesObra(data);
      } catch (error) {
        console.error("Erro ao carregar situações de obra:", error);
      }
    };

    fetchConvenentes();
    fetchUfs();
    fetchSituacoesContrato();
    fetchSituacoesObra();
  }, []);

  // Carregar municípios quando UF mudar
  React.useEffect(() => {
    const fetchMunicipios = async () => {
      if (!filters.uf) {
        setMunicipios([]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/municipios?uf=${filters.uf}`);
        const data = await response.json();
        setMunicipios(data);
      } catch (error) {
        console.error("Erro ao carregar municípios:", error);
        setMunicipios([]);
      }
    };

    fetchMunicipios();
  }, [filters.uf]);

  // Aplicar filtros por coluna
  React.useEffect(() => {
    if (!carteiraData || !Array.isArray(carteiraData)) {
      setFilteredData([]);
      return;
    }

    let filtered = [...carteiraData];

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
  }, [carteiraData, colFilters, sortColumn, sortDirection]);

  // Recalcular totalRecords e totalPages quando filteredData mudar
  React.useEffect(() => {
    if (!usesBackendPagination) {
      setTotalRecords(filteredData.length);
      setTotalPages(Math.ceil(filteredData.length / pageSize));
      // Se página atual está além do total, voltar para página 1
      if (currentPage > Math.ceil(filteredData.length / pageSize)) {
        setCurrentPage(1);
      }
    }
  }, [filteredData, pageSize, usesBackendPagination, currentPage]);  // ✅ ESLint: adicionado currentPage

  // Atualizar largura da scrollbar horizontal do topo
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

  // ==========================================
  // CARREGAR DADOS INICIAIS AO MONTAR COMPONENTE
  // ==========================================
  useEffect(() => {
    const loadInitialData = async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`${API_URL}/api/operacoes_base_completa`);
        
        if (!response.ok) {
          throw new Error("Erro ao carregar dados iniciais");
        }

        const dados = await response.json();
        const dataArray = Array.isArray(dados) ? dados : (dados.dados || dados.data || []);

        setCarteiraData(dataArray);
        setFilteredData(dataArray);  // ← CRÍTICO: Popular filteredData!
        setTotalRecords(dataArray.length);
        setTotalPages(Math.ceil(dataArray.length / pageSize));
        setCurrentPage(1);
        
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
        setCarteiraData([]);
        setFilteredData([]);  // ← CRÍTICO: Limpar filteredData!
      } finally {
        setIsSearching(false);
      }
    };

    loadInitialData();
  }, [pageSize]);  // ✅ ESLint: adicionado pageSize

  // Buscar dados no backend
  const handleSearch = async () => {
    setIsSearching(true);
    
    try {
      // Primeiro, fazer uma busca para descobrir o total de registros
      const cleanFilters = {};
      let count = 0;
      
      Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (value !== null && value !== undefined && value !== "") {
          count++; // Contar filtros aplicados
          if (key.includes('candidato_') || key.includes('risco_') || 
              key.includes('interesse_') || key.includes('destaque_') || 
              key.includes('objeto_denuncia') || key.includes('objeto_controle')) {
            cleanFilters[key] = value === "true" || value === true;
          } else {
            cleanFilters[key] = value;
          }
        }
      });

      // Fazer busca inicial para descobrir total
      const initialBody = {
        ...cleanFilters,
        page: 1,
        page_size: 1  // Apenas para saber o total
      };

      const checkResponse = await fetch(`${API_URL}/api/operacoes_fitros_paginacao`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(initialBody)
      });

      if (!checkResponse.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const checkResult = await checkResponse.json();
      const totalRecordsFound = checkResult.total || 0;
      
      // DECISÃO: Paginação LOCAL ou BACKEND?
      const useBackend = totalRecordsFound >= 1000;
      setUsesBackendPagination(useBackend);
      
      if (useBackend) {
        // PAGINAÇÃO BACKEND - Buscar apenas página atual
        console.log(`🔄 Modo BACKEND: ${totalRecordsFound} registros (muitos)`);
        
        const backendBody = {
          ...cleanFilters,
          page: currentPage,
          page_size: pageSize
        };
        
        const response = await fetch(`${API_URL}/api/operacoes_fitros_paginacao`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(backendBody)
        });
        
        const result = await response.json();
        const dados = result.dados || [];
        
        setCarteiraData(dados);
        setTotalRecords(totalRecordsFound);
        setTotalPages(result.total_pages || Math.ceil(totalRecordsFound / pageSize));
        setCurrentPage(result.page || 1);
        
      } else {
        // PAGINAÇÃO LOCAL - Buscar TODOS os registros
        console.log(`⚡ Modo LOCAL: ${totalRecordsFound} registros (poucos)`);

        const response = await fetch(`${API_URL}/api/operacoes_fitros_paginacao`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cleanFilters)
        });
        
        const result = await response.json();
        const dados = Array.isArray(result) ? result : (result.dados || result.data || []);
        
        setCarteiraData(dados);
        setTotalRecords(dados.length);
        setTotalPages(Math.ceil(dados.length / pageSize));
        setCurrentPage(1);
      }
      
      setAppliedFiltersCount(count);
      
      // Recolher filtros após aplicar
      setShowAdvancedFilters(false);
      
    } catch (error) {
      console.error("Erro ao buscar carteira:", error);
      alert("Erro ao buscar operações. Verifique os filtros e tente novamente.");
      setCarteiraData([]);
    } finally {
      setIsSearching(false);
    }
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

  // Limpar filtros
  const handleClearFilters = () => {
    setFilters({
      objeto: "",
      convenente: "",
      uf: "",
      municipio_beneficiado: "",
      situacao_contrato: "",
      situacao_obra: "",
      candidato_fiscalizacao: "",
      risco_irregularidade: "",
      interesse_socioeconomico: "",
      destaque_midia: "",
      objeto_denuncia_representacao: "",
      objeto_controle_orgao_externo: "",
      valor_investimento_min: "",
      percentual_fisico_informado_min: "",
      percentual_fisico_aferido_min: "",
      percentual_financeiro_desbloqueado_min: "",
      data_ultimo_desbloqueio_ini: "",
      data_ultimo_bm_ini: "",
      data_ultima_vistoria_ini: "",
      data_termino_obra_ini: "",
      dt_atualizacao_situacao_atual_ini: ""
    });
    setCarteiraData([]);
    setAppliedFiltersCount(0);
    setTotalRecords(0);
    setCurrentPage(1);
    setTotalPages(0);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Gerar descrição dos filtros aplicados
  const getAppliedFiltersDescription = () => {
    const descriptions = [];
    const filterLabels = {
      objeto: 'Objeto',
      convenente: 'Convenente',
      uf: 'UF',
      municipio_beneficiado: 'Município',
      situacao_contrato: 'Situação Contrato',
      situacao_obra: 'Situação Obra',
      candidato_fiscalizacao: 'Candidato Fiscalização',
      risco_irregularidade: 'Risco Irregularidade',
      interesse_socioeconomico: 'Interesse Socioeconômico',
      destaque_midia: 'Destaque Mídia',
      objeto_denuncia_representacao: 'Objeto Denúncia',
      objeto_controle_orgao_externo: 'Controle Órgão Externo',
      valor_investimento_min: 'Investimento Mín',
      percentual_fisico_informado_min: '% Físico Info Mín',
      percentual_fisico_aferido_min: '% Físico Afer Mín',
      percentual_financeiro_desbloqueado_min: '% Financeiro Mín',
      data_ultimo_desbloqueio_ini: 'Último Desbloqueio',
      data_ultimo_bm_ini: 'Último BM',
      data_ultima_vistoria_ini: 'Última Vistoria',
      data_termino_obra_ini: 'Término Obra',
      dt_atualizacao_situacao_atual_ini: 'Atualização Situação'
    };

    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== null && value !== undefined && value !== "") {
        const label = filterLabels[key] || key;
        let displayValue = value;

        // Formatar valores booleanos
        if (value === "true" || value === true) {
          displayValue = "Sim";
        } else if (value === "false" || value === false) {
          displayValue = "Não";
        }

        // Formatar datas
        if (key.includes('data_') || key.includes('dt_')) {
          const date = new Date(value);
          if (!isNaN(date)) {
            displayValue = `≥ ${date.toLocaleDateString('pt-BR')}`;
          }
        }

        // Formatar valores mínimos
        if (key.includes('_min')) {
          if (key.includes('valor_')) {
            displayValue = `≥ R$ ${parseFloat(value).toLocaleString('pt-BR')}`;
          } else if (key.includes('percentual_')) {
            let num = parseFloat(value);
            if (num > 0 && num <= 1) num = num * 100;
            displayValue = `≥ ${num}%`;
          } else {
            displayValue = `≥ ${value}`;
          }
        }

        descriptions.push({ label, value: displayValue });
      }
    });

    return descriptions;
  };

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
          'Município': item.municipio_beneficiado,
          'Investimento': item.valor_investimento,
          'Repasse': item.valor_repasse,
          'Contrapartida': item.valor_contrapartida,
          'Desbloqueado': item.valor_desbloqueado,
          'Data Último Desbloqueio': formatDate(item.data_ultimo_desbloqueio),
          'Desembolsado': item.valor_desembolsado,
          'Data Assinatura': formatDate(item.data_assinatura),
          'Data Vigência': formatDate(item.data_vigencia),
          'Situação Contrato': item.situacao_contrato,
          'Situação Atual': item.situacao_atual,
          'Data Atualização': formatDate(item.dt_atualizacao_situacao_atual),
          'Carteira Ativa': formatBoolean(item.carteira_ativa),
          'Data AIO': formatDate(item.data_aio),
          'Situação Obra': item.situacao_obra,
          '% Físico Informado': item.percentual_fisico_informado,
          '% Físico Aferido': item.percentual_fisico_aferido,
          '% Financeiro Desbloqueado': item.percentual_financeiro_desbloqueado,
          'Data Último BM': formatDate(item.data_ultimo_bm),
          'Data Última Vistoria': formatDate(item.data_ultima_vistoria),
          'Data Término Obra': formatDate(item.data_termino_obra),
          'Candidato Fiscalização': formatBoolean(item.candidato_fiscalizacao),
          'Obs. Fiscalização': item.observacao_candidato_fiscalizacao,
          'Risco Irregularidade': formatBoolean(item.risco_irregularidade),
          'Obs. Risco': item.observacao_risco_irregularidade,
          'Interesse Socioeconômico': formatBoolean(item.interesse_socioeconomico),
          'Obs. Interesse': item.observacao_interesse_socioeconomico,
          'Destaque Mídia': formatBoolean(item.destaque_midia),
          'Obs. Mídia': item.observacao_destaque_midia,
          'Denúncia': formatBoolean(item.objeto_denuncia_representacao),
          'Obs. Denúncia': item.observacao_objeto_denuncia_representacao,
          'Controle Órgão Externo': formatBoolean(item.objeto_controle_orgao_externo),
          'Obs. Controle': item.observacao_objeto_controle_orgao_externo
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Carteira');

        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const filename = `Operacoes_Resultado_Consulta_${dataFormatada}.xlsx`;

        XLSX.writeFile(workbook, filename);
      } catch (error) {
        console.error('Erro ao exportar:', error);
        alert('Erro ao exportar arquivo. Tente novamente.');
      } finally {
        setIsExporting(false);
      }
    }, 300);
  };

  // Exportar Base Completa do backend
  const exportCarteiraCompleta = async () => {
    setIsExporting(true);
    
    try {
      const response = await fetch(`${API_URL}/api/operacoes_base_completa`);
      
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
        'Operação': item.operacao,
        'DV': item.dv,
        'Convenente': item.convenente,
        'Objeto': item.objeto,
        'Proponente': item.proponente,
        'UF': item.uf,
        'Município': item.municipio_beneficiado,
        'Investimento': item.valor_investimento,
        'Repasse': item.valor_repasse,
        'Contrapartida': item.valor_contrapartida,
        'Desbloqueado': item.valor_desbloqueado,
        'Data Último Desbloqueio': formatDate(item.data_ultimo_desbloqueio),
        'Desembolsado': item.valor_desembolsado,
        'Data Assinatura': formatDate(item.data_assinatura),
        'Data Vigência': formatDate(item.data_vigencia),
        'Situação Contrato': item.situacao_contrato,
        'Situação Atual': item.situacao_atual,
        'Data Atualização': formatDate(item.dt_atualizacao_situacao_atual),
        'Carteira Ativa': formatBoolean(item.carteira_ativa),
        'Data AIO': formatDate(item.data_aio),
        'Situação Obra': item.situacao_obra,
        '% Físico Informado': item.percentual_fisico_informado,
        '% Físico Aferido': item.percentual_fisico_aferido,
        '% Financeiro Desbloqueado': item.percentual_financeiro_desbloqueado,
        'Data Último BM': formatDate(item.data_ultimo_bm),
        'Data Última Vistoria': formatDate(item.data_ultima_vistoria),
        'Data Término Obra': formatDate(item.data_termino_obra),
        'Candidato Fiscalização': formatBoolean(item.candidato_fiscalizacao),
        'Obs. Fiscalização': item.observacao_candidato_fiscalizacao,
        'Risco Irregularidade': formatBoolean(item.risco_irregularidade),
        'Obs. Risco': item.observacao_risco_irregularidade,
        'Interesse Socioeconômico': formatBoolean(item.interesse_socioeconomico),
        'Obs. Interesse': item.observacao_interesse_socioeconomico,
        'Destaque Mídia': formatBoolean(item.destaque_midia),
        'Obs. Mídia': item.observacao_destaque_midia,
        'Denúncia': formatBoolean(item.objeto_denuncia_representacao),
        'Obs. Denúncia': item.observacao_objeto_denuncia_representacao,
        'Controle Órgão Externo': formatBoolean(item.objeto_controle_orgao_externo),
        'Obs. Controle': item.observacao_objeto_controle_orgao_externo
      }));

      const worksheet = XLSX.utils.json_to_sheet(dataToExport);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Carteira Completa');

      const now = new Date();
      const dataFormatada = now.toISOString().split('T')[0];
      const filename = `Opreacoes_Base_Completa_${dataFormatada}.xlsx`;

      XLSX.writeFile(workbook, filename);
      
      alert(`Carteira completa exportada com sucesso! ${dataArray.length} registros.`);
      
    } catch (error) {
      console.error('Erro ao Exportar Base Completa:', error);
      alert('Erro ao Exportar Base Completa. Verifique a conexão com o backend.');
    } finally {
      setIsExporting(false);
    }
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

  // Funções de paginação
  const handlePageChange = async (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      
      // Se estiver usando paginação backend, buscar nova página
      if (usesBackendPagination) {
        setIsSearching(true);
        
        try {
          const cleanFilters = {};
          Object.keys(filters).forEach(key => {
            const value = filters[key];
            if (value !== null && value !== undefined && value !== "") {
              if (key.includes('candidato_') || key.includes('risco_') || 
                  key.includes('interesse_') || key.includes('destaque_') || 
                  key.includes('objeto_denuncia') || key.includes('objeto_controle')) {
                cleanFilters[key] = value === "true" || value === true;
              } else {
                cleanFilters[key] = value;
              }
            }
          });
          
          const backendBody = {
            ...cleanFilters,
            page: newPage,
            page_size: pageSize
          };
          
          const response = await fetch(`${API_URL}/api/operacoes_fitros_paginacao`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(backendBody)
          });
          
          if (response.ok) {
            const result = await response.json();
            const dados = result.dados || [];
            setCarteiraData(dados);
          }
        } catch (error) {
          console.error("Erro ao mudar página:", error);
        } finally {
          setIsSearching(false);
        }
      }
      // Se paginação local, não faz nada (getPaginatedData cuida)
    }
  };


  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setTotalPages(Math.ceil(totalRecords / newSize));
    setCurrentPage(1);
  };

  // Função de paginação local (igual AlteracoesTablePanel)
  const getPaginatedData = () => {
    // Se usa paginação backend, retorna dados direto (já vêm paginados)
    if (usesBackendPagination) {
      return carteiraData;
    }
    
    // Se usa paginação local, faz slice do filteredData
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };



  // Sincronizar scroll horizontal - barra do topo com tabela
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
      const response = await fetch(`${API_URL}/api/operacao/${item.convenio_siafi}`);
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

  React.useEffect(() => {
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
      <div className="carteira-panel carteira-panel-container">
        {/* HEADER */}
        <div className="carteira-header">
          <Briefcase className="carteira-icon-header" />
          <h2 className="carteira-title">Carteira de Operações</h2>
          
          <button
            onClick={exportCarteiraCompleta}
            className="comments-btn comments-btn-add carteira-btn-auto-margin"
            title="Exportar toda a carteira do banco de dados"
            disabled={isExporting}
          >
            <Download className="comments-btn-icon" />
            {isExporting ? 'Exportando...' : 'Exportar Base Completa'}
          </button>

          <button
            onClick={exportToExcel}
            className="comments-btn comments-btn-add carteira-btn-margin-left"
            title={`Exportar ${filteredData.length} operações filtradas para Excel`}
            disabled={filteredData.length === 0 || isExporting}
          >
            <Download className="comments-btn-icon" />
            {isExporting ? 'Exportando...' : 'Exportar Resultados'}
          </button>
        </div>

        {/* BUSCA PRINCIPAL */}
        <div className="carteira-search-section carteira-search-section-flex">
          <div className="carteira-search-wrapper">
            <input
              type="text"
              className="carteira-search-input"
              placeholder="Busca livre por texto na database de empreendimentos"
              value={filters.objeto}
              onChange={(e) => handleFilterChange('objeto', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              className="carteira-search-btn"
              onClick={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
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
            <span className="carteira-page-info">
              Filtros Avançados
            </span>
            {showAdvancedFilters ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {/* Botões de ação */}
          {showAdvancedFilters && (
            <div className="carteira-pagination-controls">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSearch();
                }}
                disabled={isSearching}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: isSearching ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: isSearching ? 0.6 : 1
                }}
                onMouseEnter={(e) => !isSearching && (e.target.style.background = '#2563eb')}
                onMouseLeave={(e) => (e.target.style.background = '#3b82f6')}
              >
                {isSearching ? 'Aplicando...' : 'Aplicar'}
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
                onMouseEnter={(e) => {
                  e.target.style.background = '#f3f4f6';
                  e.target.style.color = '#374151';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#6b7280';
                }}
              >
                Limpar
              </button>
            </div>
          )}
        </div>

        {/* RESUMO DE FILTROS APLICADOS */}
        {appliedFiltersCount > 0 && !showAdvancedFilters && (
          <div style={{
            padding: '0.75rem 1rem',
            background: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '0.375rem',
            marginBottom: '0.5rem',
            flexShrink: 0
          }}>
            {/* Cabeçalho do resumo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                padding: '0.25rem 0.75rem',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {totalRecords} registro{totalRecords !== 1 ? 's' : ''} encontrado{totalRecords !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Lista de filtros aplicados */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {getAppliedFiltersDescription().map((filter, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.375rem 0.75rem',
                    background: 'white',
                    border: '1px solid #bfdbfe',
                    borderRadius: '0.375rem',
                    fontSize: '0.75rem',
                    color: '#1e40af'
                  }}
                >
                  <span style={{ fontWeight: '600', marginRight: '0.25rem' }}>
                    {filter.label}:
                  </span>
                  <span style={{ fontWeight: '400' }}>
                    {filter.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ÁREA DE SCROLL UNIFICADA (Filtros + Tabela) */}
        <div ref={contentRef} style={{ 
          flex: 1, 
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0 0.5rem 0.5rem 0.5rem'
        }}>
          {/* FILTROS AVANÇADOS (dentro da área de scroll) */}
          {showAdvancedFilters && (
            <div 
              className="carteira-advanced-filters"
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                marginBottom: '1rem'
              }}
            >
              <div className="filters-section">
                <h4 className="filters-section-title">Campos de Texto</h4>
                <div className="filters-grid">
                  <div className="filter-item">
                    <label>Convenente:</label>
                    <select
                      value={filters.convenente}
                      onChange={(e) => handleFilterChange('convenente', e.target.value)}
                    >
                      <option value="">Todos</option>
                      {convenentes.map((conv, idx) => (
                        <option key={idx} value={conv}>{conv}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>UF:</label>
                    <select
                      value={filters.uf}
                      onChange={(e) => {
                        handleFilterChange('uf', e.target.value);
                        handleFilterChange('municipio_beneficiado', '');
                      }}
                    >
                      <option value="">Todos</option>
                      {ufs.map((uf, idx) => (
                        <option key={idx} value={uf}>{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Município Beneficiado:</label>
                    <select
                      value={filters.municipio_beneficiado}
                      onChange={(e) => handleFilterChange('municipio_beneficiado', e.target.value)}
                      disabled={!filters.uf}
                    >
                      <option value="">Todos</option>
                      {municipios.map((mun, idx) => (
                        <option key={idx} value={mun}>{mun}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Situação Contrato:</label>
                    <select
                      value={filters.situacao_contrato}
                      onChange={(e) => handleFilterChange('situacao_contrato', e.target.value)}
                    >
                      <option value="">Todos</option>
                      {situacoesContrato.map((sit, idx) => (
                        <option key={idx} value={sit}>{sit}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Situação Obra:</label>
                    <select
                      value={filters.situacao_obra}
                      onChange={(e) => handleFilterChange('situacao_obra', e.target.value)}
                    >
                      <option value="">Todos</option>
                      {situacoesObra.map((sit, idx) => (
                        <option key={idx} value={sit}>{sit}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="filters-section">
                <h4 className="filters-section-title">Valores Mínimos</h4>
                <div className="filters-grid">
                  <div className="filter-item">
                    <label>Investimento Mínimo:</label>
                    <input
                      type="number"
                      value={filters.valor_investimento_min}
                      onChange={(e) => handleFilterChange('valor_investimento_min', e.target.value)}
                      placeholder="Ex: 1000000"
                    />
                  </div>
                  <div className="filter-item">
                    <label>% Físico Informado Mín:</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={filters.percentual_fisico_informado_min}
                      onChange={(e) => handleFilterChange('percentual_fisico_informado_min', e.target.value)}
                      placeholder="Ex: 0.5 (50%)"
                    />
                  </div>
                  <div className="filter-item">
                    <label>% Físico Aferido Mín:</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={filters.percentual_fisico_aferido_min}
                      onChange={(e) => handleFilterChange('percentual_fisico_aferido_min', e.target.value)}
                      placeholder="Ex: 0.5 (50%)"
                    />
                  </div>
                  <div className="filter-item">
                    <label>% Financeiro Desbloq. Mín:</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={filters.percentual_financeiro_desbloqueado_min}
                      onChange={(e) => handleFilterChange('percentual_financeiro_desbloqueado_min', e.target.value)}
                      placeholder="Ex: 0.5 (50%)"
                    />
                  </div>
                </div>
              </div>

              <div className="filters-section">
                <h4 className="filters-section-title">Datas (a partir de)</h4>
                <div className="filters-grid">
                  <div className="filter-item">
                    <label>Último Desbloqueio:</label>
                    <input
                      type="date"
                      value={filters.data_ultimo_desbloqueio_ini}
                      onChange={(e) => handleFilterChange('data_ultimo_desbloqueio_ini', e.target.value)}
                    />
                  </div>
                  <div className="filter-item">
                    <label>Último BM:</label>
                    <input
                      type="date"
                      value={filters.data_ultimo_bm_ini}
                      onChange={(e) => handleFilterChange('data_ultimo_bm_ini', e.target.value)}
                    />
                  </div>
                  <div className="filter-item">
                    <label>Última Vistoria:</label>
                    <input
                      type="date"
                      value={filters.data_ultima_vistoria_ini}
                      onChange={(e) => handleFilterChange('data_ultima_vistoria_ini', e.target.value)}
                    />
                  </div>
                  <div className="filter-item">
                    <label>Término Obra:</label>
                    <input
                      type="date"
                      value={filters.data_termino_obra_ini}
                      onChange={(e) => handleFilterChange('data_termino_obra_ini', e.target.value)}
                    />
                  </div>
                  <div className="filter-item">
                    <label>Atualização Situação:</label>
                    <input
                      type="date"
                      value={filters.dt_atualizacao_situacao_atual_ini}
                      onChange={(e) => handleFilterChange('dt_atualizacao_situacao_atual_ini', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="filters-section">
                <h4 className="filters-section-title">Campos Sim/Não</h4>
                <div className="filters-grid">
                  <div className="filter-item">
                    <label>Candidato Fiscalização:</label>
                    <select
                      value={filters.candidato_fiscalizacao}
                      onChange={(e) => handleFilterChange('candidato_fiscalizacao', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Risco Irregularidade:</label>
                    <select
                      value={filters.risco_irregularidade}
                      onChange={(e) => handleFilterChange('risco_irregularidade', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Interesse Socioeconômico:</label>
                    <select
                      value={filters.interesse_socioeconomico}
                      onChange={(e) => handleFilterChange('interesse_socioeconomico', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Destaque Mídia:</label>
                    <select
                      value={filters.destaque_midia}
                      onChange={(e) => handleFilterChange('destaque_midia', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Objeto Denúncia:</label>
                    <select
                      value={filters.objeto_denuncia_representacao}
                      onChange={(e) => handleFilterChange('objeto_denuncia_representacao', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Controle Órgão Externo:</label>
                    <select
                      value={filters.objeto_controle_orgao_externo}
                      onChange={(e) => handleFilterChange('objeto_controle_orgao_externo', e.target.value)}
                    >
                      <option value="">Todos</option>
                      <option value="true">Sim</option>
                      <option value="false">Não</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TABELA DE RESULTADOS (dentro da área de scroll) */}
          {isSearching ? (
            <div className="carteira-loading">Buscando operações...</div>
          ) : filteredData.length === 0 ? (
            <div className="carteira-empty" style={{ 
              padding: '3rem', 
              textAlign: 'center', 
              color: '#9ca3af' 
            }}>
              {carteiraData.length === 0 ? 
                'Realize uma busca para visualizar resultados' : 
                'Nenhuma operação encontrada com os filtros aplicados'
              }
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
                <table className="carteira-table" style={{ 
                tableLayout: 'fixed',
                minWidth: '100%',
                width: 'fit-content'
              }}>
                <thead className="carteira-table-header" style={{ position: 'sticky', top: 0, zIndex: 10 }}>
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

                  <tr className="carteira-filter-row" style={{ position: 'sticky', top: '40px', zIndex: 10 }}>
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
                  {getPaginatedData().map((item, i) => (
                    <tr key={i} className="carteira-table-row" onClick={() => handleRowClick(item)}>
                      {columnOrder.map((col) => (
                        <td key={col} className="carteira-table-td" style={{ width: `${columnWidths[col]}px` }}>
                          {renderCell(col, item[col])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

              {/* CONTROLES DE PAGINAÇÃO */}
              {totalRecords > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderTop: '1px solid #e5e7eb',
                  marginTop: '1rem',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {/* Info de registros */}
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>
                      Mostrando {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalRecords)} de {totalRecords} registros
                    </span>
                    <select
                      value={pageSize}
                      onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                      style={{
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      <option value={25}>25 por página</option>
                      <option value={50}>50 por página</option>
                      <option value={100}>100 por página</option>
                      <option value={200}>200 por página</option>
                    </select>
                  </div>

                  {/* Botões de navegação */}
                  <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        background: currentPage === 1 ? '#f3f4f6' : 'white',
                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      ««
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        background: currentPage === 1 ? '#f3f4f6' : 'white',
                        color: currentPage === 1 ? '#9ca3af' : '#374151',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      «
                    </button>

                    {getPageNumbers().map((page, idx) => (
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} style={{ padding: '0.5rem', color: '#9ca3af' }}>...</span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          style={{
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.25rem',
                            background: currentPage === page ? '#3b82f6' : 'white',
                            color: currentPage === page ? 'white' : '#374151',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: currentPage === page ? '600' : '500',
                            minWidth: '2.5rem'
                          }}
                        >
                          {page}
                        </button>
                      )
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        background: currentPage === totalPages ? '#f3f4f6' : 'white',
                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      »
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '0.5rem 0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.25rem',
                        background: currentPage === totalPages ? '#f3f4f6' : 'white',
                        color: currentPage === totalPages ? '#9ca3af' : '#374151',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      »»
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>  {/* Fecha a div da área de scroll unificada */}
      </div>  {/* Fecha a div carteira-panel */}
    </ResizablePanel>
  );
};

export default CarteiraPanel;