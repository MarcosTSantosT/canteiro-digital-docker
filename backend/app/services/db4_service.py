from sqlalchemy.sql import text
from .. import db

# ===========================================
# FIND dados por convênio
# ===========================================
def find_processos_by_convenio(convenio_siafi):

    sql_query = text("""
        SELECT 
            convenio_siafi,
            orgao_processo,
            codigo_identificacao,
            tipo_processo,
            status_processo,
            data_informacao,
            observacoes
        FROM table_processos
        WHERE convenio_siafi = :id_param
        ORDER BY data_informacao DESC
    """)

    try:
        result = db.session.execute(sql_query, {"id_param": convenio_siafi})
        rows = result.mappings().all()

        return [dict(r) for r in rows]

    except Exception as e:
        db.session.rollback()
        print(f"Erro na consulta de processos: {e}")
        raise

