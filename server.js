//var routes = require('./routes/index');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    config =  require('./config');
    
const path = require('path');
global.config = require('./config');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

global.tokenList = {}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));

var routes = require('./routes/routes');
routes(app);
app.listen(config.port);


console.log('server started on: ' + config.port);