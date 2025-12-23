import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Upload, File, Image, FileText, Download, Eye } from 'lucide-react';
import * as XLSX from 'xlsx';
import useAuth from '../../context/useAuth';
import ResizablePanel from './ResizablePanel';
import './Panels.css';
import './ComentariosPanel.css';  // 
import { API_URL } from '../../services/Api';

const CommentsPanel = ({ convenioSiafi, comentarios, recarregarComentarios }) => {
  const { user, isAuthenticated } = useAuth();
  
  // Função helper para pegar ID do comentário (compatível com backend)
  const getComentarioId = (comentario) => {
    if (!comentario) return null;
    return comentario.comentario_id || comentario.id;
  };
  
  // Função para verificar se pode editar/excluir
  const canEditOrDelete = (comentario) => {
    if (!comentario || !isAuthenticated()) return false;
    
    // Admin pode editar/excluir qualquer comentário
    if (user?.role === 'admin') return true;
    
    // Usuário normal só pode editar/excluir seus próprios comentários
    const autorComentario = comentario.autor;
    const usuarioAtual = user?.name || user?.email;
    
    return autorComentario === usuarioAtual;
  };
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'create'
  const [texto, setTexto] = useState("");
  const [selecionado, setSelecionado] = useState(null); // Comentário selecionado
  const [editando, setEditando] = useState(null); // Comentário sendo editado

  const [tipoInformacao, setTipoInformacao] = useState("Comentário");
  const [relevanciaComentario, setRelevanciaComentario] = useState("");

  // Estados para upload de arquivos
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [arquivosExistentes, setArquivosExistentes] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Estado para exportação Excel
  const [isExporting, setIsExporting] = useState(false);

  function parseConvenio(convenio) {
    if (convenio === null || convenio === undefined) return null;
    const parsed = Number(String(convenio).trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  // Carregar arquivos quando abrir modal (view ou edit)
  useEffect(() => {
    if (modalOpen && (modalMode === 'view' || modalMode === 'edit')) {
      const comentario = modalMode === 'view' ? selecionado : editando;
      const id = getComentarioId(comentario);
      if (id) {
        carregarArquivosExistentes(id);
      }
    }
  }, [modalOpen, modalMode, selecionado, editando]);

  const carregarArquivosExistentes = async (comentarioId) => {
    try {
      const response = await fetch(
        `${API_URL}/api/comentarios/${comentarioId}/arquivos`
      );
      if (response.ok) {
        const data = await response.json();
        setArquivosExistentes(data);
      }
    } catch (error) {
      console.error('Erro ao carregar arquivos:', error);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Funções de Drag & Drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const deleteArquivoExistente = async (arquivoId) => {
    if (!window.confirm('Deletar este arquivo?')) return;

    try {
      const token = localStorage.getItem('jwt_token');
      const comentario = modalMode === 'edit' ? editando : selecionado;
      const id = getComentarioId(comentario);
      
      const response = await fetch(
        `${API_URL}/api/comentarios/${id}/arquivo/${arquivoId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        carregarArquivosExistentes(id);
      } else {
        alert('Erro ao deletar arquivo');
      }
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar arquivo');
    }
  };

  const uploadArquivos = async (comentarioId) => {
    if (selectedFiles.length === 0) return;

    setUploading(true);

    try {
      const token = localStorage.getItem('jwt_token');

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('convenio_siafi', convenioSiafi);

        const response = await fetch(
          `${API_URL}/api/comentarios/${comentarioId}/arquivo`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          }
        );

        if (!response.ok) {
          console.error(`Erro ao enviar ${file.name}`);
        }
      }

      setSelectedFiles([]);
      console.log('✅ Arquivos enviados com sucesso');
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao enviar arquivos');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = (file) => {
    const name = file.name || file.nome || '';
    const type = file.type || file.tipo || '';
    
    if (type.startsWith('image/') || /\.(jpg|jpeg|png|gif)$/i.test(name)) {
      return <Image size={18} />;
    }
    if (type.includes('pdf') || name.endsWith('.pdf')) {
      return <FileText size={18} />;
    }
    return <File size={18} />;
  };

  const downloadArquivo = (arquivoId) => {
    window.open(
      `${API_URL}/api/arquivo/${arquivoId}/download`,
      '_blank'
    );
  };

  // ==========================================
  // FUNÇÃO DE EXPORTAÇÃO PARA EXCEL
  // ==========================================
  const exportToExcel = () => {
    if (!comentarios || comentarios.length === 0) {
      alert('Nenhum comentário para exportar');
      return;
    }

    setIsExporting(true);

    setTimeout(() => {
      try {
        // Preparar dados para exportação
        const dataToExport = comentarios.map(comment => ({
          'Convênio SIAFI': convenioSiafi,
          'Tipo': comment.tipo_informacao,
          'Texto': comment.texto,
          'Autor': comment.autor,
          'Relevância': comment.relevancia_comentario || '',
          'Data': new Date(comment.data_criacao).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }));

        // Criar worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);

        // Ajustar largura das colunas
        worksheet['!cols'] = [
          { wch: 15 },  // Convênio
          { wch: 15 },  // Tipo
          { wch: 50 },  // Texto
          { wch: 20 },  // Autor
          { wch: 15 },  // Relevância
          { wch: 18 }   // Data
        ];

        // Criar workbook
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Comentários');

        // Nome do arquivo
        const now = new Date();
        const dataFormatada = now.toISOString().split('T')[0];
        const filename = `Comentarios_${convenioSiafi}_${dataFormatada}.xlsx`;

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

  async function incluir() {
    if (!isAuthenticated()) {
      alert('Para acessar esta opção deve-se fazer o login em "Logar usuário"');
      return;
    }

    const conv = parseConvenio(convenioSiafi);
    if (!conv) {
      alert("SIAFI inválido. Busque um convênio antes.");
      return;
    }

    const payload = {
      convenio_siafi: conv,
      texto,
      tipo_informacao: tipoInformacao,
      autor: user?.name || user?.email || "Usuário não identificado",
      relevancia_comentario: relevanciaComentario ? parseInt(relevanciaComentario) : null,
    };

    try {
      const r = await fetch(
        `${API_URL}/api/operacao/${encodeURIComponent(conv)}/comentarios`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!r.ok) {
        alert("Erro ao inserir comentário.");
        return;
      }

      const result = await r.json();
      const comentarioId = result.comentario_id || result.id;

      if (selectedFiles.length > 0 && comentarioId) {
        await uploadArquivos(comentarioId);
      }

      fecharModal();
      recarregarComentarios();
    } catch (e) {
      console.error(e);
      alert("Falha de rede.");
    }
  }

  async function salvarEdicao() {
    if (!isAuthenticated()) {
      alert('Para acessar esta opção deve-se fazer o login em "Logar usuário"');
      return;
    }

    const conv = parseConvenio(convenioSiafi);
    if (!conv) {
      alert("SIAFI inválido.");
      return;
    }

    const comentarioId = getComentarioId(editando);

    const payload = {
      texto,
      tipo_informacao: tipoInformacao,
      relevancia_comentario: relevanciaComentario ? parseInt(relevanciaComentario) : null,
    };

    try {
      const token = localStorage.getItem('jwt_token');
      const r = await fetch(
        `${API_URL}/api/operacao/${encodeURIComponent(conv)}/comentarios/${comentarioId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload),
        }
      );

      if (!r.ok) {
        alert("Erro ao editar comentário.");
        return;
      }

      if (selectedFiles.length > 0) {
        await uploadArquivos(comentarioId);
      }

      fecharModal();
      recarregarComentarios();
    } catch (e) {
      console.error(e);
      alert("Falha de rede.");
    }
  }

  async function deletar() {
    if (!isAuthenticated()) {
      alert('Para acessar esta opção deve-se fazer o login em "Logar usuário"');
      return;
    }

    if (!selecionado) {
      alert("Nenhum comentário selecionado.");
      return;
    }

    if (!window.confirm("Deletar este comentário?")) return;

    const conv = parseConvenio(convenioSiafi);
    if (!conv) {
      alert("SIAFI inválido.");
      return;
    }

    const comentarioId = getComentarioId(selecionado);

    try {
      const token = localStorage.getItem('jwt_token');
      const r = await fetch(
        `${API_URL}/api/operacao/${encodeURIComponent(conv)}/comentarios/${comentarioId}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!r.ok) {
        alert("Erro ao deletar.");
        return;
      }

      setSelecionado(null);
      recarregarComentarios();
    } catch (e) {
      console.error(e);
      alert("Falha de rede.");
    }
  }

  function abrirModalCriacao() {
    setModalMode('create');
    setTexto("");
    setTipoInformacao("Comentário");
    setRelevanciaComentario("");
    setSelectedFiles([]);
    setArquivosExistentes([]);
    setModalOpen(true);
  }

  function abrirModalEdicao(comentario) {
    if (!comentario) return;
    
    setModalMode('edit');
    setEditando(comentario);
    setTexto(comentario.texto || "");
    setTipoInformacao(comentario.tipo_informacao || "Comentário");
    setRelevanciaComentario(comentario.relevancia_comentario?.toString() || "");
    setSelectedFiles([]);
    setModalOpen(true);
  }

  function abrirModalVisualizacao(comentario) {
    if (!comentario) return;
    
    setModalMode('view');
    setSelecionado(comentario);
    setTexto(comentario.texto || "");
    setTipoInformacao(comentario.tipo_informacao || "Comentário");
    setRelevanciaComentario(comentario.relevancia_comentario?.toString() || "");
    setSelectedFiles([]);
    setModalOpen(true);
  }

  function fecharModal() {
    setModalOpen(false);
    setTexto("");
    setTipoInformacao("Comentário");
    setRelevanciaComentario("");
    setEditando(null);
    setSelectedFiles([]);
    setArquivosExistentes([]);
  }

  const handleComentarioClick = (comentario) => {
    const comentarioId = getComentarioId(comentario);
    const selecionadoId = getComentarioId(selecionado);
    
    if (selecionadoId === comentarioId) {
      abrirModalVisualizacao(comentario);
    } else {
      setSelecionado(comentario);
    }
  };

  const getModalTitle = () => {
    if (modalMode === 'view') return 'Visualizar Comentário';
    if (modalMode === 'edit') return 'Editar Comentário';
    return 'Adicionar Comentário';
  };

  const isReadOnly = modalMode === 'view';

  if (!convenioSiafi) {
    return (
      <ResizablePanel className="full-height">
        <div className="comments-panel">
          <div className="comments-header">
            <h3 className="comments-title comments-title-inactive">Comentários</h3>
            
            <div className="comments-actions">
              {/* 1. VISUALIZAR */}
              <button
                className="comments-btn comments-btn-view"
                disabled={true}
                title="Selecione uma operação para visualizar"
              >
                <Eye className="comments-btn-icon" />
              </button>

              {/* 2. ADICIONAR */}
              <button
                className="comments-btn comments-btn-add"
                disabled={true}
                title="Selecione uma operação para adicionar comentários"
              >
                <Plus className="comments-btn-icon" />
              </button>

              {/* 3. EDITAR */}
              <button
                className="comments-btn comments-btn-edit"
                disabled={true}
                title="Selecione uma operação para editar"
              >
                <Edit2 className="comments-btn-icon" />
              </button>

              {/* 4. EXCLUIR */}
              <button
                className="comments-btn comments-btn-delete"
                disabled={true}
                title="Selecione uma operação para excluir"
              >
                <Trash2 className="comments-btn-icon" />
              </button>

              {/* 5. EXPORTAR */}
              <button
                className="comments-btn comments-btn-add"
                disabled={true}
                title="Selecione uma operação para exportar"
              >
                <Download className="comments-btn-icon" />
              </button>
            </div>
          </div>
          <div className="comments-list">
            <p className="comments-empty"></p>
          </div>
        </div>
      </ResizablePanel>
    );
  }

  return (
    <ResizablePanel className="full-height">
      <div className="comments-panel">
        <div className="comments-header">
          <h3 className="comments-title">Comentários</h3>
          
          <div className="comments-actions">
            {/* 1. VISUALIZAR */}
            <button
              onClick={() => abrirModalVisualizacao(selecionado)}
              className="comments-btn comments-btn-view"
              disabled={!selecionado}
              title={!selecionado ? "Selecione um comentário" : "Visualizar comentário"}
            >
              <Eye className="comments-btn-icon" />
            </button>

            {/* 2. ADICIONAR */}
            <button
              onClick={abrirModalCriacao}
              className="comments-btn comments-btn-add"
              disabled={!isAuthenticated()}
              title="Adicionar comentário"
            >
              <Plus className="comments-btn-icon" />
            </button>

            {/* 3. EDITAR */}
            <button
              onClick={() => abrirModalEdicao(selecionado)}
              className="comments-btn comments-btn-edit"
              disabled={!selecionado || !canEditOrDelete(selecionado)}
              title={
                !selecionado 
                  ? "Selecione um comentário" 
                  : !canEditOrDelete(selecionado)
                    ? "Você só pode editar seus próprios comentários"
                    : "Editar comentário"
              }
            >
              <Edit2 className="comments-btn-icon" />
            </button>

            {/* 4. EXCLUIR */}
            <button
              onClick={deletar}
              className="comments-btn comments-btn-delete"
              disabled={!selecionado || !canEditOrDelete(selecionado)}
              title={
                !selecionado 
                  ? "Selecione um comentário" 
                  : !canEditOrDelete(selecionado)
                    ? "Você só pode excluir seus próprios comentários"
                    : "Excluir comentário"
              }
            >
              <Trash2 className="comments-btn-icon" />
            </button>

            {/* 5. EXPORTAR */}
            <button
              onClick={exportToExcel}
              className="comments-btn comments-btn-add"
              disabled={!comentarios || comentarios.length === 0 || isExporting}
              title={isExporting ? "Exportando..." : `Exportar ${comentarios?.length || 0} comentários para Excel`}
            >
              <Download className="comments-btn-icon" />
            </button>
          </div>
        </div>

        <div className="comments-list">
          {!comentarios || comentarios.length === 0 ? (
            <p className="comments-empty">Nenhum comentário encontrado.</p>
          ) : (
            comentarios.map((c) => {
              const comentarioId = getComentarioId(c);
              const selecionadoId = getComentarioId(selecionado);
              
              return (
                <div
                  key={comentarioId}
                  className={`comment-item ${selecionadoId === comentarioId ? 'selected' : ''}`}
                  onClick={() => handleComentarioClick(c)}
                  title="Clique para selecionar, clique novamente para visualizar"
                >
                  <div className="comment-meta">
                    <span className="comment-author">{c.autor}</span>
                    <span className="comment-type">{c.tipo_informacao}</span>
                    {c.relevancia_comentario && (
                      <span className="comment-relevance" title="Relevância">
                        ⭐ {c.relevancia_comentario}
                      </span>
                    )}
                  </div>
                  <p className="comment-text">{c.texto}</p>
                  <p className="comment-date">
                    {new Date(c.data_criacao).toLocaleString('pt-BR')}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {modalOpen && (
          <div className="modal-overlay">
            <div className="modal-content modal-content-large">
              <div className="modal-header">
                <h4 className="modal-title">
                  {getModalTitle()}
                </h4>
                <button className="modal-close" onClick={fecharModal}>
                  <X className="modal-close-icon" />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Tipo:</label>
                  <input
                    className="form-input"
                    value={tipoInformacao}
                    onChange={(e) => setTipoInformacao(e.target.value)}
                    disabled={isReadOnly}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Usuário:</label>
                  <input
                    className="form-input form-input-disabled"
                    value={modalMode === 'create' 
                      ? (user?.name || user?.email || "Não logado")
                      : (selecionado?.autor || editando?.autor || "")
                    }
                    disabled
                    title="Usuário que criou o comentário"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Relevância do comentário:</label>
                  <select
                    className="form-input form-select"
                    value={relevanciaComentario}
                    onChange={(e) => setRelevanciaComentario(e.target.value)}
                    disabled={isReadOnly}
                  >
                    <option value="">Selecione a relevância</option>
                    <option value="0">0 - Sem relevância</option>
                    <option value="1">1 - Muito baixa</option>
                    <option value="2">2 - Baixa</option>
                    <option value="3">3 - Média</option>
                    <option value="4">4 - Alta</option>
                    <option value="5">5 - Muito alta</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Texto:</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    disabled={isReadOnly}
                  />
                </div>

                {/* SEÇÃO DE ARQUIVOS */}
                <div className="form-group">
                  <label className="form-label">📎 Arquivos:</label>
                  
                  {/* Arquivos existentes */}
                  {arquivosExistentes.length > 0 && (
                    <div className="arquivos-existentes">
                      <p className="arquivos-subtitle">Arquivos anexados ({arquivosExistentes.length}):</p>
                      {arquivosExistentes.map(arquivo => (
                        <div key={arquivo.arquivo_id} className="arquivo-item">
                          {getFileIcon(arquivo)}
                          <div className="arquivo-info">
                            <span className="arquivo-nome">{arquivo.nome}</span>
                            <span className="arquivo-tamanho">
                              {(arquivo.tamanho / 1024).toFixed(1)} KB
                            </span>
                          </div>
                          <div className="arquivo-actions">
                            <button
                              type="button"
                              className="arquivo-btn arquivo-btn-download"
                              onClick={() => downloadArquivo(arquivo.arquivo_id)}
                              title="Download"
                            >
                              <Download size={16} />
                            </button>
                            {!isReadOnly && (
                              <button
                                type="button"
                                className="arquivo-btn arquivo-btn-delete"
                                onClick={() => deleteArquivoExistente(arquivo.arquivo_id)}
                                title="Deletar"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload de novos arquivos (apenas em create/edit) */}
                  {!isReadOnly && (
                    <div 
                      className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="file-input"
                        multiple
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                      />
                      
                      <div className="file-upload-dropzone">
                        <Upload size={24} />
                        <p className="dropzone-text">
                          Arraste arquivos aqui ou{' '}
                          <label htmlFor="file-input" className="file-upload-link">
                            clique para selecionar
                          </label>
                        </p>
                        <p className="dropzone-hint">
                          {modalMode === 'edit' ? 'Adicionar mais arquivos' : 'Suporta múltiplos arquivos'}
                        </p>
                      </div>

                      {selectedFiles.length > 0 && (
                        <div className="selected-files">
                          <p className="selected-files-title">
                            Novos arquivos selecionados ({selectedFiles.length}):
                          </p>
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="selected-file-item">
                              {getFileIcon(file)}
                              <span className="selected-file-name">{file.name}</span>
                              <span className="selected-file-size">
                                {(file.size / 1024).toFixed(1)} KB
                              </span>
                              <button
                                type="button"
                                className="remove-file-button"
                                onClick={() => removeSelectedFile(index)}
                                title="Remover"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button className="modal-btn modal-btn-cancel" onClick={fecharModal}>
                  {isReadOnly ? 'Fechar' : 'Cancelar'}
                </button>
                {!isReadOnly && (
                  <button
                    className="modal-btn modal-btn-save"
                    onClick={modalMode === 'edit' ? salvarEdicao : incluir}
                    disabled={uploading}
                  >
                    {uploading ? 'Enviando...' : selectedFiles.length > 0 ? 'Salvar e enviar arquivos' : 'Salvar'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </ResizablePanel>
  );
};

export default CommentsPanel;
