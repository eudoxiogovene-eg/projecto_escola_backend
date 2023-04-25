


const Cadastrados= require('../../models/Cadastros')
module.exports={
          async pesquisarCursoEstudante(req,res){
                    const {curso}=req.params
                   

                    if(!curso){
                              return res.status(400).json({message:"o campo curso e obrigatorio"})

                    }
                  


                    try{
                             const estudanteCurso= await  Cadastrados.find({curso})
                             .populate("curso")
                             .populate("codigoInscricao")
                             
                             if(estudanteCurso.length==0){
                                       return res.status(400).json({message:"sem estudantes que fazem o curso "})
                             }
                             return res.status(200).json({
                                       message:"estudantes que fazem o curso",
                                       data:estudanteCurso  
                             })
                    }catch(err){
                              return res.status(400).json({
                                        message:"houve um erro",
                                        data:err
                              })
                    }

          }

}