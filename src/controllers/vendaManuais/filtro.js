const vendaManuais= require('../../models/VendaManuais')

module.exports={

    async filtro(req,res){

const{curso,anoPagamento,codigoManualId,horario,nivel, dataPagamento,schoolname}=req.body


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

            if(codigoManualId){
                filtro.codigoManualId=codigoManualId
            }

            // if(codigoCadastro){
            //     filtro.codigoCadastro=codigoCadastro
            // }
                     console.log(filtro)
        try {
            const vendas= await vendaManuais.find(filtro)
            .populate('codigoManualId')
            .populate("codigoCadastro")
            .populate("codigoInscricao")
            .populate("curso")
            .populate("usuario")
            .populate("schoolname")
            
            if(vendas.length==0){
                return res.status(400).json({data:vendas})
            }
         
            let vendasFiltrados
              if(horario && nivel){
                vendasFiltrados= await vendas.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.horario ==horario && pagamento.codigoCadastro.nivel==nivel
                  })
                  return res.status(200).json({message:"vendas filtradas pagas",data:vendasFiltrados})
          
              }else if(horario){
                vendasFiltrados= await vendas.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.horario ==horario
                  })
                  return res.status(200).json({message:"vendas filtradas pagas",data:vendasFiltrados})
              }else if(nivel){
                vendasFiltrados= await vendas.filter((pagamento)=>{
                
                    console.log(pagamento.codigoCadastro.horario )
                    return  pagamento.codigoCadastro.nivel ==nivel
                  })
                  return res.status(200).json({message:"vendas filtradas pagas",data:vendasFiltrados})
              }
              console.log(vendasFiltrados)
              
            return res.status(200).json({message:"vendas filtradas pagas",data:vendas})
        } catch (error) {
            console.log(error)
            return res.status(200).json({message:'houve um erro'})
        }
        

        
    },
} 
