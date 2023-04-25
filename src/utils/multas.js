const Cadastrados = require('../models/Cadastros')
const PagamentosMulta= require('../models/pagamentosMultas')
const Multas=require('../models/multas')

const crypto=require('crypto')
  module.exports={
   
    async pagarMulta(codigoIdMulta,formaPagamento,usuario,codigoMensalidadePagamento){
        const codigoPagamento=crypto.randomBytes(4).toString('Hex')
        let statusMulta="paga"
       try {

        const pesquisaMulta= await Multas.findById(codigoIdMulta)
                     if(!pesquisaMulta){
                        let message="multa nao existe"
                        return message
                     }
              
                     if(pesquisaMulta.statusMulta=="paga"){
                        let message="esta multa ja foi paga"
                        return message
                     }
                     
                     const codigoCadastro=pesquisaMulta.codigoCadastro._id
                     const codigoInscricao=pesquisaMulta.codigoInscricao._id
                     const mensalidade=pesquisaMulta.mensalidade._id
                     const curso=pesquisaMulta.curso._id
                    let pagarMulta
                     if(!codigoMensalidadePagamento){
                        let pagaComMensalidade=false
                         pagarMulta= await PagamentosMulta.create({
                            codigoIdMulta,
                            codigoInscricao,
                            codigoCadastro,
                            curso,
                            mensalidade,
                            usuario,
                            formaPagamento,
                            codigoPagamento,
                            pagaComMensalidade
                        })
                         
                     }else{
                        let pagaComMensalidade=true
                         pagarMulta= await PagamentosMulta.create({
                            codigoIdMulta,
                            codigoInscricao,
                            codigoCadastro,
                            curso,
                            mensalidade,
                            usuario,
                            formaPagamento,
                            codigoPagamento,
                            codigoMensalidadePagamento,
                            pagaComMensalidade
                            

                        })
                     }
                    
                    const updateMulta= await Multas.findByIdAndUpdate(codigoIdMulta,{
                        statusMulta
                    })
                    return pagarMulta
       } catch (error) {
        console.log(error)
       }
    },









           


    async deletarPagamentoMulta(id,codigoMensalidadePagamento,codigoIdMulta){
      let statusMulta="pendente"
       try {
        if(!codigoMensalidadePagamento){
          const deletarPagamentos=await PagamentosMulta.findById(id)
          if(!deletarPagamentos){
              return res.status(400).json({message:"pagamento nao encontrado"})
          }
          const pagaComMensalidade=deletarPagamentos.pagaComMensalidade
          if(pagaComMensalidade){
              return res.status(400).json({message:"nao possivel deletar esta multa pos foi paga com mensalidade"})
          }else{
              const deletePagamento= await PagamentosMulta.findByIdAndDelete(id)
              const updateMulta= await Multas.findByIdAndUpdate(codigoIdMulta,{
                  statusMulta
              })
          }
          console.log(deletarPagamentos)
      }
      if(codigoMensalidadePagamento){
          const deletarPagamentos=await PagamentosMulta.findOne({codigoMensalidadePagamento})
          if(!deletarPagamentos){
              return res.status(400).json({message:"pagamento nao encontrado"})
          }
          const deletePagamento= await PagamentosMulta.findByIdAndDelete(id)
          const updateMulta= await Multas.findByIdAndUpdate(codigoIdMulta,{
              statusMulta
          })
      }

       } catch (error) {
        
       }
    }
  }