const express = require("express");
const router =  express.Router();
const Lembrete = require('../models/lembrete');

router.post('', (req, res, next) => {
    const lembrete = new Lembrete({
      dataCadastro: req.body.dataCadastro,
      dataEntrega: req.body.dataEntrega,
      atividade: req.body.atividade
    })
    lembrete.save().then(lembreteInserido => {
      res.status(201).json({
        mensagem: 'Lembrete inserido',
        id: lembreteInserido._id
      })
    })
});

router.get('', (req, res, next) => {
  Lembrete.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      mensagem: "Tudo OK",
      lembretes: documents
    });
  })
});

router.delete('/:id', (req, res, next) => {
  Lembrete.deleteOne({_id: req.params.id}).then((resultado) => {
    console.log(resultado);
    res.status(200).json({mensagem: "Lembrete removido"})
  })
})

router.put("/:id", (req, res, next) => {
  const lembrete = new Lembrete({
    _id: req.params.id,
    dataCadastro: req.params.dataCadastro,
    dataEntrega: req.params.dataEntrega,
    atividade: req.params.atividade
  });
  Lembrete.updateOne({_id: req.params.id}, lembrete)
  .then((resultado) => {
    console.log(resultado);
  });
  res.status(200).json({mensagem: 'Atualizaçãom realizada com sucesso!'})
})

router.get('/:id', (req, res, next) => {
  Lembrete.findById(req.params.id).then(lem => {
    if(lem) {
      res.status(200).json(lem);
    }
    else{
      res.status(404).json({mensagem: "Lembrete não encontrado!"})
    }
  })
});

module.exports = router;
