
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { decode } = require('punycode')
const {promisify}= require('util')
module.exports={
 eAdmin:   async function(req,res,next){
                const authHeader=req.headers.authorization
              ///   console.log(authHeader)

                if(!authHeader ){
                return  res.status(400).json({
                    erro:true,
                    message:"necessario realizar o login falta o token a"
                })
                }

            const [bearer,token] =authHeader.split(' ')
         //console.log(`bearer: ${bearer} token: ${token}`)
        
            if(!token){
                return res.status(401).send({message:'necessario realizar o login falta o token b'})
            }

            try {
                const secret= process.env.SECRET
                const decode= await promisify(jwt.verify)(token,secret)
               
               req.user= decode.id
           
               return next()
                
            } catch (error) {     
                            console.log(error) 
                            return res.status(401).send({message:'necessario realizar o login falta o token c'})
                        
                            
            }
    }
}