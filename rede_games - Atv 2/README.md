# 🕹️ Rede Games API

Atividade prática – Banco de Dados Não Relacional  
**Disciplina:** Banco de Dados Não Relacional  
**Professora:** Lucineide  
**Semanas:** 5 a 8

---

## 📘 Descrição

Este projeto cria uma **API REST** simples usando **Node.js**, **Express** e **MongoDB (Mongoose)** para exibir produtos cadastrados no banco de dados **rede_games**.  
A rota principal retorna **nome e preço dos produtos**, limitando o resultado a **5 itens**.

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, verifique se você possui:

- [Node.js](https://nodejs.org/) instalado  
- [MongoDB](https://www.mongodb.com/try/download/community) rodando localmente (ou use o Atlas)
- O banco de dados **rede_games** criado com a coleção `produtos`

---

## 🧱 Criação do Banco de Dados (no Mongo Shell)

Execute os comandos abaixo no terminal do MongoDB:

```js
use rede_games;

db.produtos.insertMany([
  { nome: "Mouse Gamer X7", categoria: "Periféricos", preco: 250, estoque: 15 },
  { nome: "Teclado Mecânico K500", categoria: "Periféricos", preco: 450, estoque: 8 },
  { nome: "Monitor UltraWide", categoria: "Monitores", preco: 1800, estoque: 5 },
  { nome: "Console Zeta", categoria: "Consoles", preco: 3200, estoque: 3 },
  { nome: "Headset ProSound", categoria: "Áudio", preco: 600, estoque: 12 }
]);
```

---

## 🧩 Instalação do Projeto

1. **Clone ou crie a pasta do projeto**
   ```bash
   mkdir rede_games_api
   cd rede_games_api
   ```

2. **Inicie o projeto Node.js**
   ```bash
   npm init -y
   ```

3. **Instale as dependências**
   ```bash
   npm install express mongoose
   ```

4. **Crie o arquivo principal**
   Crie o arquivo `index.js` e adicione o código abaixo:

   ```js
   const express = require("express");
   const mongoose = require("mongoose");
   const app = express();

   // Conexão com o MongoDB
   mongoose.connect("mongodb://localhost:27017/rede_games")
     .then(() => console.log("✅ Conectado ao MongoDB"))
     .catch(err => console.error("Erro de conexão:", err));

   // Schema e modelo
   const produtoSchema = new mongoose.Schema({
     nome: String,
     preco: Number
   });

   const Produto = mongoose.model("Produto", produtoSchema, "produtos");

   // Rota principal - retorna até 5 produtos (nome e preço)
   app.get("/produtos", async (req, res) => {
     try {
       const produtos = await Produto.find({}, { nome: 1, preco: 1, _id: 0 }).limit(5);
       res.json(produtos);
     } catch (error) {
       res.status(500).json({ erro: "Erro ao buscar produtos" });
     }
   });

   // Inicialização do servidor
   app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));
   ```

---

## ▶️ Como Executar

No terminal, dentro da pasta do projeto:

```bash
node index.js
```

Você verá:
```
✅ Conectado ao MongoDB
🚀 Servidor rodando em http://localhost:3000
```

---

## 🌐 Como Testar

Abra no navegador ou use o Postman/Insomnia:

```
http://localhost:3000/produtos
```

📊 **Exemplo de resposta:**
```json
[
  { "nome": "Mouse Gamer X7", "preco": 250 },
  { "nome": "Teclado Mecânico K500", "preco": 450 },
  { "nome": "Monitor UltraWide", "preco": 1800 },
  { "nome": "Console Zeta", "preco": 3200 },
  { "nome": "Headset ProSound", "preco": 600 }
]
```

---

## 🧠 Tecnologias Utilizadas

- Node.js  
- Express  
- MongoDB  
- Mongoose  

---

## 👩‍🏫 Observações

- O projeto faz parte da **Atividade Prática – Semanas 5 a 8** do módulo de **Banco de Dados Não Relacional**.
- Certifique-se de que o banco de dados `rede_games` e a coleção `produtos` já existam antes de rodar a API.

---

## 📄 Licença

Projeto acadêmico – uso educacional.
