const {Router}=require('express')
const controllersMensalidades= require('../../controllers/Mensalidades')

const routes=Router()

routes.get('/cadastrarmensalidade', controllersMensalidades.store)
routes.get('/listarmeses', controllersMensalidades.index) 

module.exports= routes