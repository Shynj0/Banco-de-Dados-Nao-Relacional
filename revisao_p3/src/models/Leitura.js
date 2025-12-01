const mongoose = require('mongoose');

const LeituraSchema = new mongoose.Schema({
    carro: { type: String, required: true }, // Campo obrigatório
    sensor: { type: String, required: true }, // Campo obrigatório
    valor: { type: Number, required: true }, // Campo obrigatório
    dataHora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Leitura', LeituraSchema, 'leituras');