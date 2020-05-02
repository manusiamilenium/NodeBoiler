var express = require('express');
var router = express.Router();
var alsus = require('../../controller/api/alsus');

router.get('/data', alsus.fetchDatatables);
router.get('/rdata', alsus.fetchDatatablesRealisasi);
module.exports = router;