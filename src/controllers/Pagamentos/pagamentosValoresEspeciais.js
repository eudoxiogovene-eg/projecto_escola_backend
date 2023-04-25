const Pagamentos= require('../../models/pagamentos')
const Mensalidades= require('../../models/Mensalidade')
const Cadastrados= require('../../models/Cadastros')


module.exports={

    async pesquisarEstudantedados(req,res){

      let dt=new Date()                 
      let anoSistema=dt.getFullYear()  
      let mesSistema= parseInt(dt.getMonth()+1)
      let diaSistema= parseInt(dt.getDate())

        const {id}=req.params
       console.log(id + "chegou aqui")
    
        if(!id){
                  return res.status(400).json({message:"o campo id e obrigatorio"})
        }

        try{
                 const estudanteCurso= await  Cadastrados.findOne({_id:id})
                 .populate("curso")
                 .populate("codigoInscricao")
                 .populate("schoolname")
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
              let estudantediaCadastro=estudanteCurso.dataInscricao.split("-")[2]
              let estudanteMesCadastro=estudanteCurso.dataInscricao.split("-")[1]
              let anoApagar=estudanteCurso.dataInscricao.split('-')[0]
             
              console.log(anoApagar)
            // console.log(estudanteCurso)
            //   return console.log(estudantediaCadastro)
         

              let valorMensalidadeIdade
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


          //  console.log(estudanteCurso)
            
             let statusMensalidade="paga"
             let codigoCadastro=id

             const pagamentosEstudante= await Pagamentos.find({
                  codigoCadastro,statusMensalidade
             })
            
             .populate("mensalidade")
             if(pagamentosEstudante.length>=1){
                  return res.status(403).json({message:"estudante com historico de pagamentos"})
             }

        
            
            
            const mensalidade= await Mensalidades.find()
            if(mensalidade.length==0){
                  return res.status(400).json({message:"nenhum mes foi encontrado"})
            }

            let mensalidadeApagar

            if(estudanteMesCadastro==01){
                  mensalidadeApagar=mensalidade[0]
              }
            if(estudanteMesCadastro==02){
                  mensalidadeApagar=mensalidade[1]
              }
            if(estudanteMesCadastro==03){
                  mensalidadeApagar=mensalidade[2]
              }
            if(estudanteMesCadastro==04){
                  mensalidadeApagar=mensalidade[3]
              }
            if(estudanteMesCadastro==05){
                  mensalidadeApagar=mensalidade[4]
             }
            if(estudanteMesCadastro==06){
                  mensalidadeApagar=mensalidade[5]
             }
            if(estudanteMesCadastro==07){
                  mensalidadeApagar=mensalidade[6]
             }
            if(estudanteMesCadastro==08){
                  mensalidadeApagar=mensalidade[7]
             }
            if(estudanteMesCadastro==09){
                  mensalidadeApagar=mensalidade[8]
             }
            if(estudanteMesCadastro==10){
                  mensalidadeApagar=mensalidade[9]
             }
            if(estudanteMesCadastro==11){
                  mensalidadeApagar=mensalidade[10]
             }
            if(estudanteMesCadastro==12){
                  mensalidadeApagar=mensalidade[11]
             }
            let percetagemDesconto=3
            let descontoDiario=valorMensalidadeIdade*percetagemDesconto/100
            
            let valorPrimeiraMensalidade1=descontoDiario*estudantediaCadastro
            let valorPrimeiraMensalidade
            if(estudantediaCadastro <=10){
                  valorPrimeiraMensalidade=valorMensalidadeIdade
            }else{
                  valorPrimeiraMensalidade=valorMensalidadeIdade-valorPrimeiraMensalidade1
            }
         //  console.log(descontoDiario)
      //      console.log(valorPrimeiraMensalidade1)
        //  console.log(valorPrimeiraMensalidade1)
         //console.log(valorMensalidadeIdade)
        //console.log(estudantediaCadastro)
         // 
          // console.log(cursoValorCrianca)
            //console.log(idade)
            //console.log(estudanteMesCadastro)
          
             
                  let dados={
                   
                        //ultimoMesPago,
                       mensalidadeApagar,
                        estudanteCurso,
                        valorPrimeiraMensalidade,
                        valorMensalidadeIdade,
                        anoApagar

                  }

                  console.log(dados)
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