/**
 * Created by sumeet on 01-May-14.
 */


MAIN.DIRECTIVES.directive('smoothScroll',['$window',function($window) {
    return {
        link : function postLink(scope,ele,attrs) {

            var targetWindow = angular.element($window);

            targetWindow.on('DOMMouseScroll',onScroll);

            function onScroll(event) {
                    event.preventDefault();
            }
        }
    }
}])