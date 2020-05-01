var express = require('express');
var router = express.Router();
var kegiatanintel = require('../../controller/api/kegiatanintel');

router.get('/data', kegiatanintel.fetchDatatables);

module.exports = router;