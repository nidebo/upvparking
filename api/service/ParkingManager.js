var ParkingManager = function() {

    var _parkings = [
        // UPV
        { name: "Caminos", lat: 39.480518, lng: -0.343920 },
        { name: "Informática", lat: 39.482658, lng: -0.348385 },
        { name: "Teleco", lat: 39.479550, lng: -0.342617 },
        { name: "Bellas Artes", lat: 39.484011, lng: -0.343502 },
        { name: "ADE", lat: 39.481310, lng: -0.338009 },
        // NO UPV
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