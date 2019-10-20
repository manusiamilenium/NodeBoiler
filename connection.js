var mysql = require('mysql');
var config = require('./config');
var con = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;