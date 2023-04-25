const {Router}=require('express')

const controllersUserlogin= require('../../controllers/User/login.js')
const controllersUsuario= require('../../controllers/User')





const routes=Router()

routes.post('/cadastrar',controllersUsuario.store)
routes.get('/listarusuarios', controllersUsuario.index)
routes.put('/editarusuario/:id', controllersUsuario.update)
routes.get('/pesquisar/:id',controllersUsuario.show)
routes.delete('/deletarusuario/:id', controllersUsuario.destroy)
routes.get('/userdefault',controllersUsuario.createDefaultUser) 


routes.post('/userlogin', controllersUserlogin.logar)


 














module.exports= routes