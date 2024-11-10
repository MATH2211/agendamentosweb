const pool = require("../config/config.js")
const flatted = require("flatted")
const User = {
    getById: async(id)=>{
        const result = await pool.query("select * from clientes where id = $1",[id]);
        return result.rows[0];
    },
    getByCell: async(cell)=>{
        const result = await pool.query("select * from clientes where celular = $1",[cell]);
        return result.rows[0];
    },
    getHorarios: async (dia) => {
        const result = await pool.query("SELECT horas FROM horarios WHERE ativo = 0 AND dia = $1", [dia]);
        if (result.rows.length === 0) {
            return { message: "Nenhum horário disponível encontrado para esta data." };
            
        }        
        return result.rows; // Retorna os horários encontrados, caso existam
    },
    getServicos: async ()=>{
        const result = await pool.query("SELECT * FROM servicos");
        if (result.rows.length === 0){
            return {message: "nenhum serviço encontrado"};
        }
        return result.rows;
    },
    
    postAgendamento: async(idCliente, idHorario, servicos) => {
        const result = await pool.query(
            'INSERT INTO agendamento (idcliente, idhorario, servicos) VALUES ($1, $2, $3) RETURNING idagendamento',
            [idCliente, idHorario, servicos]
        );
        return result.rows[0]
    },
    postNewUser: async(nome,celular,email)=>{
        const result = await pool.query("insert into clientes (nome,celular,email) VALUES ($1,$2,$3) RETURNING * ",[nome,celular,email]);
        return result.rows[0];
    },updateHorario: async (data, hora) => {
        const result = await pool.query(
            "UPDATE horarios SET ativo = 1 WHERE dia = $1 AND horas = $2 RETURNING id",
            [data, hora]
        );
        return result.rows[0];
    },
    putUser : async(nome,celular,email) =>{
        const result = await pool.query("update clientes set nome = $1, email = $3 where celular = $2 RETURNING *",[nome,celular,email]);
        return result.rows[0];
    },
    gerarHorarios: async (dia) => {
        try {
            for (let x = 800; x < 1850; x += 50) {
                let string = x < 1000 ? `0${x}` : `${x}`;
                let a = string.slice(0, 2);
                let b = string.slice(-2);

                if (b === '50') b = '30'; // Ajuste de horário para 30 min

                const stringab = `${a}${b}`;
                const queryText = "INSERT INTO horarios (dia, horas, ativo) VALUES ($1, $2, $3)";

                await pool.query(queryText, [dia, stringab, 0]);
                console.log(`Horário ${stringab} inserido com sucesso para o dia ${dia}`);
            }
        } catch (error) {
            console.error("Erro ao inserir horários:", error);
        }
    },
    getAgendamentoById: async (clientId) => {
        try {
            const query = `
                SELECT 
                    clientes.id, 
                    clientes.nome,
                    clientes.celular,
                    horarios.dia,
                    horarios.horas,
                    agendamento.servicos AS servicoNome
                FROM 
                    agendamento
                JOIN 
                    clientes ON agendamento.idCliente = clientes.id 
                JOIN 
                    horarios ON agendamento.idHorario = horarios.id
                WHERE 
                    agendamento.idCliente = $1;
            `;
            const result = await pool.query(query, [clientId]);
            return result.rows; // Retorna os resultados da consulta
        } catch (err) {
            console.error(err);
            throw new Error('Error retrieving user details');
        }
    }
}

module.exports = User;