const Cadastrados= require('../../models/Cadastros')


module.exports={
    
    async filtro(req,res){

      const {schoolname,nivel,horario,anoCadastro,estado,curso}=req.body

    const filtro={}
     if(schoolname){
        filtro.schoolname=schoolname
     }
     if(nivel){
        filtro.nivel=nivel
     }
     if(horario){
        filtro.horario=horario
     }
     if(anoCadastro){
        filtro.anoCadastro=anoCadastro
     }
     if(estado){
        filtro.estado=estado
     }

     if(curso){
      filtro.curso=curso
   }
   console.log(filtro)
      try{
               const estudanteCurso= await  Cadastrados.find(filtro)
               .populate("curso")
               .populate("codigoInscricao")
               .populate("usuario")
               
         //      console.log(estudanteCurso)
               if(!estudanteCurso){
                         return res.status(400).json({message:"estudante nao existe "})
               }
               return res.status(200).json({
                         message:"estudante encontrado",
                         data:estudanteCurso  
               })
      }catch(err){
                return res.status(400).json({
                          message:"houve um erro",
                          data:err
                })
      }

    },
   


}