const express = require('express');
const { Client } = require('pg');  // Importando o cliente do PostgreSQL
const app = express();

// Configurações do banco de dados
const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'web',
  password: 'markim',
  port: 5432,
};

// Função para testar a conexão com o banco
const testDbConnection = async () => {
  const client = new Client(dbConfig);
  
  try {
    await client.connect();
    console.log('Conexão com o banco de dados bem-sucedida');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } finally {
    await client.end();
  }
};

// Teste a conexão ao banco de dados
testDbConnection();

// Rota básica
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Inicia o servidor
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
