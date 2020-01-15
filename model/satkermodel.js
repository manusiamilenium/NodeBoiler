"use strict";

var connection = require('../connection');

exports.getSatkers = async function (callback) {
    await connection.query('SELECT * FROM satker', callback);
};
exports.getSatker = async function(fields,callback) {
    await connection.query('SELECT * FROM satker where id_satker = ?',fields, callback);
};
exports.addSatker = async function(fields,callback) {
    await connection.query('INSERT INTO satker (nama_satker) values (?)',fields,callback);
};
exports.editSatker  = async function(fields,callback) {
    await connection.query('UPDATE satker SET nama_satker = ? WHERE id_satker = ?',fields,callback);
};
exports.deleteSatker  = async function(fields,callback) {
    await connection.query('DELETE FROM satker WHERE id_satker = ?',fields,callback);
};