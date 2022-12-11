const db= require('./db.js');
const User= db.sequelize.define('usuarios',{
  Nome:{
     type: db.Sequelize.STRING
   },
   Senha:{
     type : db.Sequelize.STRING
   },
   Email:{
     type : db.Sequelize.STRING
   }
 })
 
 module.exports =User;
 