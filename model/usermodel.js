"use strict";

var connection = require('../connection');

exports.getUsers = async function (callback) {
    await connection.query('SELECT * FROM person', callback);
};
exports.getUser = async function(fields,callback) {
    await connection.query('SELECT * FROM person where id = ?',fields, callback);
};
exports.addUser = async function(fields,callback) {
    await connection.query('INSERT INTO person (first_name, last_name) values (?,?)',fields,callback);
};
exports.editUser = async function(fields,callback) {
    await connection.query('UPDATE person SET first_name = ?, last_name = ? WHERE id = ?',fields,callback);
};
exports.deleteUser = async function(fields,callback) {
    await connection.query('DELETE FROM person WHERE id = ?',fields,callback);
};