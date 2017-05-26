(function() {
    'use strict';

    angular
        .module('App')
        .controller('accountCtrl', accountCtrl);

    function accountCtrl($state, AuthService) {
        var vm = this;

        vm.formData = {
            name: AuthService.user.attributes.name,
            email: AuthService.user.attributes.email
        };

        vm.submit = function (form) {
            if (form.$valid) {
                console.log("AccountCtrl::submit");
                AuthService.update(vm.formData)
                    .then(function() {
                        $state.go('home');
                    });
            }
        };

        vm.logout = function () {
            console.log("AccountCtrl::logout");
            Parse.User.logOut()
                .then(function() {
                    $state.go('home');
                });
        };
    }
})();
