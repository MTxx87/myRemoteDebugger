angular.module('starter.services', [])

.factory('MyRemoteFactory', function($http, COLORS) {
  
    var factory = {};
    var colorAssociation = [];
    
    factory.getSessions = function (startId, deferred) {
        
        data = {
            method : 'interface/getSessions',
            id : startId
        }

        $http({method: 'post', url: 'http://www.matteotoninidev.altervista.org/backend/frontend.php', data : angular.toJson(data)})
        .success(function(data, status, headers, config) {
            deferred.resolve(data);
          }).
          error(function(data, status, headers, config) {
            console.log(data);
            console.log(status);
            deferred.reject(data);
        });
        
    }
    
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
    
    return factory; 
    
});
