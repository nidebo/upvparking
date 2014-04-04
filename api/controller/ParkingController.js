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
        var data = req.body;
        _parkingDAO.addParking(data, function (err) {
            if(err) {
                // res send error
                return;
            }
            // res send ok
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