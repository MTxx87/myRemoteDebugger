(function() {
    'use strict';

    angular.module('mRD')
    .controller('SessionDetailCtrl', SessionDetailCtrl); 

    function SessionDetailCtrl ($scope, $stateParams, $q, $ionicScrollDelegate, $ionicModal, $ionicLoading, MyRemoteFactory, ICONS) {
        
        var vm = this;
        vm.sessionId = $stateParams.sessionId;
        vm.icons = ICONS;
        vm.showInfoModal = showInfoModal;
        vm.closeInfoModal = closeInfoModal;
        vm.doRefresh = doRefresh;
        vm.scrollTop = scrollTop;
        
        function showInfoModal (event) {
            vm.moreDetailInfo = angular.copy(event);
            if (vm.moreDetailInfo.data) {
                vm.moreDetailInfo.data = MyRemoteFactory.formatData(vm.moreDetailInfo.data);      
            }
            vm.modal.show();
        }

        function closeInfoModal () {
            vm.modal.hide();
            vm.moreDetailInfo = {};
        }
        
        
        function doRefresh () {
            getSingleSession(vm.sessionId, false);
        }

        function scrollTop () {
            $ionicScrollDelegate.scrollTop(true);
        };

        function getSingleSession (sessionId, showLoader) {
            if (showLoader) { $ionicLoading.show(); }
            MyRemoteFactory.getSingleSession(sessionId).then(
                function (data) {
                    console.log(data);
                    vm.session = data;
                    //this hide the pull to refres spinner or loader
                    if (showLoader) {  $ionicLoading.hide(); }
                    else { $scope.$broadcast('scroll.refreshComplete'); }

                },
                function (message) {
                    console.log(message);
                    vm.errorMessage = message;
                    vm.session = [];
                    //this hide the pull to refres spinner or loader
                    if (showLoader) {  $ionicLoading.hide(); }
                    else { $scope.$broadcast('scroll.refreshComplete'); }
                }
            );

        }

        getSingleSession(vm.sessionId, true);
        
        $scope.$on('failLoadResources', function () {
            vm.isError = true;
        });
        $scope.$on('successLoadResources', function () {
            vm.isError = false;
        });

        $scope.$on('$destroy', function() {
            vm.modal.remove();
        });

        $ionicModal.fromTemplateUrl('moreDetailInfo.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
               vm.modal = modal;
        });


    };

})();