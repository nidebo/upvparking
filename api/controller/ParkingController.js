var ParkingController = function(parkingManager, parkingDAO) {
    
    var _parkingManager = parkingManager;
    var _parkingDAO = parkingDAO;

    this.listStatus = function(req, res) {
        _parkingManager.getStatus(function (err, result) {
            if(err) {
                // ?
                return;
            }
            res.send(result);
        });
    };

    this.listParkings = function (req, res) {
        console.log('ip: ' + req.ip);
        _parkingDAO.getParkings(function (err, result) {
            if(err) {
                // ?
                return;
            }
            res.send(result);
        });
    };


    this.listParking = function(req, res) {
        var parkingId = req.params.id;
        _parkingDAO.getParking(parkingId, function (err, result) {
            if(err) {
                // ? 
                return;
            }
            res.send(result);
        });
    };

    this.createParking = function (req, res) {
        console.log('body: ' + JSON.stringify(req.body));
        var data = req.body;
        console.log('data para crear parking: ' + JSON.stringify(data));
        _parkingDAO.addParking(data, function (err) {
            if(err) {
                // res send error
                res.send({ success: false });
                return;
            }
            // res send ok
            res.send({ success: true });
        });
    };

    this.removeParking = function (req, res) {
        var id = req.params.id;
        _parkingDAO.delParking(id, function (err) {
            if(err) {
                // res send error
                return;
            }
            // res send ok
        });
    };


    
    
};

module.exports = ParkingController;