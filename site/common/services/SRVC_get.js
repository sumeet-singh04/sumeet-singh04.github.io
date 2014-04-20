/**
 * Created by sumeet on 20-Apr-14.
 */

MAIN.SERVICES.service('getData',['$http',function($http)
{
    this.getTimeLine = function(url) {
        return $http.get("data/timelineData.json");
    }
}])
