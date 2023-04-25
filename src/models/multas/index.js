const mongoose=require('mongoose')
const multaScheme= new mongoose.Schema({
              
              valorMulta:{
                     type:String,
                     required:true
              },
              statusMulta:{
                     type:String,
                     lowercase:true,
                     required:true,
                     default:"pendente"
              },
             
              codigoCadastro:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'cadastros',
                     required:true 
                     },
              mensalidade:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Mensalidade',
                     required:true 
              }, 
         
       
              anoMulta:{
                     type:String,
                     required:true 
              },
              codigoInscricao:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Estudantes',
                     required:true 
              },
       
              curso:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Cursos',
              
              },
            codigoMulta:{
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
module.exports=mongoose.model('Multas', multaScheme)   



/*
 curso:{
              type:mongoose.Schema.Types.ObjectId, 
              ref:'Cursos',
              required:true 
          },

*/