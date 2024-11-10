const User = require("../models/userModel.js");
const util = require("util");

const UserController = {
    getUserById: async (req, res) => {
        const { id } = req.params; // Corrigido aqui
        try {
            const user = await User.getById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user:", error); // Adicionado log de erro
            res.status(500).json({ error: "Error fetching user" });
        }
    },
    getUserbyCell: async (req,res) =>{
        const {cell} = req.params;
        try{
            const user = await User.getByCell(cell);
            if(!user){
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user);
        }catch(error){
            console.error("Error fetching user:", error); // Adicionado log de erro
            res.status(500).json({ error: "Error fetching user" });
        }
    },
    getHorarios: async (req, res) => {
        const { dia } = req.query; 
        
        try {
            const horarios = await User.getHorarios(dia);
            
            if (horarios.message) { // Caso seja uma mensagem de erro
                return res.status(404).json(horarios);
            }

            res.status(200).json(horarios); // Caso sejam horários disponíveis
        } catch (error) {
            //console.error(error);
            console.log(false);
            res.status(500).json({ message: 'Erro ao buscar horários disponíveis' });
        }
    },
    getServices: async (req, res) => {
        try {
            const services = await User.getServicos(); // Supondo que você tenha uma função getServices no modelo User
            if (services.length === 0) {
                return res.status(404).json({ message: "Nenhum serviço encontrado." });
            }
            return res.status(200).json(services);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
    ,
    createUser: async (req, res) => {
        const { nome, celular,email } = req.body;
        try {
            const newUser = await User.postNewUser(nome, celular,email);
            res.status(201).json(newUser);  // 201 Created
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar novo usuário' });
        }
    },updateHorario: async (req, res) => {
        const { data, hora } = req.body;
        try {
            const updatedHorario = await User.updateHorario(data, hora);
            if (updatedHorario) {
                res.status(200).json({
                    message: 'Horário atualizado com sucesso',
                    horarioId: updatedHorario.id
                });
            } else {
                res.status(404).json({ message: 'Horário não encontrado' });
            } 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao atualizar o horário' });
        }
    },
    updateUser: async (req,res)=>{
        const {nome,celular,email} = req.body;
        try{
            const updatedUser = await User.putUser(nome,celular,email);
            if (updatedUser){
                res.status(200).json({
                    message: "Nome atualizado",
                    id: updatedUser.id,
                    userCell:updatedUser.celular,
                    email:updatedUser.email
                });
            }else{
                res.status(404).json({message:"usuario não encontrado"});
            }
        }catch(error){
            console.log(error);
            res.status(500).json({message:"Erro ao atualizar o usuario"});
        }
    }
    ,
    gerarHorarios: async (req, res) => {
        const { dia } = req.body; // Recebe o parâmetro 'dia' do corpo da requisição

        if (!dia) {
            return res.status(400).json({ message: "O campo 'dia' é obrigatório." });
        }

        try {
            await User.gerarHorarios(dia); // Chama o método no modelo para gerar horários
            res.status(201).json({ message: `Horários gerados com sucesso para o dia ${dia}.` });
        } catch (error) {
            console.error("Erro ao gerar horários:", error);
            res.status(500).json({ message: "Erro ao gerar horários." });
        }
    },
    postAgendamento: async (req, res) => {
        const { idcliente, idhorario,servicos } = req.body;
        try {
            const newAgendamento = await User.postAgendamento(idcliente,idhorario,servicos);
            res.status(201).json(newAgendamento);  // 201 Created
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao criar novo usuário' });
        }   
    },
    getAgendamentoById: async (req, res) => {
        try {
            const clientId = parseInt(req.params.idCliente); // Obtém o idCliente da URL
            const userDetails = await User.getAgendamentoById(clientId); // Chama o modelo para pegar os detalhes
            if (userDetails.length === 0) {
                return res.status(404).json({ message: 'Client not found' });
            }
            res.json(userDetails); // Retorna os detalhes do cliente como resposta
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = UserController;
