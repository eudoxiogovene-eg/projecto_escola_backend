const Pagamentos= require('../../models/pagamentos')



module.exports={
          async pesquisarMensalidadeEstudante(req,res){
                    const {id}=req.params
                    const codigoCadastro=id
                    if(!codigoCadastro){
                              return res.status(400).json({message:"o campo codigoCadastro e obrigatorio"})

                    }

                    try{ 
                             const pagamentos= await  Pagamentos.find({
                              codigoCadastro
                             })
                             .populate('mensalidade')
                             .populate('codigoCadastro')
                             .populate('codigoInscricao')
                             
                             if(pagamentos.length==0){
                                       return res.status(405).json({message:"estudante sem historico de pagamentos"})
                             }
                             return res.status(200).json({
                                       message:"mensalidade pagas pelo estudante",
                                       data:pagamentos
                             })
                    }catch(err){
                              return res.status(400).json({
                                        message:"houve um errp",
                                        data:err
                              })
                    }
                             

          }

}