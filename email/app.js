const nodemailer = require('nodemailer');

// Crie o transportador Nodemailer com autenticação OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    accessToken: process.env.GMAIL_ACCESS_TOKEN,
  },
});
// Defina as opções de e-mail
const mailOptions = {
  from: 'from',   // Seu e-mail do Gmail
  to: 'to',    // E-mail do destinatário
  subject: 'Teste com OAuth2',    // Assunto do e-mail
  text: 'vai da teu cu yan mzr',  // Corpo do e-mail
};

// Envie o e-mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Erro ao enviar o e-mail:', error);
  }
  console.log('E-mail enviado com sucesso:', info.response);
});
