const Multa = require('../../models/multas')
const Pagamentos=require('../../models/pagamentos')
const Mensalidades= require('../../models/Mensalidade') 
const Cursos= require('../../models/Cursos')
const Cadastrados= require('../../models/Cadastros')
const crypto=require('crypto')

let dt=new Date()                 
let anoSistema=dt.getFullYear()  
let mesSistema= parseInt(dt.getMonth()+1)
let diaSistema= parseInt(dt.getDate())   
module.exports={
    async store(req,res){
      const codigoMulta=crypto.randomBytes(4).toString('Hex')

        // multar estudantes
        // primeiro pegar meses
        // segundo pegar cursos multa activa
        // pegar estudantes que esses cursos com
        // pesquisar nos pagamentos estudantes esses cursos o mes a multar se ja foi pago
        // caso nao multar os estudantes
       
           try {

            const mensalidades=await Mensalidades.find()
                
            let mesMulta=04//mesSistema
            let mensalidade
            let anoMulta  
             
    if(mesMulta==01){
        mensalidade=mensalidades[11]
        anoMulta=Number(anoSistema)-1   
    }

    if(mesMulta==02){
        mensalidade=mensalidades[0]
        anoMulta=anoSistema
   }
  
   if(mesMulta==03){
        mensalidade=mensalidades[1]
        anoMulta=anoSistema
   }
 
  if(mesMulta==04){
        mensalidade=mensalidades[2] 
        anoMulta=anoSistema
  }
  if(mesMulta==05){
        mensalidade=mensalidades[3]
        anoMulta=anoSistema
  }
  if(mesMulta==06){
        mensalidade=mensalidades[4]
        anoMulta=anoSistema
  }
  if(mesMulta==07){
        mensalidade=mensalidades[5]
        anoMulta=anoSistema
  }
  if(mesMulta==08){
        mensalidade=mensalidades[6]
        anoMulta=anoSistema
       // console.log(anoMulta, mensalidade)
  }
  if(mesMulta==09){
        mensalidade=mensalidades[7]
        anoMulta=anoSistema
  }
  if(mesMulta==10){
        mensalidade=mensalidades[8]
        anoMulta=anoSistema
  }
  if(mesMulta==11){
        mensalidade=mensalidades[9]
        anoMulta=anoSistema
  }
  if(mesMulta==12){
        mensalidade=mensalidades[10]
        anoMulta=anoSistema
  }

            const estado="activo"

            const cursosComMulta=await Cursos.find({
                statusMulta:estado
            })
            let idCursos
           cursosComMulta.map(async(curso)=>{
               
                const cadastros= await Cadastrados.find({
                        estado:estado,
                        curso:curso._id
                    })
                    .populate('codigoInscricao')
                    .populate('curso')
                  cadastros.map(async(cadastro)=>{

               
                        const pagamentoEstudante=await Pagamentos.findOne({
                            codigoCadastro:cadastro._id,
                            anoPagamento:anoSistema,
                            mensalidade
                        })
                       

                        if(!pagamentoEstudante){
                          //  console.log('estudante '+ cadastro + ' merece multa')
                          let descontoEstudante=cadastro.desconto
                          let descontoCurso=cadastro.curso.descontoCurso
                          let valorCursoAdulto=cadastro.curso.valorCursoAdulto
                          let valorCursoCrianca= cadastro.curso.valorCursoCrianca
                          let valorCursoAdultoDesconto=cadastro.curso.valorCursoAdultoDesconto
                          let valorCursoCriancaDesconto=cadastro.curso.valorCursoCriancaDesconto
                          let [anoNascimento]=cadastro.codigoInscricao.dataNascimento.split("-")
                          let idade=anoSistema-anoNascimento
                          let percetagemMulta=Number(cadastro.curso.taxaMultaCurso)
                          let codigoInscricao=cadastro.codigoInscricao._id
                          let schoolname=cadastro.schoolname._id
                          let codigoCadastro=cadastro._id
                          let curso=cadastro.curso._id
                         // return console.log(schoolname + ' codigo da escola')
                         // console.log(percetagemMulta)
                        //   console.log(descontoEstudante)
                        //   console.log(descontoCurso + " este descoonto curso")
                        //   console.log(valorCursoAdulto)
                        //   console.log(valorCursoCrianca)
                        //   console.log(valorCursoAdultoDesconto)
                        //   console.log(valorCursoCriancaDesconto)
                        //console.log(idade)
                        let valorMensalidade  
                              if(descontoCurso=="activo"){
                                    if(idade>=13){
                                          if(descontoEstudante=="activo"){
                                                valorMensalidade=valorCursoAdultoDesconto
                                          }else{
                                                valorMensalidade=valorCursoAdulto
                                          }
                                    }else{
                                          if(descontoEstudante=="activo"){
                                                valorMensalidade=valorCursoCriancaDesconto
                                          }else{
                                                valorMensalidade=valorCursoCrianca
                                          }
                                    }
                              }else{
                                    if(idade>=13){
                                          valorMensalidade=valorCursoAdulto
                                    }else{
                                          valorMensalidade=valorCursoCrianca
                                    }
                              }

                              console.log(valorMensalidade)
                              let valorMulta=valorMensalidade*percetagemMulta/100
                              console.log(valorMulta)

                              const criarMulta= await Multa.create({
                                    codigoCadastro,
                                    mensalidade,
                                    anoMulta,
                                    valorMulta,
                                    codigoInscricao,
                                    codigoMulta,
                                    schoolname,
                                    curso
                              })

                            //  console.log(criarMulta)
                        }
                    })
            })

        

            return res.status(200).json({message:'multas atribuidas com sucesso'})
            
           } catch (error) {
              return res.status(400).json({message:"houve um erro"})
           }
                    
               
                
    },

    
    
}  