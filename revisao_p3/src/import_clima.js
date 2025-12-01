require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const Clima = require('./models/Clima'); // Modelo criado no passo anterior

// --- Configurações da API Externa ---
const OPEN_WEATHER_API_KEY = process.env.WEATHER_API_KEY || 'API_KEY';
const CIDADE = 'Jacarei, BR';
const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${CIDADE}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;

// Conexão com o MongoDB (garante que a função pode ser executada standalone)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conexão com MongoDB estabelecida para importação.'))
    .catch(err => console.error('Erro de conexão com MongoDB:', err));

/**
 * Consome a API de clima, extrai a temperatura e salva no MongoDB.
 */
async function importarTemperaturaAmbiente() {
    console.log(`Buscando dados de clima para ${CIDADE}...`);
    try {
        // 1. Consome a API externa
        const response = await axios.get(API_URL);

        // 2. Extrai 'temp'
        const temperatura = response.data.main.temp;
        const localNome = response.data.name;

        console.log(`Temperatura atual em ${localNome}: ${temperatura}°C`);

        // 3. Salva na coleção 'clima'
        const registroClima = new Clima({
            temperatura: temperatura,
            local: localNome,
            dataHora: new Date()
        });
        await registroClima.save();

        console.log('Registro de clima salvo com sucesso!');

    } catch (error) {
        console.error('Erro ao importar ou salvar dados de clima:', error.message);
    } finally {
        // Fecha a conexão após a operação
        mongoose.connection.close();
    }
}

// Executa a função
importarTemperaturaAmbiente();