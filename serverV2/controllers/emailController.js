const emailModel = require('../models/emailModel');

const emailController = {
  sendEmail: async (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ message: 'Preencha todos os campos (to, subject, text)' });
    }

    try {
      const emailInfo = await emailModel.sendEmail(to, subject, text);
      res.status(200).json({ message: 'E-mail enviado com sucesso!', info: emailInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao enviar o e-mail', error: error.message });
    }
  },
};

module.exports = emailController;
