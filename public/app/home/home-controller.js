(function() {
    'use strict';

    angular
        .module('App')
        .controller('homeCtrl', homeCtrl);

        function homeCtrl($state, AuthService) {
            var vm = this;

            vm.user = "User";

            vm.loggedIn = false;

            if (Parse.User.current()) {
                vm.user = AuthService.user.attributes.name;
                vm.loggedIn = true;
            }

            vm.logout = function () {
               console.log("HomeCtrl::logout");
               Parse.User.logOut().then(function() {
                   $state.go('login');
               });
           };
        }
})();
