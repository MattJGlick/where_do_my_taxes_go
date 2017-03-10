angular.module('taxes.services', []).
    factory('taxService', function($http) {

        tax = {}

        const brackets = [
            {
                9275: 10,
                37650: 15,
                91150: 25,
                190150: 28,
                413350: 33,
                415050: 35,
                Infinity: 39.6
            }, {
                18550: 10,
                75300: 15,
                151900: 25,
                231450: 28,
                413350: 33,
                466950: 35,
                Infinity: 39.6
            }, {
                9275: 10,
                37650: 15,
                75950: 25,
                115725: 28,
                206675: 33,
                233475: 35,
                Infinity: 39.6
            }, {
                13250: 10,
                50400: 15,
                130150: 25,
                210800: 28,
                413350: 33,
                441000: 35,
                Infinity: 39.6
            }
        ]

        const socialSecurity = {
            max: 118500,
            rate: 6.2
        }

        const medicare = {
            rate: 1.45,
            thresholds: [
                {
                    max: 200000,
                    rate:  2.35 
                }, {
                    max: 250000,
                    rate:  2.35 
                }, {
                    max: 125000,
                    rate:  2.35 
                }
            ]
        }

        tax.getFederal = function(income, filling_status) {
            var totalTax = 0
            var diff = 0
            var prev = 0

            bracket = brackets[filling_status]

            for (var max in bracket) {
                if (income > max) {
                    diff = max - prev
                } else if (income > prev) {
                    diff = income - prev
                } else {
                    break
                }

                totalTax += diff * bracket[max] * .01

                prev = max
            }

            return {
                "tax": totalTax,
                "marginalRate": bracket[prev]
            }
        }

        tax.getSocialSecurity = function(income) {
            if (income > socialSecurity.max) {
                return socialSecurity.max * socialSecurity.rate * .01
            } else {
                return income * socialSecurity.rate * .01
            }
        }

        tax.getMedicare = function(income, filling_status) {
            threshold = medicare.thresholds

            totalMedicare = income * medicare.rate * .01

            if (income > threshold.max) {
                totalMedicare += (income - threshold.max) * threshold.rate
            }

            return totalMedicare

        }

        tax.getAll = function(income, filling_status) {
            fed = tax.getFederal(income, filling_status)
            ss = tax.getSocialSecurity(income)
            med = tax.getMedicare(income, filling_status)

            return {
                "fed": fed.tax,
                "ss": ss,
                "med": med,
                "total": fed.tax + ss + med
            }

        }

        return tax
  });

