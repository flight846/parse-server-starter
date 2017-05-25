(function() {
    'use strict';

    angular
        .module('App')
        .controller('homeCtrl', homeCtrl);

        function homeCtrl() {
            var vm = this;

            vm.logout = function() {
                Parse.User.logOut();
                console.log("Logged out");
            }
        }
})();
