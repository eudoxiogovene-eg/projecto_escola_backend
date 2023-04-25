const mongoose=require('mongoose')
const manuaisScheme= new mongoose.Schema({
              nomeManual:{
                     type:String,
                     lowercase:true,
                     required:true

              },
              valorManual:{
                    type:String,
                    lowercase:true,
                    required:true
             },
             quantidadeManual:{
               type:Number,
               lowercase:true,
               required:true
            },
            nivelManual:{
               type:String,
               lowercase:true,
               required:true
            },
            CursoManual:{
               type:mongoose.Schema.Types.ObjectId, 
               ref:'Cursos',
               required:true 
            },
            descricacaoManual:{
               type:String,
               lowercase:true,
            },
            usuario:{
               type:mongoose.Schema.Types.ObjectId, 
                      ref:'User',
                      required:true 
            },
        
        
             
          
       
}) 
module.exports=mongoose.model('Manuais', manuaisScheme) 