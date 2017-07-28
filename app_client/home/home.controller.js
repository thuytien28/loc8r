angular
    .module('loc8rApp')
    .controller('homeCtrl', homeCtrl);
if(window.location.pathname !== '/'){
    window.location.href = '/#!' +window.location.pathname;
}
homeCtrl.$inject = ['$scope', 'loc8rData', 'geolocation'];
function homeCtrl ($scope, loc8rData, geolocation) {
    var vm = this;
    vm.pageHeader = {
        title: 'Loc8r',
        strapline: 'Find places to work with wifi near you!'
    };
    vm.sidebar = {
        content: "Looking for wifi and a seat etc etc"
    };
    vm.message = "Checking your location";
    vm.getData = function (position) {
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
        vm.message = "Searching for nearby places";
        loc8rData.locationByCoords(lat, lng)
            .then(function successCallback(data) {
                    vm.message = data.data.length > 0 ? "" : "No locations found";
                    vm.data = { locations: data.data };
                },function errorCallback(e) {
                    vm.message = "Sorry, something's gone wrong";
                    }
                 );
    };
    vm.showError = function (error) {
        $scope.$apply(function() {
            vm.message = error.message;
        });
    };
    vm.noGeo = function () {
        $scope.$apply(function() {
            vm.message = "Geolocation is not supported by this browser.";
        });
    };
    geolocation.getPosition(vm.getData,vm.showError,vm.noGeo); 
}