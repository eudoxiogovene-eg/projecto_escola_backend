const Pagamentos= require('../../../models/pagamentos')
const Estudante= require('../../../models/Estudantes')
const { pesquisarMensalidadeEstudante } = require('../pesquisarMensalidadeEstudante')
module.exports={
          async atribuirMulta(req,res){
                  const {id_estudante,mensalidade}=req.body
                
                   let valor_mensalidade="66"
                   let dataPagamento="66"
                   let codigoEstudante=id_estudante
                   let valorTotalPago="66"
                   
                   let valorMulta="300"
                   let status="pendente"
                   
                  let multa={
                        status,
                        valorMulta
                       }  
                   formPagamento="mpeza"
                   
                   usuario="620e674df434fb97af72a9df"
                   // return res.status(200).json({codigoEstudante})

                 
          
                          
                    try{
                           
                              const pagamentos= await  Pagamentos.find({
                                    codigoEstudante:id_estudante,
                                    mensalidade 

                              })
                             
                              console.log(pagamentos)
                              if(pagamentos.length==0){ 
                                    //    return res.status(400).json({message:"estudante sem historico de pagamentos"})
                                    
                             const pagamentosMulta= await Pagamentos.create({
                                    dataPagamento,valor_mensalidade,
                                    codigoEstudante,valorTotalPago,
                                    multa,formPagamento,mensalidade,
                                    usuario
                              })
                              }
                              return res.status(200).json({
                                        message:"mensalidade pagas pelo estudante",
                                        data:pagamentosMulta
                              })


                                 
                             
                     }catch(err){
                               return res.status(400).json({
                                         message:"houve um erro",
                                         data:err
                               })
                     }
                     
                    /// atribuirMulta()            
          },

          async multar(req,res){
                    return res.send("pronto pra multar")
                    
          }
      



}