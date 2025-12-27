import pandas as pd
import re
from decimal import Decimal, InvalidOperation

# ============================================================
# CONFIGURAÇÕES
# ============================================================
CSV_PATH = r"C:/Users/User/Downloads/dadosBasicos.csv"  
CSV_SEP = ";"


# ============================================================
# LEITURA ROBUSTA DE CSV (encoding)
# ============================================================
def read_csv_safe(path, sep):
    for enc in ("utf-8", "latin1", "iso-8859-1", "cp1252"):
        try:
            return pd.read_csv(path, sep=sep, encoding=enc)
        except UnicodeDecodeError:
            continue
    raise UnicodeDecodeError("Não foi possível detectar o encoding do CSV")


# ============================================================
# NORMALIZAÇÃO DE NOMES DE COLUNAS
# ============================================================
def normalize_column_name(col: str) -> str:
    col = col.strip().lower()
    col = re.sub(r"\s+", "_", col)
    return col


# Correções pontuais conhecidas do CSV
COLUMN_FIXES = {
    "situacao_contrato_complmento": "situacao_contrato_complemento"
}


# ============================================================
# ESQUEMA DA TABELA (derivado do CREATE TABLE)
# ============================================================
TABLE_SCHEMA = {
    "operacao": {"type": "varchar", "len": 7, "not_null": True},
    "dv": {"type": "varchar", "len": 2},
    "convenio_siafi": {"type": "int", "not_null": True},
    "proposta": {"type": "varchar", "len": 10},
    "convenente": {"type": "varchar", "len": 115},
    "uf": {"type": "varchar", "len": 2},
    "proponente": {"type": "varchar", "len": 255},
    "cnpj_proponente": {"type": "varchar", "len": 14},
    "codigo_municipio_ibge": {"type": "varchar", "len": 12},
    "objeto": {"type": "varchar", "len": 4000},
    "municipio_beneficiado": {"type": "varchar", "len": 100},
    "enquadramento_legislacao": {"type": "varchar", "len": 255},
    "complemento_enquadramento": {"type": "varchar", "len": 255},
    "situacao_contrato": {"type": "varchar", "len": 255},
    "situacao_contrato_complemento": {"type": "varchar", "len": 255},
    "situacao_obra": {"type": "varchar", "len": 255},

    "ano_proposta": {"type": "smallint"},
    "ano_orcamentario": {"type": "smallint"},
    "ano_contratacao": {"type": "smallint"},

    "percentual_fisico_informado": {"type": "numeric", "precision": 5, "scale": 2},
    "percentual_fisico_aferido": {"type": "numeric", "precision": 5, "scale": 2},
    "percentual_financeiro_desbloqueado": {"type": "numeric", "precision": 5, "scale": 2},

    "valor_repasse": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_contrapartida": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_investimento": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_empenho": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_desembolsado": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_desbloqueado": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_repasse_devolvido": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_rendimento_devolvido": {"type": "numeric", "precision": 18, "scale": 2},
    "valor_autorizado_nao_pago": {"type": "numeric", "precision": 18, "scale": 2},

    "codigo_area": {"type": "smallint"},
    "descricao_area": {"type": "varchar", "len": 60},
    "codigo_linha": {"type": "varchar", "len": 2},
    "descricao_linha": {"type": "varchar", "len": 60},
    "codigo_modalidade": {"type": "varchar", "len": 4},
    "descricao_modalidade": {"type": "varchar", "len": 60},
    "codigo_objetivo": {"type": "varchar", "len": 3},
    "descricao_objetivo": {"type": "varchar", "len": 60},
    "carteira_ativa": {"type": "varchar", "len": 3},

    "situacao_atual": {"type": "text"},

    # Datas
    "data_assinatura": {"type": "date"},
    "data_publicacao_dou": {"type": "date"},
    "data_vigencia": {"type": "date"},
    "data_spa_homologacao": {"type": "date"},
    "data_vrpl": {"type": "date"},
    "data_aio": {"type": "date"},
    "data_aprovacao_pcf_caixa": {"type": "date"},
    "data_aprovacao_pcf_siafi": {"type": "date"},
    "data_ultimo_bm": {"type": "date"},
    "data_ultima_vistoria": {"type": "date"},
    "data_ultimo_desbloqueio": {"type": "date"},
    "data_ultima_obtv": {"type": "date"},
    "primeira_data_lae": {"type": "date"},
    "data_termino_obra": {"type": "date"},
    "dt_atualizacao_situacao_atual": {"type": "date"},
    "dt_inauguracao": {"type": "date"},
}


# ============================================================
# FUNÇÕES DE VALIDAÇÃO
# ============================================================
def validate_varchar(series, max_len):
    return series.dropna().astype(str).str.len() > max_len


def validate_smallint(series):
    return ~series.dropna().between(-32768, 32767)


def validate_numeric(series, precision, scale):
    max_int = 10 ** (precision - scale)
    erros = []
    for idx, val in series.dropna().items():
        try:
            d = Decimal(str(val).replace(",", "."))
            if abs(d) >= max_int:
                erros.append(idx)
        except InvalidOperation:
            erros.append(idx)
    return erros


def validate_date(series):
    parsed = pd.to_datetime(series, errors="coerce")
    return series.notna() & parsed.isna()


# ============================================================
# VALIDAÇÃO PRINCIPAL
# ============================================================
def validar_csv(csv_path):
    df = read_csv_safe(csv_path, CSV_SEP)

    # normalizar nomes das colunas
    df.columns = [
        COLUMN_FIXES.get(normalize_column_name(c), normalize_column_name(c))
        for c in df.columns
    ]

    erros = []

    for col, rules in TABLE_SCHEMA.items():
        if col not in df.columns:
            erros.append(f"❌ Coluna ausente no CSV: {col}")
            continue

        s = df[col]

        if rules.get("not_null") and s.isna().any():
            erros.append(f"❌ NULL não permitido na coluna: {col}")

        if rules["type"] == "varchar":
            if validate_varchar(s, rules["len"]).any():
                erros.append(f"❌ {col}: texto maior que {rules['len']} caracteres")

        elif rules["type"] == "smallint":
            if validate_smallint(s).any():
                erros.append(f"❌ {col}: valor fora do range SMALLINT")

        elif rules["type"] == "numeric":
            idxs = validate_numeric(s, rules["precision"], rules["scale"])
            if idxs:
                erros.append(
                    f"❌ {col}: valores excedem NUMERIC({rules['precision']},{rules['scale']}) "
                    f"(ex.: linhas {idxs[:5]})"
                )

        elif rules["type"] == "date":
            if validate_date(s).any():
                erros.append(f"❌ {col}: data inválida")

    return erros


# ============================================================
# EXECUÇÃO DIRETA
# ============================================================
if __name__ == "__main__":
    problemas = validar_csv(CSV_PATH)

    if problemas:
        print("\n⚠️ PROBLEMAS ENCONTRADOS:")
        for p in problemas:
            print(p)
    else:
        print("✅ CSV totalmente compatível com o CREATE TABLE.")
