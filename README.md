# myRemoteDebugger
**myRemoteDebugger** is an AngularJS module for web/hybrid applications integrated with Cordova/Phonegap.<br>
It helps to keep track of what happens in the app during external tests. <br>
It sends messages to server and provides a backend interface to take a look at the collected data.<br>
<br>
Take a look at the [Demo](#user-content-myremotedebuggerapp).

#Installation
<h3>Client</h3>
In your index.html:
```HTML
<script src="MyRemoteDebugger.js"></script>
```

Inject module in your application:
```Javascript
angular.module('app', ['MyRemoteDebugger'])
```

<h3>Server</h3>
First **upload /backend folder** to your server, then:
```SQL
CREATE DATABASE my_myremotedebugger;
```
Open in a browser:
```
http://<path to your server>/backend/myRemoteDebuggerApp/
```

Set up your settings:

<ul>
<li> <strong>URL:</strong> http://<i>&lt;path to your server&gt;</i>/backend/Api/frontend.php</li>
<li> <strong>Database:</strong> <i>&lt;name of your database&gt;</i></li>
<li> <strong>Username:</strong> <i>&lt;username of your database&gt;</i></li>
<li> <strong>Password:</strong> <i>&lt;password of your database&gt;</i></li>
</ul>

Click on **Create tables** button.

DONE!!

#Usage

myRemoteDebugger provides **trackingService** interface to send messages to server.<br>
Every message is considered to be an EVENT. <br> Events are organized in SESSIONS.

Inject trackingService in your controller/service:
```Javascript
angular.module('app.controllers', [])
.controller('AppCtrl', function(trackingService) { }); 
```

#Functions
<h3>Init Session</h3>
```Javascript
trackingService.initializeSession('John','http://www.matteotoninidev.altervista.org/backend/Api/backend.php','myApp', '0.01')
```
Params: 
<ul>
<li> <strong>user</strong>(required): <i>&lt;user of your application&gt;</i></li>
<li> <strong>url</strong>(required): http://<i>&lt;path to your server&gt;</i>/backend/Api/backend.php</li>
<li> <strong>appName:</strong> <i>&lt;name of your application&gt;</i></li>
<li> <strong>appVersion:</strong> <i>&lt;version of your application&gt;</i></li>
</ul>

Provides also informations about device/browser where the application is running.
Cordova/Phonegap applications require [device plugin](https://github.com/apache/cordova-plugin-device).

<h3>Close Session</h3>
```Javascript
trackingService.closeSession();
```

<h3>Trace</h3>
```Javascript
trackingService.trace('this is a trace message', data);
```

It fires automatically on **$stateChangeSuccess** to track the user route in the application.<br>
It fires automatically on online/offline/pause/resume events in Cordova/Phonegap applications<br> (requires [network information plugin](https://github.com/apache/cordova-plugin-network-information) ) 

<h3>Info</h3>
```Javascript
trackingService.info('this is an info message');
```

<h3>Debug</h3>
```Javascript
trackingService.debug('this useful to debug data', data);
```

<h3>Warn</h3>
```Javascript
trackingService.warn('this is a warning message', data);
```

It fires automatically when an $http call respond in more time than milliseconds specified in **warningAfter** parameter. <br>
Example:
```Javascript
$http({
     method: method, 
     url: url , 
     data : data,
     timeout: 5000, 
     warningAfter: 2000
 })
 .success(function(data, status, headers, config) {})
 .error(function(data, status, headers, config) {})
```

<h3>Error</h3>
```Javascript
trackingService.error('this is an error message', data);
```

<h3>Exception</h3>
```Javascript
trackingService.exception('this is an exception message', data);
```
It fires automatically when **$exceptionHandler** caught an exception in Javascript code.<br>
It fires automatically when $http call doesn't respond after the time specified in **timeout** parameter.<br>
Example:
```Javascript
$http({
     method: method, 
     url: url , 
     data : data,
     timeout: 5000, 
     warningAfter: 2000
 })
 .success(function(data, status, headers, config) {})
 .error(function(data, status, headers, config) {})
```
#myRemoteDebuggerApp

It provides access to all the collected data.
You can reach it at:
```
http://<path to your server>/backend/myRemoteDebuggerApp/
```

Features:
<ul>
<li>Pull-to-refresh</li>
<li>SESSIONS: Drag to the left the list element to get more info</li>
<li>EVENTS: Tap on the list element to get more info</li>
<li>Delete all the data</li>
<li>Search/filter sessions and events</li>
</ul>

<ul><li><h4><a target="_blank" href="http://matteotoninidev.altervista.org/myRemoteDebugger/backend/myRemoteDebuggerApp/">Demo Application</a></h4></li></ul>

