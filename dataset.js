'use strict';
//result set for jquery datables
exports.ok = function (values, res) {
    var data = {
        'status': 200,
        "draw": values["draw"],
        "recordsTotal": values["recordsTotal"],
        "recordsFiltered": values["recordsFiltered"],
        'data': values["data"],
    };
    //console.log(data);
    res.json(data);
    res.end();
};