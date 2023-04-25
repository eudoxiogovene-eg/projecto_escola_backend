
const mongoose= require('mongoose')


const mensalidadesScheme= new mongoose.Schema({
          mes:{
                    type:String,
                    lowercase:true,
                    required:true
          },
          codigoMes:{
            type:String,
            required:true
          }

          
     
}) 
module.exports=mongoose.model('Mensalidade', mensalidadesScheme)

