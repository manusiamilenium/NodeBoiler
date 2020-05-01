'use strict';

var model = require('../../model/kegiatanintel');
var helper = require('./helper');
//api
exports.fetchDatatables = async (req, res) =>  { 
    helper.processDatatable(req,res,model);
};