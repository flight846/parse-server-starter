(function() {
    'use strict';

    angular
        .module('App')
        .controller('loginCtrl', loginCtrl);

    function loginCtrl($state, AuthService) {
        var vm = this;

        vm.formData = {
            "email": "",
            "password": ""
        }

        vm.login = function(form) {
            console.log("LoginCtrl::Login");
            if (form.$valid) {
                console.log("LoginCtrl::Login");
                AuthService.login(vm.formData.email, vm.formData.password)
                    .then(function() {
                        // redirect
                        $state.go('home');
                    })
            } else {
                console.log("LoginCtrl::Form Invalid");
            }
        }
    }
})();
