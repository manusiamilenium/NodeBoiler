"use strict";

var connection = require('../connection');

exports.getAll = async function (callback) {
    await connection.query('SELECT * FROM ref_produk_keluar INNER JOIN produk_keluar ON ref_produk_keluar.id_produk_keluar = produk_keluar.id_produk_keluar INNER JOIN user on produk_keluar.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  ', callback);
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT *  FROM ref_produk_keluar INNER JOIN produk_keluar ON ref_produk_keluar.id_produk_keluar = produk_keluar.id_produk_keluar INNER JOIN user on produk_keluar.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE ref_produk_keluar.id_ref_produk_keluar = ?',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO `ref_produk_keluar` (`id_produk_keluar`, `nomor_ref_produk_keluar`, `jenis_ref_produk_keluar`, `attachment_ref_produk_keluar`) VALUES (?,?,?,?);',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  ref_produk_keluar SET id_produk_keluar = ? , nomor_ref_produk_keluar = ? , jenis_ref_produk_keluar = ? , attachment_ref_produk_keluar = ? WHERE id_ref_produk_keluar = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM ref_produk_keluar WHERE id_ref_produk_keluar = ?',fields,callback);
};
exports.deleteAll  = async function(fields,callback) {
    await connection.query('DELETE FROM ref_produk_keluar WHERE id_produk_keluar = ?',fields,callback);
};