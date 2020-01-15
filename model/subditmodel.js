"use strict";

var connection = require('../connection');

exports.getAll = async function (callback) {
    await connection.query('SELECT * FROM subdit', callback);
};
exports.getSubdit = async function(fields,callback) {
    await connection.query('SELECT * FROM subdit where id_subdit = ?',fields, callback);
};
exports.addSubdit = async function(fields,callback) {
    await connection.query('INSERT INTO subdit (nama_subdit) values (?)',fields,callback);
};
exports.editSubdit  = async function(fields,callback) {
    await connection.query('UPDATE subdit SET nama_subdit = ? WHERE id_subdit = ?',fields,callback);
};
exports.deleteSubdit  = async function(fields,callback) {
    await connection.query('DELETE FROM subdit WHERE id_subdit = ?',fields,callback);
};