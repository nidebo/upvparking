var cronJob = require('cron').CronJob;
var ObjectID = require('mongodb').ObjectID;

var ParkingManager = function(db) {

    var _db = db;
    var parkingsCollection = "parkings";

    var randomizar = function () {
        // de momento solo libre -> 1 y completo -> 0
        var mapaEstado = {
            0: 'completo',
            1: 'libre'
        };
        // 80% libre, 20% completo
        var probabilidades = [1, 1, 1, 1, 0];
        var idx = Math.floor(Math.random() * probabilidades.length);
        var estadoBool = probabilidades[idx];
        var estado = mapaEstado[estadoBool];
        return estado;
    };

    var cambioEstado = new cronJob('*/10 * * * *', function () {
        _db.collection(parkingsCollection, function (err, collection) {
            collection.find({}, {_id:1}).toArray(function (err, parkings) {
                if(err) return;
                console.log('AVISO: Hay ' + parkings.length + ' parkings!');
                parkings.forEach(function (parking) {
                    var estadoNuevo = randomizar();
                    console.log('parking: ' + parking._id);
                    console.log('estado nuevo ' + estadoNuevo);
                    collection.update({ "_id": parking._id },
                        { "$set": { estado: estadoNuevo } }, function (err, result) {
                            if(err) {
                                console.log('error al cambiar de estado');
                                return;
                            }
                        });
                });
            });
        });
    }, null, false);

    // los estados tenerlos en memoria en vez de guardarlos ?
    // una vez tengamos datos reales...
    // var _parkings = []

    // this.getStatus = function(callback) {
    //     return callback(null, _parkings);
    // };

    cambioEstado.start();

};

module.exports = ParkingManager;