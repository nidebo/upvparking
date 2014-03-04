// web.js

var express = require("express");
var logfmt = require("logfmt");
var app = express();
var server = require('http').createServer(app);

console.log('ENV: ' + app.get('env'));

// Configuracion Express
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(logfmt.requestLogger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'monopolio' }));
app.use(express.static(__dirname + '/public'))

// NO CACHE ?????????????
// app.use(function(req, res, next) {
//     res.locals.flash = req.flash();
//     res.locals.user = req.user !== undefined ? {
//         nombre: req.user.Nombre,
//         email: req.user.Email,
//         IsAdmin: req.user.IsAdmin,
//         id: req.user._id
//     } : undefined;
//     res.header('Cache-Control','private'); 
//     next();
// });


// development config
if ('development' === app.get('env')) {

}

// production config
if ('production' === app.get('env')) {

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////

// API
var ParkingManager = require('./api/service/ParkingManager');
var parkingManager = new ParkingManager();
var ParkingController = require('./api/controller/ParkingController');
var parkingController = new ParkingController(parkingManager);

/**
 * GET: Leer
 * POST: Crear
 * PUT: Actualizar
 * DELETE: Borrar
 */

// API para listar Parkings
app.get('/api/parking', parkingController.listParkings);

// Inicio Web
app.get('/', function(req, res) {
	res.send('Hola Mundo!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
