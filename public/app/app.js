(function() {
    'use strict';

    angular
        .module('App', ['ui.router', 'ngMessages'])
        .config(config)
        .run(run);

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.hashPrefix('');

        // app routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/signup/signup.html',
                controller: 'signupCtrl',
                controllerAs: 'vm'
            })
            .state('account', {
                url: '/account',
                templateUrl: 'app/account/account.html',
                controller: 'accountCtrl',
                controllerAs: 'vm'
            });

        // default route
        $urlRouterProvider.otherwise("/");
    }

    function run() {
        // Initialise Parse
        Parse.initialize("myAppId");
        Parse.serverURL = 'http://localhost:1337/parse';

        // run
    }
})();
