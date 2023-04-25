const Multa = require('../../../models/multas')

module.exports={
          async pesquisarMultaPaga(req,res){
             
                    const {id_multa}=req.params
                   
            //console.log(req.params)
                    if(!id_multa){ 
                              return res.status(400).json({message:"o campo id_multa e obrigatorio"})
                    }



                    try{
                              const multa = await Multa.findOne({_id:id_multa})
                              .populate('mensalidadeMes')
                              .populate('codigoCadastroEst')
                              console.log(multa)
                              if(!multa){
                                        return res.status(420).json({message:"multa nao existe"})
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