"use strict";

var connection = require('../connection');
 
exports.getAll = async function (callback) {
    await connection.query('SELECT id_index_kepuasan,nama_satwil,index_kepuasan.value_index_kepuasan FROM index_kepuasan '+ 
                            'INNER JOIN user on index_kepuasan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ', callback);
};

exports.getData = async function(fields,callback) {
    
    await connection.query('SELECT id_index_kepuasan,nama_satwil,index_kepuasan.value_index_kepuasan,attachment_index_kepuasan FROM index_kepuasan '+ 
                            'INNER JOIN user on index_kepuasan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil where id_index_kepuasan = ?',fields, callback);
};
exports.add= async function(fields,callback) {
    await connection.query('INSERT INTO  index_kepuasan (id_user,value_index_kepuasan,attachment_index_kepuasan) values (?,?,?)',fields,callback);
};
exports.edit = async function(fields,callback) {
    await connection.query('UPDATE  index_kepuasan SET id_user = ?,value_index_kepuasan = ?,attachment_index_kepuasan = ? WHERE id_index_kepuasan = ?',fields,callback);
};
exports.delete  = async function(fields,callback) {
    await connection.query('DELETE FROM index_kepuasan WHERE id_index_kepuasan = ?',fields,callback);
};
exports.getAllBest = async function (callback) {
    await connection.query('SELECT id_index_kepuasan,nama_satwil,index_kepuasan.value_index_kepuasan FROM index_kepuasan '+ 
                            'INNER JOIN user on index_kepuasan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil ORDER BY  index_kepuasan.value_index_kepuasan DESC', callback);
};

exports.getIndexes = async function (callback) {
    await connection.query('SELECT AVG(index_kepuasan.value_index_kepuasan) as indek FROM index_kepuasan '+ 
                            'INNER JOIN user on index_kepuasan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil', callback);
};
exports.getTotalsend = async function (callback) {
    await connection.query('SELECT COUNT(nama_satwil) as totalsend FROM index_kepuasan '+ 
                            'INNER JOIN user on index_kepuasan.id_user = user.id_user '+
                            'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil GROUP BY nama_satwil', callback);
};
