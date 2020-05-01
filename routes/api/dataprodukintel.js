var express = require('express');
var router = express.Router();
var dataprodukintel = require('../../controller/api/dataprodukintel');

router.get('/data', dataprodukintel.fetchDatatables);

module.exports = router;