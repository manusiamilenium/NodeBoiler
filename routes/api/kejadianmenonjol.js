var express = require('express');
var router = express.Router();
var kejadianmenonjol = require('../../controller/api/kejadianmenonjol');

router.get('/data', kejadianmenonjol.fetchDatatables);

module.exports = router;