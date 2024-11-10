import psycopg2
servicos = [
    {"serviço": "CORTE + BARBA + HIDRATAÇÃO + SOBRANCELHA + LIMPEZA DE PELE", "valor": 100, "tempo": 70},
    {"serviço": "CORTE + BARBA + SOBRANCELHA + HIDRATAÇÃO", "valor": 85, "tempo": 60},
    {"serviço": "Barba", "valor": 30, "tempo": 25},
    {"serviço": "Corte", "valor": 30, "tempo": 30},
    {"serviço": "Hidratação", "valor": 20, "tempo": 10},
    {"serviço": "Sobrancelha", "valor": 10, "tempo": 5},
    {"serviço": "Corte Navalhado", "valor": 35, "tempo": 30},
    {"serviço": "LIMPEZA DE PELE", "valor": 30, "tempo": 15}
]


servicos = [
    {"serviço": "Barba", "valor": 30, "tempo": 25},
    {"serviço": "Corte", "valor": 30, "tempo": 30},
    {"serviço": "Hidratação", "valor": 20, "tempo": 10},
    {"serviço": "Sobrancelha", "valor": 10, "tempo": 5},
    {"serviço": "Corte Navalhado", "valor": 35, "tempo": 30},
    {"serviço": "LIMPEZA DE PELE", "valor": 30, "tempo": 15}
]

servicos = [
    	{"serviço": "Barba","valor":30 , "tempo": 25},
	{"serviço": "Barba Express" ,"valor":20, "tempo" : 30},
    	{"serviço": "Corte","valor":30, "tempo": 30},
    	{"serviço": "Hidratação","valor":20, "tempo": 10},
    	{"serviço": "Sobrancelha","valor":10, "tempo": 5},
    	{"serviço": "Corte Navalhado","valor":35, "tempo": 30},
    	{"serviço": "LIMPEZA DE PELE","valor":30, "tempo": 15},
	{"serviço" : "Máscara Black","valor":10 , "tempo" : 30}, 
	{"serviço" :"Botox","valor":65 , "tempo" : 30},
	{"serviço" :"Selagem","valor":85 , "tempo" :30},
	{"serviço":"Pigmentação/Tintura","valor":25,  "tempo" : 30},
	{"serviço": "Luzes" ,"valor":100, "tempo" : 30},
	{"serviço" : "Platinado" ,"valor":50, "tempo" : 30}
]

try:
    con = psycopg2.connect(
        host="localhost",        # ou o endereço do seu servidor PostgreSQL
        database="web", # nome do seu banco de dados
        user="postgres",       # seu nome de usuário no PostgreSQL
        password="markim"      # sua senha de acesso ao PostgreSQL
    )
    cursor = con.cursor()
    cursor.execute("delete from servicos where id > 0")
    for servico in servicos:
        name = servico["serviço"]
        valor = servico["valor"]
        tempo = servico["tempo"]
        
        comando = ("""INSERT INTO servicos (nome,valor,tempo) VALUES (%s,%s,%s)
        """)
        valores = (name,valor,tempo)
        cursor.execute(comando,valores)
        print(True)
        con.commit()
    
except Exception as e:
    print("Ocorreu um erro: ",e)
finally:
    # Fechar a conexão e o cursor
    if cursor:
        cursor.close()
    if con:
        con.close()
    print("Conexão encerrada.")
