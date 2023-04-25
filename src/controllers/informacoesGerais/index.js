
const Cadastrados= require('../../models/Cadastros')
const Pagamentos= require('../../models/pagamentos')
const PagamentosMulta= require('../../models/pagamentosMultas')
const Vendas= require('../../models/VendaManuais')
module.exports={
  
    async pesquisar(req,res){
        const {id}=req.params

        if(!id){
            return res.status(400).json({message:'o campo is e obrigatorio'})
        }

        try {
            const estudante= await Cadastrados.findById(id)
            .populate("curso")
            .populate("usuario")
            .populate("codigoInscricao")
            .populate("schoolname")
            .populate('bairro')
            if(!estudante){
                return res.status(400).json({message:"estudante nao encontrado"})
            }
            const pagamentos= await Pagamentos.find({
                codigoCadastro:id
            })
            .populate('mensalidade')
            const manuais= await Vendas.find({
                codigoCadastro:id
            })
            .populate("usuario")
            .populate("codigoManualId")
           
            const multasPagas=await PagamentosMulta.find({
                codigoCadastro:id
                })
                .populate('mensalidade')
                .populate('codigoIdMulta')
                .populate('usuario')
                
            const dados={
                estudante,
                pagamentos,
                manuais,
                multasPagas

            }
            return res.status(200).json({
                message:"multas pagas",
                data:dados
            })
        } catch (error) {
            console.log(error)
            return res.status(400).json({message:"houve um erro"})
        }
    }
}