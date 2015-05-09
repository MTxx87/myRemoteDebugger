// mRD frontend viewer

angular.module('mRD', ['ionic'])

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

    
  $stateProvider

    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })


  .state('tab.sessions', {
      url: '/sessions',
      views: {
        'tab-sessions': {
          templateUrl: 'templates/tab-sessions.html',    
          controller : "SessionsCtrl as vm"
        }
      }
    })
    .state('tab.session-detail', {
      url: '/sessions/:sessionId',
      views: {
        'tab-sessions': {
          templateUrl: 'templates/session-detail.html',
          controller: 'SessionDetailCtrl as vm'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl as vm'
      }
    }
  });

  // default state
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
}).constant('$ionicLoadingConfig', {
    template: '<ion-spinner icon="android"></ion-spinner>',
    noBackdrop : true,
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