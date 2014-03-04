var ParkingManager = function() {

    var _parkings = [
        { name: "Aparcamiento Palleter", lat: 39.467799, lng: -0.385556 },
        { name: "Comercial del Ferrocarril", lat: 39.466483, lng: -0.377950 },
        { name: "Aparcamiento San Agustín", lat: 39.469199, lng: -0.379795 },
        { name: "Garaje Guimerá", lat: 39.470176, lng: -0.385288 },
        { name: "Aparcamiento Mercado de Ruzafa", lat: 39.461695, lng: -0.371148 }
    ];

    this.getParkings = function(callback) {
        return callback(null, _parkings);
    };

};

module.exports = ParkingManager;