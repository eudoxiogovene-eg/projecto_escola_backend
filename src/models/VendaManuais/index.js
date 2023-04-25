
const mongoose= require('mongoose')


const manuaisVendaScheme= new mongoose.Schema({
      
          codigoManualId:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Manuais',
            required:true 
          }, 
          codigoCadastro:{
                    type:mongoose.Schema.Types.ObjectId, 
                    ref:'cadastros',
                    required:true 
          },
          codigoInscricao:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Estudantes',
            required:true 
         },
          
          formPagamento:{
                    type:String,
                    required:true
          },
          usuario:{
                    type:mongoose.Schema.Types.ObjectId, 
                    ref:'User',
                    required:true 
          },
          statusEntrega:{
                    type:String,
                    required:true 
          },
       
          quantidade:{
            type:String,
            required:true
          },
          curso:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Cursos',
            required:true 
         },
         valorTotalPago:{
          type:String,
          required:true
         },
         codigoVenda:{
          type:String,
          required:true
         },
         dataPagamento:{
          type:String
         },
         anoPagamento:{
            type:String,
         },

         schoolname:{
          type:mongoose.Schema.Types.ObjectId, 
          ref:'Escola',
         
        }
             
},{
  timestamps:true
}) 
module.exports=mongoose.model('VendaManuais', manuaisVendaScheme)
