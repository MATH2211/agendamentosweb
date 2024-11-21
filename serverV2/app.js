const express = require("express");
const cors = require("cors")
const app = express();

const userRoutes = require("./routes/userRoutes.js");
const emailRoutes = require("./routes/emailRoutes.js")
// Middleware para ler JSON no corpo das requisições
app.use(cors());
app.use(express.json())

// Usando as rotas
app.use("/api", userRoutes);
app.use("/api",emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});