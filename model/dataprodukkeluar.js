"use strict";

var connection = require('../connection');

exports.getAll = async function (fields,callback) {
    await connection.query('SELECT id_produk_keluar,nama_satwil,nama_jenis_produk_keluar,tanggal_produk_keluar,nomor_produk_keluar,kepada_produk_keluar,perihal_produk_keluar,produk_keluar.id_jenis_produk_keluar 	 FROM produk_keluar '+ 
                            'INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = produk_keluar.id_jenis_produk_keluar '+
                            'INNER JOIN user on produk_keluar.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil where produk_keluar.id_jenis_produk_keluar = ? ; ',fields, callback);
};

exports.getData = async function(fields,callback) {
    
    await connection.query('SELECT id_produk_keluar,nama_satwil,nama_jenis_produk_keluar,tanggal_produk_keluar,nomor_produk_keluar ,produk_keluar.id_jenis_produk_keluar FROM produk_keluar '+ 
                            'INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = produk_keluar.id_jenis_produk_keluar '+
                            'INNER JOIN user on produk_keluar.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil where id_produk_keluar = ?',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO  produk_keluar (id_user,id_jenis_produk_keluar,nomor_produk_keluar,tanggal_produk_keluar,kepada_produk_keluar,satker_produk_keluar,perihal_produk_keluar) values (?,?,?,?,?,?,?)',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  produk_keluar SET id_user = ? ,id_jenis_produk_keluar = ? ,nomor_produk_keluar = ? ,tanggal_produk_keluar = ? ,kepada_produk_keluar = ? ,satker_produk_keluar = ? ,perihal_produk_keluar = ? WHERE id_produk_keluar = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM produk_keluar WHERE id_produk_keluar = ?',fields,callback);
};
exports.addpprodukkeluar= async function(fields,callback) {
    await connection.query('INSERT INTO  pengiriman_produk_intelijen (id_user,tanggal_pengiriman_produk_intelijen,perihal_pengiriman_produk_intelijen,jenis_pengiriman_produk_intelijen,nomor_produk_keluar) values (?,?,?,?,?)',fields,callback);
};
  