(function() {
    'use strict';

    angular
        .module('App')
        .factory('AuthService', AuthService);

    function AuthService($q, $window) {
        var service = {};

        service.login = login;
        service.signup = signup;
        service.user = Parse.User.current();
        service.update = update;

        return service;

        function login(email, password) {
            var d = $q.defer();

            Parse.User.logIn(email, password, {
                success: function(user) {
                    console.log('Login Sucessful!');
                    service.user = user;
                    // resolve the promise after success
                    d.resolve(service.user);
                },
                error: function(user, error) {
                    // show ionic popup
                    $window.alert(error.message);

                    d.reject(error);
                }
            })

            return d.promise;
        };

        function signup (email, name, password) {
            var d = $q.defer();

            // create a new parse user
            var user = new Parse.User();
            user.set('username', email);
            user.set('name', name);
            user.set('password', password);
            user.set('email', email);

            // create on parse database
            user.signUp(null, {
                success: function(user) {
                    console.log('Account created!');
                    service.user = user;
                    // resolve the promise after success
                    d.resolve(service.user);
                },
                error: function(user, error) {
                    // show ionic popup
                    $window.alert(error.message);

                    d.reject(error);
                }
            })

            return d.promise;
        };

        function update(data)  {
            var d = $q.defer();

            var user = service.user;
            user.set('username', data.email);
            user.set('name', data.name);
            user.set('email', data.email);

            user.save(null, {
                success: function(user) {
                    service.user = user;
                    d.resolve(service.user);
                },
                error: function(user, error) {
                    console.log("User cannot be update.", error);
                    service.errors = error.message;
                    d.reject(error);
                }
            })

            return d.promise;
        };
    };
})();
