var mysql = require('mysql');
var config = require('./config');
var option ={
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};
var con = mysql.createConnection(option);
con.option = option;
con.connect(function (err){
    if(err) throw err;
});

module.exports = con;