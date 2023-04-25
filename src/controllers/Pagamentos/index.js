const Pagamentos= require('../../models/pagamentos')
const Multas= require('../../models/multas')
const Cadastrados= require('../../models/Cadastros')
const PagamentosMulta= require('../../models/pagamentosMultas')

const crypto=require('crypto')


module.exports={

          async store(req,res){
            const codigoPagamento=crypto.randomBytes(4).toString('Hex')   

                    const {
                           
                              codigoCadastro,
                              formPagamento,
                              mensalidade,
                              anoPagamento,valor_mensalidade,
                              permissaopagamentoParaEstudanteInactivo
                                              
                    }=req.body 
                    console.log(req.body)
                    const usuario=req.user
                    const pagaComMulta="false" 

                 
                    if(!codigoCadastro){
                              return res.status(400).json({message:"o campo codigoCadastro e obrigatorio"})

                    }
                 
                    if(!formPagamento){
                              return res.status(400).json({message:"o campo formPagamento e obrigatorio"})
                    }

                    if(!usuario){   
                              return res.status(400).json({message:"o campo usuario e obrigatorio"})
                    }

                    if(!pagaComMulta){   
                     return res.status(400).json({message:"o campo pagaComMulta e obrigatorio"})
                    }
                    if(!mensalidade){
                      return res.status(400).json({message:"o campo mensalidade e obrigatorio"})
        
                   }
                


                    let anoMulta=anoPagamento
                    // pesquisando multa na tabela multas
                    let statusMulta="pendente" 
                    let  valorTotalPago=valor_mensalidade
                  
                   
                           

               try{
                const cadastro= await Cadastrados.findById(codigoCadastro)
                
              
                if(!cadastro){
                  return res.status(400).json({message:"o estudante nao existe"})
                }
                
                let codigoInscricao=cadastro.codigoInscricao
                let curso=cadastro.curso
                let estadoEstudante=cadastro.estado
              // console.log(codigoCadastro)
                    const pagamentosEstudante= await  Pagamentos.find({codigoCadastro})
                     if(pagamentosEstudante.length==0){
                     return res.status(400).json({message:"estudante nao possui nenhum pagamento"})
                  }
                  if(!permissaopagamentoParaEstudanteInactivo){
                    if(estadoEstudante=="inactivo"){
                      return res.status(400).json({message:"nao e possivel pagar mensalidade de um estudante inactivo"})
                    }
                 }
                    const pesPagamento=await Pagamentos.findOne({
                        codigoCadastro,mensalidade,anoPagamento,curso
                    })
                    if(pesPagamento){
                              return res.status(420).json({message:"mensalidade selecionada ja foi paga"})
                    }
                    
                     const pesquisarmulta= await Multas.findOne({
                      anoMulta,statusMulta,
                      codigoCadastro,mensalidade,curso
                     })
                    
                    if(pesquisarmulta){
                               return res.status(207).json({message:"estudante com multa",data:pesquisarmulta})
                    }
                    
                     const pagamentos= await Pagamentos.create({
                     valor_mensalidade,
                     codigoCadastro,valorTotalPago,
                     formPagamento,mensalidade,
                     usuario
                     ,anoPagamento,curso,codigoInscricao,
                     pagaComMulta,codigoPagamento,anoPagamento
                     })
                     return res.status(200).json({message:"menslidade paga com sucesso",data:pagamentos})

                     }catch(err){
                     return res.status(400).json({message:"houve um erro", err})
                     } 

          
                     
          },
          async index(req,res){
            const {schoolname}=req.headers
            console.log("chegou")
            if(!schoolname){ 

                      try{
                                const pagamentos= await  Pagamentos.find()
                                .populate('mensalidade')
                                .populate("codigoCadastro")
                                .populate("codigoInscricao")
                                .populate("curso")
                                .populate("usuario")
                                .populate("schoolname")
                                .populate("codigoIdMulta")
                                if(pagamentos.length==0){
                                          return res.status(400).json({message:"nao existem pagamentos"})
                                }
                                return res.status(200).json({
                                          message:"mensalidade pagas sem filtro ",
                                          data:pagamentos
                                })
                       }catch(err){
                                 return res.status(400).json({
                                           message:"houve um errp",
                                           data:err
                                 })
                       }

            }
            if(schoolname){
                      try{
                                const pagamentos= await  Pagamentos.find({schoolname})
                                //.populate('usuario')
                                .populate('mensalidade')
                                .populate("codigoEstudante")
                                .populate("codigoEstudanteIns")
                               
                                
                                if(pagamentos.length==0){
                                          return res.status(400).json({message:"nao existem pagamentos"})
                                }
                                return res.status(200).json({
                                          message:"mensalidade pagas com filtro ",
                                          data:pagamentos
                                })
                       }catch(err){
                                 return res.status(400).json({
                                           message:"houve um errp",
                                           data:err
                                 })
                       }

            }

          },

          async show(req,res){
               const {id}=req.params
               if(!id){
                         return res.status(400).json({message:"o campo codigoEstudante e obrigatorio"})
               }
               try{
                        const pagamentos= await  Pagamentos.findById(id)
                        .populate('mensalidade')
                        .populate("codigoCadastro")
                        .populate("codigoInscricao")
                        .populate("curso")
                        .populate("codigoIdMulta")
                        .populate("usuario")
                     
                        if(pagamentos===null){
                                  return res.status(400).json({message:"pagamento nao encontrado"})
                        }
                        return res.status(200).json({
                                  message:"pagamento encontrado com sucesso",
                                  data:pagamentos
                        })
               }catch(err){
                         return res.status(400).json({
                                   message:"houve um erro",
                                   data:err
                         })
               }

             
          },

          async update(req,res){
            const { formPagamento}=req.body 
            const{id}=req.params
            console.log('chegou')

            if(!id){
                      return res.status(400).json({message:"o campo id e obrigatorio"})

            }
            try{
                     const pagamentos= await  Pagamentos.findByIdAndUpdate(id,{
                      formPagamento
                     },{
                               new:true
                     })
                     if(pagamentos.length==0){
                               return res.status(400).json({message:"pagamento nao encontrado"})
                     }
                     return res.status(200).json({
                               message:" mensalidade alterada com sucesso",
                               data:pagamentos
                     })
            }catch(err){
                      return res.status(400).json({
                                message:"houve um errp",
                                data:err
                      })
            }
                     
         },

         async destroy(req,res){
                        
            const{id}=req.params
            let statusMulta="pendente"
         
            if(!id){
                     return res.status(400).json({message:"o campo id e obrigatorio"})
            }
            try{
                     const pagamentos= await  Pagamentos.findByIdAndDelete(id) 
                     if(!pagamentos){
                              return res.status(400).json({message:"pagamento nao encontrado"})
                     }
                     const pagaComMulta=pagamentos.pagaComMulta
                     console.log(pagamentos)
                     const codigoMensalidadePagamento=pagamentos._id
                     const codigoCadastro=pagamentos.codigoCadastro
                     const anoPagamento=pagamentos.anoPagamento
                     console.log(codigoMensalidadePagamento,codigoCadastro,anoPagamento)
                     if(pagaComMulta){


                      
                        const deletarPagamentos=await PagamentosMulta.findOne({
                          codigoMensalidadePagamento,
                          codigoCadastro,
                          anoPagamento
                        })
                        
                        if(!deletarPagamentos){
                            return res.status(400).json({message:"pagamento nao encontrado"})
                        }
    
                        const codigoIdMulta= deletarPagamentos.codigoIdMulta
                        const deletePagamento= await PagamentosMulta.findOneAndDelete({
                          codigoMensalidadePagamento,
                          codigoCadastro,
                          anoPagamento
                        })
                        const updateMulta= await Multas.findByIdAndUpdate(codigoIdMulta,{
                            statusMulta
                        })
                    

                     }

                   
                     return res.status(200).json({
                              message:" mensalidade deletada com sucesso",
                              data:pagamentos,
                              pagaComMulta
                     })
            }catch(err){
              console.log(err)
                     return res.status(400).json({
                     
                              message:"houve um erro",
                             
                     })
            }
                     
         }


}