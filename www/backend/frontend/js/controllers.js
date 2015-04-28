angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($window, $scope, $q, $ionicScrollDelegate, MyRemoteFactory) {
    
    $scope.$on('failLoadResources', function () {
        $scope.isError = true;
    });
    $scope.$on('successLoadResources', function () {
        $scope.isError = false;
    });
    
    function getSessions (startId) {
        D_sessions = $q.defer();
        P_sessions = D_sessions.promise;

        P_sessions.then(
            function (data) {
                data = MyRemoteFactory.giveColor(data);
                console.log(data);
                $scope.sessions = data;
                //this hide the pull to refres spinner
                $scope.$broadcast('scroll.refreshComplete');
            },
            function (message) {
                console.log(message);
                $scope.errorMessage = message;
                $scope.sessions = [];
                //this hide the pull to refres spinner
                $scope.$broadcast('scroll.refreshComplete');
            }
        );
        
        MyRemoteFactory.getSessions(startId,D_sessions);
    }
    
    getSessions(0);
    
    $scope.doRefresh = function () {
        getSessions(0);
    }
    
    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop(true);
    };
    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $q, MyRemoteFactory, ICONS) {
    
    $scope.session = {
        info : angular.fromJson($stateParams.session),
        data : []
    }
    $scope.icons = ICONS;
    
    $scope.$on('failLoadResources', function () {
        $scope.isError = true;
    });
    $scope.$on('successLoadResources', function () {
        $scope.isError = false;
    });
    
    function getSingleSession (sessionId) {
        D_single = $q.defer();
        P_single = D_single.promise;

        P_single.then(
            function (data) {
                console.log(data);
                $scope.session.data = data;
                //this hide the pull to refres spinner
                $scope.$broadcast('scroll.refreshComplete');
            },
            function (message) {
                console.log(message);
                $scope.errorMessage = message;
                $scope.session.data = [];
                //this hide the pull to refres spinner
                $scope.$broadcast('scroll.refreshComplete');
            }
        );
        
        MyRemoteFactory.getSingleSession(sessionId,D_single);
    }
    
    getSingleSession($scope.session.info.sessionId);
    
    $scope.doRefresh = function () {
        getSingleSession($scope.session.info.sessionId);
    }
    
    $scope.scrollTop = function() {
        $ionicScrollDelegate.scrollTop(true);
    };
    
})

.controller('AccountCtrl', function($scope, MyRemoteFactory) {
    $scope._userSettings = angular.copy(MyRemoteFactory.getUserSettings());
    console.log($scope._userSettings);
    
    $scope.saveSettings = function (newSettings) {
        MyRemoteFactory.updateUserSettings(newSettings);
    }
    
});
