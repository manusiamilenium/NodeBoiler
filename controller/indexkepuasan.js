'use strict';

var response = require('../result');
var model = require('../model/indexkepuasan');
var uamodel = require('../model/useractivity');
exports.index = function (req, res) {
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            console.log(rows); 
            var notification = req.session.notification;
            var nottype = req.session.notificationtype;
            delete req.session.notification; 
            delete req.session.notificationtype;
            
            res.render('indexkepuasan',{data:rows,notification: notification, nottype: nottype});
             
        }
    });
};
exports.createAction = function (req, res) {
    var id_user = req.session.user[0].id_user;
    console.log(req.session.user);
    var value_index_kepuasan = req.body.value_index_kepuasan;
    var attachment_index_kepuasan = req.body.attachment_index_kepuasan;
    model.add([id_user,value_index_kepuasan,attachment_index_kepuasan], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Mengisi Index Kepuasan"], function (error, rows, fields) { 
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/indexkepuasan');
        }
    });
};
exports.create = function (req, res) {
    var id_index_kepuasan = req.params.id_index_kepuasan;
    model.getData(id_index_kepuasan, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('indexkepuasanadd',{data:rows[0],edit:"edit"});
            }else{
                res.render('indexkepuasanadd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {

    var id_user = req.session.user[0].id_user;
    var value_index_kepuasan = req.body.value_index_kepuasan;
    var attachment_index_kepuasan = req.body.attachment_index_kepuasan; 

    model.edit([id_user,value_index_kepuasan,attachment_index_kepuasan], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Index Kepuasan"], function (error, rows, fields) {});
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/indexkepuasan');
             
        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_index_kepuasan = req.params.id_index_kepuasan;
    model.delete([id_index_kepuasan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user,"Menghapus Index Kepuasan"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/indexkepuasan');
            }
        });
}; 

exports.dash = function (req, res) {
    var indek = 0;
    var totalsend = 0;
    model.getIndexes(function (error, rows, fields) {
        indek = (rows[0]['indek'])/35;
    });
    model.getTotalsend(function (error, rows, fields) {
        totalsend = rows[0]['totalsend'];
    });
    model.getAll(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            res.render('indexkepuasandash',{data:rows,indek:parseInt(indek),totalsend:totalsend}); 
              
        }
    });
    
};