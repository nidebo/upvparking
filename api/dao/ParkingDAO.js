ObjectID = require('mongodb').ObjectID;

var ParkingDAO = function (db) {
    
    var _db = db;
    var parkingsCollection = "parkings";

    this.getParkings = function (callback) {
        _db.collection(parkingsCollection, function (err, collection) {
            collection.find().toArray(function (err, parkings) {
                if(err) {
                    return callback(err, null);
                }
                return callback(null, parkings);
            });
        });
    };

    this.getParking = function (id, callback) {
        _db.collection(parkingsCollection, function (err, collection) {
            collection.find({ "_id" : ObjectID(id) }).toArray(function (err, parking) {
                if(err) {
                    return callback(err);
                }
                return callback(null, parking);
            });
        });
    };

    this.addParking = function (data, callback) {
        _db.collection(parkingsCollection, function (err, collection) {
            collection.insert(data, function (err, result) {
                if(err) {
                    return callback(err);
                }
                return callback(null);
            });
        });
    };

    this.delParking = function (id, callback) {
        _db.collection(parkingsCollection, function (err, collection) {
            collection.remove({ "_id" : ObjectID(id) }, function (err, result) {
                if(err) {
                    return callback(err);
                }
                return callback(null);
            });
        });
    };


};

module.exports = ParkingDAO;