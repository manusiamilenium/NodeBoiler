"use strict";

var connection = require('../connection');
 
exports.getAll = async function (fields,callback) {
    if(fields[0] == 1){
        await connection.query('SELECT id_potensi_gangguan,nama_satwil,jumlah_potensi_gangguan,tahun_potensi_gangguan FROM potensi_gangguan '+ 
                            'INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ',fields, callback);
    }else{
        await connection.query('SELECT id_potensi_gangguan,nama_satwil,jumlah_potensi_gangguan,tahun_potensi_gangguan FROM potensi_gangguan '+ 
                            ' INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
                            ' INNER JOIN satwil ON satwil.id_satwil = user.id_satwil WHERE user.id_user = ? ',fields, callback);

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

exports.getTotal = async function (fields,callback,role=2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM potensi_gangguan INNER JOIN user on potensi_gangguan.id_user = user.id_user '
    let Q = baseQ;
    
    if(role == 2){
        Q = baseQ + ' AND user.id_user = ? ';
    }
    
    await connection.query(Q,fields, callback);
};
exports.fetchData = async function (fields,callback,role=2,start=0,pagelength=10,search='',order={}) {
    const baseQ = 'SELECT id_potensi_gangguan,nama_satwil,tahun_potensi_gangguan,jumlah_potensi_gangguan FROM potensi_gangguan '+ 
                    'INNER JOIN user on potensi_gangguan.id_user = user.id_user '+
                    'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '

    const searchQ = "( nama_satwil LIKE '%"+search+
                        "%' OR jumlah_potensi_gangguan LIKE '%"+search+ 
                        "%' OR tahun_potensi_gangguan LIKE '%"+search+"%' )"; 
    const pageString = ' LIMIT '+pagelength+' OFFSET '+start+' ';
    let orderQ = ' ';
    if(order){
        orderQ += " ORDER BY "
        switch (order.column) {
            case 1:
                orderQ += " nama_satwil "
                break;
            case 3:
                orderQ += " jumlah_potensi_gangguan "
                break;
            case 2:
                orderQ += " tahun_potensi_gangguan "
                break;
            default:
                orderQ += " id_potensi_gangguan " 
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
    //console.log(fields);
   //console.log(query);
    await connection.query(query,fields, callback);
};