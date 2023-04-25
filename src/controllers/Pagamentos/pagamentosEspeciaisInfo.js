const Pagamentos= require('../../models/pagamentos')
const Mensalidades= require('../../models/Mensalidade')
const Cadastrados= require('../../models/Cadastros')
const Cursos = require('../../models/Cursos')


module.exports={

    async index(req,res){
        console.log('chegou')

    //   let dt=new Date()                 
    //   let anoSistema=dt.getFullYear()  
    //   let mesSistema= parseInt(dt.getMonth()+1)
    //   let diaSistema= parseInt(dt.getDate())

       const {id}=req.params
     //  console.log(id)
   
    
     if(!id){
                   return res.status(400).json({message:"o campo id e obrigatorio"})
       }

        try{
                 const curso= await  Cursos.findOne({_id:id})
               
                 if(!curso){
                           return res.status(400).json({message:"curso nao existe "})
                 }

            
              


         

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


          console.log(estudanteCurso)
            
              let statusMensalidade="paga"
          let codigoCadastro=id

              const pagamentosEstudante= await Pagamentos.find({
                  codigoCadastro,statusMensalidade
             })
            
              .populate("mensalidade")
              if(pagamentosEstudante.length>=1){
                  return res.status(400).json({message:"estudante com historico de pagamentos"})
              }

        
            
            
            const mensalidade= await Mensalidades.find()
            if(mensalidade.length==0){
                  return res.status(400).json({message:"nenhum mes foi encontrado"})
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
  
          
             
                   let dados={
                   
                 
                 
                         estudanteCurso,
                         valorPrimeiraMensalidade,
                         valorMensalidadeIdade

                   }

                //  console.log(dados)
                 return res.status(200).json({
                           message:"estudante encontrado",
                          // data:estudanteCurso , 
                           
                        
                         
                           
                 })
               
        }catch(err){
                  return res.status(400).json({
                            message:"houve um erro",
                            data:err
                  })
        }

      },
}