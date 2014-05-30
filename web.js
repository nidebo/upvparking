// web.js

var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
// 
// para obtener IP del cliente
app.enable('trust proxy');
//
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}))
// app.use(logfmt.requestLogger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'monopolio' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next) {
    // res.locals.flash = req.flash();
    res.locals.user = req.user !== undefined ? {
        username: req.user.username
        // email: req.user.Email,
        // IsAdmin: req.user.IsAdmin,
        // id: req.user._id
    } : undefined;
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});

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
var ObjectID = mongo.ObjectID;

var findById = function (id, fn) {
    db.collection('administrador', function (err, collection) {
        collection.findOne({ _id : ObjectID(id) }, function (err, user) {
            if(err) fn(new Error('Database Problem'));
            else if(user) fn(null, user);
            else fn(new Error('User ' + id + ' does not exist'));
        });
    });
};

var findByUsername = function (uname, fn) {
    db.collection('administrador', function (err, collection) {
        collection.findOne({ username : uname }, function (err, user) {
            if(err) return fn(null, null);
            if(user) return fn(null, user);
            return fn(null, null);
        });
    });
};

passport.serializeUser(function  (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        process.nextTick(function () {
            findByUsername(username, function (err, user) {
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, { message: 'Usuario ' + username + ' no está en el sistema.' });
                if(user.password != password)
                    return done(null, false, { message: 'Usuario y/o Clave inválidos.' });
                return done(null, user);
            });
        });
    }
));

function ensureAuthenticated (req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/login');
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// API
var ParkingManager = require('./api/service/ParkingManager');
var parkingManager = new ParkingManager(db);
var ParkingDAO = require('./api/dao/ParkingDAO');
var parkingDAO = new ParkingDAO(db);
var ParkingController = require('./api/controller/ParkingController');
var parkingController = new ParkingController(parkingManager, parkingDAO);

// Web Controllers
var HomeController = require('./controllers/HomeController');
var homeController = new HomeController(parkingDAO); // ?

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
app.get('/login', homeController.login);
app.get('/admin-parking', ensureAuthenticated, homeController.admin_parking);
app.get('/ver-parking/:id', ensureAuthenticated, homeController.ver_parking);
app.get('/nuevo-parking', ensureAuthenticated, homeController.nuevo_parking);
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        console.log(req.user.username + ' has logged in.');
        res.redirect('/admin-parking');
    }
);
app.get('/logout', function (req, res) {
    if(req.user)
        console.log(req.user.username + ' is logging out.');
    req.logout();
    res.redirect('/login');
});


// Inicio Web
app.get('/', function (req, res) {
    if(req.user) console.log('SIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
    else console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
	res.render('home/index',
        {
            title: 'Home'
        });
});

/////////// BURGUET ///////////////////////
app.post('/burguet', function (req, res) {
    console.log(req.body);
    res.send({ success: true });
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
	console.log("Listening on " + port);
});
// server.listen(3000)