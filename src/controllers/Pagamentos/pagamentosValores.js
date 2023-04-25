const Pagamentos= require('../../models/pagamentos')
const Mensalidades= require('../../models/Mensalidade')
const Cadastrados= require('../../models/Cadastros')


module.exports={

    async pesquisarEstudantedados(req,res){
        const {id}=req.params
       
      let dt=new Date()                 
      let anoSistema=dt.getFullYear()  
      let mesSistema= parseInt(dt.getMonth()+1)
      let diaSistema= parseInt(dt.getDate())
        if(!id){
                  return res.status(400).json({message:"o campo id e obrigatorio"})
        }

        try{
                 const estudanteCurso= await  Cadastrados.findOne({_id:id})
                 .populate("curso")
                 .populate("codigoInscricao")
                 
                 
           //      console.log(estudanteCurso)
                 if(!estudanteCurso){
                           return res.status(400).json({message:"estudante nao existe "})
                 }

            
              let idade1=estudanteCurso.codigoInscricao.dataNascimento.split("-")[0]
              let idade=anoSistema-idade1
              let estudanteDesconto=estudanteCurso.desconto
              let cursoDesconto=estudanteCurso.curso.descontoCurso
              let cursoValorAdulto=estudanteCurso.curso.valorCursoAdulto
              let cursoValorCrianca=estudanteCurso.curso.valorCursoCrianca
              let valorCursoAdultoDesconto=estudanteCurso.curso.valorCursoAdultoDesconto
              let valorCursoCriancaDesconto=estudanteCurso.curso.valorCursoCriancaDesconto

              let valorMensalidadeIdade
            //   console.log(idade)
            //   console.log(estudanteCurso)
              if(idade>=13){
                  if(cursoDesconto=="activo"){
                        if(estudanteDesconto=="activo"){
                              valorMensalidadeIdade=valorCursoAdultoDesconto
                        }else{
                              valorMensalidadeIdade=cursoValorAdulto
                        }
                  }else{
                        valorMensalidadeIdade=cursoValorAdulto
                  }
                 
              }else{
                  if(cursoDesconto=="activo"){
                        if(estudanteDesconto=="activo"){
                              valorMensalidadeIdade=valorCursoCriancaDesconto
                        }else{
                              valorMensalidadeIdade=cursoValorCrianca
                        }
                  }else{
                        valorMensalidadeIdade=cursoValorCrianca
                  }
                  
              }


            
            
             let statusMensalidade="paga"
             let codigoCadastro=id

             const pagamentosEstudante= await Pagamentos.find({
                  codigoCadastro,statusMensalidade
             })
             .populate("mensalidade")
             if(pagamentosEstudante.length==0){
                  return res.status(405).json({message:"estudante sem historico de pagamentos"})
             }

             let ultimoMesPago=pagamentosEstudante[pagamentosEstudante.length-1]
             let codigoMes=ultimoMesPago.mensalidade.codigoMes
             let anoPagamento=ultimoMesPago.anoPagamento
             let anoApagar
            
            
            const mensalidade= await Mensalidades.find()
            if(mensalidade.length==0){
                  return res.status(400).json({message:"nenhum mes foi encontrado"})
            }

            let mensalidadeApagar

            if(codigoMes==01){
                  mensalidadeApagar=mensalidade[1]
                  anoApagar=anoPagamento
            }
            if(codigoMes==02){
                  mensalidadeApagar=mensalidade[2]
                  anoApagar=anoPagamento
            }
            if(codigoMes==03){
                  mensalidadeApagar=mensalidade[3]
                  anoApagar=anoPagamento
            }
            if(codigoMes==04){
                  mensalidadeApagar=mensalidade[4]
                  anoApagar=anoPagamento
            }
            if(codigoMes==05){
                  mensalidadeApagar=mensalidade[5]
                  anoApagar=anoPagamento
            }
            if(codigoMes==06){
                  mensalidadeApagar=mensalidade[6]
                  anoApagar=anoPagamento
            }
            if(codigoMes==07){
                  mensalidadeApagar=mensalidade[7]
                  anoApagar=anoPagamento
            }
            if(codigoMes==08){
                  mensalidadeApagar=mensalidade[8]
                  anoApagar=anoPagamento
            }
            if(codigoMes==09){
                  mensalidadeApagar=mensalidade[9]
                  anoApagar=anoPagamento
            }
            if(codigoMes==10){
                  mensalidadeApagar=mensalidade[10]
                  anoApagar=anoPagamento
            }
            if(codigoMes==11){
                  mensalidadeApagar=mensalidade[11]
                  anoApagar=anoPagamento
            }
            if(codigoMes==12){
                  mensalidadeApagar=mensalidade[0]
                  anoApagar=Number(anoPagamento)+1
            }
            
            
  
             
                  let dados={
                   
                       ultimoMesPago,
                       mensalidadeApagar,
                       estudanteCurso,
                       valorMensalidadeIdade,
                       anoApagar
                      
                        

                  }

                 return res.status(200).json({
                           message:"estudante encontrado",
                          // data:estudanteCurso , 
                           dados,
                        
                         
                           
                 })
               
        }catch(err){
                  return res.status(400).json({
                            message:"houve um erro",
                            data:err
                  })
        }

      },
}