"use strict";

var connection = require('../connection');

exports.getAll = async function (fields,callback) {
    if(fields[0] == 1){
        await connection.query('SELECT id_kejadian_menonjol,nama_satwil,nama_subdit,tahun_kejadian_menonjol,'+
                            'bulan_kejadian_menonjol,jumlah_kejadian_menonjol,uraian_kejadian_menonjol FROM kejadian_menonjol '+ 
                            'INNER JOIN user on kejadian_menonjol.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                            'INNER JOIN subdit ON subdit.id_subdit = kejadian_menonjol.id_subdit',fields, callback);

    }else{
        await connection.query('SELECT id_kejadian_menonjol,nama_satwil,nama_subdit,tahun_kejadian_menonjol,'+
                            'bulan_kejadian_menonjol,jumlah_kejadian_menonjol,uraian_kejadian_menonjol FROM kejadian_menonjol '+ 
                            'INNER JOIN user on kejadian_menonjol.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                            'INNER JOIN subdit ON subdit.id_subdit = kejadian_menonjol.id_subdit WHERE user.id_user = ? ',fields, callback);
    }
    
};
exports.getData = async function(fields,callback) {
    
    await connection.query('SELECT id_kejadian_menonjol,nama_satwil,nama_subdit,tahun_kejadian_menonjol,'+
                                    'bulan_kejadian_menonjol,jumlah_kejadian_menonjol,uraian_kejadian_menonjol FROM kejadian_menonjol '+  
                            'INNER JOIN user on kejadian_menonjol.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                            'INNER JOIN subdit ON subdit.id_subdit = kejadian_menonjol.id_subdit WHERE id_kejadian_menonjol = ? AND user.id_user = ? ',fields, callback);
};
exports.total = async function(callback) {
    
    await connection.query('SELECT SUM(jumlah_kejadian_menonjol) as total FROM kejadian_menonjol '+  
                            'INNER JOIN user on kejadian_menonjol.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                            'INNER JOIN subdit ON subdit.id_subdit = kejadian_menonjol.id_subdit ',callback);
};
exports.totalpersatwil = async function (callback) {
    await connection.query('SELECT SUM(jumlah_kejadian_menonjol) as total,nama_satwil FROM kejadian_menonjol '+ 
                            'INNER JOIN user on kejadian_menonjol.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                            'INNER JOIN subdit ON subdit.id_subdit = kejadian_menonjol.id_subdit GROUP BY nama_satwil ', callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO  kejadian_menonjol ( '
                            +'id_user,id_subdit,tahun_kejadian_menonjol,bulan_kejadian_menonjol,jumlah_kejadian_menonjol, '+
                            'uraian_kejadian_menonjol) values (?,?,?,?,?,?)',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  kejadian_menonjol SET id_user = ?,id_subdit = ?,tahun_kejadian_menonjol = ?,bulan_kejadian_menonjol = ?,'+
                            'jumlah_kejadian_menonjol = ?, uraian_kejadian_menonjol = ? WHERE id_kejadian_menonjol = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM kejadian_menonjol WHERE id_kejadian_menonjol = ?',fields,callback);
};