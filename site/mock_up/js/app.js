/**
 * Created by Sumeet Singh on 2/3/2015.
 */

var MainApp = angular.module('mainApp',['ui.router','ui.bootstrap']).config(
    ['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {

        $stateProvider.state('dashboard',{
            url:'/',
            templateUrl:'templates/dashboard.html',
            controller:'dashboard-controller as ctlr'
        })

        $urlRouterProvider.otherwise('/');
    }]
);
