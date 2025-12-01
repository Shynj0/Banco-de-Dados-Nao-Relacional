require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const leituraRoutes = require('./routes/leituras');

const app = express();
app.use(express.json()); // Middleware para parsear JSON no corpo das requisições

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexão com MongoDB estabelecida.'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

// Rota
app.use('/leituras', leituraRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});