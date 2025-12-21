from datetime import datetime
from sqlalchemy.sql import text
from .. import db
from flask import current_app
from sqlalchemy import create_engine
import pandas as pd
import os
from decimal import Decimal
from sqlalchemy.types import Numeric, Date, Integer, SmallInteger, String
from sqlalchemy.exc import SQLAlchemyError
from math import ceil # usado na paginação
import chardet

# ==========================================
# FUNÇÃO DE TESTE DE CONEXÃO COM O POSTGRESQL
# Verifica se a aplicação consegue conectar ao
# banco e imprime a versão instalada.
# Utilizada principalmente para debug.
# ==========================================
def testar_conexao_postgreSQL():
    DATABASE_URI = current_app.config['SQLALCHEMY_DATABASE_URI']
    print(f"Tentando conectar em: {DATABASE_URI}") 

    try:
        engine = create_engine(DATABASE_URI)
        with engine.connect() as conn:
            result = conn.execute(text("SELECT version();"))
            print("✅ Conectado com sucesso!")
            print(f"Versão do PostgreSQL: {result.fetchone()}")

    except Exception as e:
        print("❌ Erro de conexão:", e)

############################################################################### DESATUALIZADA
# ==========================================
# FUNÇÃO DE CONSULTA DA CARTEIRA COMPLETA
# Retorna uma lista de convênios incluindo
# informações resumidas de relevância.
# Utilizada para montar tabelas no frontend.
# ==========================================

def get_carteira(): 
    sql_query = text("""
        SELECT 
            c.convenio_siafi,
            c.operacao,
            c.dv,
            c.convenente,
            c.objeto,
            c.proponente,
            c.uf,
            c.valor_investimento,
            c.valor_repasse,
            c.valor_contrapartida,
            c.valor_desbloqueado,
            c.data_ultimo_desbloqueio,
            c.valor_desembolsado,
            c.data_assinatura,
            c.data_vigencia,
            c.situacao_contrato,
            c.situacao_atual,
            c.dt_atualizacao_situacao_atual,
            c.carteira_ativa,
            c.data_aio,
            c.situacao_obra,
            c.percentual_fisico_informado,
            c.percentual_fisico_aferido,
            c.percentual_financeiro_desbloqueado,
            c.data_ultimo_bm,
            c.data_ultima_vistoria,
            c.data_termino_obra,

            r.candidato_fiscalizacao,
            r.observacao_candidato_fiscalizacao,
            r.risco_irregularidade,
            r.observacao_risco_irregularidade,
            r.interesse_socioeconomico,
            r.observacao_interesse_socioeconomico,
            r.destaque_midia,
            r.observacao_destaque_midia,
            r.objeto_denuncia_representacao,
            r.observacao_objeto_denuncia_representacao,
            r.objeto_controle_orgao_externo,
            r.observacao_objeto_controle_orgao_externo

        FROM table_caixa_dados_basicos c
        LEFT JOIN table_relevancia r
            ON c.convenio_siafi = r.convenio_siafi
    """)

    try:
        result = db.session.execute(sql_query).mappings().all()
        return [dict(r) for r in result]

    except Exception as e:
        db.session.rollback()
        print(f"Erro ao consultar carteira: {e}")
        raise

# ==========================================
# FUNÇÃO DE CONSULTA DE DADOS DE UM CONVÊNIO
# Retorna todas as informações básicas do convênio,
# juntamente com os dados de relevância associados
# (JOIN 1:1). Usada ao abrir a tela de detalhes.
# ==========================================
def find_dados_convenio_by_siafi(convenio_siafi):

    sql_query = text("""
        SELECT 
            c.convenio_siafi,
            c.operacao,
            c.dv,
            c.convenente,
            c.objeto,
            c.proponente,
            c.municipio_beneficiado,
            c.uf,
            c.valor_investimento,
            c.valor_repasse,
            c.valor_contrapartida,
            c.valor_desbloqueado,
            c.data_ultimo_desbloqueio,
            c.valor_desembolsado,
            c.data_assinatura,
            c.data_vigencia,
            c.situacao_contrato,
            c.situacao_atual,
            c.dt_atualizacao_situacao_atual,
            c.carteira_ativa,
            c.data_aio,
            c.situacao_obra,
            c.percentual_fisico_informado,
            c.percentual_fisico_aferido,
            c.percentual_financeiro_desbloqueado,
            c.data_ultimo_bm,
            c.data_ultima_vistoria,
            c.data_termino_obra,

            r.candidato_fiscalizacao,
            r.observacao_candidato_fiscalizacao,
            r.risco_irregularidade,
            r.observacao_risco_irregularidade,
            r.interesse_socioeconomico,
            r.observacao_interesse_socioeconomico,
            r.destaque_midia,
            r.observacao_destaque_midia,
            r.objeto_denuncia_representacao,
            r.observacao_objeto_denuncia_representacao,
            r.objeto_controle_orgao_externo,
            r.observacao_objeto_controle_orgao_externo

        FROM table_caixa_dados_basicos c
        LEFT JOIN table_relevancia r
            ON c.convenio_siafi = r.convenio_siafi

        WHERE c.convenio_siafi = :id_param
    """)

    try:
        result = db.session.execute(sql_query, {"id_param": convenio_siafi})
        row = result.mappings().fetchone()

        return dict(row) if row else None

    except Exception as e:
        db.session.rollback()
        print(f"Erro na consulta find_dados_convenio_by_siafi: {e}")
        raise


# ============================================================
# FUNÇÕES RELACIONADAS A UPLOAD E BASE ALTERAÇÕES
# ============================================================

# ============================================================
# LEITURA E PRÉ-PROCESSAMENTO DO CSV
# ============================================================

def detect_csv_encoding(csv_path: str, sample_size: int = 100_000) -> str:
    """
    Detecta a codificação provável do arquivo CSV.
    """
    with open(csv_path, "rb") as f:
        raw = f.read(sample_size)

    result = chardet.detect(raw)
    encoding = result.get("encoding") or "utf-8"

    return encoding

def read_and_prepare_csv(csv_path: str) -> pd.DataFrame:

    if not os.path.exists(csv_path):
        raise FileNotFoundError(f"Arquivo não encontrado: {csv_path}")

    # Detecta encoding automaticamente
    encoding = detect_csv_encoding(csv_path)
    print(f"[CSV] Encoding detectado: {encoding}")

    df = pd.read_csv(
        csv_path,
        delimiter=";",
        encoding=encoding,
        dtype=str,
        keep_default_na=False
    )

    df.dropna(how="all", inplace=True)

    # Padronização do nome das colunas
    df.columns = (
        df.columns
        .str.strip()
        .str.lower()
        .str.replace(" ", "_")
        .str.replace("-", "_")
    )

    # Correções conhecidas
    df.rename(columns={
        "situacao_contrato_complmento": "situacao_contrato_complemento",
        "concedente": "convenente"
    }, inplace=True)

    return df


# ============================================================
# DEFINIÇÃO DE TIPOS DE CAMPOS (normalize_dataframe E build_dtype_map)
# ============================================================
DATE_COLS = [
    "data_assinatura", "data_publicacao_dou", "data_vigencia",
    "data_spa_homologacao", "data_vrpl", "data_aio",
    "data_aprovacao_pcf_caixa", "data_aprovacao_pcf_siafi",
    "data_ultimo_bm", "data_ultima_vistoria",
    "data_ultimo_desbloqueio", "data_ultima_obtv",
    "primeira_data_lae", "data_termino_obra",
    "dt_atualizacao_situacao_atual", "dt_inauguracao"
]

MOEDA_COLS = [
    "valor_repasse", "valor_contrapartida", "valor_total",
    "valor_executado", "valor_investimento", "valor_empenho",
    "valor_desembolsado", "valor_desbloqueado",
    "valor_repasse_devolvido", "valor_rendimento_devolvido",
    "valor_autorizado_nao_pago"
]

PERCENT_COLS = [
    "percentual_executado", "percentual_pago",
    "percentual_fisico_informado", "percentual_fisico_aferido",
    "percentual_financeiro_desbloqueado"
]

SMALLINT_COLS = [
    "ano_proposta", "ano_orcamentario", "ano_contratacao",
    "codigo_area", "codigo_linha", "codigo_modalidade", "codigo_objetivo"
]

STR_COLS = [
    "proponente", "cnpj_proponente", "municipio_beneficiado",
    "descricao_objetivo", "descricao_area",
    "situacao_contrato", "codigo_municipio_ibge"
]

YES_NO_COLS = [
    "carteira_ativa",
    "permite_liberar_primeiro_repasse_projeto"
]

# ============================================================
# CONVERSÕES E NORMALIZAÇÃO
# ============================================================


# Mojibake (文字化け, do japonês "transformação de caracteres") é o texto ilegível ou distorcido que 
# aparece quando um programa de computador tenta decodificar um texto usando uma codificação de caracteres 
# diferente daquela em que foi originalmente codificado
# Nessa caso colunas sim/não havia o string nÃ£o
# Posteriormente foi implementada a função detect_csv_encoding, mas foi mantida a fix_mojibake como fallback
def fix_mojibake(x):
    if not x or pd.isna(x):
        return None
    try:
        return x.encode("latin1").decode("utf-8")
    except Exception:
        return x


def to_date(x):
    if not x or pd.isna(x):
        return None
    return pd.to_datetime(x, errors="coerce", dayfirst=True).date()


def to_decimal(x):
    if not x or pd.isna(x):
        return None
    try:
        return Decimal(str(x).replace(".", "").replace(",", "."))
    except Exception:
        return None


def normalize_string(x):
    if not x or pd.isna(x):
        return None
    x = fix_mojibake(str(x))
    return x.strip().upper()


def normalize_yes_no(x):
    if not x or pd.isna(x):
        return None

    x = fix_mojibake(str(x)).strip().upper()

    if x in {"SIM", "S"}:
        return "SIM"
    if x in {"NÃO", "NAO", "N"}:
        return "NAO"

    return None


def normalize_dataframe(df: pd.DataFrame) -> pd.DataFrame:

    # -----------------------------------------------------
    # Normalização e filtro do convenio_siafi
    # -----------------------------------------------------
    if "convenio_siafi" not in df.columns:
        raise Exception("Coluna 'convenio_siafi' não encontrada no CSV.")

    df["convenio_siafi"] = (
        df["convenio_siafi"]
        .astype(str)
        .str.replace(r"\D+", "", regex=True)
    )

    df["convenio_siafi"] = pd.to_numeric(df["convenio_siafi"], errors="coerce")

    # Conta linhas antes
    linhas_antes = len(df)

    # Remove NaN e zero
    # ATENÇÃO: Na base original EXTINTAS com EXECUÇÃO não iniciada tem convenio_siafi = 0 
    # Isso fere a unicidade, mas é tratado pelo código com a exclusão desses registros  
    df = df[(~df["convenio_siafi"].isna()) & (df["convenio_siafi"] != 0)].copy()

    # Conta removidas
    linhas_removidas = linhas_antes - len(df)

    # Log informativo (ajuste para logger se quiser)
    print(f"[normalize_dataframe] Linhas removidas (convenio_siafi inválido ou zero): {linhas_removidas}")

    # Converte para inteiro
    df["convenio_siafi"] = df["convenio_siafi"].astype("int64")

    # -----------------------------------------------------
    # SMALLINT
    # -----------------------------------------------------
    for col in SMALLINT_COLS:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce").astype("Int16")

    # -----------------------------------------------------
    # Datas
    # -----------------------------------------------------
    for col in DATE_COLS:
        if col in df.columns:
            df[col] = df[col].map(to_date)

    # -----------------------------------------------------
    # Moedas e percentuais
    # -----------------------------------------------------
    for col in MOEDA_COLS + PERCENT_COLS:
        if col in df.columns:
            df[col] = df[col].map(to_decimal)

    # -----------------------------------------------------
    # SIM / NÃO
    # -----------------------------------------------------
    for col in YES_NO_COLS:
        if col in df.columns:
            df[col] = df[col].map(normalize_yes_no)

    # -----------------------------------------------------
    # Strings genéricas
    # -----------------------------------------------------
    for col in STR_COLS:
        if col in df.columns:
            df[col] = df[col].map(normalize_string)

    return df, linhas_removidas


# ============================================================
# CRIA MAPA DE TIPOS SQLALCHEMY
# ============================================================
def build_dtype_map(df: pd.DataFrame) -> dict:

    dtype_map = {"convenio_siafi": Integer()}

    for col in SMALLINT_COLS:
        if col in df.columns:
            dtype_map[col] = SmallInteger()

    for col in MOEDA_COLS:
        if col in df.columns:
            dtype_map[col] = Numeric(18, 2)

    for col in PERCENT_COLS:
        if col in df.columns:
            dtype_map[col] = Numeric(10, 4)

    for col in DATE_COLS:
        if col in df.columns:
            dtype_map[col] = Date()

    for col in STR_COLS:
        if col in df.columns:
            dtype_map[col] = String()

    return dtype_map


# ============================================================
# FUNÇÃO PRINCIPAL (CHAMADA PELO FRONTEND)
# ============================================================
def load_csv_with_diff_log():

    CSV_FILE_PATH = current_app.config["CSV_FILE_PATH"]
    DATABASE_URI = current_app.config["SQLALCHEMY_DATABASE_URI"]

    # -----------------------------------------------------
    # LEITURA + NORMALIZAÇÃO
    # -----------------------------------------------------
    df = read_and_prepare_csv(CSV_FILE_PATH)
    df, linhas_excluidas = normalize_dataframe(df)
    dtype_map = build_dtype_map(df)

    engine = create_engine(DATABASE_URI)

    # -----------------------------------------------------
    # CARGA DA TABELA TEMP (STAGING)
    # -----------------------------------------------------
    df.to_sql(
        "table_caixa_dados_basicos_temp",
        con=engine,
        if_exists="replace",
        index=False,
        dtype=dtype_map
    )

    # -----------------------------------------------------
    # SQL — LOG DE INCLUSÕES
    # -----------------------------------------------------
    incluidos_sql = """
        INSERT INTO table_alteracoes (
            convenio_siafi,
            campo,
            valor_antigo,
            valor_novo
        )
        SELECT
            t.convenio_siafi,
            'Registro incluído',
            NULL,
            NULL
        FROM table_caixa_dados_basicos_temp t
        LEFT JOIN table_caixa_dados_basicos d
            ON d.convenio_siafi = t.convenio_siafi
        WHERE d.convenio_siafi IS NULL;
    """

    # -----------------------------------------------------
    # SQL — LOG DE EXCLUSÕES
    # -----------------------------------------------------
    excluidos_sql = """
        INSERT INTO table_alteracoes (
            convenio_siafi,
            campo,
            valor_antigo,
            valor_novo
        )
        SELECT
            d.convenio_siafi,
            'Registro excluído',
            NULL,
            NULL
        FROM table_caixa_dados_basicos d
        LEFT JOIN table_caixa_dados_basicos_temp t
            ON d.convenio_siafi = t.convenio_siafi
        WHERE t.convenio_siafi IS NULL;
    """

    # -----------------------------------------------------
    # SQL — LOG DE ALTERAÇÕES (CAMPOS ESPECÍFICOS)
    # -----------------------------------------------------
    # CROSS JOIN LATERAL => “Desnormaliza” cada linha em várias comparações. Para cada convênio, cria uma linha por campo comparado
    # São registradas alterações apenas dos campos especificados em CROSS JOIN LATERAL
    diff_sql = """
        INSERT INTO table_alteracoes (
            convenio_siafi,
            campo,
            valor_antigo,
            valor_novo
        )
        SELECT
            d.convenio_siafi,

            CASE col.campo
                WHEN 'situacao_contrato' THEN 'Alteração da situação do contrato'
                WHEN 'situacao_obra' THEN 'Alteração da situação da obra'
                WHEN 'data_vrpl' THEN 'Emissão de VRPL'
                WHEN 'data_aio' THEN 'Emissão de AIO'
                WHEN 'data_ultima_vistoria' THEN 'Realização de vistoria'
                WHEN 'data_ultimo_desbloqueio' THEN 'Realização de desbloqueio'
                ELSE col.campo
            END AS campo,

            col.valor_antigo,
            col.valor_novo
        FROM table_caixa_dados_basicos d
        JOIN table_caixa_dados_basicos_temp t
            ON d.convenio_siafi = t.convenio_siafi
        CROSS JOIN LATERAL (
            VALUES
                ('situacao_contrato', d.situacao_contrato::text, t.situacao_contrato::text),
                ('situacao_obra', d.situacao_obra::text, t.situacao_obra::text),
                ('data_vrpl', d.data_vrpl::text, t.data_vrpl::text),
                ('data_aio', d.data_aio::text, t.data_aio::text),
                ('data_ultima_vistoria', d.data_ultima_vistoria::text, t.data_ultima_vistoria::text),
                ('data_ultimo_desbloqueio', d.data_ultimo_desbloqueio::text, t.data_ultimo_desbloqueio::text)
        ) AS col(campo, valor_antigo, valor_novo)
        WHERE col.valor_antigo IS DISTINCT FROM col.valor_novo;
    """
    ## Uma alternativa seria considerar o valor do desbloqueio e não a data
    
        # -----------------------------------------------------
    # SQL — INSERT (NOVOS REGISTROS)
    # -----------------------------------------------------
    insert_dados_basicos_sql = """
        INSERT INTO table_caixa_dados_basicos (
            operacao, dv, convenio_siafi, proposta, convenente, uf,
            proponente, cnpj_proponente, codigo_municipio_ibge, objeto,
            municipio_beneficiado, enquadramento_legislacao, complemento_enquadramento,
            situacao_contrato, situacao_contrato_complemento, situacao_obra,
            ano_proposta, ano_orcamentario, ano_contratacao,
            percentual_fisico_informado, percentual_fisico_aferido,
            percentual_financeiro_desbloqueado,
            data_assinatura, data_publicacao_dou, data_vigencia,
            data_spa_homologacao, data_vrpl, data_aio,
            data_aprovacao_pcf_caixa, data_aprovacao_pcf_siafi,
            permite_liberar_primeiro_repasse_projeto,
            valor_repasse, valor_contrapartida, valor_investimento,
            valor_empenho, valor_desembolsado, valor_desbloqueado,
            valor_repasse_devolvido, valor_rendimento_devolvido,
            data_ultimo_bm, data_ultima_vistoria, data_ultimo_desbloqueio,
            data_ultima_obtv, codigo_area, descricao_area,
            codigo_linha, descricao_linha, codigo_modalidade,
            descricao_modalidade, codigo_objetivo, descricao_objetivo,
            carteira_ativa, primeira_data_lae, data_termino_obra,
            situacao_atual, dt_atualizacao_situacao_atual,
            valor_autorizado_nao_pago, dt_inauguracao
        )
        SELECT
            t.operacao,
            t.dv,
            t.convenio_siafi,
            t.proposta,
            t.convenente,
            t.uf,
            t.proponente,
            t.cnpj_proponente,
            t.codigo_municipio_ibge,
            t.objeto,
            t.municipio_beneficiado,
            t.enquadramento_legislacao,
            t.complemento_enquadramento,
            t.situacao_contrato,
            t.situacao_contrato_complemento,
            t.situacao_obra,
            t.ano_proposta,
            t.ano_orcamentario,
            t.ano_contratacao,
            t.percentual_fisico_informado,
            t.percentual_fisico_aferido,
            t.percentual_financeiro_desbloqueado,
            t.data_assinatura,
            t.data_publicacao_dou,
            t.data_vigencia,
            t.data_spa_homologacao,
            t.data_vrpl,
            t.data_aio,
            t.data_aprovacao_pcf_caixa,
            t.data_aprovacao_pcf_siafi,
            t.permite_liberar_primeiro_repasse_projeto,
            t.valor_repasse,
            t.valor_contrapartida,
            t.valor_investimento,
            t.valor_empenho,
            t.valor_desembolsado,
            t.valor_desbloqueado,
            t.valor_repasse_devolvido,
            t.valor_rendimento_devolvido,
            t.data_ultimo_bm,
            t.data_ultima_vistoria,
            t.data_ultimo_desbloqueio,
            t.data_ultima_obtv,
            t.codigo_area,
            t.descricao_area,
            t.codigo_linha,
            t.descricao_linha,
            t.codigo_modalidade,
            t.descricao_modalidade,
            t.codigo_objetivo,
            t.descricao_objetivo,
            t.carteira_ativa,
            t.primeira_data_lae,
            t.data_termino_obra,
            t.situacao_atual,
            t.dt_atualizacao_situacao_atual,
            t.valor_autorizado_nao_pago,
            t.dt_inauguracao
        FROM table_caixa_dados_basicos_temp t
        WHERE NOT EXISTS (
            SELECT 1
            FROM table_caixa_dados_basicos d
            WHERE d.convenio_siafi = t.convenio_siafi
        );
    """

    # -----------------------------------------------------
    # SQL — UPDATE (REGISTROS EXISTENTES)
    # -----------------------------------------------------
    update_dados_basicos_sql = """
        UPDATE table_caixa_dados_basicos d
        SET
            operacao = t.operacao,
            dv = t.dv,
            proposta = t.proposta,
            convenente = t.convenente,
            uf = t.uf,
            proponente = t.proponente,
            cnpj_proponente = t.cnpj_proponente,
            codigo_municipio_ibge = t.codigo_municipio_ibge,
            objeto = t.objeto,
            municipio_beneficiado = t.municipio_beneficiado,
            enquadramento_legislacao = t.enquadramento_legislacao,
            complemento_enquadramento = t.complemento_enquadramento,
            situacao_contrato = t.situacao_contrato,
            situacao_contrato_complemento = t.situacao_contrato_complemento,
            situacao_obra = t.situacao_obra,
            ano_proposta = t.ano_proposta,
            ano_orcamentario = t.ano_orcamentario,
            ano_contratacao = t.ano_contratacao,
            percentual_fisico_informado = t.percentual_fisico_informado,
            percentual_fisico_aferido = t.percentual_fisico_aferido,
            percentual_financeiro_desbloqueado = t.percentual_financeiro_desbloqueado,
            data_assinatura = t.data_assinatura,
            data_publicacao_dou = t.data_publicacao_dou,
            data_vigencia = t.data_vigencia,
            data_spa_homologacao = t.data_spa_homologacao,
            data_vrpl = t.data_vrpl,
            data_aio = t.data_aio,
            data_aprovacao_pcf_caixa = t.data_aprovacao_pcf_caixa,
            data_aprovacao_pcf_siafi = t.data_aprovacao_pcf_siafi,
            permite_liberar_primeiro_repasse_projeto = t.permite_liberar_primeiro_repasse_projeto,
            valor_repasse = t.valor_repasse,
            valor_contrapartida = t.valor_contrapartida,
            valor_investimento = t.valor_investimento,
            valor_empenho = t.valor_empenho,
            valor_desembolsado = t.valor_desembolsado,
            valor_desbloqueado = t.valor_desbloqueado,
            valor_repasse_devolvido = t.valor_repasse_devolvido,
            valor_rendimento_devolvido = t.valor_rendimento_devolvido,
            data_ultimo_bm = t.data_ultimo_bm,
            data_ultima_vistoria = t.data_ultima_vistoria,
            data_ultimo_desbloqueio = t.data_ultimo_desbloqueio,
            data_ultima_obtv = t.data_ultima_obtv,
            codigo_area = t.codigo_area,
            descricao_area = t.descricao_area,
            codigo_linha = t.codigo_linha,
            descricao_linha = t.descricao_linha,
            codigo_modalidade = t.codigo_modalidade,
            descricao_modalidade = t.descricao_modalidade,
            codigo_objetivo = t.codigo_objetivo,
            descricao_objetivo = t.descricao_objetivo,
            carteira_ativa = t.carteira_ativa,
            primeira_data_lae = t.primeira_data_lae,
            data_termino_obra = t.data_termino_obra,
            situacao_atual = t.situacao_atual,
            dt_atualizacao_situacao_atual = t.dt_atualizacao_situacao_atual,
            valor_autorizado_nao_pago = t.valor_autorizado_nao_pago,
            dt_inauguracao = t.dt_inauguracao
        FROM table_caixa_dados_basicos_temp t
        WHERE d.convenio_siafi = t.convenio_siafi;
    """

    # -----------------------------------------------------
    # SQL — DELETE (REGISTROS REMOVIDOS)
    # -----------------------------------------------------
    delete_dados_basicos_sql = """
        DELETE FROM table_caixa_dados_basicos d
        WHERE NOT EXISTS (
            SELECT 1
            FROM table_caixa_dados_basicos_temp t
            WHERE t.convenio_siafi = d.convenio_siafi
        );
    """

    # =====================================================
    # 🔴 EXECUÇÃO CORRETA (LOG → DADOS)
    # =====================================================

    with engine.begin() as conn:
        inclusoes = conn.execute(text(incluidos_sql)).rowcount
        exclusoes = conn.execute(text(excluidos_sql)).rowcount
        alteracoes = conn.execute(text(diff_sql)).rowcount

        conn.execute(text(insert_dados_basicos_sql))
        conn.execute(text(update_dados_basicos_sql))
        conn.execute(text(delete_dados_basicos_sql))

    # -----------------------------------------------------
    # LIMPEZA
    # -----------------------------------------------------
    with engine.begin() as conn:
        conn.execute(text("DROP TABLE IF EXISTS table_caixa_dados_basicos_temp"))

    return {
        "status": "ok",
        "total_registros": len(df),
        "linhas_excluidas": linhas_excluidas, # Foram descartadas no upload convenio_siafi = 0
        "registros_novos": inclusoes,
        "registros_atualizados": alteracoes,
        "registros_removidos": exclusoes
    }


# -----------------------------------------------------
# FUNÇÃO — LISTAR UFs
# Retorna todas as Unidades da Federação distintas
# existentes na base de dados.
# Utilizada para filtros e comboboxes no frontend.
# -----------------------------------------------------
def listar_ufs():
    sql = text("""
        SELECT DISTINCT uf
        FROM table_caixa_dados_basicos
        WHERE uf IS NOT NULL
        ORDER BY uf
    """)

    result = db.session.execute(sql)
    return [row.uf for row in result]

# -----------------------------------------------------
# FUNÇÃO — LISTAR MUNICÍPIOS POR UF
# Retorna os municípios beneficiados associados
# a uma UF específica.
# Utilizada em filtros dependentes no frontend.
# -----------------------------------------------------
def listar_municipios_por_uf(uf):
    if not uf:
        return []

    sql = text("""
        SELECT DISTINCT municipio_beneficiado
        FROM table_caixa_dados_basicos
        WHERE uf = :uf
          AND municipio_beneficiado IS NOT NULL
        ORDER BY municipio_beneficiado
    """)

    result = db.session.execute(sql, {"uf": uf})
    return [row.municipio_beneficiado for row in result]

# -----------------------------------------------------
# FUNÇÃO — LISTAR CONVENENTES
# Retorna os convenentes distintos cadastrados
# na base de dados.
# Utilizada como filtro no frontend.
# -----------------------------------------------------
def listar_convenentes():
    sql = text("""
        SELECT DISTINCT convenente
        FROM table_caixa_dados_basicos
        WHERE convenente IS NOT NULL
        ORDER BY convenente
    """)

    result = db.session.execute(sql)
    return [row.convenente for row in result]

# -----------------------------------------------------
# FUNÇÃO — LISTAR SITUAÇÕES DE CONTRATO
# Retorna as situações de contrato distintas
# existentes na base de dados.
# Utilizada como filtro no frontend.
# -----------------------------------------------------
def listar_situacoes_contrato():
    sql = text("""
        SELECT DISTINCT situacao_contrato
        FROM table_caixa_dados_basicos
        WHERE situacao_contrato IS NOT NULL
        ORDER BY situacao_contrato
    """)

    result = db.session.execute(sql)
    return [row.situacao_contrato for row in result]

# -----------------------------------------------------
# FUNÇÃO — LISTAR SITUAÇÕES DE OBRA
# Retorna as situações de obra distintas
# existentes na base de dados.
# Utilizada como filtro no frontend.
# -----------------------------------------------------
def listar_situacoes_obra():
    sql = text("""
        SELECT DISTINCT situacao_obra
        FROM table_caixa_dados_basicos
        WHERE situacao_obra IS NOT NULL
        ORDER BY situacao_obra
    """)

    result = db.session.execute(sql)
    return [row.situacao_obra for row in result]

# -----------------------------------------------------
# FUNÇÃO — CONSULTAR CONVÊNIOS COM FILTROS
# Realiza consulta dinâmica de convênios aplicando
# filtros opcionais enviados pelo frontend.
# Suporta filtros textuais, numéricos e de data.
# -----------------------------------------------------

# A função find_convenios_filtrados original deve ser mantida
# para compatibilidade com código que não usa paginação
def find_convenios_filtrados(filters: dict):
    """
    Consulta convênios com filtros opcionais vindos do frontend.
    """

    base_sql = """
        SELECT 
            c.convenio_siafi,
            c.operacao,
            c.dv,
            c.convenente,
            c.objeto,
            c.proponente,
            c.uf,
            c.municipio_beneficiado,
            c.valor_investimento,
            c.valor_repasse,
            c.valor_contrapartida,
            c.valor_desbloqueado,
            c.data_ultimo_desbloqueio,
            c.valor_desembolsado,
            c.data_assinatura,
            c.data_vigencia,
            c.situacao_contrato,
            c.situacao_atual,
            c.dt_atualizacao_situacao_atual,
            c.carteira_ativa,
            c.data_aio,
            c.situacao_obra,
            c.percentual_fisico_informado,
            c.percentual_fisico_aferido,
            c.percentual_financeiro_desbloqueado,
            c.data_ultimo_bm,
            c.data_ultima_vistoria,
            c.data_termino_obra,

            r.candidato_fiscalizacao,
            r.observacao_candidato_fiscalizacao,
            r.risco_irregularidade,
            r.observacao_risco_irregularidade,
            r.interesse_socioeconomico,
            r.observacao_interesse_socioeconomico,
            r.destaque_midia,
            r.observacao_destaque_midia,
            r.objeto_denuncia_representacao,
            r.observacao_objeto_denuncia_representacao,
            r.objeto_controle_orgao_externo,
            r.observacao_objeto_controle_orgao_externo

        FROM table_caixa_dados_basicos c
        LEFT JOIN table_relevancia r
            ON c.convenio_siafi = r.convenio_siafi
        WHERE 1=1
    """
    
    where_clauses = []
    params = {}

    # 🔎 FILTRO TEXTO CONTIDO
    if filters.get("objeto"):
        where_clauses.append("c.objeto ILIKE :objeto")
        params["objeto"] = f"%{filters['objeto']}%"
        print(f"  ✓ objeto ILIKE: {params['objeto']}")

    # 🔹 FILTROS SIMPLES (igualdade)
    simple_fields = {
        "convenente": "c.convenente",                    # ✅ ADICIONADO
        "proponente": "c.proponente",
        "uf": "c.uf",
        "municipio_beneficiado": "c.municipio_beneficiado",  # ✅ ADICIONADO
        "situacao_contrato": "c.situacao_contrato",
        "situacao_obra": "c.situacao_obra",
        "candidato_fiscalizacao": "r.candidato_fiscalizacao",
        "risco_irregularidade": "r.risco_irregularidade",
        "interesse_socioeconomico": "r.interesse_socioeconomico",
        "destaque_midia": "r.destaque_midia",
        "objeto_denuncia_representacao": "r.objeto_denuncia_representacao",
        "objeto_controle_orgao_externo": "r.objeto_controle_orgao_externo",
    }

    for key, column in simple_fields.items():
        if filters.get(key) is not None:
            where_clauses.append(f"{column} = :{key}")
            params[key] = filters[key]
            print(f"  ✓ {key} = {filters[key]}")

    # 🔢 FILTROS NUMÉRICOS (>=)
    numeric_fields = {
        "valor_investimento_min": "c.valor_investimento",
        "percentual_fisico_informado_min": "c.percentual_fisico_informado",
        "percentual_fisico_aferido_min": "c.percentual_fisico_aferido",
        "percentual_financeiro_desbloqueado_min": "c.percentual_financeiro_desbloqueado",
    }

    for key, column in numeric_fields.items():
        if filters.get(key) is not None:
            where_clauses.append(f"{column} >= :{key}")
            params[key] = filters[key]
            print(f"  ✓ {key} >= {filters[key]}")

    # 📅 FILTROS DE DATA (>=)
    date_fields = {
        "data_ultimo_desbloqueio_ini": "c.data_ultimo_desbloqueio",
        "data_ultimo_bm_ini": "c.data_ultimo_bm",
        "data_ultima_vistoria_ini": "c.data_ultima_vistoria",
        "data_termino_obra_ini": "c.data_termino_obra",
        "dt_atualizacao_situacao_atual_ini": "c.dt_atualizacao_situacao_atual",
    }

    for key, column in date_fields.items():
        if filters.get(key) is not None:
            where_clauses.append(f"{column} >= :{key}")
            params[key] = filters[key]
            print(f"  ✓ {key} >= {filters[key]}")

    # 🔗 Montagem final
    if where_clauses:
        base_sql += " AND " + " AND ".join(where_clauses)

    base_sql += " ORDER BY c.convenio_siafi DESC"
    
    try:
        result = db.session.execute(text(base_sql), params)
        rows = [dict(row) for row in result.mappings().all()]
        
        print(f"\n✅ QUERY EXECUTADA COM SUCESSO!")
        print(f"✅ Total de registros: {len(rows)}")
        if rows:
            print(f"✅ Primeiro registro: {rows[0]}")
            print(f"✅ Campos retornados: {list(rows[0].keys())}")
        
        return rows

    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"\n❌ ERRO em find_convenios_filtrados: {e}")
        raise


# ===========================================
# FUNÇÃO: find_convenios_filtrados_paginado
# ===========================================
def find_convenios_filtrados_paginado(filters: dict, page: int = 1, page_size: int = 50):
    """
    Consulta convênios com filtros opcionais e paginação.
    
    Parâmetros:
    - filters: dicionário com filtros de busca
    - page: número da página (1-indexed)
    - page_size: quantidade de registros por página
    
    Retorno:
    {
        "dados": [...],           // Registros da página atual
        "total": 1234,            // Total de registros encontrados
        "page": 1,                // Página atual
        "page_size": 50,          // Tamanho da página
        "total_pages": 25         // Total de páginas
    }
    """
    
    print(f"\n🔍 BUSCA PAGINADA - Página {page}, Tamanho {page_size}")
    print(f"📋 Filtros recebidos: {filters}")
    
    # ===========================================
    # 1. QUERY PARA CONTAR TOTAL DE REGISTROS
    # ===========================================
    count_sql = """
        SELECT COUNT(*) as total
        FROM table_caixa_dados_basicos c
        LEFT JOIN table_relevancia r
            ON c.convenio_siafi = r.convenio_siafi
        WHERE 1=1
    """
    
    # ===========================================
    # 2. QUERY PARA BUSCAR DADOS
    # ===========================================
    base_sql = """
        SELECT 
            c.convenio_siafi,
            c.operacao,
            c.dv,
            c.convenente,
            c.objeto,
            c.proponente,
            c.uf,
            c.municipio_beneficiado,
            c.valor_investimento,
            c.valor_repasse,
            c.valor_contrapartida,
            c.valor_desbloqueado,
            c.data_ultimo_desbloqueio,
            c.valor_desembolsado,
            c.data_assinatura,
            c.data_vigencia,
            c.situacao_contrato,
            c.situacao_atual,
            c.dt_atualizacao_situacao_atual,
            c.carteira_ativa,
            c.data_aio,
            c.situacao_obra,
            c.percentual_fisico_informado,
            c.percentual_fisico_aferido,
            c.percentual_financeiro_desbloqueado,
            c.data_ultimo_bm,
            c.data_ultima_vistoria,
            c.data_termino_obra,

            r.candidato_fiscalizacao,
            r.observacao_candidato_fiscalizacao,
            r.risco_irregularidade,
            r.observacao_risco_irregularidade,
            r.interesse_socioeconomico,
            r.observacao_interesse_socioeconomico,
            r.destaque_midia,
            r.observacao_destaque_midia,
            r.objeto_denuncia_representacao,
            r.observacao_objeto_denuncia_representacao,
            r.objeto_controle_orgao_externo,
            r.observacao_objeto_controle_orgao_externo

        FROM table_caixa_dados_basicos c
        LEFT JOIN table_relevancia r
            ON c.convenio_siafi = r.convenio_siafi
        WHERE 1=1
    """
    
    # ===========================================
    # 3. CONSTRUIR FILTROS
    # ===========================================
    where_clauses = []
    params = {}

    # 🔎 FILTRO TEXTO CONTIDO
    if filters.get("objeto"):
        where_clauses.append("c.objeto ILIKE :objeto")
        params["objeto"] = f"%{filters['objeto']}%"
        print(f"  ✓ objeto ILIKE: {params['objeto']}")

    # 🔹 FILTROS SIMPLES (igualdade)
    simple_fields = {
        "convenente": "c.convenente",
        "proponente": "c.proponente",
        "uf": "c.uf",
        "municipio_beneficiado": "c.municipio_beneficiado",
        "situacao_contrato": "c.situacao_contrato",
        "situacao_obra": "c.situacao_obra",
        "candidato_fiscalizacao": "r.candidato_fiscalizacao",
        "risco_irregularidade": "r.risco_irregularidade",
        "interesse_socioeconomico": "r.interesse_socioeconomico",
        "destaque_midia": "r.destaque_midia",
        "objeto_denuncia_representacao": "r.objeto_denuncia_representacao",
        "objeto_controle_orgao_externo": "r.objeto_controle_orgao_externo",
    }

    for key, column in simple_fields.items():
        if filters.get(key) is not None:
            where_clauses.append(f"{column} = :{key}")
            params[key] = filters[key]
            print(f"  ✓ {key} = {filters[key]}")

    # 🔢 FILTROS NUMÉRICOS (>=)
    numeric_fields = {
        "valor_investimento_min": "c.valor_investimento",
        "percentual_fisico_informado_min": "c.percentual_fisico_informado",
        "percentual_fisico_aferido_min": "c.percentual_fisico_aferido",
        "percentual_financeiro_desbloqueado_min": "c.percentual_financeiro_desbloqueado",
    }

    for key, column in numeric_fields.items():
        if filters.get(key) is not None:
            where_clauses.append(f"{column} >= :{key}")
            params[key] = filters[key]
            print(f"  ✓ {key} >= {filters[key]}")

    # 📅 FILTROS DE DATA (>=)
    date_fields = {
        "data_ultimo_desbloqueio_ini": "c.data_ultimo_desbloqueio",
        "data_ultimo_bm_ini": "c.data_ultimo_bm",
        "data_ultima_vistoria_ini": "c.data_ultima_vistoria",
        "data_termino_obra_ini": "c.data_termino_obra",
        "dt_atualizacao_situacao_atual_ini": "c.dt_atualizacao_situacao_atual",
    }

    for key, column in date_fields.items():
        if filters.get(key) is not None:
            where_clauses.append(f"{column} >= :{key}")
            params[key] = filters[key]
            print(f"  ✓ {key} >= {filters[key]}")

    # ===========================================
    # 4. APLICAR FILTROS NAS QUERIES
    # ===========================================
    where_sql = ""
    if where_clauses:
        where_sql = " AND " + " AND ".join(where_clauses)
    
    count_sql += where_sql
    base_sql += where_sql

    # ===========================================
    # 5. EXECUTAR QUERY DE CONTAGEM
    # ===========================================
    try:
        count_result = db.session.execute(text(count_sql), params)
        total_records = count_result.scalar()
        print(f"\n✅ Total de registros encontrados: {total_records}")
        
        # Se não há registros, retornar vazio
        if total_records == 0:
            return {
                "dados": [],
                "total": 0,
                "page": page,
                "page_size": page_size,
                "total_pages": 0
            }
        
        # Calcular total de páginas
        total_pages = ceil(total_records / page_size)
        print(f"✅ Total de páginas: {total_pages}")
        
        # Ajustar página se estiver fora do range
        if page > total_pages:
            page = total_pages
        
        # ===========================================
        # 6. ADICIONAR ORDER BY, LIMIT e OFFSET
        # ===========================================
        base_sql += " ORDER BY c.convenio_siafi DESC"
        
        # Calcular offset
        offset = (page - 1) * page_size
        base_sql += f" LIMIT :page_size OFFSET :offset"
        params["page_size"] = page_size
        params["offset"] = offset
        
        print(f"✅ Buscando registros {offset + 1} a {offset + page_size}")
        
        # ===========================================
        # 7. EXECUTAR QUERY DE DADOS
        # ===========================================
        result = db.session.execute(text(base_sql), params)
        rows = [dict(row) for row in result.mappings().all()]
        
        print(f"✅ Registros retornados: {len(rows)}")
        if rows:
            print(f"✅ Primeiro registro: convenio_siafi = {rows[0].get('convenio_siafi')}")
        
        # ===========================================
        # 8. RETORNAR RESULTADO PAGINADO
        # ===========================================
        return {
            "dados": rows,
            "total": total_records,
            "page": page,
            "page_size": page_size,
            "total_pages": total_pages
        }

    except SQLAlchemyError as e:
        db.session.rollback()
        print(f"\n❌ ERRO em find_convenios_filtrados_paginado: {e}")
        raise