import psycopg2
from datetime import datetime

try:
    con = psycopg2.connect(
        host="localhost",        # ou o endereço do seu servidor PostgreSQL
        database="web", # nome do seu banco de dados
        user="postgres",       # seu nome de usuário no PostgreSQL
        password="markim"      # sua senha de acesso ao PostgreSQL
    )
    data = datetime.now()
    ano = data.year
    mes = data.month
    day = data.day+1
    dataString = f"{ano}-{mes}-{day}"
    print(dataString)
    cursor = con.cursor()
    for x in range(800,1850,50):
        string = str(x)
        if x < 1000:
            string = "0"+string
        a = string[:2]
        b = string[-2:]
        if b == "50":
            b = "30"
        print(f"{string[:2]} {b}")
        #print(f"{x.}")
    
    # Exemplo: Executando uma consulta SQL
        stringab = a+b
        try:    
            cursor.execute("""insert into horarios (dia,horas,ativo) values (%s,%s,%s);""",(dataString,stringab,0))
            print(True)
            print(cursor.rowcount)
        except Exception as error:
            print(error)
    con.commit()
    # Obter os resultados
    #db_version = cursor.fetchone()
    #print(f"Versão do PostgreSQL: {db_version}")

except Exception as error:
    print(f"Erro ao conectar ao banco de dados: {error}")

finally:
    if con:
        # Fechar o cursor e a conexão
        cursor.close()
        con.close()
        print("Conexão com o PostgreSQL foi encerrada.")
    
# Conectar ao banco de dados
