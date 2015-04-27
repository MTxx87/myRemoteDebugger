angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) { 
    
    data = {
        method : 'interface/getSessions'
    }
    
    $http({method: 'post', url: 'http://www.matteotoninidev.altervista.org/backend/frontend.php', data : angular.toJson(data)})
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.sessions = data;
          }).
          error(function(data, status, headers, config) {
            console.log(data);
            console.log(status);
        });
    
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
