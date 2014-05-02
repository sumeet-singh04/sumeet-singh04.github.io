/**
 * Created by sumeet on 20-Apr-14.
 */

MAIN.CONTROLLERS.controller('site.timeline.CTRL_TimelineBase',['$scope','getData','$stateParams','$state',
    function(scope,getData,$stateParams,$state)
    {
        scope.timelines = [];
        scope.timelineYears = [];
        var yearsMap = {};
        var rawTimeLineData = [];

        getData.getTimeLine().then(successRead,failRead);

        function successRead(action) {
            yearsMap = {};
            var years = [];
            var timelines = [];

            angular.copy(action.data.timeline,rawTimeLineData);

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

            if($stateParams.filter ) {
                if( $stateParams.filter == "all") {
                    timelines = action.data.timeline.sort(sortTimeLine);
                }
                else {
                    timelines = yearsMap[$stateParams.filter].sort(sortTimeLine);
                }

            }
            else {
                timelines = action.data.timeline.sort(sortTimeLine);
            }

            years.sort();
            scope.timelineYears = years;

            angular.copy(timelines.splice(0,18),scope.timelines);

        }




        function failRead() {
            console.log("Data Not Fetched");

        }


        scope.changeYear = function(year) {
            var timelines = [];
            if(year ) {
                if( year == "all") {
                    timelines = angular.copy(rawTimeLineData.sort(sortTimeLine));
                }
                else {
                    timelines = angular.copy(yearsMap[year].sort(sortTimeLine));
                }

            }
            else {
                timelines = angular.copy(rawTimeLineData.sort(sortTimeLine));
            }

            angular.copy(timelines.splice(0,18),scope.timelines);

            $state.go('timeline.filter',{filter:year});
        }

        scope.loadMore = function () {
            var timelines = [];
            console.log("loading more");

            if($stateParams.filter ) {
                if( $stateParams.filter == "all") {
                    angular.copy(rawTimeLineData.sort(sortTimeLine),timelines);
                }
                else {
                    angular.copy(yearsMap[$stateParams.filter].sort(sortTimeLine),timelines);
                }

            }
            else {
                angular.copy(rawTimeLineData.sort(sortTimeLine),timelines);
            }

            if(scope.timelines.length != timelines.length) {
                if((timelines.length - scope.timelines.length) >18) {
                    var tempInd = scope.timelines.length;
                    //var tempTimeline = timelines.splice(scope.timelines.length-1,scope.timelines.length+18);
                    for(var i = 0;i<18;i++) {
                        scope.timelines.push(angular.copy(timelines[i+tempInd]));
                    }

                }
                else {
                    var tempLen = timelines.length - scope.timelines.length;
                    var tempInd = scope.timelines.length;
                    for(var i=0;i<tempLen;i++) {
                        scope.timelines.push(angular.copy(timelines[i+tempInd]));
                    }
                    //scope.timelines.push(timelines.splice(scope.timelines.length-1,timelines.length));
                }
            }
        }


        function sortTimeLine(val1,val2) {
            if(val1.year > val2.year) return 1;
            else if(val1.year < val2.year) return -1;
            else return 0;
        }


    }])
