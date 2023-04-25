const Bairros= require('../../models/Bairros')

module.exports={
    async store(req,res){
//console.log('minha requisicao chegou')
              const{
                nomeBairro,cidade}=req.body
                const usuario=req.user
              
                console.log(req.body)
              console.log(usuario)
              if(!nomeBairro){
                return res.status(400).json({message:"o campo nome do bairro e obrigatorio"})
              }
              if(!usuario){
                return res.status(400).json({message:"o campo usuario e obrigatorio"})
              }
            
              if(!cidade){
                return res.status(400).json({message:"o campo cidade e obrigatorio"})
              }
              

              try{
                  const pesquisarBairro=await Bairros.findOne({nomeBairro,cidade})
                  console.log(pesquisarBairro)
                  if(pesquisarBairro){
                    return res.status(420).json({message:"o este bairro ja foi cadastrado, por favor cadastre outro curso"})
                  }
                        const bairro= await Bairros.create({
                            nomeBairro,usuario,cidade
                        })
                        console.log(bairro)
                        return res.status(200).json({
                                  message:"bairro cadastrado   com sucesso",
                                  data:bairro
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
            const pesquisarBairros=await Bairros.find()
            .populate("usuario")
            if(pesquisarBairros.length==0){
                return res.status(400).json({message:"sem bairros cadastrados"})
            }

            return res.status(200).json({
                message:"bairros cadastrados",
                data:pesquisarBairros
            })
          

        }catch(err){
                  return res.status(400).json({
                            message:"houve um erro",
                            data:err
                  })
        }
   },
   
   async update(req,res){
    const {id}=req.params
    const {nomeBairro,cidade}=req.body

    if(!id){
        return res.status(400).json({message:"o campo id e obrigatorio"})
    }
    if(!nomeBairro){
        return res.status(400).json({message:"o campo nome do bairro e obrigatorio"})
    }
    if(!cidade){
        return res.status(400).json({message:"o campo nome da cidade e obrigatorio"})
    }
    try{
     
        const bairro= await Bairros.findByIdAndUpdate(id,{
            nomeBairro,cidade
        },{  
            new:true
        })

        return res.status(200).json({
            message:"bairro actualiado com sucesso",
            data:bairro
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
              return res.status(400).json({message:"o id do bairro e obrigatorio"})

    }
    try{
             const bairro= await  Bairros.findOne({_id:id})
             
             if(bairro===null){
                       return res.status(400).json({message:"bairro nao encontrado"})
             }
             return res.status(200).json({
                       message:"bairro encontrada com sucesso",
                       data:bairro
             })
    }catch(err){
              return res.status(400).json({
                        message:"houve um erro",
                        data:err
              })
    }

},

}