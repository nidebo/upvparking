var ParkingManager = function() {

    var _parkings = [
        { name: "Caminos", lat: 39.480518, lng: -0.343920 },
        { name: "Informática", lat: 39.482658, lng: -0.348385 },
        { name: "Teleco", lat: 39.479550, lng: -0.342617 },
        { name: "Bellas Artes", lat: 39.484011, lng: -0.343502 },
        { name: "ADE", lat: 39.481310, lng: -0.338009 }
    ];

    this.getParkings = function(callback) {
        return callback(null, _parkings);
    };

};

module.exports = ParkingManager;