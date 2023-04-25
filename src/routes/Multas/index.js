const {Router}=require('express')
const ControllersMultas= require('../../controllers/Multas')
const controllersListarMultas=require('../../controllers/Multas/ListarMultas')
const ControllersEditarMultas=require('../../controllers/Multas/EditarMultas')
const ControllersPesquisarMultas=require('../../controllers/Multas/PesquisarMulta')
const controllersDeletarMultas= require('../../controllers/Multas/excluirMulta')
const controllersListarMultasEstudante=require('../../controllers/Multas/listarMultasEstudante')
const controllers_multas=require('../../controllers/Multas/multa')


const routes=Router()




routes.post('/pagarmultas', ControllersMultas.store)
routes.get('/listarmultas', ControllersMultas.index)
routes.get('/pesquisarmulta/:id',ControllersMultas.show)
routes.delete('/deletarmulta/:id',ControllersMultas.destroy) 

routes.get('/listarmultasestudante/:codigoCadastro',controllersListarMultasEstudante.listarMultaEstudantes)
routes.post('/editarmultas',ControllersEditarMultas.editarMultas)
routes.get('/pesquisarmulta/:id_multa',ControllersPesquisarMultas.pesquisarMultaPaga)
routes.delete('/deletarmulta/:id_multa',controllersDeletarMultas.deletarMultaPaga)  
routes.get('/multar',controllers_multas.store)









module.exports= routes