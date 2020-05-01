'use strict';

var model = require('../../model/alsus');
var helper = require('./helper');
//api
exports.fetchDatatables = async (req, res) =>  {
    console.log(req.query);
    helper.processDatatables(req,res,model);
};