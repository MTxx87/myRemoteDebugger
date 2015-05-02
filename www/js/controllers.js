angular.module('starter.controllers', [])

.controller('DashCtrl', function($rootScope, $scope, $http, $ionicModal, $ionicPopup, trackingService) { 
    
    $scope.user = '';
    
    
    $scope.login = function () {
        $ionicModal.fromTemplateUrl('name.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
               $rootScope.modal = modal;
               $rootScope.modal.show();
        });
    }
    
    $scope.closeModal = function (user) {
        trackingService.initializeSession(user,'http://www.matteotoninidev.altervista.org/backend/backend.php'); 
        $rootScope.modal.hide();
    };
    
    $scope.logout = function () {
        trackingService.closeSession();
    }
    
    $scope.exceptionCode = function () {
       if (thisVariable) { console.log("this create an exception"); }    
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
            var myPopup = $ionicPopup.show({
                template: '',
                title: 'Network Error',
                subTitle: 'Can\'t get more newsfeed',
                scope: $scope,
                buttons: [
                  {
                    text: '<b>Close</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                      myPopup.close();
                    }
                  }
                ]
              });
        });
    }
    
})

.controller('ChatsCtrl', function($scope, Chats, trackingService) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
    trackingService.warn('Warning: user removes an element', chat);  
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
   $scope.chat = Chats.get($stateParams.chatId);
    $scope.error = function () {
         if (thisVariable) {
             var msg = 'this piece of code generates an error because thisVariable is not defined';
         } 
    }  
})

.controller('AccountCtrl', function($scope, trackingService) {
  $scope.settings = {
    enableFriends: true
  };
  setTimeout( function () {
        
        trackingService.info('user remains on settings for at least 2 seconds');
        
    }, 2000);    
  trackingService.debug('Debug message on settings', $scope.settings);       
});