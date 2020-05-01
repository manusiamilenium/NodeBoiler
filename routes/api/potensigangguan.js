var express = require('express');
var router = express.Router();
var potensigangguan = require('../../controller/api/potensigangguan');

router.get('/data', potensigangguan.fetchDatatables);

module.exports = router;