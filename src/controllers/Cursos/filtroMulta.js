
const Cursos= require('../../models/Cursos')
module.exports={
          async filtroMulta(req,res){
         const {statusMulta}=req.query
        

                    try{
                             const cursosComMulta= await  Cursos.find({statusMulta})
                     
                             if(cursosComMulta.length==0){
                                       return res.status(400).json({message:"sem curso com multa"})
                             }
                             return res.status(200).json({
                                       message:"cursos com multa",
                                       data:cursosComMulta  
                             })
                    }catch(err){
                              return res.status(400).json({
                                        message:"houve um erro",
                                        data:err
                              })
                    }

          }

}