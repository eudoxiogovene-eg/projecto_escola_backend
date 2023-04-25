const Escolas= require('../../models/Escolas')

module.exports={
    async store(req,res){
  
      //console.log(req.nome)
     // console.log(req.user)
    
              const{
                nomeEscola,localizacao
              }=req.body
              
           
              if(!nomeEscola){
            
                return res.status(400).json({message:"o nome da escola obrigatorio"})
              }
              if(!localizacao){
                return res.status(400).json({message:"a localizacao e obrigatoria"})
              }
            

              try{
                  const pesquisarEscola=await Escolas.findOne({nomeEscola})
               
                  if(pesquisarEscola){
                    return res.status(420).json({message:"o esta escola  ja foi cadastrada, por favor cadastre outro curso"})
                  }
                        const escola= await Escolas.create({
                            nomeEscola,localizacao
                        })
                        return res.status(200).json({
                                  message:"escola cadastrado   com sucesso",
                                  data:escola
                        })

              }catch(err){
                        return res.status(400).json({
                                  message:"houve um erro",
                                  data:err
                        })

              }

    },
    async index(req,res){

          

        try{
            const listarEscolas=await Escolas.find()
        
            if(listarEscolas.length==0){
                return res.status(400).json({message:"nenhuma escola foi cadastrada ainda"})
            }

            return res.status(200).json({
                message:"escolas cadastradas",
                data:listarEscolas
            })
          

        }catch(err){
                  return res.status(400).json({
                            message:"houve um erro",
                            data:err
                  })

        }

    },

    async show(req,res){
        const {id}=req.params
        

        if(!id){
                  return res.status(400).json({message:"o id da escola e obrigatorio"})

        }
        try{
                 const escola= await  Escolas.findOne({_id:id})
                 
                 if(escola===null){
                           return res.status(400).json({message:"escola nao encontrado"})
                 }
                 return res.status(200).json({
                           message:"escola encontrada com sucesso",
                           data:escola
                 })
        }catch(err){
                  return res.status(400).json({
                            message:"houve um erro",
                            data:err
                  })
        }

    },

    async update(req,res){
          
        const{ nomeEscola,localizacao}=req.body
    
      const {id}=req.params
      if(!id){
        return res.status(400).json({message:"o id da escola e obrigatorio"})

    }
      

        try{
            const escola=await Escolas.findByIdAndUpdate(id,{
                nomeEscola,localizacao
                },{
                    new:true
                })
                if(!escola){
                  return res.status(420).json({message:"o curso nao encontrado"})
                }
                  
                  return res.status(200).json({
                            message:"dados do curso alterados com sucesso",
                            data:escola
                  }) 

        }catch(err){
                  return res.status(400).json({message:"houve um erro", err})
        }
    },
}