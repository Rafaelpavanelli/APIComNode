const Express= require ('express');
const bodyParser= require('body-parser');

const CrearUsuario = ({req,res,next})=>{
  Users.findAll({  //Realizando busca no banco de dados Users
    where:{
      Email:req.body.Email
    }
  }).then(users=>{
    if(users.length>0){ //Verificando se existe usuario
      res.send('Usuario ja existe') //Se existir, a API informa
    }else{
      next() //Caso não existir, passa para a função
    }
  }).catch(err=>{
    res.send(err.message) //Para caso o servidor de algum problema, terei que tratar no futuro os erros
  });
}