(function() {
    'use strict';

    angular.module('mRD')
    .controller('SettingsCtrl', SettingsCtrl); 

    function SettingsCtrl ($scope, $ionicLoading, $ionicPopup, $q, MyRemoteFactory) {
        
        var vm = this;
        vm.saveSettings = saveSettings;
        vm.createTables = createTables;
        vm.deleteDataPopup = deleteDataPopup;
        vm.deleteData = deleteData;
        vm._userSettings = angular.copy(MyRemoteFactory.getUserSettings());
        
        
        function accomplishedPopup (title, message, headerClass) {
            var alertPopup = $ionicPopup.alert({
             title: title,
             template: message,
             cssClass : headerClass    
           });
        }

        function saveSettings (newSettings) {
            MyRemoteFactory.updateUserSettings(newSettings);
        }

        function createTables () {
            $ionicLoading.show();
            MyRemoteFactory.createTables().then(
                function (data) {
                    accomplishedPopup('Done!',data.message, 'header-positive');
                    $ionicLoading.hide();
                },
                function (message) {
                    accomplishedPopup('error',message, 'header-assertive');
                    $ionicLoading.hide();
                }
            );

        }

        function deleteDataPopup () {
           var confirmPopup = $ionicPopup.confirm({
             title: 'Warning',
             template: 'Are you sure you want to delete all the data?',
             okType : 'button-assertive',
             cssClass : 'header-assertive'   
           });
           confirmPopup.then(function(proceed) {
             if(proceed) {
               vm.deleteData();
             } 
           });
        };



        function deleteData () {
            $ionicLoading.show();
            MyRemoteFactory.deleteData().then(
                function (data) {
                    accomplishedPopup('Done!',data.message, 'header-positive');
                    $ionicLoading.hide();
                },
                function (message) {
                    accomplishedPopup('error',message, 'header-assertive');
                    $ionicLoading.hide();
                }
            );

        }

    };

})();