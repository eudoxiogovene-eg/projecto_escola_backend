const Cadastrados= require('../../models/Cadastros')
const Estudantes= require('../../models/Estudantes')
const Vendas= require('../../models/VendaManuais')
const Multa = require('../../models/multas')
const Pagamentos= require('../../models/pagamentos')
const crypto=require('crypto')


module.exports={
          async store(req,res){
          
            const codigoEstudante=crypto.randomBytes(4).toString('Hex')

       
        
            const{curso,codigoInscricao,nivel,
                horario,desconto,estado,dataInscricao,
                formaPagamento,taxaInscricao}=req.body
                const usuario=req.user
                //console.log(req.body)
             // return  console.log(req.body)
          
            const [anoCadastro]=dataInscricao.split("-")
            console.log(anoCadastro)
             
                    if(!curso){
                              return res.status(400).json({
                                        message:"o campo  curso e obrigatorio"
                              })
                    }
                    if(!codigoInscricao){
                              return res.status(400).json({
                                        message:"o campo codigo de estudante  e obrigatorio"
                              })
                    }
                    if(!nivel){
                              return res.status(400).json({
                                        message:"o campo nivel de estudante  e obrigatorio"
                              })
                    }
                    if(!horario){
                        return res.status(400).json({
                                  message:"o campo horario de estudante  e obrigatorio"
                        })
                    }
                    if(!desconto){
                        return res.status(400).json({
                                  message:"o campo desconto de estudante  e obrigatorio"
                        })
                    }
                    if(!estado){
                        return res.status(400).json({
                                  message:"o campo estado de estudante  e obrigatorio"
                        })
                    }
                    if(!formaPagamento){
                        return res.status(400).json({
                                  message:"o campo formaPagamento de estudante  e obrigatorio"
                        })
                    }
              
              
              
              
                    if(!taxaInscricao){
                        return res.status(400).json({
                            message:"o campo taxaInscricao de estudante  e obrigatorio"
                      })
                    }         
                    
                    if(!usuario){
                        return res.status(400).json({
                            message:"o campo usuario de estudante  e obrigatorio"
                      })
                    }          

                    if(!dataInscricao){
                        return res.status(400).json({
                            message:"o campo taxaInscricao de estudante  e obrigatorio"
                      })
                    }          
                    
            
               
                    try {
                       const pesquisarEstudante= await Estudantes.findById(codigoInscricao)
                       if(!pesquisarEstudante){
                        return res.status(400).json({message:"estudante invalido"})
                       }
                    
                       const estudanteStatusUse=pesquisarEstudante.statusUse
                       const schoolname=pesquisarEstudante.schoolname
                       const bairro=pesquisarEstudante.bairro
                       const pesquisaeCursoEstudante=await Cadastrados.findOne({
                           curso,codigoInscricao
                        })
                        if(pesquisaeCursoEstudante){
                         return res.status(300).json({message:"o estudante ja foi inscrito neste   curso"})
                        }
                              const cadastrados= await Cadastrados.create({
                                        curso,nivel,codigoEstudante,horario,desconto,
                                        estado,dataInscricao,formaPagamento,usuario,
                                        taxaInscricao,codigoInscricao,schoolname,anoCadastro,
                                        bairro

                              })
                             if(!estudanteStatusUse){
                              await Estudantes.findByIdAndUpdate(codigoInscricao,
                                {statusUse:true})
                             }
                              return res.status(200).json({
                                    message:"dados do estudante cadastrados com sucesso",
                                    data:cadastrados
                                })
                              
                            
                              
                    } catch (erro) {
                              return res.status(400).json({
                                        message:"houve um erro",
                                        data:erro
                              })
                    }
          },
          
          async index(req,res){
                  
            try{
               const listarCadastrados= await Cadastrados.find()
               .populate('codigoInscricao')
               .populate('curso')
               .populate('usuario')
               .populate('schoolname')
               .populate("bairro")
                 
               if(listarCadastrados.length===0){
                  return res.status(400).json({message:"nenhum curso cadastrado"})
               }

                  return res.status(200).json({messsage:"estudantes cadastrados",data:listarCadastrados})
      

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
                      return res.status(400).json({message:"o campo id e obrigatorio"})

            }
          


            try{
                     const estudanteCurso= await  Cadastrados.findOne({_id:id})
                     .populate("curso")
                     .populate("codigoInscricao")
                     .populate("usuario")
                     .populate("schoolname")
                     .populate("bairro")
                     
                     
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
          async update(req,res){
          
          
            const{nivel,
                horario,desconto,estado,dataInscricao,
                formaPagamento,taxaInscricao
            }=req.body
            
            const usuario=req.user
            const {id}=req.params

                    
                    if(!nivel){
                              return res.status(400).json({
                                        message:"o campo nivel de estudante  e obrigatorio"
                              })
                    }
                    if(!horario){
                        return res.status(400).json({
                                  message:"o campo horario de estudante  e obrigatorio"
                        })
                    }
                    if(!desconto){
                        return res.status(400).json({
                                  message:"o campo desconto de estudante  e obrigatorio"
                        })
                    }
                    if(!estado){
                        return res.status(400).json({
                                  message:"o campo estado de estudante  e obrigatorio"
                        })
                    }
                    if(!formaPagamento){
                        return res.status(400).json({
                                  message:"o campo formaPagamento de estudante  e obrigatorio"
                        })
                    }
              
              
              
              
                    if(!taxaInscricao){
                        return res.status(400).json({
                            message:"o campo taxaInscricao de estudante  e obrigatorio"
                      })
                    }         
                    
                    if(!usuario){
                        return res.status(400).json({
                            message:"o campo usuario de estudante  e obrigatorio"
                      })
                    }          

                    if(!dataInscricao){
                        return res.status(400).json({
                            message:"o campo taxaInscricao de estudante  e obrigatorio"
                      })
                    }          
                    
                    const [anoCadastro]=dataInscricao.split("-")
               
                    try {
                       //
                       const cadastro = await Cadastrados.findByIdAndUpdate(id,{
                        nivel,horario,desconto,
                        estado,dataInscricao,formaPagamento,
                        taxaInscricao,anoCadastro


                       },{
                        new:true
                       })
                       if(!cadastro){
                        return res.status(400).json({message:"estudante nao encontrado"})
                       }

                       return res.status(200).json({ 
                        message:"dados do estudante alterados com sucesso",
                        data:cadastro
                    })
                              
                    } catch (erro) {
                              return res.status(200).json({
                                        message:"houve um erro",
                                        data:erro
                              })
                    }
          },
          async destroy(req,res){
          
          
            const{id}=req.params 
            const usuario=req.user

            if(!id){
                return res.status(400).json({message:"o campo idCurso do curso e obrigatorio"})
            }

            try {

                const pesquisarCadastro= await Cadastrados.findById(id)
                if(!pesquisarCadastro){
                  return res.status(400).json({message:"estudante invalido"})
                }
                let cadastroStatusUse=pesquisarCadastro.statusUse
                if(cadastroStatusUse){
                  return res.status(401).json({message:"nao possivel excluir o estudante"})
                }
                const cadastro= await Cadastrados.findByIdAndDelete(id) 
              
                  if(!cadastro){
                    return res.status(402).json({message:"estudante nao encontrado"})
                  }
                  return res.status(200).json({
                    message:"estudante deletado com sucesso",
                    data:cadastro
                })
             
                          
                    } catch (erro) {
                              return res.status(200).json({
                                        message:"houve um erro",
                                        data:erro
                              })
                    }
          }


}