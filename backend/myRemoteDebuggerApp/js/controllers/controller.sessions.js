(function() {
    'use strict';

    angular.module('mRD')
    .controller('SessionsCtrl', SessionsCtrl);
    
    SessionsCtrl.$inject = [
        '$scope', 
        '$ionicModal', 
        '$ionicListDelegate', 
        '$ionicScrollDelegate', 
        '$ionicLoading', 
        'MyRemoteFactory'
    ];
    
    function SessionsCtrl ( $scope, $ionicModal, $ionicListDelegate, $ionicScrollDelegate, $ionicLoading, MyRemoteFactory) {
        
        var vm = this;
        vm.isError = false;
        vm.showInfoModal = showInfoModal;
        vm.closeInfoModal = closeInfoModal;
        vm.doRefresh = doRefresh;
        vm.scrollTop = scrollTop;

        function showInfoModal (session) {
            $ionicListDelegate.closeOptionButtons();
            vm.moreInfo = session;
            vm.modal.show();
        }

       function closeInfoModal () {
            vm.modal.hide();
        }
        
        function doRefresh () {
            getSessions(0,false);
        }

        function scrollTop () {
            $ionicScrollDelegate.scrollTop(true);
        };
        
        function getSessions (startId, showLoader) {
            if (showLoader) { $ionicLoading.show(); }
            MyRemoteFactory.getSessions(startId).then(
                function (data) {
                    data = MyRemoteFactory.giveColor(data);
                    console.log(data);
                    vm.sessions = data;
                    //this hide the pull to refresh spinner
                    if (showLoader) { $ionicLoading.hide(); }
                    else { $scope.$broadcast('scroll.refreshComplete'); }
                },
                function (message) {
                    console.log(message);
                    vm.errorMessage = message;
                    vm.sessions = [];
                    //this hide the pull to refresh spinner
                    $scope.$broadcast('scroll.refreshComplete');
                    $ionicLoading.hide();
                }
            );

        }
        
        $scope.$on('failLoadResources', function () {
            vm.isError = true;
        });
        
        $scope.$on('successLoadResources', function () {
            vm.isError = false;
        });

        $scope.$on('$destroy', function() {
            vm.modal.remove();
        });
        
        $ionicModal.fromTemplateUrl('moreInfo.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
               vm.modal = modal;
        });

        getSessions(0,true);

    };

})();