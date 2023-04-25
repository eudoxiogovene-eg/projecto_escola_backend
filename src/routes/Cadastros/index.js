const {Router}=require('express')
const controllersCadastro =require('../../controllers/Cadastros')
const controllersPesquisarCursoEstudante=require('../../controllers/Cadastros/cursosEstudantes.js')
const controllers_filtro=require('../../controllers/Cadastros/filtro')

const {eAdmin}=require('../../controllers/middleres')







const routes=Router()
routes.post('/cadastarestudantecurso',eAdmin, controllersCadastro.store) 
routes.get('/listarcadastrados',controllersCadastro.index)
routes.get('/pesquisarcadastro/:id',controllersCadastro.show) 
routes.put('/editarcadastro/:id',eAdmin,controllersCadastro.update) 
routes.delete('/deletarestudante/:id',eAdmin, controllersCadastro.destroy)
routes.get('/pesquisarEstudantesCurso/:curso',controllersPesquisarCursoEstudante.pesquisarCursoEstudante)
routes.post('/filtrarestudantes',controllers_filtro.filtro)  

 



 




module.exports= routes