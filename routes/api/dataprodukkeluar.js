var express = require('express');
var router = express.Router();
var dataprodukkeluar = require('../../api/dataprodukkeluar');

router.get('/data/:id_jenis_produk_keluar', dataprodukkeluar.fetchDatatables);

module.exports = router;