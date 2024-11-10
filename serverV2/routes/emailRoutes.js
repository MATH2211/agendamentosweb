const express = require('express');
const emailController = require('../controllers/emailController');
const router = express.Router();

// Rota para enviar e-mail
router.post('/send-email', emailController.sendEmail);

module.exports = router;
