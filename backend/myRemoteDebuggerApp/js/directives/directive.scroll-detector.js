(function() {
    'use strict';

    angular.module('mRD')
    .directive('scrollDetector', scrollDetector);
    
    scrollDetector.$inject = ['$ionicScrollDelegate'];
    
    function scrollDetector ($ionicScrollDelegate) {
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
    };
    
})();