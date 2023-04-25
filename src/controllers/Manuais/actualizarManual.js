const Manuais= require('../../models/manuais')

module.exports={
    async actualizarManual(req,res){

        const{quantidadeManual }=req.body
        const {id}=req.params
        

        if(!id){ 
            return res.status(400).json({message:"o campo codigo manual e obrigatorio"})
        }
        if(!quantidadeManual){ 
          return res.status(400).json({message:"o campo quantidade de manual e obrigatorio"})
      }

        try {
          const manual=  await Manuais.findOneAndUpdate({_id :id}, {$inc : {'quantidadeManual' : quantidadeManual}}, {new: true })
        
          if(!manual){
            return res.status(400).json({message:"houve um ao substituir o valor"})
          }

          return res.status(200).json({
            message:'alterado com sucesso',
            data:manual
          })

            } catch (error) {
                        return res.status(400).json({
                            message:"houve um erro",
                            data:error
                    })
            }
      }
}