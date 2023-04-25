const mongoose=require('mongoose')

require('dotenv').config()


const estudanteScheme= new mongoose.Schema({
              nome:{
                     type:String,
                     required:true, 
                    lowercase:true


              },
              apelido:{
                     type:String,
                     required:true,
                    lowercase:true

              },
              bairro:{
                     type:mongoose.Schema.Types.ObjectId, 
                     ref:'Bairros',
                     required:true      
              },
              sexo:{
                     type:String,
                     required:true, 
                    lowercase:true

              },
           
       dataNascimento:{

              type:String,
              required:true,
              lowercase:true

       }, 
       contactos:{  
              contactoPrincipal:{
                     type:String,
                     required:true,
                    lowercase:true


              },
              contactoAlternativo:{
                     type:String,
                    lowercase:true

              
              },
              contactoEncarregado:{
                     type:String,
                    lowercase:true   
              },
              contactoAlternativoEncarregado:{
                     type:String,
                    lowercase:true   
              } 
              
       },

       nacionalidade:{
              type:String,
              lowercase:true,
              default:"mocambicana"

       },
    
       usuario:{
              type:mongoose.Schema.Types.ObjectId, 
                     ref:'User',
                     required:true 
       },
       documentos:{
              dataEmissao:{
                     type:String,
                    lowercase:true,
                     required:true
                     
              },
              dataValidade:{
                     type:String,
                     lowercase:true,
                     required:true
              },
              localEmissao:{
                     type:String,
                     lowercase:true,
                     required:true
              },
              tipoDocumento:{
                     type:String,
                     lowercase:true,
                     required:true
              },
              numeroDocumento:{
                     type:String,
                     lowercase:true,
                     required:true
              }
       
       }, 
       schoolname:{
              type:mongoose.Schema.Types.ObjectId, 
              ref:'Escola',
              required:true 
       }, 
       statusUse:{
              type:Boolean,
              lowercase:true,
              required:true,
              default:false

       },
       fotoname:String,
       size:Number,
       key:String,
       url:String,

       
     
    })




    estudanteScheme.pre('save'||'findByIdAndUpdate', function(){
       if(this.key){
              if(!this.url){
                     this.url=`${process.env.APP_URL}/files/${this.key}`
              }
       } 
})
module.exports=mongoose.model('Estudantes', estudanteScheme) 