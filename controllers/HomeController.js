// var geoip = require('geoip-lite');

var HomeController = function(Dao) {

    var self = this;
    var parkingDAO = Dao;

    self.estado_parking = function(req, res) {
        // var ip = req.ip;
        // console.log('ip: ' + ip);
        // var geo = geoip.lookup(ip);
        // console.log('geolocalizacion: ' + JSON.stringify(geo));
        var data = {
            title: 'Estado Parking',
            // latlng: 
        };
        
        res.render('home/estado_parking', data);
    };

    self.admin_parking = function (req, res) {
        var data = {
            title: 'Admin Parking'
        };
        res.render('parkings/admin', data);
    };

    self.ver_parking = function (req, res) {
        var id_parking = req.params.id;
        var pk = null;
        parkingDAO.getParking(id_parking, function (err, parking) {
            if(err) {
                console.log('error obteniendo parking para /ver-parking');
            }
            else {
                pk = parking[0];
            }
            console.log('parking con id ' + id_parking + ': ' + JSON.stringify(pk));
            var data = {
                title: 'Visualizar Parking',
                id_parking: req.params.id,
                parking: pk
            };
            res.render('parkings/visualizar', data);
        });
    };

    self.nuevo_parking = function (req, res) {
        var data = {
            title: 'Nuevo Parking'
        };
        res.render('parkings/new', data);
    };

    self.login = function (req, res) {
        var data = {
            title: 'Acceso Administrador'
        };
        res.render('home/login', data);
    };

};

module.exports = HomeController;