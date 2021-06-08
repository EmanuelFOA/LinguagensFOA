const { json, response, request } = require('express')
const express = require ('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())
let funcionarios=[
    {
        id:uuid.v4(),nome:"Emanuel Santos",email:"emanuel.svr2@gmail.com",funcao:"tecnico",telefone:"2451545415",departamento:"desenvolvimento",
    },   
     {
        id:uuid.v4(),nome:"Arlindo",email:"arlindinho66@gmail.com",funcao:"segurança",telefone:"51547847145",departamento:"securyty",
    }
] 

console.log(funcionarios)
//middleware

const verificacadastro =(request, response, next) =>{
    const{nome,funcao,departamento,  email, telefone}= request.body
    if(!nome || !funcao || !departamento || !email || !telefone){
        return response
        .status(400)
        .json({ Error: 'verificar se esta sobrando algun campo sem preencimento'})
    }
    return next()

}
const checkIdInarry=(request, response,next)=>{
    const{id}= request.params
    const telefone=funcionarios.find(func => func.id === id)
    if(!telefone){
        return response
        .status(400)
        .json({error:'id Inexistente'})
    }
    return next()

}

//listar por id
app.get('/funcionarios/:id', checkIdInarry, (request, response)=>{
    const{id}= request.params
    const telefone= funcionarios.filter(func=> func.id==id)
    return response
    .status(200)
    .json(telefone)
})

//excluir pelo id

app.delete('/funcionarios/:id', checkIdInarry, (request, response) =>{
    const {id}= request.params
    const indice = funcionarios.findIndex(funcionarios => funcionarios.id==id)
    console.log(indice)
    console.log(funcionarios[indice])
    funcionarios.splice(indice, 1)
    return response
    .status(200)
    .json({massage: 'Registro excluido com sucesso !!!!'})

})

//listar funcionario
app.get('/funcionarios',(request,response)=>{
    return response
    .status(200)
    .json(funcionarios)
})

//alterar pelo id

app.put('/funcionarios/:id', checkIdInarry, verificacadastro, (request, response)=>{
    const{nome, funcao, departamento, email, telefone}=request.body
    const{id}=request.params
    let indice= funcionarios.findIndex(funcionarios =>funcionarios.id==id)
    const dadosfuncionarios={
        id,
        nome,
        funcao,
        departamento,
        email,
        telefone,
    }
    funcionarios.splice(indice, 1, dadosfuncionarios)
    return response
    .status(200)
    .json(dadosfuncionarios)
})

//cadastrar funcionarios
app.post('/funcionarios',verificacadastro, (request, response) => {
    const {nome, funcao, departamento, email, telefone} = request.body
    const incluirFuncionario = {
        id: uuid.v4(),
        nome, 
        funcao,
        departamento,
        email,
        telefone
    }

    funcionarios = [...funcionarios, incluirFuncionario]
    return response
        .status(200)
        .json(incluirFuncionario)
})


app.listen(3333,  () => {
    console.log ('servidor rodando!!')
})