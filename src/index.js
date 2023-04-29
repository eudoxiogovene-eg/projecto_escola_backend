const express= require('express')
const cors= require('cors')
const path = require ('path')  
const port=process.env.Port || 3333

const usuarioRoutes= require('./routes/UsuarioRoutes')
const EstudanteRoutes= require('./routes/EstudanteRontes')
const PagamentoRoutes= require('./routes/Pagamentos')
const MultasRoutes= require('./routes/Multas') 
const MunuaisRoutes=require('./routes/Manuais')
const cadastrosRoutes= require('./routes/Cadastros')
const cadastrarcurso=require('./routes/Cursos')
const mensalidadeRontes=require('./routes/MensalidadesRontes')
const bairrosRontes=require('./routes/Bairros')
const escolasRontes=require('./routes/Escolas')
const vendaManuais=require('./routes/vendaManuais')
const pagamentosMulta=require('./routes/pagamentosMulta')
const infoGeral=require('./routes/informacoesGerais')


const app=express()
const dados=[
    {nome:'eudoxio',sobrenome:'govene',idade:22,pais:'brasil',cidade:'sao paulo'},
    {nome:'sousa',sobrenome:'rafael',idade:25,pais:'estados unidos',cidade:'nova york'},
    {nome:'eugenio',sobrenome:'luxo',idade:27,pais:'alemanha',cidade:'berlim'},
    {nome:'cipriano',sobrenome:'sitoe',idade:24,pais:'franca',cidade:'paris'},
    {nome:'custodio',sobrenome:'cossa',idade:52,pais:'mocambique',cidade:'xai-xai'},
    {nome:'fedula',sobrenome:'djeje',idade:24,pais:'italia',cidade:'roma'},
    {nome:'shanaia',sobrenome:'tchaia',idade:12,pais:'portugal',cidade:'lisboa'},
    {nome:'shanaia',sobrenome:'tchaia',idade:12,pais:'portugal',cidade:'lisboa'},
    {nome:'shanaia',sobrenome:'tchaia',idade:12,pais:'portugal',cidade:'lisboa'},
    {nome:'shanaia',sobrenome:'tchaia',idade:12,pais:'portugal',cidade:'lisboa'},
    {nome:'shanaia',sobrenome:'tchaia',idade:12,pais:'portugal',cidade:'lisboa'},
]

app.get('/',(req,res)=>{
    return res.status(200).json({message:'dados do usuario',dados})
})
const mongoose= require('mongoose')

app.use(cors())
app.use(
          express.urlencoded({
                    extended:true
          })
)

   
app.use(express.json())
app.use('/files',express.static(path.resolve(__dirname, '..', 'uploads')))

app.use(usuarioRoutes)
app.use(EstudanteRoutes)
app.use(PagamentoRoutes)
app.use(MultasRoutes)
app.use(MunuaisRoutes)
app.use(cadastrosRoutes)
app.use(cadastrarcurso)
app.use(mensalidadeRontes)
app.use(bairrosRontes)
app.use(escolasRontes)
app.use(vendaManuais)
app.use(pagamentosMulta)
app.use(infoGeral)



// mongodb+srv://tchaia:<password>@cluster0.enjkpfl.mongodb.net/?retryWrites=true&w=majority


const DB_user='tchaia'
const DB_password='tchaia1234567890'

//*
mongoose.connect(`mongodb+srv://${DB_user}:${DB_password}@cluster0.enjkpfl.mongodb.net/?retryWrites=true&w=majority`)
.then(function(){
          console.log("conectado com sucesso")
          
app.listen(port,()=>{
          console.log(`estou rodando na porta ${port}`)
})
    

})
.catch(function(erro){
          console.log("houve um erro "+erro)  
}) 
//*/


/*

mongoose.connect("mongodb://localhost/school")
.then(function(){
          console.log("conectado com sucesso")
          
app.listen(port,()=>{
          console.log(`estou rodando na porta ${port}`)
})
    

})
.catch(function(erro){
          console.log("houve um erro "+erro)  
}) 

*/