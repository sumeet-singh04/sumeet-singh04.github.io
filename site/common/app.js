/*Created On: 18-Apr-14 -10:56 PM */

var MAIN = {}

var MAIN.CONTROLLERS  = angular.module("main_controllers",[]);
var MAIN.DIRECTIVES = angular.module("main_directives",[]);
var MAIN.SERVICES = angular.module("main_services",[]);

var dependencies = [
    "main_controllers",
    "main_directives",
    "main_services",
    "ui.router"
]


var MAIN_MODULE = angular.module('WebModule',['main_controllers','main_directives','main_services']);

MAIN_MODULE.config(function($stateProvider, $urlRouterProvider)
{

});