"use strict";

var connection = require('../connection');

exports.getAll = async function (callback) {
    await connection.query('SELECT * FROM jenis_kegiatan_intelijen', callback);
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM jenis_kegiatan_intelijen where id_jenis = ?',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO  jenis_kegiatan_intelijen (nama_jenis) values (?)',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  jenis_kegiatan_intelijen SET nama_jenis = ? WHERE id_jenis = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM jenis_kegiatan_intelijen WHERE id_jenis = ?',fields,callback);
};