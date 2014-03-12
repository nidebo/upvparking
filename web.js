// web.js

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logfmt = require('logfmt');

var app = express();
var server = require('http').createServer(app); // borrar esta linea..
var io = require('socket.io');

console.log('ENV: ' + app.get('env'));

/**
 * Configuracion de View Engine y Estilo
 */
function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(nib())
}

// Configuracion Express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}))
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

var envDbConfig = null;

// development config
if ('development' === app.get('env')) {
    // envDbConfig = {
    //     port: 27017,
    //     host: '127.0.0.1',
    //     db: 'polimuevet'
    // };
}

// production config
if ('production' === app.get('env')) {
    // envDbConfig = {
    //     port: 53428,
    //     host: "ds053428.mongolab.com",
    //     db: 'polimuevet'
    // };
}

// Conexion a BD
// ...

// Passport
// ...

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// API
var ParkingManager = require('./api/service/ParkingManager');
var parkingManager = new ParkingManager();
var ParkingController = require('./api/controller/ParkingController');
var parkingController = new ParkingController(parkingManager);

// Web Controllers
var HomeController = require('./controllers/HomeController');
var homeController = new HomeController(); // ?

/**
 * GET: Leer
 * POST: Crear
 * PUT: Actualizar
 * DELETE: Borrar
 */

// API para listar Parkings
app.get('/api/parking', parkingController.listParkings);

// Web
app.get('/estado-parking', homeController.estado_parking);

// Inicio Web
app.get('/', function (req, res) {
	res.render('home/index',
        {
            title: 'Home'
        });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
// server.listen(3000)