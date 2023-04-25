const Pagamentos= require('../../models/pagamentos')
const Multas= require('../../models/multas')
const crypto=require('crypto')

module.exports={

    async store(req,res){
              
        
        const codigoPagamento=crypto.randomBytes(4).toString('Hex')   
        const usuario=req.user
            const {
                          
                           codigoCadastro,
                           formPagamento,
                           mensalidade,
                           anoPagamento,
                           valor_mensalidade, 
                           codigoIdMulta

                }=req.body 
               
                let codigoInscricao
                let valorMulta
                let curso
                let pagaComMulta=false  
                let valorTotalPago= valor_mensalidade

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
   
       
              
  
     try{
        const pesquisarMultaId= await Multas.findById(codigoIdMulta)
        if(!pesquisarMultaId){
          return res.status(400).json({message:"a multa selecionada nao existe"})
        }
        
        valorMulta=pesquisarMultaId.valorMulta
        codigoInscricao=pesquisarMultaId.codigoInscricao
        curso=pesquisarMultaId.curso
     
              
        const pesPagamento=await Pagamentos.findOne({
            codigoCadastro,mensalidade,anoPagamento,curso 
            })
            if(pesPagamento){
                      return res.status(420).json({message:"mensalidade selecionada ja foi paga"})
            }    

            const pagamentos= await Pagamentos.create({
                valor_mensalidade,
                codigoCadastro,valorTotalPago,
                formPagamento,mensalidade,
                usuario
                ,curso,codigoInscricao,
                codigoPagamento,codigoIdMulta,
                anoPagamento,pagaComMulta
                })

                return res.status(200).json({
                  message:"mensalidade paga com sucesso",
                  data:pagamentos
                })

               
            }catch(err){
               return res.status(400).json({message:"houve um erro", err})
               }            
    }
    
   

    
}