// backup_scheduler.js (Script para automação)
const cron = require('node-cron');
const shell = require('shelljs');

// O caminho de destino fornecido na imagem
const BACKUP_DIR = 'C:\\Users\\painh\\OneDrive\\Desktop\\revisao_p3\\backups\\';

// ----------------------------------------------------
// Agendamento: Roda todos os dias à 01:00 da manhã [cite: 64]
// ----------------------------------------------------
cron.schedule('0 1 * * *', () => {
    // Gera a string de data (ex: 2025-12-01) para o nome da pasta
    const dateStr = new Date().toISOString().slice(0, 10);
    const outputDir = `${BACKUP_DIR}${dateStr}`;

    console.log(`[${new Date().toLocaleString()}] Iniciando backup diário do banco 'telemetria_race'...`);

    // Comando mongodump, usando aspas duplas para o caminho do Windows
    const backupCommand = `mongodump --db telemetria_race --out "${outputDir}"`;

    // Executa o comando
    if (shell.exec(backupCommand).code !== 0) {
        console.error('❌ Erro: Falha na execução do mongodump.');
    } else {
        console.log(`✅ Backup concluído com sucesso em: ${outputDir}`);
    }
});

console.log('Automação de backup agendada. Rodará diariamente às 01:00 AM.');

// Lembre-se de rodar este script usando: node backup_scheduler.js