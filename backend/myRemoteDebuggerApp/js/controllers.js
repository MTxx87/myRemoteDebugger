angular.module('mRD.controllers', [])

.controller('SessionsCtrl', function($window, $scope, $q, $ionicModal, $ionicListDelegate, $ionicScrollDelegate, $ionicLoading, MyRemoteFactory) {
    
    $scope.$on('failLoadResources', function () {
        $scope.isError = true;
    });
    $scope.$on('successLoadResources', function () {
        $scope.isError = false;
    });
    
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    $ionicModal.fromTemplateUrl('moreInfo.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
           $scope.modal = modal;
    });
    
    $scope.showInfoModal = function (session) {
        $ionicListDelegate. closeOptionButtons();
        $scope.moreInfo = session;
        $scope.modal.show();
    }
    
    $scope.closeInfoModal = function () {
        $scope.modal.hide();
    }
     
    
    function getSessions (startId, showLoader) {
        if (showLoader) { $ionicLoading.show(); }
        D_sessions = $q.defer();
        P_sessions = D_sessions.promise;

        P_sessions.then(
            function (data) {
                data = MyRemoteFactory.giveColor(data);
                console.log(data);
                $scope.sessions = data;
                //this hide the pull to refres spinner
                if (showLoader) { $ionicLoading.hide(); }
                else { $scope.$broadcast('scroll.refreshComplete'); }
            },
            function (message) {
                console.log(message);
                $scope.errorMessage = message;
                $scope.sessions = [];
                //this hide the pull to refres spinner
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            }
        );
        
        MyRemoteFactory.getSessions(startId,D_sessions);

    }
    
    getSessions(0,true);
    
    $scope.doRefresh = function () {
        getSessions(0,false);
    }
    
    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop(true);
    };
    
})

.controller('SessionDetailCtrl', function($scope, $stateParams, $q, $ionicScrollDelegate, $ionicModal, $ionicLoading, MyRemoteFactory, ICONS) {
    
    $scope.sessionId = $stateParams.sessionId;
    $scope.icons = ICONS;
    
    $scope.$on('failLoadResources', function () {
        $scope.isError = true;
    });
    $scope.$on('successLoadResources', function () {
        $scope.isError = false;
    });
    
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    $ionicModal.fromTemplateUrl('moreDetailInfo.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
           $scope.modal = modal;
    });
    
    $scope.showInfoModal = function (event) {
        $scope.moreDetailInfo = angular.copy(event);
        if ($scope.moreDetailInfo.data) {
            $scope.moreDetailInfo.data = MyRemoteFactory.formatData($scope.moreDetailInfo.data);      
        }
        $scope.modal.show();
    }
    
    $scope.closeInfoModal = function () {
        $scope.modal.hide();
        $scope.moreDetailInfo = {};
    }
    
    function getSingleSession (sessionId, showLoader) {
        if (showLoader) { $ionicLoading.show(); }
        D_single = $q.defer();
        P_single = D_single.promise;

        P_single.then(
            function (data) {
                console.log(data);
                $scope.session = data;
                //this hide the pull to refres spinner or loader
                if (showLoader) {  $ionicLoading.hide(); }
                else { $scope.$broadcast('scroll.refreshComplete'); }
               
            },
            function (message) {
                console.log(message);
                $scope.errorMessage = message;
                $scope.session = [];
                //this hide the pull to refres spinner or loader
                if (showLoader) {  $ionicLoading.hide(); }
                else { $scope.$broadcast('scroll.refreshComplete'); }
            }
        );
        
        MyRemoteFactory.getSingleSession(sessionId,D_single);
    }
    
    getSingleSession($scope.sessionId, true);
    
    $scope.doRefresh = function () {
        getSingleSession($scope.sessionId, false);
    }
    
    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop(true);
    };
    
})

.controller('SettingsCtrl', function($scope, MyRemoteFactory) {
    $scope._userSettings = angular.copy(MyRemoteFactory.getUserSettings());
    console.log($scope._userSettings);
    
    $scope.saveSettings = function (newSettings) {
        MyRemoteFactory.updateUserSettings(newSettings);
    }
    
});
