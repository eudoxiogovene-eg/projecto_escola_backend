const {Router}=require('express')

const controllersPagamentosMulta= require('../../controllers/pagamentosMulta')
const controlleres_filtarMultas= require('../../controllers/pagamentosMulta/filtro')
const {eAdmin}=require('../../controllers/middleres')





const routes=Router()

routes.post('/pagarmulta',eAdmin,controllersPagamentosMulta.store)
routes.get('/listarmultaspagas', controllersPagamentosMulta.index)
routes.delete('/deletarpagamentomulta/:id',eAdmin,controllersPagamentosMulta.destroy)
routes.get('/pegarpagamentomulta/:id',controllersPagamentosMulta.show)
routes.put('/editarpagamentomulta/:id',controllersPagamentosMulta.update) 
routes.post('/filtrarpagamentosmultas',controlleres_filtarMultas.filtro)
//routes.put('/editarusuario/:id', controllersUsuario.update)
//routes.get('/pesquisar/:id',controllersUsuario.show)
//routes.delete('/deletarusuario/:id', controllersUsuario.destroy)


module.exports= routes