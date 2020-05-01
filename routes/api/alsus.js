var express = require('express');
var router = express.Router();
var alsus = require('../../controller/api/alsus');

router.get('/data', alsus.fetchDatatables);

module.exports = router;