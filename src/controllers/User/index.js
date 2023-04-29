const User= require("../../models/User")
const Vendas= require('../../models/VendaManuais')
const Cadastrados= require('../../models/Cadastros')
const PagamentosMulta= require('../../models/pagamentosMultas')
const Pagamentos= require('../../models/pagamentos')
const crypto=require('crypto')
const bcrypt = require('bcrypt')

require('dotenv').config()
module.exports={
            async store(req,res){
                    let{username,sobreNome,estado,schoolname,perfil,password,confirmPassword,telefone,telefoneAlternativo}=req.body
                     const codigoUsuario=crypto.randomBytes(4).toString('Hex')
                 // ;;  console.log(req.body)
                
                    if(!username){
                            return res.status(400).json({message:"o campo nome e obrigatorio"})
                    }
             
                     if(!schoolname){
                            return res.status(400).json({message:"o campo escola e obrigatorio"})
                    }
                   // console.log(schoolname)
                    
                    if(!estado){
                        return res.status(400).json({message:"o campo estado e obrigatorio"})
                    }
                    if(!perfil){
                            return res.status(400).json({message:"o campo perfil e obrigatorio"})
                    }
                    if(!password){
                            return res.status(400).json({message:"o campo password e obrigatorio e obrigatorio"})
                    }
                    if(!confirmPassword){
                            return res.status(400).json({message:"o campo confirm password e obrigatorio e obrigatorio"})
                    }
                    if(!sobreNome){
                        return res.status(400).json({message:"o campo sobreNome e obrigatorio e obrigatorio"})
                    }
                    if(password !==confirmPassword){
                            return res.status(400).json({message:"senhas nao correspondentes"})
                    }
                    // validando usuario
                   
               

                    
                    try{
                        const useExists = await User.findOne({username,sobreNome}) 
                        if (useExists){
                            return res.status(422).json({message:"o nome de usuario ja foi usado porfavor escolha outro"})
                        }
                      
                        username= username.trim()
                        password= password.trim()
                        console.log(username)
                        const salt = await bcrypt.genSalt(12)
                        const passwordHash= await bcrypt.hash(password, salt)
                        if (useExists){
                                return res.status(422).json({message:"o nome de usuario ja foi usado porfavor escolha outro"})
                        }
                       

                            const user= await User.create({
                                        username,
                                        schoolname,
                                        perfil,
                                        password:passwordHash,
                                        sobreNome,
                                        estado,
                                        telefone,
                                        telefoneAlternativo,
                                        codigoUsuario
                                    
            
                            })
                            user.password=undefined
                            return res.status(200).json({message:"usuario cadastrado com sucesso", data:user}) 

                    }catch(err){
                            return res.status(400).json({message:"houve um erro", err})
                    }
            },

            async  index(req,res){
                try{
                          const user= await User.find()
                          .populate('schoolname')
                          return res.status(200).json({message:"usuario ",data:user}) 
                          
  
  
                }catch(err){
                        console.log(err)
                          return res.status(400).json({message:"houve um erro", err})
  
                }
  
            },
             
            async update(req,res){
            const{username,schoolname,sobreNome,perfil,estado,password,confirmPassword,telefone,telefoneAlternativo}=req.body 
            const {id}=req.params
            console.log(id + ' chegou aqui')
            console.log(req.body)
            if(!id){
                return res.status(400).json({message:"o campo codigo do usuario e obrigatorio"})
            }
            if(!username){
                      return res.status(400).json({message:"o campo nome e obrigatorio"})
            }
            if(!schoolname){
                      return res.status(400).json({message:"o campo escola e obrigatorio"})
            }
            if(!perfil){
                      return res.status(400).json({message:"o campo perfil e obrigatorio"})
            }
           
            try{
                    
              const user = await User.findByIdAndUpdate(id,{
                    username,
                    schoolname,
                    perfil,
                    estado,
                    telefone,
                    telefoneAlternativo,
                    sobreNome
                   

            },{
                    new:true
            })
            
                 
            if (!user){
                  return res.status(404).json({message:"usuario invalidob "})
            }

            return res.status(200).json({message:"usuario actualizado com sucesso",data:user})
            
            }catch(err){
                    return res.status(400).json({message:"houve um erro", data:err})

            }

   
            },
            async show(req,res){ 
                
                const{id}=req.params
                if(!id){
                        return res.status(400).json({message:"o campo codigo do usuario e obrigatorio"})
                }

                
            

                const user = await User.findById(id)
                .populate('schoolname')
                if (!user){
                        return res.status(404).json({message:"usuario invalidob "})
                }
                return res.status(200).json({message:"usuario encontrado com sucesso", data:user})

                
            },

            async destroy(req,res){
                    
            const{id}=req.params
         
            if(!id){
                return res.status(400).json({message:"o campo codigo do usuario e obrigatorio"})
            }

            try{
            const cadastrosUsuario= await Cadastrados.find({usuario:id})
            if(cadastrosUsuario.length>=1){
                return res.status(400).json({message:"o usuario ja possui cadastros"})
            }

            const vendaUsuario= await Vendas.find({usuario:id})
            if(vendaUsuario.length>=1){  
                return res.status(402).json({message:"o usuario ja possui vendas"})
            } 

            const pagamentosUsuario= await Pagamentos.find({usuario:id})
     
            if(pagamentosUsuario.length>=1){
                return res.status(400).json({message:"o usuario ja possui pagamentos"})
            }
          
            const usuarioMultaUsuario= await PagamentosMulta.find({usuario:id})
            if(usuarioMultaUsuario.length>=1){
              return res.status(402).json({message:"o usuario ja possui multas"})
              
            }
            console.log(usuarioMultaUsuario)
            const user = await User.findByIdAndDelete(id) 
                    

            if (!user){
                return res.status(404).json({message:"usuario invalidob "})
            }

            return res.status(200).json({message:"usuario excluido com sucesso",data:user})
            
            }catch(err){
                    return res.status(400).json({message:"houve um erro", data:err})

            }


        },


        async createDefaultUser(req,res){
                const  username=process.env.User
                const perfil =process.env.Perfil
                const password=process.env.Password
                const estado=process.env.Estado 
                const   sobreNome=process.env.User
                const codigoUsuario=crypto.randomBytes(4).toString('Hex')
                let dados={
                        username,
                        perfil,
                        password,
                        estado,
                        sobreNome,
                        codigoUsuario
                }
                
      
                try {

                       
                        const salt = await bcrypt.genSalt(12)
                        const passwordHash= await bcrypt.hash(password, salt)

                        const userExists= await User.find()   
                        console.log(userExists)

                        if(userExists.length>=1){
                                return res.status(400).json({
                                        message:'nao possivel cadastrar este  usuario,pois ja existe um usuario'
                                })
                        }
                        const user= await User.create({
                                username,
                                perfil,
                                password:passwordHash,
                                estado,
                                sobreNome,
                                codigoUsuario
                                
                         })
                         return res.status(200).json({
                                message:'usuario criado com sucesso',
                                data:user
                         })
                } catch (error) {
                        console.log(error)
                   return res.status(400).json({message:"houve um erro"})
                }

        }
}