import React, { useState } from 'react';
import { Database, Upload, CheckCircle, AlertCircle, FileText, X, Info } from 'lucide-react';
import useAuth from '../../context/useAuth';
import ResizablePanel from './ResizablePanel';
import './UploadPanel.css';

const DatabasePanel = () => {
  const { user, isAuthenticated } = useAuth();
  console.log("Dados do Usuário no React:", user); 
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (["dragenter", "dragover"].includes(e.type)) {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
        setUploadStatus(null);
        setUploadResult(null);
      } else {
        alert('Por favor, selecione apenas arquivos CSV');
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setUploadStatus(null);
        setUploadResult(null);
      } else {
        alert('Por favor, selecione apenas arquivos CSV');
      }
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadStatus(null);
    setUploadResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Selecione um arquivo primeiro!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const token = localStorage.getItem('jwt_token');
      
      const response = await fetch("http://localhost:5000/api/upload_csv", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Upload OK:", result);
      
      if (response.ok) {
        setUploadStatus('success');
        setUploadResult(result);
      } else {
        setUploadStatus('error');
        setUploadResult(result);
      }
    } catch (error) {
      console.error("Erro ao enviar arquivo:", error);
      setUploadStatus('error');
      setUploadResult({ error: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // 1. CASO: NÃO AUTENTICADO
  if (!isAuthenticated()) {
    return (
      <ResizablePanel className="full-height">
        <div className="database-panel">
          <div className="database-header">
            <Database className="database-icon-header" />
            <h2 className="database-title">Atualizar Base de Dados</h2>
          </div>

          <div className="database-content">
            <div className="database-access-denied">
              <AlertCircle size={48} className="access-denied-icon" />
              <h2 className="access-denied-title">Acesso Restrito</h2>
              <p className="access-denied-message">
                Para acessar esta opção precisa estar logado como a permissão adequada 
              </p>
              <p className="access-denied-submessage">
                Por favor, faça login na opção <strong>"Logar usuário"</strong> no menu lateral.
              </p>
            </div>
          </div>
        </div>
      </ResizablePanel>
    );
  }

  // 2. CASO: LOGADO, MAS NÃO É ADMIN
  if (user?.role !== 'admin') {
    return (
      <ResizablePanel className="full-height">
        <div className="database-panel">
          <div className="database-header">
            <Database className="database-icon-header" />
            <h2 className="database-title">Atualizar Base de Dados</h2>
          </div>
          <div className="database-content">
            <div className="database-access-denied">
              <AlertCircle size={48} className="access-denied-icon-warning" />
              <h2 className="access-denied-title">Privilégio Insuficiente</h2>
              <p className="access-denied-message-bold">
                Usuário logado, mas não autorizado a fazer upload de arquivos!
              </p>
              <p className="access-denied-submessage">
                Esta funcionalidade é restrita a administradores do sistema.
              </p>
            </div>
          </div>
        </div>
      </ResizablePanel>
    );
  }

  // 3. CASO: AUTENTICADO E ADMIN (Renderiza o painel normal abaixo)
  return (
    <ResizablePanel className="full-height">
      <div className="database-panel">
        <div className="database-header">
          <Database className="database-icon-header" />
          <h2 className="database-title">Atualizar Base de Dados</h2>
        </div>

        <div className="database-content">
          {/* Bloco 1: Informações sobre o arquivo */}
          <div className="database-instructions">
            <p className="instruction-text">
              Faça o upload do arquivo CSV atualizado disponibilizado pela Caixa Econômica Federal
            </p>
            <div className="instruction-details">
              <p><strong>Site:</strong> <a href="https://www.caixa.gov.br/site/paginas/downloads.aspx" target="_blank" rel="noopener noreferrer" className="instruction-link">https://www.caixa.gov.br/site/paginas/downloads.aspx</a></p>
              <p><strong>Opção:</strong> Orçamento Geral da União – Base de Dados</p>
              <p><strong>Arquivo:</strong> dadosBasicos.csv em BD_Gestores_dd_mm_aaaa.zip</p>
            </div>
          </div>

          {/* Bloco 2: Requisitos (separado) */}
          <div className="database-requirements">
            <p>• O arquivo deve estar no formato CSV, com todas as colunas necessárias e não pode estar aberto em outro aplicativo</p>
            <p>• O processamento pode levar alguns instantes dependendo do tamanho do arquivo</p>
            <p>• Após o processamento, a base de dados será atualizada e os registros de alteração estarão disponíveis para consulta</p>
          </div>

          {/* Área de Upload */}
          <div className="upload-section-compact">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`upload-area-compact ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
            >
              <input
                id="fileInput"
                type="file"
                accept=".csv"
                className="upload-input-hidden"
                onChange={handleFileInput}
              />

              <label htmlFor="fileInput" className="upload-label-compact">
                {file ? (
                  <div className="file-selected-compact">
                    <FileText className="file-icon" />
                    <div className="file-info-compact">
                      <p className="file-name">{file.name}</p>
                      <p className="file-size">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemoveFile();
                      }}
                      className="remove-file-button"
                      title="Remover arquivo"
                    >
                      <X className="remove-icon" />
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder-compact">
                    <Upload className="upload-icon-small" />
                    <p className="upload-text-small">Arraste o arquivo CSV aqui ou clique para selecionar</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Botão de Upload */}
          <div className="upload-button-section">
            <button
              className="upload-button"
              onClick={handleUpload}
              disabled={!file || isUploading}
            >
              {isUploading ? (
                <>
                  <Upload className="button-icon spinning" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="button-icon" />
                  Enviar arquivo
                </>
              )}
            </button>
          </div>

          {/* Mensagens de Status */}
          {uploadStatus === 'success' && (
            <div className="status-message-success">
              <CheckCircle className="status-icon" />
              <div className="status-content">
                <span className="status-title">Arquivo enviado e processado com sucesso!</span>
                {uploadResult && (
                  <div className="status-details">
                    {uploadResult.total_registros !== undefined && (
                      <p>• Total de registros processados: <strong>{uploadResult.total_registros}</strong></p>
                    )}
                    {uploadResult.registros_novos !== undefined && (
                      <p>• Registros novos: <strong>{uploadResult.registros_novos}</strong></p>
                    )}
                    {uploadResult.registros_atualizados !== undefined && (
                      <p>• Registros atualizados: <strong>{uploadResult.registros_atualizados}</strong></p>
                    )}
                    {uploadResult.registros_removidos !== undefined && (
                      <p>• Registros removidos: <strong>{uploadResult.registros_removidos}</strong></p>
                    )}
                  </div>
                )}
                
                {/* Mensagem em destaque sobre linhas excluídas */}
                {uploadResult?.linhas_excluidas !== undefined && uploadResult.linhas_excluidas > 0 && (
                  <div className="status-warning-highlight">
                    <Info className="warning-icon" />
                    <p className="warning-text">
                      <strong>{uploadResult.linhas_excluidas}</strong> {uploadResult.linhas_excluidas === 1 ? 'linha não foi carregada' : 'linhas não foram carregadas'} visto tratar-se de operações "extintas" com "execução não iniciada"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="status-message-error">
              <AlertCircle className="status-icon" />
              <div className="status-content">
                <span className="status-title">Erro ao enviar arquivo</span>
                {uploadResult?.error && (
                  <p className="status-details">{uploadResult.error}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ResizablePanel>
  );
};

export default DatabasePanel;
