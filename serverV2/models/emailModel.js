const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER, // Variável de ambiente para o e-mail
    clientId: process.env.OAUTH_CLIENT_ID, // Variável de ambiente para Client ID
    clientSecret: process.env.OAUTH_CLIENT_SECRET, // Variável de ambiente para Client Secret
    refreshToken: process.env.OAUTH_REFRESH_TOKEN, // Variável de ambiente para Refresh Token
    accessToken: process.env.OAUTH_ACCESS_TOKEN // Variável de ambiente para Access Token
  },
});

// Teste de envio de e-mail (opcional)
const sendEmail = async (to, subject, text) => {
  // Opções do e-mail
  const mailOptions = {
    from: process.env.EMAIL_USER, // Seu e-mail
    to: to,  // Destinatário
    subject: subject,  // Assunto
    text: text,  // Corpo do e-mail
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw new Error('Erro ao enviar o e-mail: ' + error.message);
  }
};

module.exports = { sendEmail };
