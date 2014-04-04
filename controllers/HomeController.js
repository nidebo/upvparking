var HomeController = function(){

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
};

module.exports = HomeController;