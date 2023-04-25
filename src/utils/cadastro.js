const Cadastrados = require('../models/Cadastros')
const PagamentosMulta= require('../models/pagamentosMultas')
const Multas=require('../models/multas')
  module.exports={
     async  actualizar(codigoCadastro){
       await Cadastrados.findByIdAndUpdate(codigoCadastro,{
        statusUse: true,
       })
    }
    
  }