"use strict";

var connection = require('../connection');

exports.getSatwils = async function (callback) {
    await connection.query('SELECT * FROM satwil', callback);
};
exports.getSatwil = async function(fields,callback) {
    await connection.query('SELECT * FROM satwil where id_satwil = ?',fields, callback);
};
exports.addSatwil = async function(fields,callback) {
    await connection.query('INSERT INTO satwil (nama_satwil) values (?)',fields,callback);
};
exports.editSatwil  = async function(fields,callback) {
    await connection.query('UPDATE satwil SET nama_satwil = ? WHERE id_satwil = ?',fields,callback);
};
exports.deleteSatwil  = async function(fields,callback) {
    await connection.query('DELETE FROM satwil WHERE id_satwil = ?',fields,callback);
};