"use strict";

var connection = require('../connection');

exports.getAll = async function (callback) {
    await connection.query('SELECT * FROM jenis_produk_keluar', callback);
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM jenis_produk_keluar where id_jenis_produk_keluar = ?',fields, callback);
};
exports.add = async function(fields,callback) {
    await connection.query('INSERT INTO jenis_produk_keluar (nama_jenis_produk_keluar) values (?)',fields,callback);
};
exports.edit  = async function(fields,callback) {
    await connection.query('UPDATE jenis_produk_keluar SET nama_jenis_produk_keluar = ? WHERE id_jenis_produk_keluar = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM jenis_produk_keluar WHERE id_jenis_produk_keluar = ?',fields,callback);
};