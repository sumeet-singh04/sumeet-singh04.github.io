/**
 * Created by sumeet on 20-Apr-14.
 */

MAIN.CONTROLLERS.controller('site.timeline.CTRL_Timeline',['$scope','getData',function(scope,getData)
{
    scope.timelines = [];
    scope.timelineYears = [];

    var successRead = function(action) {
        var yearsMap = {};
        var years = [];
        angular.forEach(action.data.timeline,function(val,index)
        {
            if(yearsMap[val.year]) {
                yearsMap[val.year].push(val);
            }
            else {
                yearsMap[val.year] = [];
                yearsMap[val.year].push(val);
                years.push(val.year);
            }

        });

        scope.timelineYears = years;
        scope.timelines = action.data.timeline.sort(function(val1,val2)
        {
            if(val1.year > val2.year) return 1;
            else if(val1.year < val2.year) return -1;
            else return 0;
        });
    }
    var failRead = function() {
        console.log("Data Not Fetched");

    }
        getData.getTimeLine().then(successRead,failRead);
}])
