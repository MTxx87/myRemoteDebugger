angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, trackingService) { 
    
    $scope.initialize = function (user,url) {
       trackingService.initializeSession('matteo','http://www.matteotoninidev.altervista.org/backend/backend.php');  
    }
    
    $scope.close = function () {
       trackingService.closeSession();
    }
    
    $scope.close = function () {
       trackingService.closeSession();
    }
    
    $scope.trace = function () {
       trackingService.trace('this is ?^# demà tr°ce');
    }
    
    $scope.info = function () {
       trackingService.info('this is a new demo info');
    }
    
     $scope.warn = function () {
       var rawData = {
           name : 'Matteo',
           surname : 'Tonini'
       }     
       trackingService.warn('this is a demo warn', rawData);
    }
    
    $scope.debug = function () {
         var rawData = {
           name : 'Matteo',
           surname : 'Tonini'
       }    
       trackingService.debug('this is a demo debug', rawData);
    }
    
    $scope.error = function () {
         var rawData = {
           name : 'Matteo',
           surname : 'Tonini'
       }    
       trackingService.error('this is a demo error', rawData);
    }
    
    $scope.exceptionCode = function () {
       if (canaja) { console.log("this create an exception"); }    
    }
    
    $scope.exceptionNetwork = function () {
       $http({
         method: 'post', 
         url: 'http://localhost:8888/backend/ApiTest.php' , 
         data : angular.toJson({}),
         timeout: 5000, 
         warningAfter: 2000
       })
        .success(function(data, status, headers, config) {
            console.log(data);
          }).
          error(function(data, status, headers, config) {
            //console.log(data);
        });
    }
    
    $scope.triggerLocalStorageUpload = function () {
        trackingService.sendLocalStorageToServer();
    }
    
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
