(function() {
    'use strict';

    angular.module('mRD')    
    .constant('COLORS', ['positive','calm','assertive','balanced','energized','royal','dark'])
    .constant('MESSAGES', {
        unknown : 'Unespected Error, please check your settings',
        database : 'Error in retrieve data from database',
        404 : 'Not Found, please check your URL in settings',
        500 : 'Internal server Error, please check your URL in settings'})
    .constant('ICONS', {
        trace : 'ion-steam icon-balanced',
        info : 'ion-information-circled icon-calm',
        debug : 'ion-code icon-royal',
        warn : 'ion-alert-circled icon-energized',
        error : 'ion-close-circled icon-assertive',
        exception : 'ion-close-circled icon-assertive'})
    .constant('$ionicLoadingConfig', {
        template: '<ion-spinner icon="android"></ion-spinner>',
        noBackdrop : true,
    })

})();
