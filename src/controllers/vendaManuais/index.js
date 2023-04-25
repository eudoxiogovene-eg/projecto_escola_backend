const Vendas= require('../../models/VendaManuais')
const Manuais= require('../../models/manuais')
const Cadastrados= require('../../models/Cadastros')
const crypto=require('crypto')

module.exports={
    async store(req,res){
      const codigoVenda=crypto.randomBytes(4).toString('Hex')  
 

      let data= new Date()
      const dia=data.getDate()
      const mes=data.getMonth()+1
      let dia2
      let mes2
      if(mes<10){
        mes2=`0${mes}`
      }else{
        mes2=mes
      }
      if(dia<10){
        dia2=`0${dia}`
      }else{
        dia2=dia
      }
      
      const ano=data.getFullYear() 
      
      let dataHoje=`${ano}-${mes2}-${dia2}`
      const{
        quantidade,
        statusEntrega,formPagamento
        ,codigoCadastro, codigoManualId
    }=req.body
    let curso
    let codigoInscricao
    let valorTotalPago
    const usuario=req.user
    let schoolname


      
       
            if(!quantidade){  
              return res.status(400).json({
                                message:"o campo quantidade e obrigatorio"
                        })
            }


            if(!statusEntrega){
                return res.status(400).json({
                        message:"o campo stutus e obrigatorio"
                })
            }

           if(!formPagamento){
             return res.status(400).json({
                    message:"o campo formPagamento e obrigatorio" 
             })
           }

           if(!usuario){
            return res.status(400).json({
                   message:"o campo usuario e obrigatorio"
            })
          }


          
          if(!codigoCadastro){
            return res.status(400).json({
                   message:"o campo codigoCadastro e obrigatorio"
            })
          }
          if(!codigoManualId){
            return res.status(400).json({
                   message:"o campo codigoManual e obrigatorio"
            })
          }

         
         
              try {
                const estudante= await Cadastrados.findById(codigoCadastro)
                if(!estudante){
                  return res.status(400).json({message:"estudante nao encontrado"})
                }
                curso=estudante.curso
                codigoInscricao=estudante.codigoInscricao
                schoolname=estudante.schoolname

         
                 const anoPagamento=ano
                
                const manual=  await Manuais.findOneAndUpdate({_id :codigoManualId}, {$inc : {'quantidadeManual' : -quantidade}}, {new: true })
        
                if(!manual){
                return res.status(400).json({message:"manual nao encontrado"})
                }
                valorTotalPago=Number(manual.valorManual)*Number(quantidade)
                
                   
                const vendaManuais= await Vendas.create({
                  curso,quantidade,
                  statusEntrega,formPagamento,
                  usuario, codigoInscricao
                  ,codigoCadastro 
                  ,codigoVenda,codigoManualId,
                  valorTotalPago,
                  dataPagamento:dataHoje,
                  schoolname,
                  anoPagamento
                  })
                 
                 return res.status(200).json({
                           message:"venda efectuada  com sucesso",
                            data:vendaManuais,
                            data2:manual
                  })

                 
                        
              } catch (erro) {
                        return res.status(400).json({
                                  message:"houve um erro",
                                  data:erro
                        })
              }
    },
    async index(req,res){
     

      try {

          const vendaManuais= await Vendas.find()  

          .populate("codigoCadastro")
          .populate("codigoInscricao")
          .populate("curso")       
          .populate("codigoManualId") 
          


           if (vendaManuais.length==0){
            return res.status(404).json({message:"nenhuma venda encontrada "})
          }
           return res.status(200).json({
            message:"vendas encontradas com sucesso sucesso",
            data:vendaManuais
             
      }) 
         
                
      } catch (erro) {
                return res.status(400).json({
                          message:"houve um erro",
                          data:erro
                })
      }
     },

    async update(req,res){
    

      const{
        quantidade,
        statusEntrega,formPagamento,
           
    }=req.body
    const usuario=req.user

    const {id}=req.params
    console.log(req.body)
    
 

            if(!id){
                return res.status(400).json({
                  message:"o campo  id e obrigatorio"
            })

            if(!quantidadeAnterior){
                return res.status(400).json({message:"o campo quantidadeAnterior e obrigatorio"})
              }
            }
            
           
            if(!quantidade){
              return res.status(400).json({
                                message:"o campo quantidade e obrigatorio"
                        })
            }
          

            if(!statusEntrega){
                return res.status(400).json({
                        message:"o campo stutus e obrigatorio"
                })
            }

           if(!formPagamento){
             return res.status(400).json({
                    message:"o campo formPagamento e obrigatorio"
             })
           }

           if(!usuario){
            return res.status(400).json({
                   message:"o campo usuario e obrigatorio"
            })
          }
       



        

              try {

                let vendaInfo= await Vendas.findById(id)
                
                let codigoManual=vendaInfo.codigoManualId
                let quantidadeAnterior=Number(vendaInfo.quantidade)
               
              // return console.log(typeof quantidadeAnterior)
                let valorTotalPago
                let manualDados

                let quantidadeAlterada 
                               

                  if(quantidadeAnterior>quantidade){
                    quantidadeAlterada=quantidadeAnterior-quantidade
                    const manual=  await Manuais.findOneAndUpdate({_id :codigoManual}, {$inc : {'quantidadeManual' : quantidadeAlterada}}, {new: true })
        
                    if(!manual){ 
                      return res.status(400).json({message:"manual nao encontrado"})
                      }

                       valorTotalPago=Number(manual.valorManual)*Number(quantidade)
                       manualDados=manual
                  }
                  
                 
                  if(quantidadeAnterior<quantidade){
                    quantidadeAlterada=quantidade-quantidadeAnterior
                    const manual=  await Manuais.findOneAndUpdate({_id :codigoManual}, {$inc : {'quantidadeManual' : -quantidadeAlterada}}, {new: true })
        
                  if(!manual){
                    return res.status(400).json({message:"manual nao encontrado"})
                    }
                    manualDados=manual
                    valorTotalPago=Number(manual.valorManual)*Number(quantidade)
                  }

                  
                
                  const vendaManuais= await Vendas.findByIdAndUpdate(id,{ 
                    quantidade,
                    statusEntrega,formPagamento,
                   
                    valorTotalPago
                   },{
                             new:true
                   })
                   const dados={
                    manualDados,
                    vendaManuais
                   }
                   return res.status(200).json({
                    message:"curso cadastrado com sucesso",
                     data:dados
                  }) 
                 
                        
              } catch (erro) {
                        return res.status(400).json({
                                  message:"houve um erro",
                                  data:erro
                        })
              }
    },


    async destroy(req,res){
      const{id}=req.params
  
          if(!id){
            return res.status(200).json({
                   message:"o campo id e obrigatorio"
            })
          }
        
         
        
              try {
                
                  const vendaManuais= await Vendas.findByIdAndDelete({_id:id})                  
                   if (!vendaManuais){
                    return res.status(404).json({message:"ordem de venda nao encontrada "})
                  }
                  const codigoManual=vendaManuais.codigoManualId
                  const quantidade=vendaManuais.quantidade

                  const manual=  await Manuais.findOneAndUpdate({_id :codigoManual}, {$inc : {'quantidadeManual' : quantidade}}, {new: true })
        
                  if(!manual){
                  return res.status(400).json({message:"manual bnnnn nao encontrado"})
                  }
                   return res.status(200).json({
                    message:"ordem de venda excluidacom sucesso",
                     
              }) 
                 
                        
              } catch (erro) {
                        return res.status(400).json({
                                  message:"houve um erro",
                                  data:erro
                        })
              }
    },
    
    


         async show(req,res){
     
          const{id}=req.params
          if(!id){
            return res.status(400).json({message:"o campo id e obrigatorio"})
          }
          try {

              const vendaManuais= await Vendas.findOne({_id:id})  

              .populate("codigoCadastro")
              .populate("codigoInscricao")
              .populate("curso")       
              .populate("codigoManualId")  
              .populate("usuario")      
              .populate("schoolname")                  


               if (!vendaManuais){
                return res.status(404).json({message:" venda nao encontrada "})
              }
               return res.status(200).json({
                message:"venda encontrada com sucesso sucesso",
                data:vendaManuais
                 
          }) 
             
                    
          } catch (erro) {
                    return res.status(400).json({
                              message:"houve um erro",
                              data:erro
                    })
          }
     },



}