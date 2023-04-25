const Pagamentos= require('../../models/pagamentos')
const Estudante= require('../../models/Estudantes')
const crypto=require('crypto')
const Cadastrados= require('../../models/Cadastros')
const actualizarStatusUsecadastro= require('../../utils/cadastro')
let dt=new Date()                 
let anoSistema=dt.getFullYear()  
let mesSistema= parseInt(dt.getMonth()+1)
let diaSistema= parseInt(dt.getDate())

module.exports={

          async store(req,res){
            const codigoPagamento=crypto.randomBytes(4).toString('Hex')   
            let   anoPagamento
            const {
                   
                      codigoCadastro,
                      formPagamento,
                      mensalidade,
                      valor_mensalidade,    
                      anoApagar                                  
            }=req.body 
      
            const usuario=req.user
            const pagaComMulta="false" 
            let  valorTotalPago=valor_mensalidade
         
            if(!codigoCadastro){
                      return res.status(400).json({message:"o campo codigoCadastro e obrigatorio"})

            }
            if(!mensalidade){
              return res.status(400).json({message:"o campo mensalidade e obrigatorio"})

           }
         
            if(!formPagamento){
                      return res.status(400).json({message:"o campo formPagamento e obrigatorio"})
            }

            if(!usuario){   
                      return res.status(400).json({message:"o campo usuario e obrigatorio"})
            }

            if(!pagaComMulta){   
             return res.status(400).json({message:"o campo pagaComMulta e obrigatorio"})
            }
    

           try{

            const cadastro= await Cadastrados.findById(codigoCadastro)
                
              
            if(!cadastro){
              return res.status(400).json({message:"o estudante nao existe"})
            }
            
            let codigoInscricao=cadastro.codigoInscricao
            let curso=cadastro.curso

            const pagamentosEstudante= await  Pagamentos.find({codigoCadastro})
            
            if(pagamentosEstudante.length>=1){
               return res.status(400).json({message:"estudante com historico de pagamentos"})
            }

            const pagamentos= await Pagamentos.create({
              valor_mensalidade,
              codigoCadastro,valorTotalPago,
              formPagamento,mensalidade,
              usuario
              ,anoPagamento:anoApagar,curso,codigoInscricao,
              pagaComMulta,codigoPagamento
              })
              actualizarStatusUsecadastro.actualizar(codigoCadastro)
              return res.status(200).json({message:"menslidade paga com sucesso",data:pagamentos})

              }catch(err){
                 return res.status(400).json({message:"houve um erro", err})
              } 

          
                     
          }
}

/*
const Pagamentos= require('../../../models/pagamentos')
const Estudante= require('../../../models/Estudantes')




module.exports={

          async pagar_mensalidade_especial(req,res){
                    

                    const {
                              dataPagamento,
                              codigoEstudante,
                              formPagamento,codigoMensalidade,mes,
                              anoNascimento,desconto,
                              usuario,mensalidade,statusMensalidade,curso,
                              anoPagamento,valor_mensalidade                   
                    }=req.body 
                   // const{usuario}=req.headers
                   console.log(req.body)  
                   // console.log(req.headers)
                    

                    if(!dataPagamento){
                              return res.status(400).json({message:"o campo dataPagamento e obrigatorio"})

                    }
                 
                    if(!codigoEstudante){
                              return res.status(400).json({message:"o campo codigoEstudante e obrigatorio"})

                    }
                
                 
                    if(!formPagamento){
                              return res.status(400).json({message:"o campo formPagamento e obrigatorio"})

                    }

                    if(!usuario){   
                              return res.status(400).json({message:"o campo usuario e obrigatorio"})

                    }
                    let dt=new Date()
                   
                    let anoSistema=dt.getFullYear()
                    let mesSistema= 4  //parseInt(dt.getMonth()+1)
                    let diaSistema= 24//parseInt(dt.getDate())
                    let dialimite = 5
                    let mensalidadeCrianca=700
                    let mensalidadeAdulto=1000
                    anoNascimento:anoNascimento
                    let idade=anoSistema-anoNascimento
                    
                    let valorTotal
                    let status

               
                 
                

          


                    status="sem multa"
                    valorMulta=0
                    
                    valorTotalPago=valor_mensalidade
                    
                     multa={
                     status, 
                     valorMulta
                    }              

           try{
                    const pesquisarPagamentos= await  Pagamentos.find({
                              codigoEstudante,curso
                             })
                             
                             console.log(pagamentos)
                             if(pesquisarPagamentos){
                                       return res.status(400).json({message:"estudante com historico de pagamentos"})
                             }
                     const pagamentos= await Pagamentos.create({
                     dataPagamento,valor_mensalidade,
                     codigoEstudante,valorTotalPago,
                     multa,formPagamento,mensalidade,
                     usuario,statusMensalidade,curso
                     ,anoPagamento
                     })
                     return res.status(200).json({message:"menslidade paga com sucesso",data:pagamentos})

                     }catch(err){
                     return res.status(400).json({message:"houve um erro", err})
                     } 

          
                     
          }
}
*/