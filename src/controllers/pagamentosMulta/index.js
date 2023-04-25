

const PagamentosMulta= require('../../models/pagamentosMultas')
const Multas= require('../../models/multas')
const Estudante=require('../../models/Estudantes')
//const funcaoPagarMulta= require('../../utils/multas')

const data= new Date()
const ano= data.getFullYear()
const crypto=require('crypto')
const pagamentosMultas = require('../../models/pagamentosMultas')
module.exports={

        async store(req,res){
         const {
                formaPagamento,
                codigoIdMulta,
                
              
            }=req.body
              
         const usuario=req.user
         const codigoPagamento=crypto.randomBytes(4).toString('Hex')
         let statusMulta="paga"
       

         if(!codigoIdMulta){
            return res.status(400).json({message:"o campo codigoIdMulta e obrigatorip"})
         }
               
         if(!formaPagamento){
            return res.status(400).json({message:"o campo formaPagamento e obrigatorip"})
         }
         if(!usuario){
            return res.status(400).json({message:"o campo usuario e obrigatorip"})
         }
        
      try{
        const pesquisaMulta= await Multas.findById(codigoIdMulta)
        if(!pesquisaMulta){
            return res.status(400).json({message:"multa invalida"})
        }
     
 
        if(pesquisaMulta.statusMulta=="paga"){
            return res.status(401).json({message:"esta multa ja foi paga"})
        }
        
        const  anoPagamento=ano
        const codigoCadastro=pesquisaMulta.codigoCadastro._id
        const codigoInscricao=pesquisaMulta.codigoInscricao._id
        const mensalidade=pesquisaMulta.mensalidade._id
        const curso=pesquisaMulta.curso._id

        const pesquisarEstudante=await Estudante.findById(codigoInscricao)
       const schoolname=pesquisarEstudante.schoolname
        
    
           let pagaComMensalidade=false
          const  pagarMulta= await PagamentosMulta.create({
               codigoIdMulta,  
               codigoInscricao,
               codigoCadastro,
               curso,
               mensalidade,  
               usuario,
               formaPagamento,
               codigoPagamento,
               pagaComMensalidade,
               anoPagamento,
               schoolname
           })
     
        
       
       const updateMulta= await Multas.findByIdAndUpdate(codigoIdMulta,{
           statusMulta
       })
                     return res.status(200).json({
                       message:"multa paga com sucesso",
                       pagarMulta,
                     
                     })

                  }catch(err){
                    console.log(err)
                     return res.status(400).json({message:"houve um erro", err})
                   } 

          
                     
          },

          async index(req,res){
            try {
                const MultasPagas=await PagamentosMulta.find()
                .populate("codigoMensalidadePagamento")
                .populate("codigoInscricao")
                .populate("codigoCadastro")
                .populate("mensalidade")
                .populate("codigoIdMulta")
                .populate("curso")
                .populate("schoolname")
                .populate("usuario")
                if(MultasPagas.length==0){
                    return res.status(400).json({message:"nenhuma multa foi paga"})
                }
                return res.status(200).json({
                    message:"multas pagas",
                    data:MultasPagas
                })
            } catch (error) {
                return res.status(400).json({message:"houve um erro"})
            }
          },

          async show(req,res){
            const {id}=req.params 
            
            if(!id){
                return res.status(400).json({message:"o campo id e obrigatorio"})
            }

            try {

                const pagamentoMulta= await PagamentosMulta.findById(id)
                .populate("codigoMensalidadePagamento")
                .populate("codigoInscricao")
                .populate("codigoCadastro")
                .populate("mensalidade")
                .populate("codigoIdMulta")
                .populate("curso")
                .populate("schoolname")
                .populate("usuario")
                if(!pagamentoMulta){
                    return res.status(400).json({message:'pagamento de multa nao encontrado'})
                }
                return res.status(200).json({
                    message:'pagamento encontrado com sucesso',
                    data:pagamentoMulta
                })
                
            } catch (error) {
                console.log(error)
                return res.status(400).json({message:'houve um erro'})
            }
            
          },
          async update(req,res){
           
            const {id}=req.params
            const {formaPagamento}=req.body
            if(!id){
                return res.status(400).json({message:'o campo id e obrigatorio'})
            
            }
            if(!formaPagamento){
                return res.status(400).json({message:"o campo forma de pagamento e obrigatorio"})
            }

            try {
              const updatePagamento= await PagamentosMulta.findByIdAndUpdate(id,{
                formaPagamento
              },{ 
                new:true
              })

              if(!updatePagamento){
                return res.status(400).json({message:"multa nao encontrada"})
              }

              return res.status(200).json({
                message:'multa alterada com sucesso',
                data:updatePagamento
            })

            } catch (error) {
                console.log(error)
                return res.status(400).json({message:"houve um erro"})
                
            }
          },
          async destroy(req,res){
            const {id}=req.params
            const {codigoMensalidadePagamento}=req.body
           
            let statusMulta="pendente"

            try {

                if(!codigoMensalidadePagamento){
                 
                    if(!id){
                        return res.status(400).json({message:"o campo id e obrigatorip"})
                    }
                   
                  

                    const deletarPagamentos=await PagamentosMulta.findById(id)
                    const codigoIdMulta= deletarPagamentos.codigoIdMulta
                   // return console.log(codigoIdMulta)
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
                        console.log(updateMulta)
                    }
                    
                }
                if(codigoMensalidadePagamento){
                    const deletarPagamentos=await PagamentosMulta.findOne({codigoMensalidadePagamento})
                    
                    if(!deletarPagamentos){
                        return res.status(400).json({message:"pagamento nao encontrado"})
                    }

                    const codigoIdMulta= deletePagamento  .codigoIdMulta
                    const deletePagamento= await PagamentosMulta.findByIdndDelete(id)
                    const updateMulta= await Multas.findByIdAndUpdate(codigoIdMulta,{
                        statusMulta
                    })
                }

                return res.status(200).json({message:"pagamento de multa deletado com sucesso"})
            } catch (error) {
                console.log(error)
                return res.status(400).json({message:"houve um erro"})
            }
          } 
}
