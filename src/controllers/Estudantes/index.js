const Estudante= require('../../models/Estudantes')
const Cadastrados=require('../../models/Cadastros')



module.exports={
         async store(req,res){
          if(req.file){
            const{originalname:fotoname, size, filename:key}=req.file
        
           
                   const{
                    nome, apelido ,bairro, sexo ,
                    dataNascimento , contactoPrincipal ,contactoAlternativo,
                    contactoEncarregado , contactoAlternativoEncarregado,
                    nacionalidade, numeroDocumento,
                    dataEmissao, dataValidade, localEmissao ,tipoDocumento,schoolname,
                   }=req.body
                  
                   const usuario=req.user
                   console.log(usuario)
                   console.log(nome)
                  if(!nome){
                    return res.status(400).json({message:"o campo nome e obrigatorio"})
                  }
                  if(!apelido){
                    return res.status(400).json({message:"o campo apelido e obrigatorio"})
                  }
                  if(!bairro){
                    return res.status(400).json({message:"o campo bairro e obrigatorio"})
                  }
                       
                  if(!sexo){
                    return res.status(400).json({message:"o campo sexo e obrigatorio"})
                  }
              
                  
                  if(!dataNascimento){
                    return res.status(400).json({message:"o campo dataNascimento e obrigatorio"})
                  }
                  
               
                  if(!contactoPrincipal){
                    return res.status(400).json({message:"o campo contactoPrincipal e obrigatorio"})
                  }
                  
              
                  if(!dataEmissao){
                    return res.status(400).json({message:"o campo dataEmissao e obrigatorio"})
                  }
                  
                  if(!dataValidade){
                    return res.status(400).json({message:"o campo dataValidade e obrigatorio"})
                  }
                  
                  if(!localEmissao){
                    return res.status(400).json({message:"o campo localEmissao e obrigatorio"})
                  }
                  
                  if(!tipoDocumento){
                    return res.status(400).json({message:"o campo tipoDocumento e obrigatorio"})
                  }
                  
                  if(!numeroDocumento){
                    return res.status(400).json({message:"o campo numeroDocumento e obrigatorio"})
                  }
                  if(!schoolname){
                    return res.status(400).json({message:"o campo escola e obrigatorio"})
                  }            

                  const contactos={
                            contactoPrincipal:contactoPrincipal,
                            contactoAlternativo:contactoAlternativo,
                            contactoEncarregado:contactoEncarregado,
                            contactoAlternativoEncarregado:contactoAlternativoEncarregado
                  }
                  const documentos={
                    dataEmissao:dataEmissao,
                    dataValidade:dataValidade,
                    localEmissao:localEmissao,
                    tipoDocumento:tipoDocumento,
                    numeroDocumento:numeroDocumento

                  }

                   try{
                             const estudante= await Estudante.create({
                              nome, apelido ,bairro, sexo ,
                              dataNascimento , 
                              contactos,
                                
                               nacionalidade,usuario,
                               documentos,schoolname,
                               fotoname,
                               size,
                               key,
                               url:'' 

                                    
              
                             })
                             return res.status(200).json({
                                       message:"estudante cadastrado com sucesso",
                                        data:estudante 
                              }) 

                   }catch(err){
                             return res.status(400).json({message:"houve um erro", err})
                   }
          }else{
             console.log("sem foto")


             const{
              nome, apelido ,bairro, sexo ,
                    dataNascimento , contactoPrincipal ,contactoAlternativo,
                    contactoEncarregado , contactoAlternativoEncarregado,
                    nacionalidade, numeroDocumento,
                    dataEmissao, dataValidade, localEmissao ,tipoDocumento,schoolname,
             
             }=req.body    
             
             const usuario=req.user
             console.log(usuario)
           
            if(!nome){
              return res.status(400).json({message:"o campo nome e obrigatorio"})
            }
            if(!apelido){
              return res.status(400).json({message:"o campo apelido e obrigatorio"})
            }
            if(!bairro){
              return res.status(400).json({message:"o campo bairro e obrigatorio"})
            }
                 
            if(!sexo){
              return res.status(400).json({message:"o campo sexo e obrigatorio"})
            }
        
            
            if(!dataNascimento){
              return res.status(400).json({message:"o campo dataNascimento e obrigatorio"})
            }
            
         
            if(!contactoPrincipal){
              return res.status(400).json({message:"o campo contactoPrincipal e obrigatorio"})
            }
            

           
        
            if(!dataEmissao){
              return res.status(400).json({message:"o campo dataEmissao e obrigatorio"})
            }
            
            if(!dataValidade){
              return res.status(400).json({message:"o campo dataValidade e obrigatorio"})
            }
            
            if(!localEmissao){
              return res.status(400).json({message:"o campo localEmissao e obrigatorio"})
            }
            
            if(!tipoDocumento){
              return res.status(400).json({message:"o campo tipoDocumento e obrigatorio"})
            }
            
            if(!numeroDocumento){
              return res.status(400).json({message:"o campo numeroDocumento e obrigatorio"})
            }
            if(!schoolname){
              return res.status(400).json({message:"o campo escola e obrigatorio"})
            }            

            const contactos={
                      contactoPrincipal:contactoPrincipal,
                      contactoAlternativo:contactoAlternativo,
                      contactoEncarregado:contactoEncarregado,
                      contactoAlternativoEncarregado:contactoAlternativoEncarregado
                   

            }
            const documentos={
              dataEmissao:dataEmissao,
              dataValidade:dataValidade,
              localEmissao:localEmissao,
              tipoDocumento:tipoDocumento,
              numeroDocumento:numeroDocumento

            }

             try{
                       const estudante= await Estudante.create({
                        nome, apelido ,bairro, sexo ,
                        dataNascimento , 
                        contactos,
                          
                         nacionalidade,usuario,
                        documentos,schoolname,
                         fotoname:"",
                         size:"",
                         key:"",
                         url:'' 

                              
        
                       })
                       return res.status(200).json({
                                 message:"estudante cadastrado com sucesso",
                                  data:estudante 
                        }) 

             }catch(err){
                       return res.status(400).json({message:"houve um erro", err})
             }
          }
          
          
         },
         async index(req,res){
            const {schoolname}=req.query

            

                    if(schoolname){
                           try{
                              const listarEstudantes= await Estudante.find({
                                 schoolname
                              })
                              .populate('usuario')
                              .populate('schoolname')
                              if(listarEstudantes.length===0){
                                 return res.status(400).json({message:"estudante nao encontrado"})

                              }

    
                                 return res.status(200).json({messsage:"estudantes cadastrados", data:listarEstudantes.toUpperCase()})
                     

                     }catch(err){ 
                                 return res.status(400).json({
                                          message:"houve um erro",
                                 data:err 
                     })
                     }
                     return
                       

                    }
                    if(!schoolname){


                     try{
                        const listarEstudantes= await Estudante.find()
                        
                        .populate('usuario')
                        .populate('schoolname')
                        if(listarEstudantes.length===0){
                           return res.status(400).json({message:"estudante nao encontrado"})

                        }


                        return res.status(200).json({messsage:"estudantes cadastrados", data:listarEstudantes})
                

                        }catch(err){ 
                                return res.status(400).json({
                                            message:"houve um erro",
                                data:err 
                            })
                        }

                    }   
                  
             
         },
         async update(req,res){
            
         const{
                nome, apelido ,bairro, sexo ,
                dataNascimento , contactoPrincipal ,contactoAlternativo,
                contactoAlternativo2 , 
                nacionalidade, numeroDocumento,
                dataEmissao, dataValidade, localEmissao ,tipoDocumento,schoolname,
                }=req.body
                    
                const{id}=req.params
                const usuario=req.user
                
                    if(!nome){
                      return res.status(400).json({message:"o campo nome e obrigatorio"})
                    }
                    if(!apelido){
                      return res.status(400).json({message:"o campo apelido e obrigatorio"})
                    }
                    if(!bairro){
                      return res.status(400).json({message:"o campo bairro e obrigatorio"})
                    }
                    
                    if(!sexo){
                      return res.status(400).json({message:"o campo sexo e obrigatorio"})
                    }
                  
                    if(!dataNascimento){
                      return res.status(400).json({message:"o campo dataNascimento e obrigatorio"})
                    }
                  
                    if(!contactoPrincipal){
                      return res.status(400).json({message:"o campo contactoPrincipal e obrigatorio"})
                    }
                  
                  
                    if(!dataEmissao){
                      return res.status(400).json({message:"o campo dataEmissao e obrigatorio"})
                    }
                    
                    if(!dataValidade){
                      return res.status(400).json({message:"o campo dataValidade e obrigatorio"})
                    }
                    
                    if(!localEmissao){
                      return res.status(400).json({message:"o campo localEmissao e obrigatorio"})
                    }
                    
                    if(!tipoDocumento){
                      return res.status(400).json({message:"o campo tipoDocumento e obrigatorio"})
                    }
                    
                    if(!numeroDocumento){
                      return res.status(400).json({message:"o campo numeroDocumento e obrigatorio"})
                    }
                    if(!schoolname){
                      return res.status(400).json({message:"o campo escola e obrigatorio"})
                    }
  
                    if(!id){
                      return res.status(400).json({message:"o campo codigo do estudante e obrigatorio"})
                    }
   
   
  
                    const contactos={
                      contactoPrincipal:contactoPrincipal,
                      contactoAlternativo:contactoAlternativo,
                      contactoAlternativo2:contactoAlternativo2,
                      contactoAlternativoEncarregado:contactoAlternativoEncarregado
                           
  
                    }
                    const documentos={
                      dataEmissao:dataEmissao,
                      dataValidade:dataValidade,
                      localEmissao:localEmissao,
                      tipoDocumento:tipoDocumento,
                      numeroDocumento:numeroDocumento
  
                    }
                  //  console.log(contactos)
                   // console.log(documentos) 
                    
  
                  
                     
                     try{
                               const estudante= await Estudante.findByIdAndUpdate(id,{ 
                                nome, apelido ,bairro, sexo ,
                                dataNascimento , 
                                nacionalidade, contactos,
                                schoolname,
                                usuario,documentos
     
                
                               },{
                                         new:true
                               })
  
                               if(!estudante){
                                return res.status(400).json({message:"estudante nao encontrado"})
                               }
                               return res.status(200).json({
                                         message:"dados do estudantes alterados com sucesso",
                                          data:estudante 
                                }) 
  
                     }catch(err){
                               return res.status(400).json({message:"houve um erro", err})
                     }
         },
         async show(req,res){
                  
            const {id}=req.params
  

            if(!id){
                      return res.status(400).json({message:"o campo codigo e obrigatorio"})
            }

                      try{
                                const estudante= await Estudante.findOne({_id:id})
                              .populate('bairro')
                              .populate('schoolname')
                              .populate('usuario')
                              

                                if(!estudante){
                                  return res.status(400).json({message:"estudante nao encontrado"})

                                }
                                return res.status(200).json({
                                          message:"estudante encontrado com sucesso",
                                          data:estudante
                                }) 

                      }catch(err){
                                return res.status(400).json({message:"houve um erro",data:err})
                      }
         },

         async destroy(req,res){
               
                const{id}=req.params
               
                

                if(!id){
                      
                  return res.status(400).json({message:"o campo id do usuario e obrigatorio"})
                }
            


                try{
                  const estudanteStatusUse= await Estudante.findById(id)
                  if(!estudanteStatusUse){
                    return res.status(400).json({message:"estudante invalido"})
                  }
              

                  const verifyStatus=estudanteStatusUse.statusUse
                  if(verifyStatus){
                    return res.status(401).json({message:"nao e possivel deletar este estudante"})
                  }
                  
                const estudante = await Estudante.findByIdAndDelete({_id:id}) 
                return res.status(200).json({message:"estudante excluido com sucesso",data:estudante}) 
                
                }catch(err){
                        return res.status(400).json({message:"houve um erro", data:err})

                }
 
       
        },
  
  
       

}