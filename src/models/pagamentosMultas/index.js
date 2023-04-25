
const mongoose= require('mongoose')
const pagamentoMultaScheme= new mongoose.Schema({
         
              formaPagamento:{ 
                     type:String,
                     required:true              
              },
              usuario:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'User',
                     required:true
              }, 
              codigoIdMulta:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Multas',
                     required:true,
                     unique:true
              }, 
              mensalidade:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Mensalidade',
                     required:true
              },
              curso:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Cursos',
                     required:true 
              },
              codigoInscricao:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Estudantes',
                     required:true 
              },
              codigoCadastro:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'cadastros',
                     required:true 
              },
              codigoMensalidadePagamento:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Pagamentos',
                    
              },
              codigoPagamento:{
                     type:String,
                     required:true  
              },
              pagaComMensalidade:{
                     type:Boolean,
                     default:false,
                     required:true
              },
              anoPagamento:{
                     type:String,
                     required:true
              },
              schoolname:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Escola',
                    
              }
},{
       timestamps:true
}) 
module.exports=mongoose.model('pagamentosMulta', pagamentoMultaScheme)


