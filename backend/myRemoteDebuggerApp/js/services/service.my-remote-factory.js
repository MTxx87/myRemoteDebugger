(function() {
    'use strict';

    angular.module('mRD')
    .factory('MyRemoteFactory', MyRemoteFactory);
    
    MyRemoteFactory.$inject = [
        '$rootScope', 
        '$http', 
        '$q', 
        'COLORS', 
        'MESSAGES'
    ];
    
    function MyRemoteFactory ($rootScope, $http, $q, COLORS, MESSAGES) {
        
        var colorAssociation = [];
        var userSettings = {
            url : 'http://www.matteotoninidev.altervista.org/backend/frontend.php',
            database : 'my_matteotoninidev',
            username : '',
            password : ''
        };
        var factory = {
            databaseCall: databaseCall,
            getSessions: getSessions,
            getSingleSession: getSingleSession,
            giveColor : giveColor,
            initUserSettings : initUserSettings,
            getUserSettings : getUserSettings,
            updateUserSettings : updateUserSettings,
            formatData : formatData,
            createTables : createTables,
            deleteData : deleteData
        };
        
        return factory; 

        function databaseCall (data) {
            
            var deferred = $q.defer();
            
            $http({method: 'post', url: userSettings.url, data : angular.toJson(data)})
                .success(databaseCallComplete)
                .error(databaseCallFail);
            
            return deferred.promise;
            
            function databaseCallComplete (data, status, headers, config) {
                if (typeof data !== 'object' && typeof data === 'string') {
                    $rootScope.$broadcast('failLoadResources');
                    deferred.reject(data);
                } else if (typeof data !== 'object' && typeof data !== 'string') {
                    $rootScope.$broadcast('failLoadResources');
                    deferred.reject(MESSAGES['database']);
                } 
                else {
                    $rootScope.$broadcast('successLoadResources');
                    deferred.resolve(data);
                }
            }
            
            function databaseCallFail (data, status, headers, config) {
                $rootScope.$broadcast('failLoadResources');
                if (angular.isDefined(MESSAGES[status])) {
                    var message = MESSAGES[status];  
                } else {
                    var message = MESSAGES['unknown'];
                }
                deferred.reject(message);
            }

        }

        function getSessions (startId) {
                        
            var data = {
                method : 'interface/getSessions',
                id : startId,
                userSettings : userSettings
            }

            return factory.databaseCall(data);
        }

        function getSingleSession (sessionId) {
            
            var data = {
                method : 'interface/getSingleSession',
                id : sessionId,
                userSettings : userSettings
            }

            return factory.databaseCall(data);

        };

        function giveColor (sessions) {
            var index = 0;
            var indexMax = COLORS.length;
            for (var i=0; i< sessions.length; i++) {

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

        function initUserSettings () {
            if (localStorage) {
                if (window.localStorage.getItem('userSettings') !== null) {
                    userSettings = angular.fromJson(window.localStorage.getItem('userSettings'));
                }
            }
        }

        function getUserSettings () {
            return userSettings;
        }

        function updateUserSettings (newSettings) {
            userSettings = newSettings;
            if (localStorage) {
                window.localStorage.setItem('userSettings', angular.toJson(newSettings));
            }
        }

        function formatData (swap) {
            var swap = swap.replace(/\\\//g, '/');
            swap = angular.fromJson(swap);
            if (typeof swap === 'object') {
                swap = JSON.stringify(swap,null,"    ");
            } else {
                swap = swap.trim();
            }
            return swap;
        }

        function createTables () {
            var data = {
                method : 'interface/createTables',
                userSettings : userSettings
            }
            return factory.databaseCall(data);
        }

        function deleteData () {
            var data = {
                method : 'interface/deleteData',
                userSettings : userSettings
            }
            return factory.databaseCall(data);
        }

    };
             
})();
