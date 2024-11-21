# Configuração do programa


# Importar sql 
-Banco de dados: Postgres

1 - no Pg adming criar banco de dados "web"

2 - importar as tabelas usando o arquivo .sql

Obs: por padrão o banco não possui nenhum dado
# Importar serviços
3 - abrir pasta serverV2 no terminal

4 - Importar serviços no banco: node services.js

# Envio de email
5 - Configurar api do email. (opcional)

no arquivo .env

EMAIL_USER=

OAUTH_CLIENT_ID=

OAUTH_CLIENT_SECRET=

OAUTH_REFRESH_TOKEN=

OAUTH_ACCESS_TOKEN=

o git hub bloqueia o push do projeto, pois possui dados sensiveis no arquivo .env

# Inicialização
6 - Executar a api: node app.js

7 - Executar o arquivo index.html na pasta front




