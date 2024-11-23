# Configuração do programa
- PASTA FRONT:

- front end da aplicação (index.html)
 
- PASTA SERVERV2:

- .env variaveis de ambiente

- test.js teste de conexão do banco de dados

- services.js importar os servicos no banco de dados

- app.js arquivo de inicialização da api

# 1.Importar sql 
-Banco de dados: Postgres

- no Pg adming criar banco de dados "web"

- importar as tabelas usando o arquivo backup.sql

# 2.Configurar banco de dados (arquivo .env)
DB_USER=postgres

DB_HOST=localhost

DB_DATABASE=web

DB_PASSWORD=

DB_PORT=

# Configurar api do email no arquivo .env (opcional)
EMAIL_USER=

OAUTH_CLIENT_ID=

OAUTH_CLIENT_SECRET=

OAUTH_REFRESH_TOKEN=

OAUTH_ACCESS_TOKEN=

o git hub bloqueia o push do projeto, pois possui dados sensiveis no arquivo .env

# 3. Teste de conexão

- Na pasta serverV2 executar o comando node test.js

# 4.Importar serviços (Obs: por padrão o banco não possui nenhum dado)
- abrir pasta serverV2 no terminal

- Importar serviços no banco: node services.js

# Inicialização
5 - Executar a api: node app.js

6 - Executar o arquivo index.html na pasta front
