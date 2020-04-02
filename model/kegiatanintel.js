"use strict";

var connection = require('../connection');

exports.getAll = async function (fields,callback) {
    await connection.query('SELECT * FROM kegiatan_intelijen INNER JOIN jenis_kegiatan_intelijen ON kegiatan_intelijen.jenis_kegiatan_intelijen = jenis_kegiatan_intelijen.id_jenis INNER JOIN user on kegiatan_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE user.id_user = ? ',fields, callback);
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM kegiatan_intelijen INNER JOIN jenis_kegiatan_intelijen ON kegiatan_intelijen.jenis_kegiatan_intelijen = jenis_kegiatan_intelijen.id_jenis INNER JOIN user on kegiatan_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE kegiatan_intelijen.id_kegiatan_intelijen = ? AND  user.id_user = ? ',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO kegiatan_intelijen (id_user, tahun_kegiatan_intelijen, bulan_kegiatan_intelijen, jenis_kegiatan_intelijen, jumlah_kegiatan_intelijen, reduksi_kegiatan_intelijen, uraian_kegiatan_intelijen) VALUES (?,?,?,?,?,?,?);',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  jenis_kegiatan_intelijen SET id_user = ? , tahun_kegiatan_intelijen = ? , bulan_kegiatan_intelijen = ? , jenis_kegiatan_intelijen = ? , jumlah_kegiatan_intelijen = ? , reduksi_kegiatan_intelijen = ? , uraian_kegiatan_intelijen = ? WHERE id_kegiatan_intelijen = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM kegiatan_intelijen WHERE id_kegiatan_intelijen = ?',fields,callback);
};