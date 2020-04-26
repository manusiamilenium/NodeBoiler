"use strict";

var connection = require('../connection');
 
exports.getAll = async function (fields,callback) {
    if(fields[0] == 1){
        await connection.query('SELECT * FROM pengiriman_produk_intelijen INNER JOIN produk_intelijen on produk_intelijen.id_produk_intelijen = pengiriman_produk_intelijen.jenis_pengiriman_produk_intelijen INNER JOIN user on pengiriman_produk_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ',fields, callback);
    }else{
        await connection.query('SELECT * FROM pengiriman_produk_intelijen INNER JOIN produk_intelijen on produk_intelijen.id_produk_intelijen = pengiriman_produk_intelijen.jenis_pengiriman_produk_intelijen INNER JOIN user on pengiriman_produk_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil WHERE user.id_user = ? ',fields, callback);
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

exports.getTotal = async function (fields,callback,role=2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM pengiriman_produk_intelijen INNER JOIN user on pengiriman_produk_intelijen.id_user = user.id_user '
    if(role == 1){
        await connection.query(baseQ,fields, callback);
    }else if(role == 2){
        await connection.query(baseQ + ' AND user.id_user = ? ',fields, callback);
    }
};

exports.fetchData = async function (fields,callback,role=2,start=0,pagelength=10,search='',order={}) {
    const baseQ = ' SELECT id_pengiriman_produk_intelijen,nama_satwil,nomor_produk_keluar,tanggal_pengiriman_produk_intelijen,nama_produk_intelijen,perihal_pengiriman_produk_intelijen FROM pengiriman_produk_intelijen '+ 
                    ' INNER JOIN produk_intelijen on produk_intelijen.id_produk_intelijen = pengiriman_produk_intelijen.jenis_pengiriman_produk_intelijen '+
                    ' INNER JOIN user on pengiriman_produk_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil'

    const searchQ = "( nama_satwil LIKE '%"+search+
                        "%' OR nomor_produk_keluar LIKE '%"+search+
                        "%' OR tanggal_pengiriman_produk_intelijen LIKE '%"+search+
                        "%' OR nama_produk_intelijen LIKE '%"+search+
                        "%' OR perihal_pengiriman_produk_intelijen LIKE '%"+search+"%' )"; 
    const pageString = ' LIMIT '+pagelength+' OFFSET '+start+' ';
    let orderQ = ' ';
    if(order){
        orderQ += " ORDER BY "
        switch (order.column) {
            case 1:
                orderQ += " nama_satwil "
                break;
            case 2:
                orderQ += " nomor_produk_keluar "
                break;
            case 3:
                orderQ += " tanggal_pengiriman_produk_intelijen "
                break;
            case 4:
                orderQ += " nama_produk_intelijen "
                break;
            case 5:
                orderQ += " perihal_pengiriman_produk_intelijen "
                break; 
            default:
                orderQ += " id_pengiriman_produk_intelijen " 
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