'use strict';
var tokenize = require('../services/TokenValidator'),
    refresh = require('../services/RefreshToken'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session);

var options = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

var sessionStore = new MySQLStore(options);
module.exports = function (app) {

    var iku = require('../controller/iku');
    var satwil = require('./satwil');
    var satker = require('./satker');
    var subdit = require('./subdit');
    var users = require('./users');
    var jenisintel = require('./jenisintel');
    var produkintel = require('./produkintel'); 
    var produkkeluar = require('./produkkeluar');
    var indexkepuasan = require('./indexkepuasan');
    var potensigangguan = require('./potensigangguan');
    var dataprodukintel = require('./dataprodukintel');
    var kejadianmenonjol = require('./kejadianmenonjol');
    var dataprodukkeluar = require('./dataprodukkeluar');
    var kegiatanintel = require('./kegiatanintel');
    var alsus = require('./alsus');
    // initialize cookie-parser to allow us access the cookies stored in the browser. 
    app.use(cookieParser());
    // initialize express-session to allow us track the logged-in user across sessions.
    app.use(session({
        key: 'user_id',
        secret: 'bumiitubulat',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            expires: 6000000
        } 
    }));
    // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    // This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
    app.use((req, res, next) => {
        if (req.cookies.user_sid && !req.session.user) {
            res.clearCookie('user_id');
        }
        next();
    }); 
    // middleware function to check for logged-in users
    var sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_id) {
            next();
        } else {
            res.redirect('/login');
        }
    };

    // route for user logout
    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_id');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });

    app.use((req, res, next) => {
        res.locals.session = req.session
        next()
    })



    app.route('/ik1')
        .get(sessionChecker, iku.ik1);


    app.route('/ik5')
        .get(iku.ik5);
    app.route('/ik6')
        .get(iku.ik6);
    app.route('/ik2')
        .get(iku.ik2);
    app.route('/ik11')
        .get(iku.ik11);

    users(app, sessionChecker);
    satwil(app, sessionChecker);
    satker(app, sessionChecker);
    subdit(app, sessionChecker);
    jenisintel(app, sessionChecker);
    produkintel(app, sessionChecker);
    produkkeluar(app, sessionChecker);
    indexkepuasan(app, sessionChecker);
    potensigangguan(app, sessionChecker);
    dataprodukintel(app, sessionChecker);
    kejadianmenonjol(app, sessionChecker);
    dataprodukkeluar(app, sessionChecker);
    kegiatanintel(app, sessionChecker);
    alsus(app, sessionChecker);


};