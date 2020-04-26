var express = require('express');
var router = express.Router();
var dataprodukintel = require('../../api/dataprodukintel');

router.get('/data', dataprodukintel.fetchDatatables);

module.exports = router;