const User= require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
         

module.exports={
 

async logar(req,res){
          const {username, password}=req.body
          console.log(req.body)

          if(!username){
                return res.status(400).json({message:"o campo nome e obrigatorio"})
         }


        if(!password){
                return res.status(400).json({message:"o campo  password e obrigatorio e obrigatorio"})
        }
        
        try {
             // checando se usuario existe
        const user = await User.findOne({username}).select('+password')
        // console.log(user)
         if (!user){
                 return res.status(404).json({message:"usuario invalidob "})
         }
 
         // checando o password
         const checkPassword= await bcrypt.compare(password, user.password)
         console.log(checkPassword)
         if(!checkPassword){
                 return  res.status(405).json({msg:"senha invalida"})
        }
        user.password=undefined
        const secret= process.env.SECRET    
       
        const token= jwt.sign({id:user._id},secret,{
         expiresIn: '7d'
        // expiresIn: 60
        })
       const data={
       user,
        token
       }
        return res.status(200).json({
                message:"logado com sucesso",
                data
        })      
        } catch (error) {
                console.log(error)
                return  res.status(400).json({msg:"houve um erro"})
        }
      

   
       
}
}