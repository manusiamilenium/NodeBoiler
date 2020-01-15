"use strict";

var connection = require('../connection');

exports.getAll = async function (callback) {
    await connection.query('SELECT * FROM produk_intelijen', callback);
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM produk_intelijen where id_produk_intelijen = ?',fields, callback);
};
exports.add = async function(fields,callback) {
    await connection.query('INSERT INTO produk_intelijen (nama_produk_intelijen) values (?)',fields,callback);
};
exports.edit  = async function(fields,callback) {
    await connection.query('UPDATE produk_intelijen SET nama_produk_intelijen = ? WHERE id_produk_intelijen = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM produk_intelijen WHERE id_produk_intelijen = ?',fields,callback);
};