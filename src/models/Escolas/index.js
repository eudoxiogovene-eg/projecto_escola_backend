const mongoose=require('mongoose')
const escolaScheme= new mongoose.Schema({
              nomeEscola:{
                  type:String,
                  required:true,
                  lowercase:true

              },
               localizacao:{
                type:String,
                required:true,
                lowercase:true

               }
            
              

       
}) 
module.exports=mongoose.model('Escola', escolaScheme) 