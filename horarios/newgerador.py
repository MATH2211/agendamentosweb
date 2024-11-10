import psycopg2
from datetime import datetime

try:
    # Conexão com o banco de dados
    con = psycopg2.connect(
        host="localhost",
        database="web",
        user="postgres",
        password="markim"
    )
    
    # Obter a data atual
    data = datetime.now()
    dataString = data.strftime("%Y-%m-%d")
    print(dataString)
    
    cursor = con.cursor()
    
    # Gerar horários e inserir no banco
    for x in range(800, 1850, 50):
        string = f"{x:04d}"  # Garante que tenha 4 dígitos com zero à esquerda
        a = string[:2]
        b = "30" if string[2:] == "50" else string[2:]
        
        horario = f"{a}{b}"
        print(f"Inserindo horário: {horario}")
        
        try:
            cursor.execute(
                "INSERT INTO horarios (dia, horas, ativo) VALUES (%s, %s, %s);",
                (dataString, horario, 0)
            )
            print("Inserção bem-sucedida!")
        except Exception as error:
            print(f"Erro ao inserir no banco: {error}")
    
    # Confirmar transações
    con.commit()

except Exception as error:
    print(f"Erro ao conectar ao banco de dados: {error}")

finally:
    if con:
        cursor.close()
        con.close()
        print("Conexão com o PostgreSQL foi encerrada.")
