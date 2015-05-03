# myRemoteDebugger
**myRemoteDebugger** is an AngularJS module for web/hybrid applications. It is also integrated with Cordova/Phonegap.
It helps to keep track of what happens in the app during external tests. It sens messages to server and providing a backend interface to take a look at the collected data.

#Installation
<h3>Client</h3>
In your index.html:
```HTML
<script src="MyRemoteDebugger.js"></script>
```

Injiect module in your application:
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
