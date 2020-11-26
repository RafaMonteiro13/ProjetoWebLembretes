const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const lembreteRoutes = require('./rotas/lembretes');
const Lembrete = require('./models/lembrete');

mongoose.connect('mongodb+srv://Vinicius:vcri007.@cluster0.j1ftf.mongodb.net/app-mean?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Conexão OK")
}).catch(() =>{
  console.log("Conexão não está funcionando!");
})


app.use(bodyParser.json());

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
  });

app.use('/api/lembretes',lembreteRoutes);

module.exports = app;
