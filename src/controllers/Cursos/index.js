const Cursos= require('../../models/Cursos')
const Vendas= require('../../models/VendaManuais')
const Cadastrados= require('../../models/Cadastros')
const Multa = require('../../models/multas')
const Pagamentos= require('../../models/pagamentos')

module.exports={
         async store(req,res){
 
                   const{nomeCurso,valorCursoAdulto,valorCursoCrianca,
                    duracaoCurso,descontoCurso,valorCursoAdultoDesconto,valorCursoCriancaDesconto,
                    taxaMultaCurso,statusMulta,descricaoCurso
                  }=req.body
                   
                  //return console.log(req.body)
                  
                      
                  if(!nomeCurso){
                    return res.status(400).json({message:"o campo nome do curso e obrigatorio"})
                  }
                   try{
                            const pesquisaeCurso=await Cursos.findOne({nomeCurso})
                            if(pesquisaeCurso){
                              return res.status(420).json({message:"o nome do curso ja foi usado, por favor cadastre outro curso"})
                            }
                             const curso= await Cursos.create({
                              nomeCurso,valorCursoAdulto,valorCursoCrianca,
                              duracaoCurso,descontoCurso,valorCursoAdultoDesconto,valorCursoCriancaDesconto,
                              taxaMultaCurso,statusMulta,descricaoCurso
                              })
                             return res.status(200).json({
                                       message:"curso cadastrado com sucesso",
                                        data:curso 
                              }) 

                   }catch(err){
                             return res.status(400).json({message:"houve um erro", err})
                   }
         },


         async index(req,res){

                   try{
                            const listarCursos=await Cursos.find()
                            if(listarCursos.length==0){
                              return res.status(400).json({message:"sem nenhum cadastro"})
                            }
                            
                             return res.status(200).json({
                                       message:"cursos cadastrados",
                                        data:listarCursos 
                              }) 

                   }catch(err){
                             return res.status(400).json({message:"houve um erro", err})
                   }
         },


         async show(req,res){
          const {id_curso}=req.params

          if(!id_curso){
                    return res.status(400).json({message:"o campo codigoEstudante e obrigatorio"})

          }
        


          try{
                   const curso= await  Cursos.findOne({_id:id_curso})
                   
                   if(curso===null){
                             return res.status(400).json({message:"curso nao encontrado"})
                   }
                   return res.status(200).json({
                             message:"pagamento encontrado com sucesso",
                             data:curso
                   })
          }catch(err){
                    return res.status(400).json({
                              message:"houve um erro",
                              data:err
                    })
          }

  },

  async update(req,res){
       
             const{nomeCurso,valorCursoAdulto,valorCursoCrianca,
              duracaoCurso,descontoCurso,valorCursoAdultoDesconto,
              valorCursoCriancaDesconto,
              taxaMultaCurso,statusMulta,descricaoCurso
            }=req.body
            console.log(req.body)

            const {id}=req.params  
            

              
            if(!nomeCurso){
              return res.status(400).json({message:"o campo nome do curso e obrigatorio"})
            }
            if(!valorCursoAdulto){
              return res.status(400).json({message:"o campo valorCursoAdulto do curso e obrigatorio"})
            }
            if(!valorCursoCrianca){
              return res.status(400).json({message:"o campo valorCursoCrianca do curso e obrigatorio"})
            }
            if(!duracaoCurso){
              return res.status(400).json({message:"o campo duracao do curso e obrigatorio"})
            }
            if(!descontoCurso){
              return res.status(400).json({message:"o campo descontoCurso do curso e obrigatorio"})
            }
            if(!valorCursoAdultoDesconto){
              return res.status(400).json({message:"o campo valorCursoAdultoDesconto do curso e obrigatorio"})
            }
          
            if(!taxaMultaCurso){
              return res.status(400).json({message:"o campo taxaMultaCurso do curso e obrigatorio"})
            }
           
            if(!id){
              return res.status(400).json({message:"o campo idCurso do curso e obrigatorio"})
            }
             try{
                 const editarCurso=await Cursos.findByIdAndUpdate(id,{
                          
                  nomeCurso,valorCursoAdulto,valorCursoCrianca,
                  duracaoCurso,descontoCurso,valorCursoAdultoDesconto,valorCursoCriancaDesconto,
                  taxaMultaCurso,statusMulta,descricaoCurso
                      },{
                          new:true
                     })
                      if(!editarCurso){
                        return res.status(420).json({message:"o curso nao encontrado"})
                      }
                       
                       return res.status(200).json({
                                 message:"dados do curso alterados com sucesso",
                                  data:editarCurso
                        }) 

             }catch(err){
                       return res.status(400).json({message:"houve um erro", err})
             }
   }, 

   async destroy(req,res){ 
  

  
             
           const {id}=req.params
          
            if(!id){
              return res.status(400).json({message:"o campo idCurso do curso e obrigatorio"})
            }
             try{

               const cadastroCurso= await Cadastrados.find({curso:id})
              
               if(cadastroCurso.length>=1){
                  return res.status(400).json({message:"o curso ja possui cadastros"})
               }
               const vendasCurso= await Vendas.find({curso:id})
               if(vendasCurso.length>=1){
                 
                  return res.status(402).json({message:"o curso ja possui vendas"})
               } 

               const multaCurso= await Multa.find({curso:id})
               
               if(multaCurso.length>=1){
                 return res.status(402).json({message:"o curso ja possui multas"})
               }

               const pagamentosCurso= await Pagamentos.find({curso:id})
               
               if(pagamentosCurso.length>=1){
                return res.status(400).json({message:"o curso ja possui pagamentos"})
               }

               const cursoDeletado= await Cursos.findByIdAndDelete(id) 
               
                 if(!cursoDeletado){
                   return res.status(402).json({message:"curso nao encontrado"})
                 }
                 return res.status(200).json({message:"curso deletado com sucesso"})
            
                 
             }catch(err){
                       return res.status(400).json({message:"houve um erro", err})
             }
   },
}