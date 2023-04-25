const {Router}=require('express')
const controllersManuaisvenda=require('../../controllers/vendaManuais')

const controllers_filro=require('../../controllers/vendaManuais/filtro')
const {eAdmin}=require('../../controllers/middleres')

const routes=Router()


//routes.get('/usuarios', controllersUserListarusuarios.listarUsuario)
//routes.get('/usuarios/pesquisar', controllersUserPesquisarUsuario.pesquisarUsuario)

routes.post('/vendamanuais',eAdmin, controllersManuaisvenda.store)
routes.get('/listarvendas', controllersManuaisvenda.index)  
routes.put('/editarvendamanual/:id',eAdmin, controllersManuaisvenda.update)
routes.delete('/deletarvenda/:id', controllersManuaisvenda.destroy) 
routes.get('/pesquisarvendas/:id', controllersManuaisvenda.show) 

//routes.get('/pesquisarvendas/:id', controllersManuaisvenda.show) 

routes.post('/filtrarvendas',controllers_filro.filtro)














module.exports= routes