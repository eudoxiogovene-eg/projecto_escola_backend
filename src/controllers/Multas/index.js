const Multa = require('../../models/multas')
const Pagamentos=require('../../models/pagamentos')
const Mensalidades= require('../../models/Mensalidade') 
const Cursos= require('../../models/Cursos')
const Cadastrados= require('../../models/Cadastros')
const crypto=require('crypto')

let dt=new Date()                 
let anoSistema=dt.getFullYear()  
let mesSistema= parseInt(dt.getMonth()+1)
let diaSistema= parseInt(dt.getDate())   
module.exports={
    async store(req,res){
      const codigoMulta=crypto.randomBytes(4).toString('Hex')

        // multar estudantes
        // primeiro pegar meses
        // segundo pegar cursos multa activa
        // pegar estudantes que esses cursos com
        // pesquisar nos pagamentos estudantes esses cursos o mes a multar se ja foi pago
        // caso nao multar os estudantes
                try {
                    const mensalidades=await Mensalidades.find()
                
                    let mesMulta=05//mesSistema 
                    let mensalidade
                    let anoMulta  
                     
            if(mesMulta==01){
                mensalidade=mensalidades[11]
                anoMulta=Number(anoSistema)-1   
            }

            if(mesMulta==02){
                mensalidade=mensalidades[0]
                anoMulta=anoSistema
           }
          
           if(mesMulta==03){
                mensalidade=mensalidades[1]
                anoMulta=anoSistema
           }
         
          if(mesMulta==04){
                mensalidade=mensalidades[2] 
                anoMulta=anoSistema
          }
          if(mesMulta==05){
                mensalidade=mensalidades[3]
                anoMulta=anoSistema
          }
          if(mesMulta==06){
                mensalidade=mensalidades[4]
                anoMulta=anoSistema
          }
          if(mesMulta==07){
                mensalidade=mensalidades[5]
                anoMulta=anoSistema
          }
          if(mesMulta==08){
                mensalidade=mensalidades[6]
                anoMulta=anoSistema
               // console.log(anoMulta, mensalidade)
          }
          if(mesMulta==09){
                mensalidade=mensalidades[7]
                anoMulta=anoSistema
          }
          if(mesMulta==10){
                mensalidade=mensalidades[8]
                anoMulta=anoSistema
          }
          if(mesMulta==11){
                mensalidade=mensalidades[9]
                anoMulta=anoSistema
          }
          if(mesMulta==12){
                mensalidade=mensalidades[10]
                anoMulta=anoSistema
          }
          
          let cursosId=[]
          const cursosComMultas= await Cursos.find({statusMulta:"activo"})
        


          cursosComMultas.map((cursos)=>{
          
            cursosId.push(cursos._id)
          })
  

     
       
          let cursoEstudante=[]
            for(var i=0; i<cursosId.length; i++){
             const  estudantesQueFazemCurso= await Cadastrados.find({curso:cursosId[i]})
               .populate('curso')
               .populate('codigoInscricao')
               if(estudantesQueFazemCurso.length>=1){
                cursoEstudante.push(estudantesQueFazemCurso)
               }
               
              
            
             }

             for(var i=0;i<cursoEstudante.length;i++){

                
                cursoEstudante[i].map(async(cursoEstudante2)=>{
                   let b= cursoEstudante2.curso.valorCursoCrianca
                 //  console.log(b)
                    let idade1=cursoEstudante2.codigoInscricao.dataNascimento.split("/")[2]
                    console.log(idade1)
                    let idade=anoSistema-idade1
                   let estudanteDesconto=cursoEstudante2.desconto
                   let cursoDesconto=cursoEstudante2.curso.descontoCurso
                   let cursoValorAdulto=cursoEstudante2.curso.valorCursoAdulto
                   let cursoValorCrianca=cursoEstudante2.curso.valorCursoCrianca
                   let valorCursoAdultoDesconto=cursoEstudante2.curso.valorCursoAdultoDesconto
                   let valorCursoCriancaDesconto=cursoEstudante2.curso.valorCursoCriancaDesconto
                   let percetagemMulta=cursoEstudante2.curso.taxaMultaCurso
                   let codigoCadastro=cursoEstudante2._id
                   let codigoInscricao=cursoEstudante2.codigoInscricao._id
                   let schoolname=cursoEstudante2.codigoInscricao.schoolname
                   let curso=cursoEstudante2.curso._id
                   let dados={
                    estudanteDesconto,
                    cursoDesconto,
                    cursoValorAdulto,
                    cursoValorCrianca,
                    cursoValorCrianca,
                    valorCursoAdultoDesconto,
                    valorCursoCriancaDesconto,                    
                   }
                 
                   let valorMulta
                   if(idade>=13){
                       if(cursoDesconto=="activo"){
                             if(estudanteDesconto=="activo"){
                                   valorMulta=valorCursoAdultoDesconto
                             }else{
                                   valorMulta=cursoValorAdulto
                             }
                       }else{
                             valorMulta=cursoValorAdulto
                       }
                      
                   }else{
                       if(cursoDesconto=="activo"){
                             if(estudanteDesconto=="activo"){
                                   valorMulta=valorCursoCriancaDesconto
                             }else{
                                   valorMulta=cursoValorCrianca
                             }
                       }else{
                             valorMulta=cursoValorCrianca
                       }
                       
                   }


                   valorMulta=valorMulta*percetagemMulta/100
                   let anoPagamento=anoSistema
                   console.log(curso)
                   const pagamentos= await Pagamentos.findOne({
                        codigoCadastro,
                        mensalidade,
                        anoPagamento,
                        curso
                        
                        
                   })

                  if(!pagamentos){
                     const pesquisaMulta= await Multa.findOne({
                        codigoCadastro,
                        mensalidade,
                        anoMulta,
                        curso
                     })

                     if(!pesquisaMulta){
                        const atribuirMulta= await Multa.create({
                              codigoCadastro,
                              mensalidade,
                              anoMulta,
                              curso,
                              valorMulta,
                              codigoInscricao,
                              codigoMulta,
                              schoolname
                        })
                        return res.status(200).json({
                              message:"multa atribuida com sucesso",
                          //    data:atribuirMulta
                        })
                     }
                    
                  }

                })

             }
           
           


      
         
            return res.status(200).json({
                message:"cursos com multa",
                data:cursosComMultas,
                cursosId,
                cursoEstudante,

            })
                    
                } catch (error) {
                    return res.status(400).json({message:"houve um erro"})
                }
                
    },

    async index(req,res){
       try {
            const multas= await Multa.find()
           .populate("codigoCadastro")
           .populate("codigoInscricao")
           .populate("mensalidade")
           .populate("curso")
           .populate("schoolname")
            if(multas.length==0){
                  return res.status(400).json({message:"nenhuma multa foi encontrada"})
            }
           return res.status(200).json({
            message:"multas dos estudantes",
            data:multas
           }) 
       } catch (error) {
            return res.status(400).json({message:"houve um erro"})
       }
    },
    async show(req,res){
      const {id}=req.params

      if(!id){
            return res.status(200).json({message:"o campo id e obrigatorio"})
      }

      try {
          const multa= await Multa.findById(id)
          .populate("codigoCadastro")
          .populate("codigoInscricao")
           .populate("mensalidade")
           .populate("curso")
           .populate("schoolname")
          if(!multa){
            return res.status(400).json({message:"multa nao encontrada"})
          }  
          return res.status(200).json({
            message:"multa encontrada com sucesso",
            data:multa
          })
      } catch (error) {
            console.log(error)
            return res.status(400).json({message:"houve um erro"})
      }
    },

    async destroy(req,res){
      const {id}=req.params
      if(!id){
            return res.status(200).json({message:"o campo id e obrigatorio"})
      }

      try {
          const multaStatus= await Multa.findById(id)
            if(!multaStatus){
                  return res.status(400).json({message:"multa nao encontrada"})
           } 
            const statusMulta=multaStatus.statusMulta
         // 
         if(statusMulta !="pendente"){
            return res.status(400).json({message:"nao e possivel excluir multa pos ja foi paga"})
         }

         const multa= await Multa.findByIdAndDelete(id)
          return res.status(200).json({
            message:"multa deletada  com sucesso",
            data:multaStatus
          })
          
      } catch (error) {
            console.log(error)
            return res.status(400).json({message:"houve um erro"})
      }
    }
}