(function() {
    'use strict';

    angular
        .module('App')
        .controller('signupCtrl', signupCtrl);

    function signupCtrl($state, AuthService) {
        var vm = this;

        vm.formData = {
            "name": "",
            "email": "",
            "password": "",
            "passwordAgain": ""
        };

        vm.errors;

        // => ng-submit="signup(signupForm)"
        vm.signup = function (form) {
            console.log("SignupCtrl::signup");
            if (form.$valid && vm.formData.password == vm.formData.passwordAgain) {
                console.log("SignupCtrl::Form valid");
                AuthService.signup(vm.formData.email, vm.formData.name, vm.formData.password)
                    .then(function() {
                        // redirect
                        $state.go('home');
                    });
            } else {
                console.log("SignupCtrl::Form Invalid");
                $window.alert(error.message);
            }
        };
    }
})();
