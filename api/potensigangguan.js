'use strict';

var model = require('../model/potensigangguan');
var helper = require('./helper');
//api
exports.fetchDatatables = async (req, res) =>  { 
    helper.processDatatables(req,res,model);
};