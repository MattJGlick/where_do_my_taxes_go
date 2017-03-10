angular.module('taxes.controllers', ['taxes.services', 'budget.services']).
    controller('taxController', function($scope, taxService, budgetService) {
        $scope.filling_statuses = [
            "Single",
            "Married"
        ]

        $scope.$watch('[income, filling_status]', function () {
            if ($scope.income && $scope.filling_status) {
                taxes = taxService.getAll($scope.income, $scope.filling_statuses.indexOf($scope.filling_status))

                $scope.federal = taxes.fed
                $scope.total = taxes.total

                $scope.data = budgetService.getBudgetPerc(taxes.fed, taxes.ss, taxes.med)
            }
        });

        $scope.options = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.name;},
                y: function(d){return d.value;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };
    });


