var ListarParkingsCtrl = function ($scope, $http) {

    $scope.parkings = [];
    $scope.submitted = false;
    $scope.todos = [];
    $scope.parkingNuevo = {};

    $scope.getData = function () {
        $http.get('/api/parkings/').success(function (result) {
            if(result !== undefined){
                $scope.todos = result;
                for (var i = 0; i < $scope.todos.length; ++i){
                    $scope.todos[i].id = $scope.todos[i]._id;
                }
                $scope.parkings = $scope.todos;
            }
        }); 
    }

    $scope.DeleteParking = function (id) {
        if(confirm('Seguro que desea borrar el parking? No puede deshacer esta acción')){
            $http.delete('/api/parking/' + id).success(function (response) {
                console.log(response);

                var parking = _.find($scope.parkings, function (r) {
                    return r.id === id;
                });

                var index = $scope.parkings.indexOf(parking);
                $scope.parkings.splice(index, 1);
            });
        }
    }

    $scope.setUbicacion = function (ubicacion) {
        $scope.parkingNuevo.ubicacion = ubicacion;
    }

    $scope.setUbicacionLatLng = function (ubicacion) {
        $scope.parkingNuevo.latlng = ubicacion;
    }

    $scope.AddParking = function () {
        if($scope.form.$valid) {
            var obj = angular.copy($scope.parkingNuevo);
            $http.post('/api/parking', obj).success(function (response) {
                console.log(response);
                if(response.success === true) {
                    window.location = "/admin-parking";
                }
            });
        }
    }

    // $('button').on('click', function(e){
    //     e.preventDefault();
    // });
};