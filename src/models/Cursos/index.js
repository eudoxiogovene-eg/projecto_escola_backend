const mongoose=require('mongoose')
const cursosScheme= new mongoose.Schema({
              nomeCurso:{
                  type:String,
                  required:true
              },
              valorCursoAdulto:{
                type:String,
                required:true
              },
              valorCursoCrianca:{
                type:String,
                required:true
              },
              duracaoCurso:{
                type:String,
                
              },
              descontoCurso:{
                type:String,
                required:true
              },
              valorCursoCriancaDesconto:{
                type:String,
                required:true
              },
              valorCursoAdultoDesconto:{
                type:String,
                required:true
              },
              taxaMultaCurso:{
                type:String,
                required:true
              },
              statusMulta:{
                type:String,
                required:true
              },
              descricaoCurso:{
                type:String,
              }

       
}) 
module.exports=mongoose.model('Cursos', cursosScheme) 