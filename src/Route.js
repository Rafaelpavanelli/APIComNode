//Importando Funções
const Express= require ('express');
const app=Express();
const cors = require('cors');
const Users=require('./Modules/Users')
const Post=require('./Modules/Post')
const bodyParser= require('body-parser');
//Configurando o body parser
 app.use(bodyParser.urlencoded({extended:false}))
 app.use(bodyParser.json())
//Iniciando a API
 app.listen(3000,()=>{
  console.log('Rodando')
});
//Habilitando o CORS
app.use(cors({
  origin: '*'
}));
//Middleware para verificar se usuario ja existe
app.use('/CreateUser',(req,res,next)=>{
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
})

app.post('/createUser',(req,res)=>{ //Cria usuario após o middleware confirmar que não existe usuario criado
  Users.create({  //Envia os dados para o banco de dados
    Nome:req.body.Nome,
    Senha: req.body.Senha,
    Email:req.body.Email
   }).then(()=>{
    res.send(true) //Caso seja concluido, Informa que foi realizado a criação
   }).catch((err)=>{
      res.send(err)
    console.log(err) //Informa se houve algum erro
  }
   )
 }
)

app.post('/UserLogin',(req,res)=>{ //Função para verificar se usuário existe
  Users.findAll({
    where:{
      Email:req.body.Email
    }
}).then((user)=>{
  if(user[0].Senha == req.body.Senha){
    res.send(user[0])
  }else{
    res.send('Senha Invalida')
  } //If para confirmar se 
  }).catch((user) => {                                                          //os dados conferem, se a senha não coincidir com o usuario, informa
      res.send("Usuario não localizado")                      //para o front-end, caso o usuario não exista, tambem informa
})

})
//Middleware para verificar se o usuario que está realizando o post, é o mesmo
//que está logado na conta, para usar como medida simples de segurança
app.use('/addTarefa',(req,res,next)=>{
  if(req.body.idUser != ''){
    Users.findAll({
      where:{
        id:req.body.idUser
      }
  }).then((user)=>{
    const Id=user[0].id
    if(`${Id}` === req.body.idUser){ //Caso seja igual, passa para a função seguinte
     next();
    }else{
      
      res.send("Erro") //Caso não seja, informa o front end para tratar
    }
  }).catch((err)=>{
    
    res.send("Usuario não localizado"+err) //Caso não seja enviado algum id, informa ao font end para tratar
  })
  }else{
    res.send("Usuario não localizado")
  }
 
})
//Middleware para verificar se o posto que está sendo criado ja existe.
app.use('/addTarefa',(req,res,next)=>{ 
  if(req.body.Tarefa != ''){

  
  Post.findAll({   //Buscando o post no banco de dados
    where:{
      Tarefa:req.body.Tarefa
    }
}).then((result)=>{
   if(result[0]){ //Caso retornar que existe, será notificado ao front end
    res.send("Tarefa ja Existente")
   }else{
     next() //Caso não seja, envia para a função seguinte
   }
}).catch((err)=>{
  res.send("Não possivel criar tarefa"+err.message)
})
}else{res.send("Campo vazio, preencha adequeadamente")}})

//Função para criar a tarefa no banco de dados
app.post('/addTarefa',(req,res)=>{
  Post.create({
    idUser:req.body.idUser,
    Tarefa:req.body.Tarefa
  }).then((post)=>{
     res.send("Tarefa Criada")
  }).catch((error)=>{
  res.send("erro")
  })
})

app.post('/Tarefas',(req,res)=>{
  Post.findAll({   //Buscando o post no banco de dados
    where:{
      idUser:req.body.idUser
    }
}).then((Tarefas)=>{ //Quando achado, retorna os dados
  res.send(Tarefas)
}).catch((err)=>{
  res.send("Erro: "+err+req.body)
})
})

app.use('/DelTarefa',(req,res,next)=>{
    Post.findAll({   //Buscando o post no banco de dados
      where:{
        id:req.body.id
      }
    }).then((result)=>{
      if(result[0]){
       next()
          
      }else{
        res.send("Post não existe")
      }
    }).catch((err)=>{
      res.send("Erro"+ err)
    })
  })

  app.post('/DelTarefa',(req,res)=>{ //Deleta a tarefa do banco de dados
    Post.destroy({
      where:{
        id: req.body.id
      }
    }).then(()=>{
      res.send("Deletado")
    }).catch(err=>{
      res.send("Error: " + err)
    })
  })


