"use strict";

var connection = require('../connection');
var helper = require('./helper');
exports.getAll = async function (fields, onSuccess, onError) {
    if (fields[0] == 1) {
        await connection.query('SELECT * FROM kegiatan_intelijen ' +
            ' INNER JOIN jenis_kegiatan_intelijen ON kegiatan_intelijen.jenis_kegiatan_intelijen = jenis_kegiatan_intelijen.id_jenis ' +
            ' INNER JOIN user on kegiatan_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  ', fields, (error, rows, fields) => {
                helper.handleResult(error, rows, fields, onSuccess, onError)
            });
    } else {
        await connection.query('SELECT * FROM kegiatan_intelijen ' +
            ' INNER JOIN jenis_kegiatan_intelijen ON kegiatan_intelijen.jenis_kegiatan_intelijen = jenis_kegiatan_intelijen.id_jenis ' +
            ' INNER JOIN user on kegiatan_intelijen.id_user = user.id_user INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  WHERE user.id_user = ? ', fields, (error, rows, fields) => {
                helper.handleResult(error, rows, fields, onSuccess, onError)
            });
    }

};
exports.getData = async function (fields, onSuccess, onError) {
    await connection.query('SELECT * FROM kegiatan_intelijen ' +
        ' INNER JOIN jenis_kegiatan_intelijen ON kegiatan_intelijen.jenis_kegiatan_intelijen = jenis_kegiatan_intelijen.id_jenis ' +
        ' INNER JOIN user on kegiatan_intelijen.id_user = user.id_user ' +
        ' INNER JOIN satwil ON satwil.id_satwil = user.id_satwil  ' +
        ' WHERE kegiatan_intelijen.id_kegiatan_intelijen = ? AND  user.id_user = ? ', fields, (error, rows, fields) => {
            helper.handleResult(error, rows, fields, onSuccess, onError)
        });
};
exports.add = async function (fields, onSuccess, onError) {
    await connection.query('INSERT INTO kegiatan_intelijen (id_user, tahun_kegiatan_intelijen, ' +
        ' bulan_kegiatan_intelijen, jenis_kegiatan_intelijen, ' +
        ' jumlah_kegiatan_intelijen, reduksi_kegiatan_intelijen, ' +
        ' uraian_kegiatan_intelijen) VALUES (?,?,?,?,?,?,?);', fields, (error, rows, fields) => {
            helper.handleResult(error, rows, fields, onSuccess, onError)
        });
};
exports.edit = async function (fields, callback) {
    await connection.query('UPDATE  jenis_kegiatan_intelijen SET id_user = ? , tahun_kegiatan_intelijen = ? , bulan_kegiatan_intelijen = ? , jenis_kegiatan_intelijen = ? , jumlah_kegiatan_intelijen = ? , reduksi_kegiatan_intelijen = ? , uraian_kegiatan_intelijen = ? WHERE id_kegiatan_intelijen = ?', fields, callback);
};
exports.delete = async function (fields, onSuccess, onError) {
    await connection.query('DELETE FROM kegiatan_intelijen WHERE id_kegiatan_intelijen = ?', fields, (error, rows, fields) => {
        helper.handleResult(error, rows, fields, onSuccess, onError)
    });
};

exports.getTotal = async function (fields, onSuccess, onError, role = 2) {
    const baseQ = 'SELECT COUNT(*) as TOTAL FROM kegiatan_intelijen INNER JOIN user on kegiatan_intelijen.id_user = user.id_user '
    let Q = baseQ;

    if (role == 2) {
        Q = baseQ + ' AND user.id_user = ? ';
    }

    await connection.query(Q, fields, (error, rows, fields) => {
        helper.handleResult(error, rows, fields, onSuccess, onError)
    });
};
exports.fetchData = async function (fields, onSuccess, onError, role = 2, start = 0, pagelength = 10, search = '', order = {}) {
    const baseQ = 'SELECT id_kegiatan_intelijen,nama_satwil,bulan_kegiatan_intelijen,tahun_kegiatan_intelijen,jenis_kegiatan_intelijen,jumlah_kegiatan_intelijen,reduksi_kegiatan_intelijen,uraian_kegiatan_intelijen FROM kegiatan_intelijen ' +
        'INNER JOIN user on kegiatan_intelijen.id_user = user.id_user ' +
        'INNER JOIN satwil ON satwil.id_satwil = user.id_satwil '

    const searchQ = "( nama_satwil LIKE '%" + search +
        "%' OR bulan_kegiatan_intelijen LIKE '%" + search +
        "%' OR tahun_kegiatan_intelijen LIKE '%" + search +
        "%' OR jenis_kegiatan_intelijen LIKE '%" + search +
        "%' OR jumlah_kegiatan_intelijen LIKE '%" + search +
        "%' OR reduksi_kegiatan_intelijen LIKE '%" + search +
        "%' OR uraian_kegiatan_intelijen LIKE '%" + search + "%' )";
    const pageString = ' LIMIT ' + pagelength + ' OFFSET ' + start + ' ';
    let orderQ = ' ';
    if (order) {
        orderQ += " ORDER BY "
        switch (order.column) {
            case 1:
                orderQ += " nama_satwil "
                break;
            case 2:
                orderQ += " bulan_kegiatan_intelijen "
                break;
            case 3:
                orderQ += " tahun_kegiatan_intelijen "
                break;
            case 4:
                orderQ += " jenis_kegiatan_intelijen "
                break;
            case 5:
                orderQ += " jumlah_kegiatan_intelijen "
                break;
            case 6:
                orderQ += " reduksi_kegiatan_intelijen "
                break;
            case 7:
                orderQ += " uraian_kegiatan_intelijen "
                break;

            default:
                orderQ += " id_kegiatan_intelijen "
                break;
        }
        orderQ += " " + order.dir + " "
    }
    let query = baseQ;
    if (role == 1) {
        query += " WHERE " + searchQ + orderQ + pageString;
    } else if (role == 2) {
        query += " WHERE user.id_user = ? AND " + searchQ + orderQ + pageString;
    }
    //console.log(fields);
    //console.log(query);
    await connection.query(query, fields, (error, rows, fields) => {
        helper.handleResult(error, rows, fields, onSuccess, onError)
    });
};