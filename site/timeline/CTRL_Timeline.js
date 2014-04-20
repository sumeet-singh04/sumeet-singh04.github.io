/**
 * Created by sumeet on 20-Apr-14.
 */

MAIN.CONTROLLERS.controller('site.timeline.CTRL_Timeline',['$scope','getData',function($scope,getData)
{
    var successRead = function() {
        console.log("Data Fetched");
    }
    var failRead = function() {
        console.log("Data Not Fetched");

    }
        getData.getTimeLine().then(successRead,failRead);
}])
