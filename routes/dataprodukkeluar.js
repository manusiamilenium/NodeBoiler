'use strict';

module.exports = function (app, sessionChecker) {
    var dataprodukkeluar = require('../controller/dataprodukkeluar');

    app.route('/dataprodukkeluar/:id_jenis_produk_keluar')
        .get(sessionChecker, dataprodukkeluar.index);

    app.route('/dataprodukkeluaradd/:id_jenis_produk_keluar')
        .get(sessionChecker, dataprodukkeluar.create)
        .post(sessionChecker, dataprodukkeluar.createAction);
    app.route('/dataprodukkeluardelete/:id_jenis_produk_keluar/:id_produk_keluar')
        .get(sessionChecker, dataprodukkeluar.delete);

    app.route('/pengirimanproduk')
        .get(sessionChecker, dataprodukkeluar.indexpengiriman);
    app.route('/pengirimanproduk/add')
        .get(sessionChecker, dataprodukkeluar.pengiriman)
        .post(sessionChecker, dataprodukkeluar.pengirimanAction);
    app.route('/pengirimanprodukdelete/:id_produk_keluar')
        .get(sessionChecker, dataprodukkeluar.deletepengiriman);
     
};
