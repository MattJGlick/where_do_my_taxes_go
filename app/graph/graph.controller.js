angular.module('graph.controllers', []).
    controller('graphController', function($scope) {
        $scope.data = [
            {
                name : "Blue",
                value : 10,
                color : "#4a87ee"
            },
            {
                name : "Green",
                value : 40,
                color : "#66cc33"
            },
            {
                name : "Orange",
                value : 70,
                color : "#f0b840"
            },
            {
                name : "Red",
                value : 2,
                color : "#ef4e3a"
            }
        ];
    });
