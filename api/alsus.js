'use strict';

var model = require('../model/alsus');
//api
exports.fetchData = async (req, res) =>  {
    console.log(req.query);
    var response = require('../dataset');
    const params = req.query;
    const start = params.start;
    const pagelength = params.length;
    const order = params.order[0];
    const search = params.search;
    const draw = params.draw;
    //get total count
    let data = [];
    data['draw'] = draw;
    model.getTotal([req.session.user.id_user], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            const total = rows[0].TOTAL;
            data['recordsTotal'] = total;
            data["recordsFiltered"] =  total; 
            model.fetchData([req.session.user.id_user], function (error, results, fields) {
                if (error) {
                    console.log(error)
                } else { 
                     data['data'] =  results.map((item) => Object.values(item))
                     //console.log("data : ",data);
                     response.ok(data, res);

                }
            },req.session.user.role,start,pagelength,search.value,order);
        }
    },req.session.user.role);
};