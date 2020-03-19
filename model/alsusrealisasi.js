"use strict";

var connection = require('../connection');

exports.getAll = async function (fields,callback) {
    await connection.query('SELECT * FROM realisasi_alsus INNER JOIN user on realisasi_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE user.id_user = ? ',fields, callback);
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM realisasi_alsus INNER JOIN user on realisasi_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE realisasi_alsus.id_realisasi_alsus = ? AND WHERE user.id_user = ? ',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO realisasi_alsus (id_user, tahun_realisasi_alsus, bulan_realisasi_alsus, jumlah_realisasi_alsus,uraian_realisasi_alsus) VALUES (?,?,?,?,?);',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  realisasi_alsus SET id_user = ? , tahun_realisasi_alsus = ? , bulan_realisasi_alsus = ? , jumlah_realisasi_alsus = ? ,uraian_realisasi_alsus = ? ',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM realisasi_alsus WHERE id_realisasi_alsus = ?',fields,callback);
};