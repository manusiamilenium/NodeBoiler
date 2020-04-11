"use strict";

var connection = require('../connection');

exports.getAll = async function (fields,callback) {
    if(fields[0] == 1){
        await connection.query('SELECT id_data_produk_intelijen,nama_satwil,nama_subdit,nama_produk_intelijen,tahun_data_produk_intelijen,'+
        'bulan_data_produk_intelijen,jumlah_data_produk_intelijen FROM data_produk_intelijen '+ 
        'INNER JOIN produk_intelijen on data_produk_intelijen.jenis_produk_intelijen = produk_intelijen.id_produk_intelijen '+
        'INNER JOIN user on data_produk_intelijen.id_user = user.id_user '+
        'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
        'INNER JOIN subdit ON subdit.id_subdit = data_produk_intelijen.id_subdit ',fields, callback);
    }else{
        await connection.query('SELECT id_data_produk_intelijen,nama_satwil,nama_subdit,nama_produk_intelijen,tahun_data_produk_intelijen,'+
        'bulan_data_produk_intelijen,jumlah_data_produk_intelijen FROM data_produk_intelijen '+ 
        'INNER JOIN produk_intelijen on data_produk_intelijen.jenis_produk_intelijen = produk_intelijen.id_produk_intelijen '+
        'INNER JOIN user on data_produk_intelijen.id_user = user.id_user '+
        'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
        'INNER JOIN subdit ON subdit.id_subdit = data_produk_intelijen.id_subdit WHERE user.id_user = ? ',fields, callback);
    }
    
};
exports.getData = async function(fields,callback) {
    
    await connection.query('SELECT id_data_produk_intelijen,nama_subdit,nama_produk_intelijen,tahun_data_produk_intelijen,'+
                            'bulan_data_produk_intelijen,jumlah_data_produk_intelijen FROM data_produk_intelijen '+ 
                            'INNER JOIN produk_intelijen on data_produk_intelijen.jenis_produk_intelijen = produk_intelijen.id_produk_intelijen '+
                            'INNER JOIN user on data_produk_intelijen.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                            'INNER JOIN subdit ON subdit.id_subdit = data_produk_intelijen.id_subdit WHERE id_data_produk_intelijen = ? AND user.id_user = ? ',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO  data_produk_intelijen ( '
                            +'id_user,id_subdit,tahun_data_produk_intelijen,bulan_data_produk_intelijen, '+
                            'jenis_produk_intelijen,jumlah_data_produk_intelijen) values (?,?,?,?,?,?)',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  data_produk_intelijen SET id_user = ?,id_subdit = ?,tahun_data_produk_intelijen = ?,bulan_data_produk_intelijen = ?,'+
                            ' jenis_produk_intelijen = ?,jumlah_data_produk_intelijen = ? WHERE id_data_produk_intelijen = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM data_produk_intelijen WHERE id_data_produk_intelijen = ?',fields,callback);
};