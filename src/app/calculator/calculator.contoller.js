(function () {
    'use strict';
    angular
        .module('app.calculator')
        .controller('CalculatorController', calculatorController);

    function calculatorController($scope) {
        var vm = this;
        vm.operations = config.operations;
        vm.result = {};
        vm.fractions = [
            { dividend: 0, divider: 0 },
            { dividend: 0, divider: 0 },
        ]

        vm.calculate = calculate;
        vm.isCorrectFractions = isCorrectFractions;

        function calculate() {
            if (!isCorrectFractions()) {
                return;
            }
            var fract1 = vm.fractions[0];
            var fract2 = vm.fractions[1];       
            switch(vm.operation.label) {
                case '+': { addFractions(fract1, fract2); break; }
                case '-': { substractFractions(fract1, fract2); break; }
                case '*': { multFractions(fract1, fract2); break; }
                case '/': { divideFractions(fract1, fract2); break; }
            }
            simplifyFraction();
        }

        function addFractions(fraction1, fraction2) {
            vm.result.dividend = fraction1.dividend * fraction2.divider + fraction2.dividend * fraction1.divider;
            vm.result.divider = fraction1.divider * fraction2.divider;
        }
        function substractFractions(fraction1, fraction2) {
            vm.result.dividend = fraction1.dividend * fraction2.divider - fraction2.dividend * fraction1.divider;
            vm.result.divider = fraction1.divider * fraction2.divider;
        }
        function multFractions(fraction1, fraction2) {
            vm.result.dividend = fraction1.dividend * fraction2.dividend;
            vm.result.divider = fraction1.divider * fraction2.divider;
        }
        function divideFractions(fraction1, fraction2) {
            vm.result.dividend = fraction1.dividend * fraction2.divider;
            vm.result.divider = fraction1.divider * fraction2.dividend;
        }

        function simplifyFraction() {
            var min = Math.min(vm.result.dividend, vm.result.divider);
            for (var i = 2; i <= min / 2; i++) {
                if (!(vm.result.dividend % i) && !(vm.result.divider % i)) {
                    vm.result.dividend /= i;
                    vm.result.divider /= i;
                    simplifyFraction();
                    return;
                }
            }
        }

        function isCorrectFractions() {
            var fract1 = vm.fractions[0];
            var fract2 = vm.fractions[1];   
            if (!vm.operation) return false; 
            if (!vm.fractions[0].divider || !vm.fractions[1].divider) {
                console.warn('Делитель не может быть нулем или неопределен');
                return false;
            }
            if (
                    vm.fractions[0].divider === undefined || 
                    vm.fractions[0].dividend === undefined ||
                    vm.fractions[1].divider === undefined || 
                    vm.fractions[1].dividend === undefined
                ) {
                console.warn('Заполните дроби');
                return false;
            }    
            return true;
            
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