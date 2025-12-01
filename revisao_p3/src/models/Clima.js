
const mongoose = require('mongoose');

const ClimaSchema = new mongoose.Schema({
    temperatura: { type: Number, required: true },
    local: { type: String },
    dataHora: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Clima', ClimaSchema, 'clima');