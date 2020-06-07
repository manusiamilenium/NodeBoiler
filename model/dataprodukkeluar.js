"use strict";

var connection = require('../connection');

exports.getAll = async function (fields,callback) {
    if(fields[1] == 1){
        await connection.query('SELECT id_produk_keluar,nama_satwil,nama_jenis_produk_keluar,tanggal_produk_keluar,nomor_produk_keluar,kepada_produk_keluar,perihal_produk_keluar,produk_keluar.id_jenis_produk_keluar 	 FROM produk_keluar '+ 
                            'INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = produk_keluar.id_jenis_produk_keluar '+
                            'INNER JOIN user on produk_keluar.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil where produk_keluar.id_jenis_produk_keluar = ?  ',fields, callback);
    }else{
        await connection.query('SELECT id_produk_keluar,nama_satwil,nama_jenis_produk_keluar,tanggal_produk_keluar,nomor_produk_keluar,kepada_produk_keluar,perihal_produk_keluar,produk_keluar.id_jenis_produk_keluar 	 FROM produk_keluar '+ 
                            'INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = produk_keluar.id_jenis_produk_keluar '+
                            'INNER JOIN user on produk_keluar.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil where produk_keluar.id_jenis_produk_keluar = ? AND  user.id_user = ? ',fields, callback);
    }
    
};

exports.getData = async function(fields,callback) {
    
    await connection.query('SELECT id_produk_keluar,nama_satwil,nama_jenis_produk_keluar,tanggal_produk_keluar,nomor_produk_keluar ,produk_keluar.id_jenis_produk_keluar FROM produk_keluar '+ 
                            'INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = produk_keluar.id_jenis_produk_keluar '+
                            'INNER JOIN user on produk_keluar.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil where id_produk_keluar = ? AND  user.id_user = ? ',fields, callback);
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

exports.getTotal = async function (fields,callback,role=2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM produk_keluar INNER JOIN user on produk_keluar.id_user = user.id_user WHERE produk_keluar.id_jenis_produk_keluar = ? '
    if(role == 1){
        await connection.query(baseQ,fields, callback);
    }else if(role == 2){
        await connection.query(baseQ + ' AND user.id_user = ? ',fields, callback);
    }
};
exports.fetchData = async function (fields,callback,role=2,start=0,pagelength=10,search='',order={}) {
    const baseQ = 'SELECT id_produk_keluar,nama_satwil,nomor_produk_keluar,tanggal_produk_keluar,kepada_produk_keluar,perihal_produk_keluar,produk_keluar.id_jenis_produk_keluar 	 FROM produk_keluar '+ 
                    'INNER JOIN jenis_produk_keluar on jenis_produk_keluar.id_jenis_produk_keluar = produk_keluar.id_jenis_produk_keluar '+
                    'INNER JOIN user on produk_keluar.id_user = user.id_user '+
                    'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil WHERE produk_keluar.id_jenis_produk_keluar = ?'

    const searchQ = "( nama_satwil LIKE '%"+search+
                        "%' OR nama_jenis_produk_keluar LIKE '%"+search+
                        "%' OR tanggal_produk_keluar LIKE '%"+search+
                        "%' OR nomor_produk_keluar LIKE '%"+search+
                        "%' OR kepada_produk_keluar LIKE '%"+search+
                        "%' OR perihal_produk_keluar LIKE '%"+search+"%' )";
    const pageString = ' LIMIT '+pagelength+' OFFSET '+start+' ';
    let orderQ = ' ';
    if(order){
        orderQ += " ORDER BY "
        switch (order.column) {
            case 1:
                orderQ += " nama_satwil "
                break;
            case 2:
                orderQ += " nama_jenis_produk_keluar "
                break;
            case 3:
                orderQ += " tanggal_produk_keluar "
                break;
            case 4:
                orderQ += " nomor_produk_keluar "
                break;
            case 5:
                orderQ += " kepada_produk_keluar "
                break;
            case 6:
                orderQ += " perihal_produk_keluar "
                break;
            default:
                orderQ += " id_produk_keluar " 
                break;
        }
        orderQ += " "+order.dir+" "
    }
    let query = baseQ;
    if(role == 1){
        query += " AND " + searchQ + orderQ + pageString;
    }else if(role == 2){
        query += " AND user.id_user = ? AND " + searchQ + orderQ + pageString;
    }
     
    await connection.query(query,fields, callback);
};