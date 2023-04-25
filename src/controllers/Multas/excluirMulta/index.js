const Multa = require('../../../models/multas')

module.exports={
          async deletarMultaPaga(req,res){
             
                    const {id_multa}=req.params
                   
                   
                    if(!id_multa){ 
                              return res.status(400).json({message:"o campo id_multa e obrigatorio"})
                    }



                    try{
                              const multa = await Multa.findByIdAndDelete({_id:id_multa})
                              if(!multa){
                                        return res.status(400).json({message:"multa nao existe"})
                              }
                              return res.status(200).json({
                                        message:"multa deletada com sucesso",
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