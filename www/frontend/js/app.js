// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mRD', ['ionic', 'mRD.controllers', 'mRD.services'])

.run(function($rootScope, $ionicPlatform, $exceptionHandler, MyRemoteFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    
    MyRemoteFactory.initUserSettings();  
      
  });
    
})

.config(function($httpProvider, $stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:


  .state('tab.sessions', {
      url: '/sessions',
      views: {
        'tab-sessions': {
          templateUrl: 'templates/tab-sessions.html',
          controller: 'SessionsCtrl'
        }
      }
    })
    .state('tab.session-detail', {
      url: '/sessions/:sessionId',
      views: {
        'tab-sessions': {
          templateUrl: 'templates/session-detail.html',
          controller: 'SessionDetailCtrl'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/sessions');

}).constant('COLORS', ['positive','calm','assertive','balanced','energized','royal','dark']
).constant('MESSAGES', {
    unknown : 'Unespected Error, please check your settings',
    database : 'Error in retrieve data from database',
    404 : 'Not Found, please check your URL in settings',
    500 : 'Internal server Error, please check your URL in settings'
}).constant('ICONS', {
    trace : 'ion-steam icon-balanced',
    info : 'ion-information-circled icon-calm',
    debug : 'ion-code icon-royal',
    warn : 'ion-alert-circled icon-energized',
    error : 'ion-close-circled icon-assertive',
    exception : 'ion-close-circled icon-assertive'
}).directive("scrollDetector", function ($ionicScrollDelegate) {
    return function(scope, element, attrs) {
        angular.element(element).bind("scroll", function() {
            if ( $ionicScrollDelegate.getScrollPosition().top > element[0].offsetHeight * 2) {
                
                element.parent().find('scrolltop').addClass('show');
            } else {
                element.parent().find('scrolltop').removeClass('show');
            }
            scope.$apply();
        });
    };
});