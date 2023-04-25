

const {Router}=require('express')
const controllersEscola =require('../../controllers/Escolas')
const {eAdmin}=require('../../controllers/middleres')









const routes=Router()
routes.post('/cadastrarescola',controllersEscola.store)
routes.get('/listarescolas',controllersEscola.index)
routes.get('/escola/:id',controllersEscola.show)
routes.put('/escola/:id',controllersEscola.update)








module.exports= routes