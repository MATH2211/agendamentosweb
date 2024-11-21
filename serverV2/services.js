const { Client } = require('pg');

const servicos = [
    { "serviço": "Barbaterapia", "valor": 30, "tempo": 25, "idimagem": 64},
    { "serviço": "Barba Express", "valor": 20, "tempo": 30, "idimagem": 65 },
    { "serviço": "Corte", "valor": 30, "tempo": 30, "idimagem": 66 },
    { "serviço": "Hidratação", "valor": 20, "tempo": 10, "idimagem": 67 },
    { "serviço": "Sobrancelha", "valor": 10, "tempo": 5, "idimagem": 68 },
    { "serviço": "Máscara Black", "valor": 10, "tempo": 30, "idimagem": 71 },
    { "serviço": "Botox", "valor": 65, "tempo": 30, "idimagem": 72 },
    { "serviço": "Selagem", "valor": 85, "tempo": 30, "idimagem": 73 },
    { "serviço": "Pigmentação/Tintura", "valor": 25, "tempo": 30, "idimagem": 74 },
    { "serviço": "Luzes", "valor": 100, "tempo": 30, "idimagem": 75 },
    { "serviço": "Platinado", "valor": 50, "tempo": 30, "idimagem": 76 }
];

async function inserirServicos() {
    const client = new Client({
        host: 'localhost',  // endereço do servidor
        database: 'web',    // nome do banco de dados
        user: 'postgres',   // usuário do PostgreSQL
        password: 'markim'  // senha de acesso
    });

    try {
        await client.connect();
        await client.query('DELETE FROM servicos WHERE id > 0');

        for (const servico of servicos) {
            const name = servico["serviço"];
            const valor = servico["valor"];
            const tempo = servico["tempo"];
            const idimagem = servico['idimagem'].toString();
            const query = `
                INSERT INTO servicos (nome, valor, tempo, idimagem) 
                VALUES ($1, $2, $3, $4)
            `;
            const values = [name, valor, tempo,idimagem];
            await client.query(query, values);
            console.log('Inserção bem-sucedida:', name);
        }
    } catch (err) {
        console.error('Ocorreu um erro:', err);
    } finally {
        await client.end();
        console.log('Conexão encerrada.');
    }
}

inserirServicos();
