'use strict';

var response = require('../result');
var model = require('../model/potensigangguan');
var kjmodel = require('../model/kejadianmenonjol');
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
            res.render('potensigangguan',{data:rows,notification: notification, nottype: nottype});
            delete req.session.notification;
        }
    });
};
exports.createAction = function (req, res) {
    var id_user = req.session.user[0].id_user; 
    var jumlah_potensi_gangguan = req.body.jumlah_potensi_gangguan;
    var tahun_potensi_gangguan = req.body.tahun_potensi_gangguan;
    var attachment_potensi_gangguan = req.body.attachment_potensi_gangguan;
    model.add([id_user,jumlah_potensi_gangguan,tahun_potensi_gangguan,attachment_potensi_gangguan], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add([id_user,"Mengisi Potensi Gangguan"], function (error, rows, fields) { 
                if (error) {
                    console.log(error)
                }
            });
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/potensigangguan');
        }
    });
};
exports.create = function (req, res) {
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    model.getData(id_potensi_gangguan, function (error, rows, fields) {
        if (error) {
            console.log(error);
            
        } else {
            if(rows[0]){
                console.log(rows[0]);
                res.render('potensigangguanadd',{data:rows[0],edit:"edit"});
            }else{
                res.render('potensigangguanadd',{edit:""});
            }
        }
    });

     
};

exports.updateAction = function (req, res) {
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    var id_user = req.session.user[0].id_user;
    var jumlah_potensi_gangguan = req.body.jumlah_potensi_gangguan;
    var tahun_potensi_gangguan = req.body.tahun_potensi_gangguan;
    var attachment_potensi_gangguan = req.body.attachment_potensi_gangguan;

    model.edit([id_user,jumlah_potensi_gangguan,tahun_potensi_gangguan,attachment_potensi_gangguan,id_potensi_gangguan], function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            uamodel.add(["Mengedit Potensi Gangguan"], function (error, rows, fields) {});
            req.session.notification = "Berhasil Ditambah";
            req.session.notificationtype = "success";
            res.redirect('/potensigangguan');
             
        }
    });
};
exports.delete = function (req, res) {
    var id_user = req.session.user[0].id_user;
    var id_potensi_gangguan = req.params.id_potensi_gangguan;
    model.delete([id_potensi_gangguan],
        function (error, rows, fields) {
            if (error) {
                console.log(error)
            } else {
                uamodel.add([id_user,"Menghapus Potensi Gangguan"], function (error, rows, fields) {
                    if (error) {
                        console.log(error)
                    }
                });
                req.session.notification = "Berhasil Dihapus";
                req.session.notificationtype = "success";
                res.redirect('/potensigangguan');
            }
        });
}; 

exports.dash = function (req, res) {
    var totalpotensi = 0;
    var totalkejadian = 0;
    var totalsend = 0;
    var potensipersatwil = [];
    model.total(function (error, rows, fields) {
        if (error) {
            console.log(error)
        }
        totalpotensi = rows[0]['total'];
    });
    kjmodel.total(function (error, rows, fields) {
        if (error) {
            console.log(error)
        }
        console.log(rows)
        totalkejadian = rows[0]['total'];
    });
    model.totalpersatwil(function (error, rows, fields) {
        if (error) {
            console.log(error)
        }
        potensipersatwil = rows;
    });
    model.getTotalsend(function (error, rows, fields) {
        if (error) {
            console.log(error)
        }
        totalsend = rows[0]['total'];
    });

    kjmodel.totalpersatwil(function (error, rows, fields) {
        if (error) {
            console.log(error)
        } else {
            var iku = ~~(((totalpotensi-totalkejadian) / totalpotensi) * 100);
            res.render('potensigangguandash',
            {
                data:rows,
                potensipersatwil:potensipersatwil,
                totalpotensi:totalpotensi,
                totalsend:totalsend,
                iku:iku,
                totalkejadian:totalkejadian}); 
              
        }
    });
    
};