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

exports.getTotal = async function (fields,callback,role=2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM kejadian_menonjol INNER JOIN user on kejadian_menonjol.id_user = user.id_user '
    let Q = baseQ;
    
    if(role == 2){
        Q = baseQ + ' AND user.id_user = ? ';
    }
    
    await connection.query(Q,fields, callback);
};
exports.fetchData = async function (fields,callback,role=2,start=0,pagelength=10,search='',order={}) {
    const baseQ = 'SELECT id_kejadian_menonjol,nama_satwil,nama_subdit,tahun_kejadian_menonjol,'+
                    'bulan_kejadian_menonjol,jumlah_kejadian_menonjol,uraian_kejadian_menonjol FROM kejadian_menonjol '+ 
                    'INNER JOIN user on kejadian_menonjol.id_user = user.id_user '+
                    'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                    'INNER JOIN subdit ON subdit.id_subdit = kejadian_menonjol.id_subdit'

    const searchQ = "( nama_satwil LIKE '%"+search+
                        "%' OR nama_subdit LIKE '%"+search+ 
                        "%' OR tahun_kejadian_menonjol LIKE '%"+search+ 
                        "%' OR bulan_kejadian_menonjol LIKE '%"+search+ 
                        "%' OR jumlah_kejadian_menonjol LIKE '%"+search+  
                        "%' OR uraian_kejadian_menonjol LIKE '%"+search+"%' )"; 
    const pageString = ' LIMIT '+pagelength+' OFFSET '+start+' ';
    let orderQ = ' ';
    if(order){
        orderQ += " ORDER BY "
        switch (order.column) {
            case 1:
                orderQ += " nama_satwil "
                break;
            case 2:
                orderQ += " nama_subdit "
                break;
            case 3:
                orderQ += " tahun_kejadian_menonjol "
                break;
            case 4:
                orderQ += " bulan_kejadian_menonjol "
                break;
            case 5:
                orderQ += " jumlah_kejadian_menonjol "
                break;
            case 6:
                orderQ += " uraian_kejadian_menonjol "
                break;
            default:
                orderQ += " id_kejadian_menonjol " 
                break;
        }
        orderQ += " "+order.dir+" "
    }
    let query = baseQ;
    if(role == 1){
        query += " WHERE " + searchQ + orderQ + pageString;
    }else if(role == 2){
        query += " WHERE user.id_user = ? AND " + searchQ + orderQ + pageString;
    }
    console.log(fields);
   //console.log(query);
    await connection.query(query,fields, callback);
};