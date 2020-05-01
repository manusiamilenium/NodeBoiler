var express = require('express');
var router = express.Router();
var pengirimanproduk = require('../../controller/api/pengirimanproduk');

router.get('/data', pengirimanproduk.fetchDatatables);

module.exports = router;