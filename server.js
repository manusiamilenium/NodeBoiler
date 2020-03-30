//var routes = require('./routes/index');
var express = require('express'),
    app = express(), 
    bodyParser = require('body-parser'), 
    compression = require('compression');
const path = require('path');
global.config = require('./config');
global.helper = require('./controller/helper');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression())
global.tokenList = {} 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));
var routes = require('./routes/routes');
routes(app);
app.listen(config.port);
console.log('server started on: ' + config.port);