(function () {
    'use strict';
    angular
        .module('app.calculator')
        .controller('CalculatorController', calculatorController);

    function calculatorController($scope) {
        var vm = this;
        vm.operations = config.operations;
        vm.usedOperations = [];
        vm.result = {};
        vm.fractions = [
            { dividend: 0, divider: 0 },
            { dividend: 0, divider: 0 },
        ];

        vm.calculate = calculate;
        vm.isCorrectFractions = isCorrectFractions;
        vm.onOperationChange = onOperationChange;
        vm.addNewFraction = addNewFraction;

        function calculate() {
            if (!isCorrectFractions()) {
                return;
            } 
            vm.result = vm.fractions.reduce(function(prev, current, index, arr) {
                switch(vm.usedOperations[index-1].label) {
                    case '+': { return addFractions(prev, current);}
                    case '-': { return substractFractions(prev, current); }
                    case '*': { return multFractions(prev, current);}
                    case '/': { return divideFractions(prev, current); }
                }
            }); 
            vm.result = setSign(simplifyFraction(vm.result));
        }

        function setSign(fraction) {
            fraction.isNegative = fraction.dividend * fraction.divider < 0;
            fraction.dividend = Math.abs(fraction.dividend);
            fraction.divider = Math.abs(fraction.divider);
            return fraction;
        }

        function addFractions(fraction1, fraction2) {
            var fraction = {
                dividend: fraction1.dividend * fraction2.divider + fraction2.dividend * fraction1.divider,
                divider: fraction1.divider * fraction2.divider
            }
            return simplifyFraction(fraction);
        }
        function substractFractions(fraction1, fraction2) {
            var fraction = {
                dividend: fraction1.dividend * fraction2.divider - fraction2.dividend * fraction1.divider,
                divider: fraction1.divider * fraction2.divider
            }
            return simplifyFraction(fraction);
        }
        function multFractions(fraction1, fraction2) {
            var fraction = {
                dividend: fraction1.dividend * fraction2.dividend,
                divider: fraction1.divider * fraction2.divider
            }
            return simplifyFraction(fraction);
        }
        function divideFractions(fraction1, fraction2) {
            var fraction = {
                dividend: fraction1.dividend * fraction2.divider,
                divider: fraction1.divider * fraction2.dividend
            }
            return simplifyFraction(fraction);
        }

        function simplifyFraction(fraction) {
            if (Math.max(fraction.dividend,fraction.divider) % Math.min(fraction.dividend,fraction.divider) == 0) {
                return { 
                    dividend: fraction.dividend / Math.min(fraction.dividend,fraction.divider),
                    divider: fraction.divider / Math.min(fraction.dividend,fraction.divider)
                };
            }
            
            var min = Math.min(fraction.dividend, fraction.divider);
            for (var i = 2; i <= min / 2; i++) {
                if (!(fraction.dividend % i) && !(fraction.divider % i)) {
                    fraction.dividend /= i;
                    fraction.divider /= i;
                    return simplifyFraction(fraction);
                }
            }
            return fraction;
        }

        function isCorrectFractions() { 
            if (vm.usedOperations.length  != vm.fractions.length - 1) return false; 
            return vm.fractions.every(function(elem) {
                return elem.divider && elem.dividend !== undefined;
            });
        }

        function onOperationChange(op, index) {
            vm.usedOperations[index] = op;
            vm.calculate();
        }

        function addNewFraction() {
            vm.fractions.push({ dividend: 0, divider: 0 });
        }
    }

    var config = {
        operations: [
            { label: "+" },
            { label: "-" },
            { label: "*" },
            { label: "/" },
        ]
    }
})();