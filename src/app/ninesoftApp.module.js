(function() {
    'use strict';
    angular
        .module('app',
        [
            'app.core',
            'app.calculator'
        ])
        .run(function($http, $cookies, $rootScope) {
                $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
                $http.defaults.headers.common['X-CSRFToken'] = $cookies.csrftoken;

                // Обработка специфичных ошибок
                $rootScope.$on('$stateChangeError', function() {
                    var error = arguments[5];
                    throw error;
                });
            }
        );
})();
