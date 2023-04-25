const mongoose=require('mongoose')



const userScheme= new mongoose.Schema({
          username:{
                    type:String,
                    lowercase:true,
                    required:true

          },
          schoolname:{
              type:mongoose.Schema.Types.ObjectId, 
              ref:'Escola',
           },
          perfil:{
                 type:String,
                 lowercase:true,
                 required:true   
          },
          password:{
                    type:String,
                    required:true,
                    select:false                  
          },
          estado:{
              type:String,
              lowercase:true,
              required:true,
          },
          sobreNome:{
              type:String,
              lowercase:true,
              required:true
         },
         telefone:{
            type:String,
            lowercase:true,
            
        },
        telefoneAlternativo:{
            type:String,
            lowercase:true,
           
        },
        codigoUsuario:{
            type:String,
            lowercase:true,
            required:true
           
        },

     
}) 
module.exports=mongoose.model('User', userScheme)