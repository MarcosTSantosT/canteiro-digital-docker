-- DADOS BÁSICOS
CREATE INDEX idx_caixa_convenio_siafi ON table_caixa_dados_basicos (convenio_siafi);
CREATE INDEX idx_caixa_operacao ON table_caixa_dados_basicos (operacao);
CREATE INDEX idx_caixa_ano ON table_caixa_dados_basicos (ano_proposta);
CREATE INDEX idx_caixa_data_assinatura ON table_caixa_dados_basicos (data_assinatura);
CREATE INDEX idx_dados_basicos_uf_municipio ON table_caixa_dados_basicos (uf, municipio_beneficiado);


-- ALTERAÇÕES
CREATE INDEX idx_alteracoes_campo ON table_alteracoes (campo);
CREATE INDEX idx_alteracoes_data ON table_alteracoes (data_deteccao_upload);
CREATE INDEX idx_dados_basicos_uf ON table_caixa_dados_basicos (uf);
CREATE INDEX idx_dados_basicos_municipio ON table_caixa_dados_basicos (municipio_beneficiado);

-- COMENTÁRIOS
CREATE INDEX idx_comentarios_convenio ON table_comentarios(convenio_siafi);