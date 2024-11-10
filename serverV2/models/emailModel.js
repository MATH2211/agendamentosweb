const nodemailer = require('nodemailer');

// Configuração do Nodemailer
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
  },
});


const sendEmail = async (to, subject, text) => {
  // Opções do e-mail
  const mailOptions = {
    from: 'seu-email@gmail.com', // Seu e-mail
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
