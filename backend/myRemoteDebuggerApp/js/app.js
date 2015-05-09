// mRD frontend viewer

(function() {
    'use strict';

    angular.module('mRD', ['ionic'])
    .run(run)
    .config(config)

    run.$inject = [
        '$rootScope', 
        '$ionicPlatform',
        '$exceptionHandler',
        'MyRemoteFactory'
    ];

    function run ($rootScope, $ionicPlatform, $exceptionHandler, MyRemoteFactory) {
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

    }

    config.$inject = [
        '$httpProvider', 
        '$stateProvider',
        '$urlRouterProvider',
    ];

    function config ($httpProvider, $stateProvider, $urlRouterProvider) {

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

    }
    
})();