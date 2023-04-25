

const Pagamentos= require('../../models/pagamentos')
const Multas= require('../../models/multas')
const PagamentosMulta= require('../../models/pagamentosMultas')
const crypto=require('crypto')
const data= new Date()
const ano= data.getFullYear()
module.exports={

          async store(req,res){
                    
           
            const usuario=req.user
                             const {
                              
                               codigoCadastro,
                               formPagamento,
                               mensalidade,
                               anoPagamento,
                               valor_mensalidade,
                               codigoIdMulta

                    }=req.body 
                    const codigoPagamento=crypto.randomBytes(4).toString('Hex')
                    let codigoInscricao
                    let valorMulta
                    let curso
                 
                    if(!codigoCadastro){
                              return res.status(400).json({message:"o campo codigoCadastro e obrigatorio"})
                    }                               
                    if(!formPagamento){
                              return res.status(400).json({message:"o campo formPagamento e obrigatorio"})
                    }
                    if(!usuario){   
                              return res.status(400).json({message:"o campo usuario e obrigatorio"})
                    }
                    if(!codigoIdMulta){   
                      return res.status(400).json({message:"o campo codigoIdMulta e obrigatorio"})
                    }

                    let valorTotal
                    let status="paga"
 
                    let pagaComMulta=true  

                 try{
                  const pesquisarMultaId= await Multas.findById(codigoIdMulta)
                  if(!pesquisarMultaId){
                    return res.status(400).json({message:"a multa selecionada nao existe"})
                  }
                  
                  
                  valorMulta=pesquisarMultaId.valorMulta
                  codigoInscricao=pesquisarMultaId.codigoInscricao
                  curso=pesquisarMultaId.curso
                
                  //  console.log(pesquisarMultaId)
                  // console.log(codigoInscricao)
                  // console.log(curso)
                //  return
                  //  const pagamentosEstudante= await  Pagamentos.find({codigoCadastro})
                  //   if(pagamentosEstudante.length==0){
                  //   return res.status(400).json({message:"estudante nao possui nenhum pagamento"})
                  //  }

                   const pesPagamento=await Pagamentos.findOne({
                    codigoCadastro,mensalidade,anoPagamento,curso 
                    })
                    if(pesPagamento){
                              return res.status(420).json({message:"mensalidade selecionada ja foi paga"})
                    }
                    let valorTotalPago=Number(valor_mensalidade)+ Number(valorMulta)
                     const pagamentos= await Pagamentos.create({
                     valor_mensalidade,
                     codigoCadastro,valorTotalPago,
                     formPagamento,mensalidade,
                     usuario
                     ,curso,codigoInscricao,
                     codigoPagamento,codigoIdMulta,
                     anoPagamento,pagaComMulta
                     })
                     
                     let statusMulta="paga"
                     const pesquisaMulta= await Multas.findById(codigoIdMulta)
                     if(!pesquisaMulta){
                         return res.status(400).json({message:"multa invalida"})
                     }
                  
              
                     if(pesquisaMulta.statusMulta=="paga"){
                         return res.status(400).json({message:"esta multa ja foi paga"})
                     }
                     
                      let codigoCadastro2=pesquisaMulta.codigoCadastro._id
                      let codigoInscricao2=pesquisaMulta.codigoInscricao._id
                     let mensalidade2=pesquisaMulta.mensalidade._id
                      let curso2=pesquisaMulta.curso._id
                   
                    
                        let pagaComMensalidade=true
                        let codigoMensalidadePagamento=pagamentos._id
                       const  pagarMulta= await PagamentosMulta.create({
                            codigoIdMulta,
                            codigoInscricao:codigoInscricao2,
                            codigoCadastro:codigoCadastro2,
                            curso:curso2,
                            mensalidade:mensalidade2,
                            usuario,
                            formaPagamento:formPagamento,
                            codigoPagamento,
                            pagaComMensalidade,
                            codigoMensalidadePagamento,
                           anoPagamento:ano
                        })
                  
                     
                    
                    const updateMulta= await Multas.findByIdAndUpdate(codigoIdMulta,{
                        statusMulta
                    })

                     return res.status(200).json({
                       message:"mensalidade paga com sucesso",
                       data:pagamentos,
                       data2:pagarMulta
                     })

                  }catch(err){
                    console.log(err)
                     return res.status(400).json({message:"houve um erro", err})
                   } 

          
                     
          }
          
         

          
}





 /*const multa = await Multas.findOneAndUpdate(id_multa,{
                                        
                        data_Multa:dataPagamento,valorMulta,
                        forma_pagamento,mensalidadeMes:mensalidade,
                        usuario,codigoCadastroEst:codigoEstudante,status,
                        data_pagamento:dataPagamento
                      },{
                                new:true
                      })
                      if(multa.length==0){ 
                                return res.status(400).json({message:"multa nao existe, mensalidade paga com sucesso"})
                      }
                      return res.status(200).json({
                                message:"muilta e mensalidade pagas com sucesso",
                                data:multa
                      })
                      */






















/*
const Pagamentos= require('../../../models/pagamentos')


module.exports={

          async pagar_mensalidadeComMulta(req,res){
                    

                    const {
                              dataPagamento,
                              codigoEstudante,
                              formPagamento,codigoMensalidade,mes,
                              anoNascimento,desconto,anoPagamento,
                              ultimaMensalidade,mensalidadeApagar,
                              pagarMulta,pagarcomMulta,usuario
                             

                    }=req.body 
                   // const{usuario}=req.headers
                   // console.log(req.body)
                   // console.log(req.headers)
                    

                    if(!dataPagamento){
                              return res.status(400).json({message:"o campo dataPagamento e obrigatorio"})

                    }
                 
                    if(!codigoEstudante){
                              return res.status(400).json({message:"o campo codigoEstudante e obrigatorio"})

                    }
                
                 
                    if(!formPagamento){
                              return res.status(400).json({message:"o campo formPagamento e obrigatorio"})

                    }
                    if(!codigoMensalidade){
                              return res.status(400).json({message:"o campo codigoMensalidade e obrigatorio"})

                    }
                    if(!mes){
                              return res.status(400).json({message:"o campo mes e obrigatorio"})

                    }  
                    if(!usuario){   
                              return res.status(400).json({message:"o campo usuario e obrigatorio"})

                    }
                    
                    let dt=new Date()
                    let anoSistema=dt.getFullYear()
                    let mesSistema= 4  //parseInt(dt.getMonth()+1)
                    let diaSistema= 24//parseInt(dt.getDate())
                    let mensalidadeCrianca=700
                    let mensalidadeAdulto=1000
                    anoNascimento:anoNascimento
                    let idade=anoSistema-anoNascimento
                    var valor_mensalidade
                    let valorTotal
                    let status
                  
                   
                   // let multa = 0;
                   
                 
              
                 
                    
                    
             
                    if(desconto=="activo"){ 
                           
                              if(idade>13){
                                        //return res.status(200).json({message:mensalidadeAdulto})
                                        valor_mensalidade=750
                                        console.log("com desconto")
                              }
                              if(idade<13){
                                       // return res.status(200).json({message:mensalidadeCrianca})
                                        valor_mensalidade=500
                                        console.log("com desconto")
                                         
                              }

                    }
                   if(desconto!="activo"){
                              if(idade>13){
                                        //return res.status(200).json({message:mensalidadeAdulto})
                                        valor_mensalidade=1000
                                        console.log("sem desconto")
                              }
                              if(idade<13){
                                        //return res.status(200).json({message:mensalidadeCrianca})
                                        valor_mensalidade=750
                                        console.log("sem desconto")
                                        
                              }

                   }
                  
                 
                   status="paga"
                   valorMulta=valor_mensalidade*20/100
                   
                   valorTotalPago=valorMulta+valor_mensalidade
                   
                   const multa={
                    status,
                    valorMulta
                   }
                   const mensalidade={
                    codigoMensalidade:codigoMensalidade,
                    mes:mes
                  }
                   


                    try{
                              const pagamentos= await Pagamentos.create({
                                        dataPagamento,valor_mensalidade,
                              codigoEstudante,valorTotalPago,
                              multa,formPagamento,mensalidade,
                              usuario
                              })
                              return res.status(200).json({message:"menslidade multa pagas com sucesso",data:pagamentos})

                    }catch(err){
                              return res.status(400).json({message:"houve um erro", err})
                    } 





                   
          
                     
          }
}
*/