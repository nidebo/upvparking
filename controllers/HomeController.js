var HomeController = function() {

    var self = this;

    self.estado_parking = function(req, res) {
        var data = {
            title: 'Estado Parking'
        };
        
        res.render('home/estado_parking', data);
    };

    self.admin_parking = function (req, res) {
        var data = {
            title: 'Admin Parking'
        };
        res.render('parkings/admin', data);
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