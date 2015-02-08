/**
 * Created by Sumeet Singh on 2/3/2015.
 */

MainApp.service('dashboardDataService',['$http',function($http) {

    this.fetchDashboardData = function() {
        return $http.get('json/data.json');
    };

    this.fetchItemDetails = function(link) {

        return $http.get(link);
    }

    this.getTextContext = function(status) {
        switch(status) {
            case 'S' :
                return "text-success";
            break;
            case 'W' :
                return "text-warning";
            case "F" :
                return "text-danger";
            default:
                return "text-muted";
        }
    }

    this.getPanelContext = function(status) {
        switch(status) {
            case 'S' :
                return "panel-success";
            case 'W' :
                return "panel-warning";
            case "F" :
                return "panel-danger";
            default:
                return "panel-default";
        }
    }

    this.getBgContext = function(status) {
        switch(status) {
            case 'S' :
                return "bg-success";
            case 'F' :
                return "bg-danger";
            case "R" :
                return "bg-primary";
            default:
                return "bg-default";
        }
    }



}])
