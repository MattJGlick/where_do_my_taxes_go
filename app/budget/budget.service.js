angular.module('budget.services', []).
    factory('budgetService', function($http) {
        budget = {}

        const agencies_perc = {
            "Legislative Branch": 0.1,
            "Judicial Branch": 0.2,
            "Department of Agriculture": 3.7,
            "Department of Commerce": 0.3,
            "Department of Defense--Military Programs": 14.2,
            "Department of Education": 1.7,
            "Department of Energy": 0.7,
            "Department of Health and Human Services": 27.6,
            "Department of Homeland Security": 1.2,
            "Department of Housing and Urban Development": 1.0,
            "Department of the Interior": 0.4,
            "Department of Justice": 0.9,
            "Department of Labor": 1.2,
            "Department of State": 0.7,
            "Department of Transportation": 2.1,
            "Department of the Treasury": 14.9,
            "Department of Veterans Affairs": 4.3,
            "Corps of Engineers--Civil Works": 0.2,
            "Other Defense Civil Programs": 1.4,
            "Environmental Protection Agency": 0.2,
            "International Assistance Programs": 0.6,
            "National Aeronautics and Space Administration": 0.5,
            "National Science Foundation": 0.2,
            "Office of Personnel Management": 2.3,
            "Social Security Administration": 24.9,
            "Other Independent Agencies (On-Budget)": 0.5,
            "Allowances": 0.3
        }

        budget.getBudgetPerc = function (fed, ss, med) {
            personal_percentages = []

            for (var agency in agencies_perc) {
                percentage = {
                    "name": agency,
                    "value": (agencies_perc[agency] * fed * .01)
                }

                if (agency == "Social Security Administration") {
                    percentage.value= percentage.value + ss
                } else if (agency == "Department of Health and Human Services") {
                    percentage.value= percentage.value + med
                }

                personal_percentages.push(percentage)
            }

            return personal_percentages
        }

        return budget
    });
