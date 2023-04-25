const Manuais= require('../../models/manuais')
const Vendas= require('../../models/VendaManuais')
module.exports={
          async store(req,res){
  
                    const{nomeManual,valorManual,
                        nivelManual,quantidadeManual,
                        CursoManual,descricacaoManual,
                        
                    }=req.body

                  
                    const usuario=req.user
               

                    if(!nomeManual){ 
                              return res.status(400).json({message:"o campo nomeManual e obrigatorio"})
                    }
                    
                    if(!valorManual){
                              return res.status(400).json({message:"o campo valorManual e obrigatorio"})
                    }
                    if(!nivelManual){
                              return res.status(400).json({message:"o campo nivelManual e obrigatorio"})
                    }
                    if(!quantidadeManual){
                              return res.status(400).json({message:"o campo quantidadeManual e obrigatorio"})
                    }
                    if(!CursoManual){ 
                              return res.status(400).json({message:"o campo CursoManual e obrigatorio"})
                    }
                    if(!usuario){
                              return res.status(400).json({message:"o campo usuario e obrigatorio"})
                    }

                    
                    
                  
                        

                    try{
                        const pesquisarManual=await Manuais.findOne({nomeManual,nivelManual,CursoManual})
                        if(pesquisarManual){
                          return res.status(420).json({message:"o nome do manual ja foi usado, por favor cadastre outro curso"})
                        }
                              const manual= await Manuais.create({
                                nomeManual,valorManual,
                                nivelManual,quantidadeManual,
                                CursoManual,descricacaoManual,usuario

                              })
                              return res.status(200).json({
                                        message:"manual pago com sucesso",
                                        data:manual
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
                      const manual= await Manuais.find()
                      .populate('CursoManual')
                      if(manual.length==0){
                                return res.status(400).json({
                                          message:"nao existem manuais cadastrados"
                                })
                      }

                      return res.status(200).json({
                                message:"manuais pagos com sucesso",
                                data:manual
                      })

               }catch(err){
                      return res.status(400).json({
                                message:"houve um erro",
                                data:err
                      })

              }

          },
          async show(req,res){

            const{id}=req.params
            if(!id){
                return res.status(400).json({message:"o campo id e obrigatorio"})
            }

            try{
                const pesquisarManual=await Manuais.findOne({_id:id})
                .populate('CursoManual')
                if(!pesquisarManual){
                  return res.status(420).json({message:"manual nao encontrado"})
                }
                 
                      return res.status(200).json({
                                message:"manual encontrado com sucesso",
                                data:pesquisarManual
                      })

            }catch(err){
                      return res.status(400).json({
                                message:"houve um erro",
                                data:err
                      })

            }

          },
          async update(req,res){
            const{nomeManual,valorManual,
                nivelManual,quantidadeManual,
                CursoManual,descricacaoManual,
                 
            }=req.body
       
            const{id}=req.params

          //  return console.log("chegou")
       

            if(!nomeManual){
                      return res.status(400).json({message:"o campo nomeManual e obrigatorio"})
            }
            
            if(!valorManual){
                      return res.status(400).json({message:"o campo valorManual e obrigatorio"})
            }
            if(!nivelManual){
                      return res.status(400).json({message:"o campo nivelManual e obrigatorio"})
            }
            if(!quantidadeManual){
                      return res.status(400).json({message:"o campo quantidadeManual e obrigatorio"})
            }
            if(!CursoManual){ 
                      return res.status(400).json({message:"o campo CursoManual e obrigatorio"})
            }

            if(!id){ 
                return res.status(400).json({message:"o campo codigo manual e obrigatorio"})
            }
            
                        
                    try{
                              const manual= await Manuais.findByIdAndUpdate(id,{
                                nomeManual,valorManual,
                                nivelManual,quantidadeManual,
                                CursoManual,descricacaoManual
                               

                              },{
                                        new:true
                              })
                              return res.status(200).json({
                                        message:"manual Alterado  com sucesso",
                                        data:manual
                              })

                    }catch(err){
                              return res.status(400).json({
                                        message:"houve um erro",
                                        data:err
                              })

                    }

          },
          async destroy(req,res){
               
            const{id}=req.params
          

            if(!id){ 
                return res.status(400).json({message:"o campo codigo manual e obrigatorio"})
            }
          
            
            try{
              const vendaManual= await Vendas.findOne({codigoManual:id})
              if(vendaManual.length>=1){
                
                 return res.status(402).json({message:"o munual  ja possui vendas"})
              } 

             
              
              const manual = await Manuais.findByIdAndDelete({_id:id}) 
                        
      
            if (!manual){
                  return res.status(404).json({message:"manual nao encontrado "})
            }

            return res.status(200).json({message:"manual excluido com sucesso",data:manual})
            
            }catch(err){
                    return res.status(400).json({message:"houve um erro", data:err})

            }

   
      }

         
}