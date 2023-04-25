const {Router}=require('express')
const multer= require('multer')
const uploadConfig= require('../../config/upload')
const upload= multer(uploadConfig)
const controllersEstudante =require('../../controllers/Estudantes')
const controllersFotoUpdate= require('../../controllers/Estudantes/actualizarfoto.js')
const {eAdmin}=require('../../controllers/middleres')





const routes=Router()
routes.post('/cadastrarestudante',eAdmin,upload.single('filename'),controllersEstudante.store)
routes.get('/listarestudantes',controllersEstudante.index)
routes.put('/editarestudante/:id',eAdmin,controllersEstudante.update)  
routes.get('/pesquisarestudante/:id',controllersEstudante.show)
routes.delete('/excluirestudante/:id',controllersEstudante.destroy)


routes.put('/actualizarfoto',upload.single('filename'),controllersFotoUpdate.actualizarFoto)  


 

  


module.exports= routes