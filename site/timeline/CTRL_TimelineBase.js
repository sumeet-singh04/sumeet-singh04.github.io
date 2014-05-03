/**
 * Created by sumeet on 20-Apr-14.
 */

MAIN.CONTROLLERS.controller('site.timeline.CTRL_TimelineBase',['$scope','getData','$stateParams','$state','$timeout',
    function(scope,getData,$stateParams,$state,$timeout)
    {
        scope.timelines = [];
        scope.timelineYears = [];
        scope.year = 'all';
        var yearsMap = {};
        var rawTimeLineData = [];


      /*  function addTimeline(src,dest) {
            var i=0;
            var timeout = $timeout(function() {

              dest.push(angular.copy(src[i]));
                i++;
                if(i>=src.length) {
                    $timeout.cancel(timeout);
                }
            },1000);

        }*/


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

            if(scope.year ) {
                if( scope.year == "all") {
                    timelines = action.data.timeline.sort(sortTimeLine);
                }
                else {
                    timelines = yearsMap[scope.year].sort(sortTimeLine);
                }

            }
            else {
                timelines = action.data.timeline.sort(sortTimeLine);
            }

            years.sort();
            scope.timelineYears = years;

            var tempTimelines = angular.copy(timelines.splice(0,18));

            angular.forEach(tempTimelines,function(timeline,index) {
               scope.timelines.push(timeline);
            });

        }




        function failRead() {
            console.log("Data Not Fetched");

        }


        scope.changeYear = function(year) {
            var timelines = [];
            scope.timelines = [];
            scope.year = year;
            if(year ) {
                if( year == "all") {
                    timelines = angular.copy(rawTimeLineData.sort(sortTimeLine));
                }
                else {
                    timelines =  angular.copy(yearsMap[year].sort(sortTimeLine));
                }

            }
            else {
                timelines = angular.copy(rawTimeLineData.sort(sortTimeLine));
            }

            angular.copy(timelines.splice(0,18),scope.timelines);

            //$state.go('timeline.filter',{filter:year});
        }

        scope.loadMore = function () {
            var timelines = [];
            console.log("loading more");

            if(scope.year ) {
                if( scope.year == "all") {
                    angular.copy(rawTimeLineData.sort(sortTimeLine),timelines);
                }
                else {
                    angular.copy(yearsMap[scope.year].sort(sortTimeLine),timelines);
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
