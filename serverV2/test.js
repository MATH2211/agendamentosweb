const express = require('express');
const { Client } = require('pg');  // Importando o cliente do PostgreSQL
const app = express();

// Configurações do banco de dados
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10), // Certifique-se de converter a porta para número
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
