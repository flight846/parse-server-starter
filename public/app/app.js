(function() {
    'use strict';

    angular
        .module('App', ['ngRoute'])
        .config(config);

    function config($httpProvider, $routeProvider, $locationProvider) {
         $locationProvider.hashPrefix('');

         $routeProvider
            .when('/', {
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl',
                controllerAs: 'vm',
                // access: {
                //     restricted: false
                // }
            })
            .when('/resume', {
                templateUrl: 'app/resume/resume.html',
                controller: 'ResumeCtrl',
                controllerAs: 'vm',
                // access: {
                //     restricted: false
                // }
            })
    }
})();
