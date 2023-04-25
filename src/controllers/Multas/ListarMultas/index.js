const Multa = require('../../../models/multas')
module.exports={
          async listarMultas(req,res){
                    
                    try{
                              const multa= await Multa.find()
                              
                              if(multa.length==0){
                                        return res.status(400).json({
                                                  message:"nao existem multas pagas"
                                        })
                              }
                              return res.status(200).json({
                                        message:"multas encontradas ",
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
