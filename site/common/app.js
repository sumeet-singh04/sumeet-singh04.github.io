/*Created On: 18-Apr-14 -10:56 PM */

var MAIN = {}

MAIN.CONTROLLERS  = angular.module("main_controllers",[]);
MAIN.DIRECTIVES = angular.module("main_directives",[]);
MAIN.SERVICES = angular.module("main_services",[]);

var dependencies = [
    "main_controllers",
    "main_directives",
    "main_services",
    "ui.router",
    "infinite-scroll",
    'ngAnimate'
]


var MAIN_MODULE = angular.module('WebModule',dependencies.concat());

MAIN_MODULE.config(function($stateProvider, $urlRouterProvider)
{
    $stateProvider.state('timeline',
        {
            url:'/timeline',
            templateUrl:'timeline/PRTL_TimelineBase.html'
        })
        .state('timeline.filter',
        {
            url:"/:filter",
            templateUrl:"timeline/PRTL_Timeline.html"
        })

    $urlRouterProvider.otherwise("/timeline/all");
});