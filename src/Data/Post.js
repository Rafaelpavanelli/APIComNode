const db= require('./db.js');
const Post= db.sequelize.define('postagens',{
  idUser:{
     type: db.Sequelize.INTEGER
   },
   Tarefa:{
     type : db.Sequelize.TEXT
   }
 })
 
 module.exports =Post;
 