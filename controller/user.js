'use strict';

var response = require('../result');
var model = require('../model/usermodel');


exports.index = function (req, res) { 
    res.render('login');
    delete res.locals.session;
   
};
 
exports.login = function (req, res) {
    var username = req.body.username,
        password = req.body.password;
    if (username != "" && password != "") {
        model.getUser(username, function (error, rows, fields) {
            if (error) {
                req.session.notification = error;
                req.session.notificationtype = "error";
                res.redirect('/login');
            } else {
                if ((rows.length > 0) && (password == rows[0].password)) {
                    req.session.user = rows;
                    if (req.session.user[0].role == 1) {
                        res.redirect('/');
                    }
                    else {
                        res.redirect('/indexkepuasan');
                    }
                } else {
                    req.session.notification = "Username dan Password Salah.";
                    req.session.notificationtype = "error";
                    res.redirect('/login');
                }
            }
        });
    }
    else {
        req.session.notification = "Username dan Password tidak boleh kosong";
        req.session.notificationtype = "error";
      
        res.redirect('/login');
    }

};