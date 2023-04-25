const Pagamentos= require('../../models/pagamentos')

module.exports={
    async index(req,res){


        try {
            const pagamentos= await Pagamentos.find()
            if(pagamentos.length==0){
                return res.status(400).json({message:"nenhum pagamento feito  ainda"})
            }

            return res.status(200).json({message:"mensalidades pagas",data:pagamentos})
        } catch (error) {
            console.log(error)
            return res.status(200).json({message:'houve um erro'})
        }
        

        console.log(pagamentos)
    },
    
    async filtro(req,res){

const{curso,anoPagamento,mensalidade,horario,nivel, dataPagamento,schoolname}=req.body


            const filtro={}
            let codigoCadastro={}

            if(schoolname){
            filtro.schoolname=schoolname
            }
            
            // if(nivel){
            //     codigoCadastro.nivel=nivel
            // }

            // if(horario){
            // codigoCadastro.horario=horario
            // }

            if(anoPagamento){
            filtro.anoPagamento=anoPagamento
            }

            if(dataPagamento){
                filtro.dataPagamento=dataPagamento
            }

            if(curso){
            filtro.curso=curso
            }

            if(mensalidade){
                filtro.mensalidade=mensalidade
            }

            // if(codigoCadastro){
            //     filtro.codigoCadastro=codigoCadastro
            // }
                     console.log(filtro)
        try {
            const pagamentos= await Pagamentos.find(filtro)
            .populate('mensalidade')
            .populate("codigoCadastro")
            .populate("codigoInscricao")
            .populate("curso")
            .populate("usuario")
            .populate("schoolname")
            .populate("codigoIdMulta")
            if(pagamentos.length==0){
                return res.status(400).json({data:pagamentos})
            }
         
            let pagamentosFiltrados
              if(horario && nivel){
                pagamentosFiltrados= await pagamentos.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.horario ==horario && pagamento.codigoCadastro.nivel==nivel
                  })
                  return res.status(200).json({message:"mensalidades pagas",data:pagamentosFiltrados})
          
              }else if(horario){
                pagamentosFiltrados= await pagamentos.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.horario ==horario
                  })
                  return res.status(200).json({message:"mensalidades pagas",data:pagamentosFiltrados})
              }else if(nivel){
                pagamentosFiltrados= await pagamentos.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.nivel ==nivel
                  })
                  return res.status(200).json({message:"mensalidades pagas",data:pagamentosFiltrados})
              }
              console.log(pagamentosFiltrados)
              
            return res.status(200).json({message:"mensalidades pagas",data:pagamentos})
        } catch (error) {
            console.log(error)
            return res.status(200).json({message:'houve um erro'})
        }
        

        
    },
} 
