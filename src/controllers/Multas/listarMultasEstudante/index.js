const Multa = require('../../../models/multas')

module.exports={
          async listarMultaEstudantes(req,res){
                   const {codigoCadastro}=req.params
                   let statusMulta="pendente"
                   
                    if(!codigoCadastro){ 
                              return res.status(400).json({message:"o campo id_multa e obrigatorio"})
                    }
                 

                    try{
                     
                              const multa = await Multa.find({
                                statusMulta,codigoCadastro
                              })
                              .populate('mensalidade')
                              .populate('codigoInscricao')
                              .populate('codigoCadastro')
                              .populate('curso')


                              if(multa.length==0){
                                        return res.status(430).json({message:"o estudante nao possui multas!"})
                              }
                              return res.status(200).json({
                                        message:"multa encontrada com sucesso",
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