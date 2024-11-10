const express = require("express")

const router = express.Router();
const UserController = require("../controllers/userController.js");
const User = require("../models/userModel.js");



router.get("/users/:id",UserController.getUserById);
router.get("/users/cell/:cell",UserController.getUserbyCell);
router.get("/horarios",UserController.getHorarios);
router.get("/servicos", UserController.getServices);
router.get("/agendamentos/id/:idCliente",UserController.getAgendamentoById);

//get agendamento by cell

router.post("/users",UserController.createUser);
router.post("/gerarHorarios",UserController.gerarHorarios)
router.post("/agendamento",UserController.postAgendamento)//post agendamento

router.put("/horarios",UserController.updateHorario);
router.put("/users/cell",UserController.updateUser);

//deletar agendamento by cell



module.exports = router;