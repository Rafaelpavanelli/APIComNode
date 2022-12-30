const Sequelize= require('sequelize');
const sequelize=new Sequelize('crud','root','',{
  host: 'localhost',
  dialect: 'mysql',
  query:{raw:true}
})
module.exports = {
  Sequelize,
  sequelize 
}

  