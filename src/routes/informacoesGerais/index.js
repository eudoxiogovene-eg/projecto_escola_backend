const {Router}=require('express')
const controllersInfoGral= require('../../controllers/informacoesGerais')


const routes=Router()

routes.get('/infogeral/:id',controllersInfoGral.pesquisar)


module.exports= routes