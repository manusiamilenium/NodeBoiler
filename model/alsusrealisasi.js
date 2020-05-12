"use strict";

var connection = require('../connection');

exports.getAll = async function (fields,callback) {
    if(fields[0] == 1){
        await connection.query('SELECT * FROM realisasi_alsus INNER JOIN user on realisasi_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ',fields, callback);
    }else{
        await connection.query('SELECT * FROM realisasi_alsus INNER JOIN user on realisasi_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE user.id_user = ? ',fields, callback);
    }
};
exports.getData = async function(fields,callback) {
    await connection.query('SELECT * FROM realisasi_alsus INNER JOIN user on realisasi_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE realisasi_alsus.id_realisasi_alsus = ? AND WHERE user.id_user = ? ',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO realisasi_alsus (id_user, tahun_realisasi_alsus, bulan_realisasi_alsus, jumlah_realisasi_alsus,uraian_realisasi_alsus) VALUES (?,?,?,?,?);',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  realisasi_alsus SET id_user = ? , tahun_realisasi_alsus = ? , bulan_realisasi_alsus = ? , jumlah_realisasi_alsus = ? ,uraian_realisasi_alsus = ? ',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM realisasi_alsus WHERE id_realisasi_alsus = ?',fields,callback);
};

exports.getTotal = async function (fields,callback,role=2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM realisasi_alsus INNER JOIN user on realisasi_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '
    if(role == 1){
        await connection.query(baseQ,fields, callback);
    }else if(role == 2){
        await connection.query(baseQ + ' WHERE user.id_user = ? ',fields, callback);
    }
};
exports.fetchData = async function (fields,callback,role=2,start=0,pagelength=10,search='',order={}) {
    const baseQ = 'SELECT id_realisasi_alsus,satwil.nama_satwil,tahun_realisasi_alsus,bulan_realisasi_alsus,jumlah_realisasi_alsus,uraian_realisasi_alsus  FROM realisasi_alsus INNER JOIN user on realisasi_alsus.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '
    const searchQ = "( nama_satwil LIKE '%" + search +
        "%' OR tahun_realisasi_alsus LIKE '%" + search +
        "%' OR bulan_realisasi_alsus LIKE '%" + search +
        "%' OR jumlah_realisasi_alsus LIKE '%" + search + 
        "%' OR uraian_realisasi_alsus LIKE '%" + search + "%' )";
    const pageString = ' LIMIT ' + pagelength + ' OFFSET ' + start + ' ';
    let orderQ = ' ';
    if (order) {
        orderQ += " ORDER BY "
        switch (order.column) {
            case 1:
                orderQ += " nama_satwil "
                break;
            case 2:
                orderQ += " tahun_realisasi_alsus "
                break;
            case 3:
                orderQ += " bulan_realisasi_alsus "
                break;
            case 4:
                orderQ += " jumlah_realisasi_alsus "
                break;
            case 5:
                orderQ += " uraian_realisasi_alsus "
                break;

            default:
                orderQ += " id_realisasi_alsus "
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
