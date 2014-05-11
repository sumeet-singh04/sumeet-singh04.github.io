/**
 * Created by sumeet on 10-May-14.
 */

MAIN_MODULE.filter('viewFilter',['$state',function($state) {
    return function(input) {
        input = input || '';
        switch($state.current.url) {
            case "/aboutMe":
                return "About Me";
            break;
            case "/show":
                return "My Trace line";
            break;
        }

    }
}]);
