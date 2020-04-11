"use strict";

var connection = require('../connection');
 
exports.getAll = async function (fields,callback) {
    if(fields[0] == 1){
        await connection.query('SELECT id_potensi_gangguan,nama_satwil,jumlah_potensi_gangguan,tahun_potensi_gangguan FROM potensi_gangguan '+ 
                            'INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ',fields, callback);
    }else{
        await connection.query('SELECT id_potensi_gangguan,nama_satwil,jumlah_potensi_gangguan,tahun_potensi_gangguan FROM potensi_gangguan '+ 
                            'INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil WHERE user.id_user = ? ',fields, callback);

    }
    
};
exports.getData = async function(fields,callback) {
    
    await connection.query('SELECT * FROM potensi_gangguan INNER JOIN user on potensi_gangguan.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE id_potensi_gangguan = ? AND user.id_user = ? ',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO  potensi_gangguan (id_user,jumlah_potensi_gangguan,tahun_potensi_gangguan,attachment_potensi_gangguan) values (?,?,?,?)',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  potensi_gangguan SET id_user = ?,jumlah_potensi_gangguan = ?,tahun_potensi_gangguan = ? ,attachment_potensi_gangguan = ? WHERE id_potensi_gangguan = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM potensi_gangguan WHERE id_potensi_gangguan = ?',fields,callback);
};

exports.total= async function (callback) {
    await connection.query('SELECT SUM(jumlah_potensi_gangguan) as total FROM potensi_gangguan '+ 
                            'INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ', callback);
};
exports.totalpersatwil = async function (callback) {
    await connection.query('SELECT SUM(jumlah_potensi_gangguan) as total,nama_satwil FROM potensi_gangguan '+ 
                            'INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                            ' GROUP BY nama_satwil ', callback);
};
exports.getTotalsend = async function (callback) {
    await connection.query('SELECT COUNT(nama_satwil) as total FROM potensi_gangguan '+ 
    'INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
    'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ', callback);
};