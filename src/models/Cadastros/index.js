const mongoose=require('mongoose')




const cadastrosScheme= new mongoose.Schema({
          curso:{
              type:mongoose.Schema.Types.ObjectId, 
              ref:'Cursos',
              required:true ,
              lowercase:true
          },
          nivel:{
                    type:String,
                    required:true, 
                    lowercase:true
          },
          horario:{
                    type:String,
                    required:true, 
                    lowercase:true
          },
          desconto:{
                    type:String,
                    required:true, 
                    lowercase:true
          },
          estado:{
                    type:String,
                    required:true,
                    lowercase:true

          },
          dataInscricao:{
                    type:String,
                    required:true
          },
          taxaInscricao:{
                    type:String,
                    required:true,
                    lowercase:true

          },
          formaPagamento:{
                    type:String,
                    required:true,
                    lowercase:true

                  },
          codigoInscricao:{
                    type:mongoose.Schema.Types.ObjectId, 
                              ref:'Estudantes',
                              required:true 
          },
          usuario:{
                    type:mongoose.Schema.Types.ObjectId, 
                           ref:'User',
                           required:true 
          },
          codigoEstudante:{
            type:String, 
            required:true,
            lowercase:true

          },
          statusUse:{
            type:Boolean,
            required:true,
            default:false,
            lowercase:true

          },
          schoolname:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Escola',
            required:true 
          },
          anoCadastro:{
            type:String,
            required:true,
            lowercase:true

         },
         bairro:{
          type:mongoose.Schema.Types.ObjectId, 
          ref:'Bairros',
          required:true      
        },

     
}) 
module.exports=mongoose.model('cadastros', cadastrosScheme) 