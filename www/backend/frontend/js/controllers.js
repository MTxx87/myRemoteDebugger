angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($window, $scope, $q, $ionicScrollDelegate, MyRemoteFactory) {
    
    function getSessions (startId) {
        D_sessions = $q.defer();
        P_sessions = D_sessions.promise;

        P_sessions.then(
            function (data) {
                data = MyRemoteFactory.giveColor(data);
                console.log(data);
                $scope.sessions = data;
                $scope.last = 0;
                $scope.$broadcast('scroll.refreshComplete');
            },
            function (data) {
                console.log(data);
            }
        );
        
        MyRemoteFactory.getSessions(startId,D_sessions);
    }
    
    getSessions(0);
    
    $scope.doRefresh = function () {
        getSessions(0);
    }
    
    $scope.scrollTop = function() {
        console.log("ciao");
        $ionicScrollDelegate.scrollTop(true);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams) {
 
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
