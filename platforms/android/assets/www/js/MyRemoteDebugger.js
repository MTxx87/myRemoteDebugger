//MyRemoteDebugger

angular.module('MyRemoteDebugger',['ng.deviceDetector'])
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.run(function($rootScope, $exceptionHandler, AjaxInterceptor, trackingService,listenToNetwork) {
    
    if (window.cordova) {
        $rootScope.imRunningInCordova = true;
        console.log("im running in cordova");
    } else {
        $rootScope.imRunningInCordova = false;
    }
    
    if(angular.isDefined(navigator.connection)) {
        console.log("è defined, network information è installato");
    }

}).factory('$exceptionHandler', function () {
    return function (exception, cause) {
        EH.exception(exception.message,exception.stack);
    };
}).factory('AjaxInterceptor', ['$q', function ($q) {
    var myInterceptor = {
        'request': function (config) {
            config.msBeforeAjaxCall = new Date().getTime();
            return config;
        },
        'response': function (response) {
            if (response.config.warningAfter) {
                var msAfterAjaxCall = new Date().getTime();
                var timeTakenInMs = 
                      msAfterAjaxCall - response.config.msBeforeAjaxCall;
                if (timeTakenInMs > response.config.warningAfter) {
                    var message = 'WARNING: http call takes more than ' + response.config.warningAfter + 'milliseconds to respond';
                    EH.warn(message,response);
                }
            }
            return response;
        },
        'responseError': function (rejection) {;
            if (angular.isUndefined(rejection.config.donothandle)) {
                var errorMessage = "timeout";
                if (rejection.status != 0) {
                    message = 'HTTP ERROR: ' + rejection.statusText;
                } else {
                    message = 'INTERNAL TIMEOUT: http call didn\'t respond after ' + rejection.config.timeout + 'milliseconds';
                }
                EH.exception(message,rejection);
            } else {
                console.log("Error in myRemoteDebugger http handler");
            }
            return $q.reject(rejection);
        }
    };
    return myInterceptor;
}]).factory('trackingService',function ($q, $http, $rootScope, $timeout, $filter, deviceDetector) {
    
    EH = {};
    EH.user = null;
    EH.sessionId = null;
    EH.url = null;
    EH.logCollector = [];
    
    EH.getSessionId = function () {
        return EH.sessionId;
    }
    
    EH.getCurrentDate = function () {
        var d = new Date();
        var filtered = $filter('date')(d,'yyyy-MM-dd');
        var date = filtered.toString(); 
        return date;
    }
    
    EH.getCurrentTime = function () {
        var d = new Date();
        var filtered = $filter('date')(d,'HH:mm:ss');
        var time = filtered.toString(); 
        return time;
    }
    
    EH.initializeSession = function (user, url) {
        if (angular.isDefined(user) && angular.isDefined(url) && !EH.sessionId) {
            
            var d = new Date();
            EH.sessionId = Date.parse(d);
            EH.url = url;
            if ($rootScope.imRunningInCordova) {
                if (angular.isDefined(device)) {
                    var OS =  device.version;
                    var platform = device.platform;
                    var model = device.model;
                } else {
                    console.log("please install device Cordova plugin");
                    var OS =  deviceDetector.os + " v. " + deviceDetector.os_version;
                    var platform = deviceDetector.browser + " v. " + deviceDetector.browser_version;
                    var model = deviceDetector.device; 
                }
            } else {
               var OS =  deviceDetector.os + " v. " + deviceDetector.os_version;
               var platform = deviceDetector.browser + " v. " + deviceDetector.browser_version;
               var model = deviceDetector.device; 
            }
            data = {
                user: user,
                startTime : EH.getCurrentTime(),
                startDate : EH.getCurrentDate(),
                sessionId : EH.sessionId,
                method : 'trace/sessionStart',
                os : OS,
                platform : platform,
                model: model
            };
            EH.send(data);
            
//            check for previous session log stored
//            if (localStorage) {
//              if (window.localStorage.getItem('logCollector') !== null) {
//                   console.log("eccomi");
//                   EH.sendLocalStorageToServer();
//                }  
//            }
            
        } else {
            console.log("another session is running");
        }
    };
    
    EH.closeSession = function () {
        if (EH.sessionId) {
            data = {
                sessionId : EH.sessionId,
                stopTime : EH.getCurrentTime(),
                stopDate : EH.getCurrentDate(),
                method : 'trace/sessionStop'
            };
            EH.send(data);
            EH.sessionId = null;
        }
    };
    
    EH.sendToServer = function (dataTrack) {
        $http({method: 'post', url: EH.url, donothandle : true, data : angular.toJson(dataTrack)})
        .success(function(data, status, headers, config) {
            console.log(data);
          }).
          error(function(data, status, headers, config) {
            console.log(data);
            console.log(status);
            //if http request fails then save the track in logCollector in localStorage 
            EH.saveInLocalStorage(dataTrack);
        });
        
    }
    
    EH.saveInLocalStorage = function (data) {
        if (localStorage) {
            if (window.localStorage.getItem('logCollector') !== null) {
                EH.logCollector = angular.fromJson(window.localStorage.getItem('logCollector'));
                console.log('logCollector exist');
            }
            EH.logCollector.push({data : data, sessionId: EH.sessionId});
            localStorage.setItem('logCollector',angular.toJson(EH.logCollector));
        }
    }
    
    EH.sendLocalStorageToServer = function () {
        
        EH.logCollector = angular.fromJson(window.localStorage.getItem('logCollector'));
        if (EH.logCollector.length > 0) {
            function recursive (track_id) {
                $http({method: 'post', url: EH.url, donothandle : true, data : angular.toJson(EH.logCollector[track_id].data)})
                .success(function(data, status, headers, config) {
                    console.log(data);
                    EH.logCollector.shift();
                    if (EH.logCollector.length > 0) {
                        if (localStorage) {
                           localStorage.setItem('logCollector',angular.toJson(EH.logCollector)); 
                        }
                        recursive(0);
                    } else {
                        EH.logCollector = [];
                        localStorage.removeItem('logCollector'); 
                    }
                  }).
                  error(function(data, status, headers, config) {
                    //let's try again in a while
//                    $timeout(function () {
//                        EH.sendLocalStorageToServer();
//                    }, 10000);
                });
            }
            recursive(0);
        }
        
    }
    
    EH.send = function (data) {
        if (angular.isDefined(data)) {
            if ($rootScope.imRunningInCordova) {            
               if (navigator.connection.type != "NONE" && navigator.connection.type != "none") {
                    //I'm running in Cordova and app is connected to the internet
                    console.log("sono connesso e mando i dati al server");
                    EH.sendToServer(data);
               } else {
                   //I'm running in Cordova but app is not connected to the internet
                    console.log("non sono connesso e mando i dati al local storage");
                    EH.saveInLocalStorage(data);
               }
           } else {
               //I'm running in a browser
               EH.saveInLocalStorage(data); //this is for localStorage testing
               //EH.sendToServer(data);
           }
        } else {
            console.log('----> miss data parameter to EH.send function');
        }
    }
    
    EH.trace = function (msg) {
        if (EH.sessionId) {
            data = {
                sessionId : EH.sessionId,
                dateFire : EH.getCurrentDate(),
                timeFire : EH.getCurrentTime(),
                method : 'trace/newItem',
                msg : msg
            }
            EH.send(data);
        } else {
            console.log('----> initialize session before send something to server');
        }
    }
    
     EH.info = function (msg) {
        if (EH.sessionId) {
            data = {
                sessionId : EH.sessionId,
                dateFire : EH.getCurrentDate(),
                timeFire : EH.getCurrentTime(),
                method : 'info/newItem',
                msg : msg
            }
            EH.send(data);
        } else {
            console.log('----> initialize session before send something to server');
        }
    }
    
    EH.warn = function (msg, data) {
        if (EH.sessionId) {
            data = {
                sessionId : EH.sessionId,
                dateFire : EH.getCurrentDate(),
                timeFire : EH.getCurrentTime(),
                method : 'warn/newItem',
                msg : msg,
                data : data
            }
            EH.send(data);
        } else {
            console.log('----> initialize session before send something to server');
        }
    }
    
    EH.debug = function (msg, data) {
        if (EH.sessionId) {
            data = {
                sessionId : EH.sessionId,
                dateFire : EH.getCurrentDate(),
                timeFire : EH.getCurrentTime(),
                method : 'debug/newItem',
                msg : msg,
                data : data
            }
            EH.send(data);
        } else {
            console.log('----> initialize session before send something to server');
        }
    }
    
    EH.error = function (msg, data) {
        if (EH.sessionId) {
            data = {
                sessionId : EH.sessionId,
                dateFire : EH.getCurrentDate(),
                timeFire : EH.getCurrentTime(),
                method : 'error/newItem',
                msg : msg,
                data : data
            }
            EH.send(data);
        } else {
            console.log('----> initialize session before send something to server');
        }
    }
    
    EH.exception = function (msg, data) {
        if (EH.sessionId) {
            data = {
                sessionId : EH.sessionId,
                dateFire : EH.getCurrentDate(),
                timeFire : EH.getCurrentTime(),
                method : 'exception/newItem',
                msg : msg,
                data : data
            }
            EH.send(data);
        } else {
            console.log(data);
            console.log('----> initialize session before send something to server');
        }
    }
    
    return EH;
    
}).service('listenToNetwork', function (trackingService) {

    var setUpListener = function () { 
        
        document.addEventListener('offline', function () {
            console.log("offline " + navigator.connection.type);
            EH.trace('Application goes OFFLINE');
        }, false);

        document.addEventListener('online', function () {
            console.log("online " + navigator.connection.type);
            if (window.localStorage.getItem('logCollector') !== null) {
                EH.sendLocalStorageToServer();
            }

            var msg = 'Application goes ONLINE';
            if (angular.isDefined(navigator.connection)) { 
                msg += '. Connection type: ' + navigator.connection.type;
            } else {
                console.log('----> in order to get the complete information about network, please install network-information cordova plugin');
            }
            EH.trace(msg);
        },false);

        document.addEventListener('pause', function () {
            console.log("pause");
            EH.trace('Application is in background');
        },false);

        document.addEventListener('resume', function () {
            console.log("resume");
            EH.trace('Application retrieved in foreground');
        },false);
    }
    
    document.addEventListener("deviceready", setUpListener, false);
});