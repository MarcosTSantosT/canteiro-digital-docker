CREATE TABLE IF NOT EXISTS table_caixa_dados_basicos (
    id SERIAL PRIMARY KEY,

    operacao VARCHAR(7) NOT NULL,
    dv VARCHAR(2),
    convenio_siafi INT NOT NULL,

    -- UNIQUEs solicitadas
    CONSTRAINT unique_operacao UNIQUE (operacao),
    -- ATENÇÃO: Na base original EXTINTAS com EXECUÇÃO não iniciada tem convenio_siafi = 0 
    -- Isso fere a unicidade, mas é tratado pelo código com a exclusão desses registros 
    CONSTRAINT unique_convenio_siafi UNIQUE (convenio_siafi),

    proposta VARCHAR(10),
    convenente VARCHAR(115),
    uf VARCHAR(2),
    proponente VARCHAR(255),
    cnpj_proponente VARCHAR(14),
    codigo_municipio_ibge VARCHAR(12),
    objeto VARCHAR(4000),
    municipio_beneficiado VARCHAR(100),
    enquadramento_legislacao VARCHAR(255),
    complemento_enquadramento VARCHAR(255),
    situacao_contrato VARCHAR(255),
    situacao_contrato_complemento VARCHAR(255),
    situacao_obra VARCHAR(255),
    ano_proposta SMALLINT,
    ano_orcamentario SMALLINT,
    ano_contratacao SMALLINT,
    percentual_fisico_informado NUMERIC(5, 2),
    percentual_fisico_aferido NUMERIC(5, 2),
    percentual_financeiro_desbloqueado NUMERIC(5, 2),
    data_assinatura DATE,
    data_publicacao_dou DATE,
    data_vigencia DATE,
    data_spa_homologacao DATE,
    data_vrpl DATE,
    data_aio DATE,
    data_aprovacao_pcf_caixa DATE,
    data_aprovacao_pcf_siafi DATE,
    permite_liberar_primeiro_repasse_projeto VARCHAR(3),
    valor_repasse NUMERIC(18, 2),
    valor_contrapartida NUMERIC(18, 2),
    valor_investimento NUMERIC(18, 2),
    valor_empenho NUMERIC(18, 2),
    valor_desembolsado NUMERIC(18, 2),
    valor_desbloqueado NUMERIC(18, 2),
    valor_repasse_devolvido NUMERIC(18, 2),
    valor_rendimento_devolvido NUMERIC(18, 2),
    data_ultimo_bm DATE,
    data_ultima_vistoria DATE,
    data_ultimo_desbloqueio DATE,
    data_ultima_obtv DATE,
    codigo_area SMALLINT,
    descricao_area VARCHAR(60),
    codigo_linha VARCHAR(2),
    descricao_linha VARCHAR(60),
    codigo_modalidade VARCHAR(4),
    descricao_modalidade VARCHAR(60),
    codigo_objetivo VARCHAR(3),
    descricao_objetivo VARCHAR(60),
    carteira_ativa VARCHAR(3),
    primeira_data_lae DATE,
    data_termino_obra DATE,
    situacao_atual TEXT,
    dt_atualizacao_situacao_atual DATE,
    valor_autorizado_nao_pago NUMERIC(18, 2),
    dt_inauguracao DATE
);

CREATE TABLE IF NOT EXISTS table_alteracoes (
    id SERIAL PRIMARY KEY,

    convenio_siafi INT NOT NULL,
    campo TEXT NOT NULL,
    valor_antigo TEXT,
    valor_novo TEXT,
    data_deteccao_upload TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Uso de TIMESTAMPTZ (timestamp with time zone): PostgreSQL armazena em UTC e aplica o fuso da sessão ao exibir
-- Observar que deliberadamente não há declaração de chave estrageira
-- No caso de fk um novo regitro casaria erro (pois ainda não existiria na tabela pai) 
-- table_alteracoes tem essencia de LOG HISTÓRICO (Logs não devem depender da existência atual do dado)
-- Auditoria não deve quebrar por integridade referencial

CREATE TABLE IF NOT EXISTS table_comentarios (
    id SERIAL PRIMARY KEY,

    tipo_informacao VARCHAR(100) NOT NULL,

    convenio_siafi INTEGER NOT NULL,
    CONSTRAINT fk_comentarios_convenio
        FOREIGN KEY (convenio_siafi)
        REFERENCES table_caixa_dados_basicos(convenio_siafi)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    autor VARCHAR(150) NOT NULL,

    data_criacao TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),

    texto TEXT NOT NULL,

    relevancia_comentario SMALLINT
);

CREATE TABLE IF NOT EXISTS table_arquivos_comentarios (
    arquivo_id SERIAL PRIMARY KEY,
    comentario_id INTEGER NOT NULL,
    CONSTRAINT fk_arquivo_comentario
        FOREIGN KEY (comentario_id)
        REFERENCES table_comentarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    convenio_siafi INT NOT NULL,
    nome_original VARCHAR(255) NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    tipo_arquivo VARCHAR(100),
    tamanho_bytes INTEGER NOT NULL,
    caminho_arquivo TEXT NOT NULL,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_upload VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS table_processos (
    id SERIAL PRIMARY KEY,

    convenio_siafi INT NOT NULL,
    CONSTRAINT fk_processos_convenio
        FOREIGN KEY (convenio_siafi)
        REFERENCES table_caixa_dados_basicos (convenio_siafi)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    orgao_processo VARCHAR(100) NOT NULL,
    codigo_identificacao VARCHAR(100) UNIQUE NOT NULL,
    tipo_processo VARCHAR(100),
    status_processo VARCHAR(50),
    data_informacao DATE NOT NULL,
    observacoes TEXT
);

CREATE TABLE IF NOT EXISTS table_relevancia (
    id SERIAL PRIMARY KEY,

    convenio_siafi INT NOT NULL,
    CONSTRAINT fk_relevancia_convenio
        FOREIGN KEY (convenio_siafi)
        REFERENCES table_caixa_dados_basicos (convenio_siafi)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    -- Indicadores (0 a 5)
    candidato_fiscalizacao SMALLINT CHECK (candidato_fiscalizacao BETWEEN 0 AND 5),
    observacao_candidato_fiscalizacao TEXT,

    risco_irregularidade SMALLINT CHECK (risco_irregularidade BETWEEN 0 AND 5),
    observacao_risco_irregularidade TEXT,

    interesse_socioeconomico SMALLINT CHECK (interesse_socioeconomico BETWEEN 0 AND 5),
    observacao_interesse_socioeconomico TEXT,

    destaque_midia SMALLINT CHECK (destaque_midia BETWEEN 0 AND 5),
    observacao_destaque_midia TEXT,

    objeto_denuncia_representacao BOOLEAN,
    observacao_objeto_denuncia_representacao TEXT,

    objeto_controle_orgao_externo BOOLEAN,
    observacao_objeto_controle_orgao_externo TEXT,

    objeto_processo_tcu INTEGER,
    CONSTRAINT fk_relevancia_processo
        FOREIGN KEY (objeto_processo_tcu)
        REFERENCES table_processos (id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
