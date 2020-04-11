"use strict";

var connection = require('../connection');
 
exports.getAll = async function (fields,callback) {
    if(fields[0] == 1){
        await connection.query('SELECT * FROM pengiriman_produk_intelijen INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = pengiriman_produk_intelijen.jenis_pengiriman_produk_intelijen INNER JOIN user on pengiriman_produk_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ',fields, callback);
    }else{
        await connection.query('SELECT * FROM pengiriman_produk_intelijen INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = pengiriman_produk_intelijen.jenis_pengiriman_produk_intelijen INNER JOIN user on pengiriman_produk_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil WHERE user.id_user = ? ',fields, callback);
    }
    
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM pengiriman_produk_intelijen INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = pengiriman_produk_intelijen.jenis_pengiriman_produk_intelijen INNER JOIN user on pengiriman_produk_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE pengiriman_produk_intelijen.id_pengiriman_produk_intelijen = ? AND user.id_user = ? ',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO  pengiriman_produk_intelijen (id_user,tanggal_pengiriman_produk_intelijen,perihal_pengiriman_produk_intelijen,jenis_pengiriman_produk_intelijen,nomor_produk_keluar) values (?,?,?,?,?)',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  pengiriman_produk_intelijen SET id_user = ? , tahun_penggunaan_alsus = ? , jumlah_penggunaan_alsus = ? , attachment_penggunaan_alsus = ?  WHERE id_pengiriman_produk_intelijen = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM pengiriman_produk_intelijen WHERE id_pengiriman_produk_intelijen = ?',fields,callback);
};