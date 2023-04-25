
const mongoose= require('mongoose')

const Estudantes=require('../Estudantes')

let data= new Date()
const dia=data.getDate()
const mes=data.getMonth()+1
let dia2
let mes2
if(mes<10){
  mes2=`0${mes}`
}else{
  mes2=mes
}
if(dia<10){
  dia2=`0${dia}`
}else{
  dia2=dia
}

const ano=data.getFullYear()

let dataHoje=`${ano}-${mes2}-${dia2}`

const pagamentosScheme= new mongoose.Schema({
          valor_mensalidade:{
                    type:String,
                    required:true
          },
          codigoCadastro:{
                    type:mongoose.Schema.Types.ObjectId, 
                    ref:'cadastros',
                    required:true 
          },
          valorTotalPago:{
                    type:String,
                    required:true
          },
          codigoIdMulta:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Multas',      
          },
          formPagamento:{
                    type:String,
                    required:true
          },
          mensalidade:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Mensalidade',
            required:true 
          },
          usuario:{
                    type:mongoose.Schema.Types.ObjectId, 
                    ref:'User',
                    required:true 

          },
         
          pagaComMulta:{
            type:Boolean,
            required:true
          },
          anoPagamento:{
                    type:String,
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
          codigoPagamento:{
            type:String,
            required:true
          },
          dataPagamento:{
            type:String
          },
          schoolname:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Escola',
          }
          
          
},{
  timestamps:true
}) 

pagamentosScheme.pre('save'||'findByIdAndUpdate',async function(){
  this.dataPagamento=dataHoje
   const estudante =await Estudantes.findById(this.codigoInscricao)
  
   this.schoolname=estudante.schoolname
}
)
module.exports=mongoose.model('Pagamentos', pagamentosScheme)

