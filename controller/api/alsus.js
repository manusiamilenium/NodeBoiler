'use strict';

var model = require('../../model/alsus');
var modelr = require('../../model/alsusrealisasi');
var helper = require('./helper');
//api
exports.fetchDatatables = async (req, res) =>  {
     
    helper.processDatatables(req,res,model);
};
exports.fetchDatatablesRealisasi = async (req, res) =>  {
     
    helper.processDatatables(req,res,modelr);
};