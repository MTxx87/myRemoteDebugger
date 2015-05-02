angular.module('mRD.services', [])

.factory('MyRemoteFactory', function($rootScope, $http, COLORS, MESSAGES) {
  
    var factory = {};
    var colorAssociation = [];
    var userSettings = {
        url : 'http://www.matteotoninidev.altervista.org/backend/frontend.php',
        database : 'my_matteotoninidev',
        username : '',
        password : ''
    };
    
    factory.databaseCall = function (data, deferred) {
        
        $http({method: 'post', url: userSettings.url, data : angular.toJson(data)})
        .success(function(data, status, headers, config) {
            if (typeof data !== 'object' && typeof data === 'string') {
                $rootScope.$broadcast('failLoadResources');
                deferred.reject(data);
            } else if (typeof data !== 'object' && typeof data !== 'string') {
                $rootScope.$broadcast('failLoadResources');
                deferre.reject(MESSAGES['database']);
            } 
            else {
                $rootScope.$broadcast('successLoadResources');
                deferred.resolve(data);
            }
          }).
          error(function(data, status, headers, config) {
            $rootScope.$broadcast('failLoadResources');
            if (angular.isDefined(MESSAGES[status])) {
                var message = MESSAGES[status];  
            } else {
                var message = MESSAGES['unknown'];
            }
            deferred.reject(message);
        });
    
    }
    
    factory.getSessions = function (startId, deferred) {
        
        data = {
            method : 'interface/getSessions',
            id : startId,
            userSettings : userSettings
        }

        factory.databaseCall(data,deferred);
    }
    
    factory.getSingleSession = function (sessionId, deferred) {
        
        data = {
            method : 'interface/getSingleSession',
            id : sessionId,
            userSettings : userSettings
        }

        factory.databaseCall(data,deferred);
    
    };
    
    factory.giveColor = function (sessions) {
        var index = 0;
        var indexMax = COLORS.length;
        for (i=0; i< sessions.length; i++) {
            
            if (i == 0) {
                colorAssociation.push({'user': sessions[i].user, 'color' : COLORS[index]});
                sessions[i].color = COLORS[index];
            } else {
                if (sessions[i].user != sessions[i-1].user) { 
                    if (index == indexMax - 1) { index = 0; } else { index++; } 
                }
                colorAssociation.push({'user': sessions[i].user, 'color' : COLORS[index]}); 
                sessions[i].color = COLORS[index];
            }
         
        };
        
        return sessions;
    }
    
    factory.initUserSettings = function () {
        if (localStorage) {
            if (window.localStorage.getItem('userSettings') !== null) {
                userSettings = angular.fromJson(window.localStorage.getItem('userSettings'));
            }
        }
    }
    
    factory.getUserSettings = function () {
        return userSettings;
    }
    
    factory.updateUserSettings = function (newSettings) {
        userSettings = newSettings;
        if (localStorage) {
            window.localStorage.setItem('userSettings', angular.toJson(newSettings));
        }
    }
    
    factory.formatData = function (swap) {
        var swap = swap.replace(/\\\//g, '/');
        swap = angular.fromJson(swap);
        if (typeof swap === 'object') {
            swap = JSON.stringify(swap,null,"    ");
        } else {
            swap = swap.trim();
        }
        return swap;
    }
    
    return factory; 
    
});
