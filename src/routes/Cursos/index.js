const {Router}=require('express')
const controllersCurso=require('../../controllers/Cursos')
const controllersFiltroMulta=require('../../controllers/Cursos/filtroMulta')






const routes=Router()
routes.post('/cadastrarcurso',controllersCurso.store)
routes.get('/listarCursos',controllersCurso.index)
routes.get('/pesquisarCurso/:id_curso',controllersCurso.show) 
routes.get('/filtromulta',controllersFiltroMulta.filtroMulta) 
routes.put('/editarcurso/:id',controllersCurso.update)
routes.delete('/deletarcurso/:id',controllersCurso.destroy)
module.exports= routes