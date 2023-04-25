const {Router}=require('express')
const controllersBairros =require('../../controllers/Bairros')
const {eAdmin}=require('../../controllers/middleres')







const routes=Router()
routes.post('/cadastarbairro',eAdmin,controllersBairros.store)
routes.get('/listarbairros',controllersBairros.index)
routes.put('/actualizarbairro/:id',controllersBairros.update) 
routes.get('/pesquisarbairro/:id',controllersBairros.show)







module.exports= routes