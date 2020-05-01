"use strict";

var connection = require('../connection');
  
exports.getUsers = async function (callback) {
    await connection.query('SELECT * FROM user', callback);
};
exports.getUser = async function(fields,callback) {
    await connection.query('SELECT * FROM user where username = ? ',fields, callback);
};
exports.addUser = async function(fields,callback) {
    await connection.query('INSERT INTO user (username, password,id_satwil,id_subdit) values (?,?,?,?)',fields,callback);
};
exports.editUser = async function(fields,callback) {
    await connection.query('UPDATE user SET username = ?, password = ?, id_satwil = ?, id_subdit = ? WHERE id_user = ?',fields,callback);
};
exports.deleteUser = async function(fields,callback) {
    await connection.query('DELETE user person WHERE id_user = ?',fields,callback);
};
exports.editPassword = async function(fields,callback) {
    await connection.query('UPDATE user SET password = ? WHERE id_user = ?',fields,callback);
};
//dash
/*
exports.activeUser = async function(callback){
    await connection.query('',callback);
}
*/
exports.activeUser = async function(callback){
    await connection.query('SELECT COUNT(data) FROM sessions',callback);
}
exports.activityUser = async function(callback){
    await connection.query('SELECT * FROM user_activity u1  ' +
                            'WHERE u1.datetime  = (SELECT MAX(u2.datetime) FROM user_activity u2 WHERE u2.id_user = u1.id_user) ORDER BY u1.datetime DESC LIMIT 10 )',callback);
}
exports.totalData = async function(callback){
    await connection.query('SELECT SUM(TABLE_ROWS) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = "IKUBIK" ',callback);
}