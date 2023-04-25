const {Router}=require('express')
const controllersManuais=require('../../controllers/Manuais')
const controllersActualizarmanual= require('../../controllers/Manuais/actualizarManual.js')
const {eAdmin}=require('../../controllers/middleres')



const routes=Router()
routes.post('/cadastrarmanual',eAdmin,controllersManuais.store)
routes.get('/listarmanuais',controllersManuais.index)
routes.get('/pesquisarmanual/:id',controllersManuais.show)
routes.put('/editarmanual/:id',controllersManuais.update)
routes.delete('/deletarmanual/:id',controllersManuais.destroy)
routes.patch('/actualizarmanual/:id',controllersActualizarmanual.actualizarManual) 







module.exports= routes