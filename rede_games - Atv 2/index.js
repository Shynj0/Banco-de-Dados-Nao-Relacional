const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/rede_games");

const produtoSchema = new mongoose.Schema({
  nome: String,
  preco: Number
});

const Produto = mongoose.model("Produto", produtoSchema);

app.get("/produtos", async (req, res) => {
  const produtos = await Produto.find({}, { nome: 1, preco: 1, _id: 0 }).limit(5);
  res.json(produtos);
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
