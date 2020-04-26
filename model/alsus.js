"use strict";

var connection = require('../connection');
 
exports.getAll = async function (fields,callback,role=2) {
    const baseQ = 'SELECT * FROM penggunaan_alsus INNER JOIN user on penggunaan_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '
    if(role == 1){
        await connection.query(baseQ,fields, callback);
    }else if(role == 2){
        await connection.query(baseQ + ' WHERE user.id_user = ? ',fields, callback);
    }
};
exports.getData = async function(fields,callback) {
    if(fields[1] == 1){
        await connection.query('SELECT * FROM penggunaan_alsus INNER JOIN user on penggunaan_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE penggunaan_alsus.id_penggunaan_alsus = ?',fields, callback);
    }else{
        await connection.query('SELECT * FROM penggunaan_alsus INNER JOIN user on penggunaan_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE penggunaan_alsus.id_penggunaan_alsus = ? AND user.id_user = ? ',fields, callback);
    }
    
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO penggunaan_alsus (id_user, tahun_penggunaan_alsus, jumlah_penggunaan_alsus, attachment_penggunaan_alsus) VALUES (?,?,?,?);',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  penggunaan_alsus SET id_user = ? , tahun_penggunaan_alsus = ? , jumlah_penggunaan_alsus = ? , attachment_penggunaan_alsus = ?  WHERE id_penggunaan_alsus = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM penggunaan_alsus WHERE id_penggunaan_alsus = ?',fields,callback);
};


exports.getTotal = async function (fields,callback,role=2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM penggunaan_alsus INNER JOIN user on penggunaan_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '
    if(role == 1){
        await connection.query(baseQ,fields, callback);
    }else if(role == 2){
        await connection.query(baseQ + ' WHERE user.id_user = ? ',fields, callback);
    }
};
exports.fetchData = async function (fields,callback,role=2,start=0,pagelength=10,search='',order={}) {
    const baseQ = 'SELECT id_penggunaan_alsus,satwil.nama_satwil,tahun_penggunaan_alsus,jumlah_penggunaan_alsus  FROM penggunaan_alsus INNER JOIN user on penggunaan_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '
    const searchQ = "( nama_satwil LIKE '%"+search+"%' OR tahun_penggunaan_alsus LIKE '%"+search+"%' OR jumlah_penggunaan_alsus LIKE '%"+search+"%' )";
    const pageString = ' LIMIT '+pagelength+' OFFSET '+start+' ';
    let orderQ = ' ';
    if(order){
        orderQ += " ORDER BY "
        switch (order.column) {
            case 1:
                orderQ += " nama_satwil "
                break;
            case 2:
                orderQ += " tahun_penggunaan_alsus "
                break;
            case 3:
                orderQ += " jumlah_penggunaan_alsus "
                break;
        
            default:
                orderQ += " id_penggunaan_alsus "
                break;
        }
        orderQ += " "+order.dir+" "
    }
    if(role == 1){
        await connection.query(baseQ + " WHERE " + searchQ + orderQ + pageString,fields, callback);
    }else if(role == 2){
        await connection.query(baseQ + ' WHERE user.id_user = ? AND ' + searchQ + orderQ + pageString,fields, callback);
    }
};