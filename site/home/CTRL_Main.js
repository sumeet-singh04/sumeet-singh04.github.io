/*Created On: 20-Apr-14 -11:30 AM */

MAIN.CONTROLLERS.controller('site.home.CTRL_Main',['$scope','$state',function(scope,$state)
{
    console.log("completed");

    scope.openState = 'aboutMe';

    scope.onNavbarClick = function(navUrl) {
        navUrl = navUrl || scope.openState;

        /*Update openState is coming from navBar*/
        scope.openState = navUrl;

         $state.go(navUrl);

    }

   /* scope.$on("$stateChangeStart",function() {
        scope.loctnChck = true;
    });

    scope.$on("$stateChangeSuccess",function() {
        scope.loctnChck = false;
    })*/

}])
