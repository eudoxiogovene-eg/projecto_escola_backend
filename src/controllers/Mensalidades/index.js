const Mensalidades= require('../../models/Mensalidade')
const { index } = require('../Estudantes')
module.exports={
          async store(req,res){

          const meses=[
              {
                  "_id": "629339186d121361baa4303e",
                  "mes": "JANEIRO",
                  "codigoMes": "01",
                  "__v": 0
              },
              {
                  "_id": "629339296d121361baa43040",
                  "mes": "FEVEREIRO",
                  "codigoMes": "02",
                  "__v": 0
              },
              {
                  "_id": "629339386d121361baa43042",
                  "mes": "MARCO",
                  "codigoMes": "03",
                  "__v": 0
              },
              {
                  "_id": "629339436d121361baa43044",
                  "mes": "ABRIL",
                  "codigoMes": "04",
                  "__v": 0
              },
              {
                  "_id": "6293394d6d121361baa43046",
                  "mes": "MAIO",
                  "codigoMes": "05",
                  "__v": 0
              },
              {
                  "_id": "629339576d121361baa43048",
                  "mes": "JUNHO",
                  "codigoMes": "06",
                  "__v": 0
              },
              {
                  "_id": "629339636d121361baa4304a",
                  "mes": "JULHO",
                  "codigoMes": "07",
                  "__v": 0
              },
              {
                  "_id": "6293396c6d121361baa4304c",
                  "mes": "AGOSTO",
                  "codigoMes": "08",
                  "__v": 0
              },
              {
                  "_id": "629339786d121361baa4304e",
                  "mes": "SETEMBRO",
                  "codigoMes": "09",
                  "__v": 0
              },
              {
                  "_id": "629339846d121361baa43050",
                  "mes": "OUTUBRO",
                  "codigoMes": "10",
                  "__v": 0
              },
              {
                  "_id": "629339936d121361baa43052",
                  "mes": "NOVEMBRO",
                  "codigoMes": "11",
                  "__v": 0
              },
              {
                  "_id": "629339a06d121361baa43054",
                  "mes": "DEZEMBRO",
                  "codigoMes": "12",
                  "__v": 0
              }
          ]

                   
                   
                        
                    try{
                      const procurarMensalidades= await Mensalidades.find()
                      if(procurarMensalidades.length>0){
                        return res.status(202).json({message:"o mesese ja foro, cadastrados"})
                      }
                      
                    for(let i=0;i<meses.length;i++){  
                      setTimeout(async()=>{
                        const cadastrarMeses=await Mensalidades.create({
                          mes:meses[i].mes,
                          codigoMes:meses[i].codigoMes
                        })
                      },1000)
                    }
                       
                     
                      return res.status(200).json({
                                message:"mensalidade cadastrada com sucessso",
                                
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
                      const mensalidades= await Mensalidades.find()
                      if(!mensalidades){
                          return res.status(400).json({message:"nenhuma mensalidade foi cadastrada ainda"})
                      }
                      return res.status(200).json({
                                message:"mensalidades cadastradas",
                                data:mensalidades
                      })

            }catch(err){
                      return res.status(400).json({
                                message:"houve um erro",
                                data:err
                      })

            }

          }
}