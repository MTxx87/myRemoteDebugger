angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http, $ionicModal, trackingService) { 
    
    $scope.user = 'your name';
    
    $scope.initialize = function (user,url) {
       trackingService.initializeSession($scope.user,'http://www.matteotoninidev.altervista.org/backend/backend.php');  
    }
    
    $ionicModal.fromTemplateUrl('name.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
           $scope.modal = modal;
           $scope.modal.show();
    });
    
    $scope.closeModal = function () {
        $scope.modal.hide();
    }
    
    $scope.close = function () {
       trackingService.closeSession();
    }
    
    $scope.trace = function () {
       trackingService.trace('This is useful to trace the user path in application');
    }
    
    $scope.info = function () {
       trackingService.info('this is useful to send some infos');
    }
    
     $scope.warn = function () {
       var rawData = {
           name : $scope.user,
       }     
       trackingService.warn('this is a warning, for example it fire automatically when http calls tooks more than 2seconds to respond, but you can fire it by yourself too!', rawData);
    }
    
    $scope.debug = function () {
         var rawData = {
           name : $scope.user,
       }    
       trackingService.debug('this is a debug message and you can attach to it some data', rawData);
    }
    
    $scope.error = function () {
         var rawData = {
           name : 'Matteo',
           surname : 'Tonini'
       }    
       trackingService.error('this is an error and you can attach some data too', rawData);
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
            //console.log(data);
        });
    }
    
    $scope.triggerLocalStorageUpload = function () {
        trackingService.sendLocalStorageToServer();
    }
    
})