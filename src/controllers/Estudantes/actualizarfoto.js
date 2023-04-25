const Estudante= require('../../models/Estudantes')


module.exports={
    async actualizarFoto(req,res){
  
        console.log("chegou")
       console.log(req.file)
        if(!req.file){
          return res.status(400).json({message:"o campo foto e obrigatorio"})
        }
        const{originalname:fotoname, size, filename:key}=req.file 
        const {estudante_id}=req.body

        const novaUrl=`${process.env.APP_URL}/files/${key}`
        try{

              const estudante= await Estudante.findByIdAndUpdate(estudante_id,{ 
                fotoname,
                size,
                key,
                url:novaUrl
              },{
                        new:true
              })

              if(!estudante){
                return res.status(400).json({message:"estudante nao encontrado"})
              }
                    
                      return res.status(200).json({
                            message:"estudante cadastrado com sucesso",
                             data:estudante 
                   }) 

        }catch(err){
                  return res.status(400).json({message:"houve um erro", err})
        }
       }
}
