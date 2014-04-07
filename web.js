// web.js

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logfmt = require('logfmt');
var mongo = require('mongodb');

var app = express();
var server = require('http').createServer(app); // borrar esta linea..
// var io = require('socket.io');

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
    envDbConfig = {
        port: 27017,
        host: '127.0.0.1',
        db: 'upvparking'
    };
}

// production config
if ('production' === app.get('env')) {
    envDbConfig = {
        port: 39437,
        host: "ds039437.mongolab.com",
        db: 'upvparking'
    };
}

// Conexion a BD
// ...
var MongoServer = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var mongoServer = new MongoServer(envDbConfig.host, envDbConfig.port, {auto_reconnect: true});
db = new Db(envDbConfig.db, mongoServer, { safe: true });

db.open(function(err, db) {
    db.authenticate('admin', 'upvparking', function(err, success) {
        // Do Something ...
    });
    if(!err) {
        console.log("Connected to 'upvparking' database");
    }
    else {
        console.log("Unable to connecto to 'upvparking' database");
    }
});

// Passport
// ...

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// API
var ParkingManager = require('./api/service/ParkingManager');
var parkingManager = new ParkingManager();
var ParkingDAO = require('./api/dao/ParkingDAO');
var parkingDAO = new ParkingDAO(db);
var ParkingController = require('./api/controller/ParkingController');
var parkingController = new ParkingController(parkingManager, parkingDAO);

// Web Controllers
var HomeController = require('./controllers/HomeController');
var homeController = new HomeController(); // ?

/**
 * GET: Leer
 * POST: Crear
 * PUT: Actualizar
 * DELETE: Borrar
 */

// API Parkings
app.get('/api/status', parkingController.listStatus);
app.get('/api/parkings', parkingController.listParkings);
app.get('/api/parking/:id', parkingController.listParking);
app.post('/api/parking', parkingController.createParking);
app.delete('/api/parking/:id', parkingController.removeParking);

// Web
app.get('/estado-parking', homeController.estado_parking);
app.get('/admin-parking', homeController.admin_parking);
app.get('/nuevo-parking', homeController.nuevo_parking);

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