var express = require('express');
var router = express.Router();
var potensigangguan = require('../../api/potensigangguan');

router.get('/data', potensigangguan.fetchDatatables);

module.exports = router;