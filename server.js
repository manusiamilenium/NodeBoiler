var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    config =  require('./config');
global.config = require('./config');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
global.tokenList = {}
var routes = require('./routes/routes');
routes(app);
app.listen(config.port);


console.log('server started on: ' + config.port);