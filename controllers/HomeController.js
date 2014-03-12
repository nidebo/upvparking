var HomeController = function(){

    var self = this;

    self.estado_parking = function(req, res) {
        var data = {
            title: 'Estado Parking'
        };
        
        res.render('home/estado_parking', data);
    };

};

module.exports = HomeController;