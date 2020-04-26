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


exports.getTotal = async function (fields,callback,role=2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM data_produk_intelijen INNER JOIN user on data_produk_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '
    if(role == 1){
        await connection.query(baseQ,fields, callback);
    }else if(role == 2){
        await connection.query(baseQ + ' WHERE user.id_user = ? ',fields, callback);
    }
};
exports.fetchData = async function (fields,callback,role=2,start=0,pagelength=10,search='',order={}) {
    const baseQ = 'SELECT id_data_produk_intelijen,nama_satwil,nama_subdit,nama_produk_intelijen,tahun_data_produk_intelijen,'+
                    'bulan_data_produk_intelijen,jumlah_data_produk_intelijen FROM data_produk_intelijen '+ 
                    'INNER JOIN produk_intelijen on data_produk_intelijen.jenis_produk_intelijen = produk_intelijen.id_produk_intelijen '+
                    'INNER JOIN user on data_produk_intelijen.id_user = user.id_user '+
                    'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '+
                    'INNER JOIN subdit ON subdit.id_subdit = data_produk_intelijen.id_subdit '
    const searchQ = "( jumlah_data_produk_intelijen LIKE '%"+search+
                        "%' OR bulan_data_produk_intelijen LIKE '%"+search+
                        "%' OR nama_satwil LIKE '%"+search+
                        "%' OR nama_subdit LIKE '%"+search+
                        "%' OR nama_produk_intelijen LIKE '%"+search+
                        "%' OR tahun_data_produk_intelijen LIKE '%"+search+"%' )";
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
                orderQ += " nama_produk_intelijen "
                break;
            case 4:
                orderQ += " tahun_data_produk_intelijen "
                break;
            case 5:
                orderQ += " bulan_data_produk_intelijen "
                break;
            case 6:
                orderQ += " jumlah_data_produk_intelijen "
                break;
            default:
                orderQ += " id_data_produk_intelijen " 
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