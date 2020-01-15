"use strict";

var connection = require('../connection');

exports.getAll = async function (callback) {
    await connection.query('SELECT * FROM user_activity', callback); 
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM user_activity where id_activity = ?',fields, callback); 
};
exports.add = async function(fields,callback) {
    await connection.query('INSERT INTO user_activity (id_user,deskripsi) values (?,?)',fields,callback);
};
exports.edit  = async function(fields,callback) {
    await connection.query('UPDATE user_activity SET deskripsi = ? WHERE id_activity = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM user_activity WHERE id_activity = ?',fields,callback);
};