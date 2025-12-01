const express = require('express');
const router = express.Router();
const Leitura = require('../models/Leitura');

// POST /leituras
router.post('/', async (req, res) => {
    try {
        const { carro, sensor, valor } = req.body;

        // 1. Validação explícita (Mongoose faz uma implícita, mas esta é mais rápida e clara)
        if (!carro || !sensor || valor === undefined) {
            return res.status(400).json({ mensagem: 'Erro: Campos obrigatórios (carro, sensor, valor) devem ser fornecidos.' });
        }

        // 2. Insere a leitura
        const novaLeitura = new Leitura({ carro, sensor, valor });
        await novaLeitura.save();

        // 3. Retorna código HTTP 201 (Created)
        res.status(201).json(novaLeitura);

    } catch (error) {
        // Trata erros de validação do Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ mensagem: 'Erro de validação nos dados.', detalhes: error.message });
        }
        console.error("Erro ao registrar leitura:", error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
});

module.exports = router;