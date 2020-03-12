"use strict";

var connection = require('../connection');

exports.getAll = async function (callback) {
    await connection.query('SELECT * FROM penggunaan_alsus INNER JOIN user on penggunaan_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  ', callback);
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM penggunaan_alsus INNER JOIN user on penggunaan_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE penggunaan_alsus.id_penggunaan_alsus = ?',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO penggunaan_alsus (id_user, tahun_penggunaan_alsus, jumlah_penggunaan_alsus, attachment_penggunaan_alsus) VALUES (?,?,?,NULL);',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  penggunaan_alsus SET id_user = ? , tahun_penggunaan_alsus = ? , jumlah_penggunaan_alsus = ? , attachment_penggunaan_alsus = ?  WHERE id_penggunaan_alsus = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM penggunaan_alsus WHERE id_penggunaan_alsus = ?',fields,callback);
};