const {Router}=require('express')
const controllersPagamentos= require('../../controllers/Pagamentos')
const controllersPagamentosValores= require('../../controllers/Pagamentos/pagamentosValores.js')
const controllersPagamentosValoresEspeciais=require('../../controllers/Pagamentos/pagamentosValoresEspeciais.js')
const controllersFiltro=require('../../controllers/Pagamentos/filtro')
const {eAdmin}=require('../../controllers/middleres')


const ControllersPesquisarMensalidadesEstudante= require('../../controllers/Pagamentos/pesquisarmensalidadesEstudante')
const ControllersPagarMensalidadeComMulta= require('../../controllers/Pagamentos/pagarComMulta')
const ControllersPagarMensalidadeEspecial= require('../../controllers/Pagamentos/pagamentosEspeciais.js') 
const ControllersPagarMensalidadeSemMulta =require('../../controllers/Pagamentos/pagarSemMulta.js')
const controllers_pagamentos_especiais_info=require('../../controllers/Pagamentos/pagamentosEspeciaisInfo')

const routes=Router()
routes.get('/pagamentosvalores/:id',controllersPagamentosValores.pesquisarEstudantedados)
routes.get('/pagamentosvaloresespeciais/:id',controllersPagamentosValoresEspeciais.pesquisarEstudantedados)
routes.post('/pagarmensalidade',eAdmin,controllersPagamentos.store)
routes.get('/listarmensalidades',controllersPagamentos.index) 
routes.get('/pesquisarmensalidade/:id',controllersPagamentos.show) 
routes.put('/editarmensalidade/:id',controllersPagamentos.update) 
routes.delete('/deletarmensalidade/:id',controllersPagamentos.destroy)


routes.get('/pesquisarmensalidadesestudante/:id',ControllersPesquisarMensalidadesEstudante.pesquisarMensalidadeEstudante)
routes.post('/pagarmensalidadeespecial',eAdmin,ControllersPagarMensalidadeEspecial.store)
routes.post('/pagarmensalidadecommulta',eAdmin,ControllersPagarMensalidadeComMulta.store)
routes.post('/pagarmensalidadesemmulta',eAdmin,ControllersPagarMensalidadeSemMulta.store)
routes.get('/pagamentos/filtro',eAdmin,controllersFiltro.index)
routes.post('/filtrarpagamento',eAdmin,controllersFiltro.filtro)
routes.get('/pagamentosinfo/:id',controllers_pagamentos_especiais_info.index)




module.exports= routes