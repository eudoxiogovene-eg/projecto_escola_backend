const Multa = require('../../../models/multas')

module.exports={
          async editarMultas(req,res){
                    const{
                        data_Multa,valorMulta,
                        forma_pagamento,mensalidadeMes,
                        usuario,codigoCadastroEst,statusMulta,
                        data_pagamento,id_multa
                    }=req.body
                    
                    
                   
                    if(!data_pagamento){
                              return res.status(400).json({message:"o campo data_pagamento e obrigatorio"})
                    }
                   
                    if(!forma_pagamento){
                              return res.status(400).json({message:"o campo forma_pagamento e obrigatorio"})
                    }
                    
                    if(!usuario){
                              return res.status(400).json({message:"o campo usuario e obrigatorio"})
                    }
                   
                    if(!id_multa){ 
                              return res.status(400).json({message:"o campo id_multa e obrigatorio"})
                    }


                

                    try{
                              const multa = await Multa.findOneAndUpdate(id_multa,{
                                        
                                data_Multa,valorMulta,
                                forma_pagamento,mensalidadeMes,
                                usuario,codigoCadastroEst,statusMulta,
                                data_pagamento
                              },{
                                        new:true
                              })
                              if(multa.length==0){ 
                                        return res.status(400).json({message:"multa nao existe"})
                              }
                              return res.status(200).json({
                                        message:"multa paga com sucesso",
                                        data:multa
                              })

                    }catch(err){
                              return res.status(400).json({
                                        message:"houve um erro",
                                        data:err
                              })

                    }
          }

}