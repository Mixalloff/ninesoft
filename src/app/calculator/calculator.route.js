(function() {
    'use strict';
    angular
        .module('app.calculator')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('calculator', {
                    url: '/calculator',
                    templateUrl: 'app/calculator/view.html',
                    controller: 'CalculatorController',
                    controllerAs: 'calc'
                })
            $urlRouterProvider.otherwise('/calculator');
        })
})();