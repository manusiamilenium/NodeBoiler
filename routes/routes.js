'use strict';
var tokenize = require('../services/TokenValidator'),
    refresh = require('../services/RefreshToken'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redis = require("redis"),
    MySQLStore = require('express-mysql-session')(session);

var options = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};
const redis_client = redis.createClient(6379);

let cacheMiddleware = (duration) => {
    return (req, res, next) => {
        let key =  '__express__' + req.originalUrl || req.url
        redis_client.get(key, (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).send(err);
            }
            //if no match found
            if (data != null) {
                //send cache
              res.send(data);
            } else {
                res.sendResponse = res.send
                res.send = (body) => {
                    redis_client.setex(key, duration*1000, JSON.stringify(body));
                    res.sendResponse(body)
                }
                next()
            }
          });
    }
}

var sessionStore = new MySQLStore(options);
module.exports = function (app) {

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
    
    //api
    var alsusapi = require('./api/alsus');
    app.use('/api/alsus',sessionChecker,  alsusapi);
    var dataprodukintel = require('./api/dataprodukintel');
    app.use('/api/dataprodukintel',sessionChecker,cacheMiddleware(30),  dataprodukintel);
    var dataprodukkeluar = require('./api/dataprodukkeluar');
    app.use('/api/dataprodukkeluar',sessionChecker,  dataprodukkeluar);
    var datapengirimanproduk = require('./api/pengirimanproduk');
    app.use('/api/pengirimanproduk',sessionChecker,  datapengirimanproduk);
    var datapotensigangguan= require('./api/potensigangguan');
    app.use('/api/potensigangguan',sessionChecker,  datapotensigangguan);
    var datakejadianmenonjol= require('./api/kejadianmenonjol');
    app.use('/api/kejadianmenonjol',sessionChecker,  datakejadianmenonjol);
    var datakegiatanintel= require('./api/kegiatanintel');
    app.use('/api/kegiatanintel',sessionChecker,  datakegiatanintel);
};