//importando o pacote
const mongoose = require('mongoose');

//definindo o "schema"
//semelhante ao recursos de bases relacionais

const lembreteSchema = mongoose.Schema({
   dataCadastro: {type: String, required: true},
   dataEntrega: {type: String, required: true},
   atividade: {type: String, required: true}
});

// criamos o modelo associado ao nome do Lembrete e exportamos
// tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Lembrete', lembreteSchema);


