(function() {
    'use strict';
    angular
        .module('app.comments')
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.comments', {
                    url: '/comments',
                    templateUrl: 'app/comments/view.html',
                    controller: 'CommentsController',
                    controllerAs: 'com'
                })
        })
})();