
const PagamentosMulta= require('../../models/pagamentosMultas')
module.exports={
 
    
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
            const pagamentosMultas= await PagamentosMulta.find(filtro)
            .populate('mensalidade')
            .populate("codigoCadastro")
            .populate("codigoInscricao")
            .populate("curso")
            .populate("usuario")
            .populate("schoolname")
            .populate("codigoIdMulta")
            if(pagamentosMultas.length==0){
                return res.status(400).json({data:pagamentosMultas})
            }
         
            let pagamentosMultasFiltrados
              if(horario && nivel){
                pagamentosMultasFiltrados= await pagamentosMultas.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.horario ==horario && pagamento.codigoCadastro.nivel==nivel
                  })
                  return res.status(200).json({message:"mensalidades pagas",data:pagamentosMultasFiltrados})
          
              }else if(horario){
                pagamentosMultasFiltrados= await pagamentosMultas.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.horario ==horario
                  })
                  return res.status(200).json({message:"mensalidades pagas",data:pagamentosMultasFiltrados})
              }else if(nivel){
                pagamentosMultasFiltrados= await pagamentosMultas.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.nivel ==nivel
                  })
                  return res.status(200).json({message:"mensalidades pagas",data:pagamentosMultasFiltrados})
              }
              console.log(pagamentosMultasFiltrados)
              
            return res.status(200).json({message:"mensalidades pagas",data:pagamentosMultas})
        } catch (error) {
            console.log(error)
            return res.status(200).json({message:'houve um erro'})
        }
        

        
    },
} 
