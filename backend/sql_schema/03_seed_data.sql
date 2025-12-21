-- OBS1.: PARA "RESETAR" A TABELA USAR:
--        TRUNCATE table_relevancia, table_processos RESTART IDENTITY CASCADE;

---------------------------------------------------------------- 
-- TABELA PROCESSOS
----------------------------------------------------------------

INSERT INTO table_processos (
    convenio_siafi,
    orgao_processo,
    codigo_identificacao,
    tipo_processo,
    status_processo,
    data_informacao,
    observacoes
) VALUES
(
    873650,
    'TCU',
    'TC-012.345/2023-0',
    'Tomada de Contas Especial',
    'Em andamento',
    '2024-05-10',
    'Processo instaurado para apurar possíveis irregularidades na execução do convênio.'
),
(
    873650,
    'CGU',
    'CGU-ARQ-789/2022',
    'Auditoria',
    'Concluído',
    '2023-11-20',
    'Auditoria concluiu pela necessidade de ajustes formais na prestação de contas.'
),
(
    873650,
    'MPF',
    'MPF-INV-456/2024',
    'Procedimento Investigatório',
    'Em análise',
    '2024-08-02',
    'Investigação preliminar sobre denúncias relacionadas ao objeto do convênio.'
);

---------------------------------------------------------------- 
-- TABELA RELEVANCIA
----------------------------------------------------------------
INSERT INTO table_relevancia (
    convenio_siafi,

    candidato_fiscalizacao,
    observacao_candidato_fiscalizacao,

    risco_irregularidade,
    observacao_risco_irregularidade,

    interesse_socioeconomico,
    observacao_interesse_socioeconomico,

    destaque_midia,
    observacao_destaque_midia,

    objeto_denuncia_representacao,
    observacao_objeto_denuncia_representacao,

    objeto_controle_orgao_externo,
    observacao_objeto_controle_orgao_externo,

    objeto_processo_tcu
) VALUES
(
    873650,
    4,
    'Convênio com histórico de atrasos e ajustes contratuais.',
    3,
    'Risco moderado identificado em medições anteriores.',
    5,
    'Projeto com impacto direto em infraestrutura urbana.',
    2,
    'Pouca repercussão na mídia local.',
    TRUE,
    'Existem denúncias formais registradas.',
    TRUE,
    'Objeto de fiscalização pela CGU.',
    1
),
(
    873650,
    2,
    'Convênio já fiscalizado recentemente.',
    1,
    'Baixo risco após correções.',
    4,
    'Relevante para desenvolvimento regional.',
    1,
    'Menções pontuais em veículos regionais.',
    FALSE,
    NULL,
    TRUE,
    'Auditoria externa concluída.',
    2
),
(
    873650,
    5,
    'Convênio prioritário para fiscalização.',
    5,
    'Alto risco de irregularidades financeiras.',
    5,
    'Elevado interesse socioeconômico.',
    4,
    'Cobertura frequente na mídia.',
    TRUE,
    'Denúncias em apuração pelo MPF.',
    TRUE,
    'Em acompanhamento pelo TCU.',
    3
);


---------------------------------------------------------------- 
-- TABELA COMENTÁRIOS
----------------------------------------------------------------
INSERT INTO table_comentarios (
    tipo_informacao,
    convenio_siafi,
    autor,
    data_criacao,
    texto,
    relevancia_comentario
) VALUES
(
    'Fiscalização',
    873650,
    'Auditor TCU',
    '2024-05-12 10:30:00',
    'Durante a análise preliminar da execução do convênio, foram identificadas inconsistências entre os valores medidos e os efetivamente pagos, demandando aprofundamento das verificações.',
    5
),
(
    'Auditoria',
    873650,
    'Analista CGU',
    '2023-11-22 14:45:00',
    'A auditoria identificou falhas formais na documentação de prestação de contas, porém sem indícios imediatos de dano ao erário.',
    3
),
(
    'Denúncia',
    873650,
    'Fiscal Municipal',
    '2024-08-05 09:10:00',
    'Foi registrada denúncia acerca de possível paralisação da obra sem justificativa técnica adequada, bem como ausência de atualização tempestiva no sistema.',
    4
);

---------------------------------------------------------------- 
-- TABELA ARQUIVOS DOS COMENTÁRIOS
----------------------------------------------------------------

INSERT INTO table_arquivos_comentarios (
    comentario_id,
    convenio_siafi,
    nome_original,
    nome_arquivo,
    tipo_arquivo,
    tamanho_bytes,
    caminho_arquivo,
    usuario_upload
) VALUES
(
    1,
    873650,
    'relatorio_auditoria.pdf',
    'uuid_relatorio_auditoria.pdf',
    'application/pdf',
    245678,
    'uploads/comentarios/873650/uuid_relatorio_auditoria.pdf',
    'auditor@tcu.gov.br'
),
(
    1,
    873650,
    'planilha_medicoes.xlsx',
    'uuid_planilha_medicoes.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    187654,
    'uploads/comentarios/873650/uuid_planilha_medicoes.xlsx',
    'analista@cgu.gov.br'
),
(
    2,
    873650,
    'foto_obra_01.jpg',
    'uuid_foto_obra_01.jpg',
    'image/jpeg',
    94567,
    'uploads/comentarios/873650/uuid_foto_obra_01.jpg',
    'fiscal@prefeitura.sp.gov.br'
),
(
    3,
    873650,
    'despacho_tcu.docx',
    'uuid_despacho_tcu.docx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    123456,
    'uploads/comentarios/873650/uuid_despacho_tcu.docx',
    'usuario@tcu.gov.br'
);
