/**
 * Created by Sumeet on 02-Mar-16.
 */
(function () {

    var bgColors = {
        summary: 'rgba(99, 158, 174, 0.64)',
        tech: 'rgba(192, 98, 98, 0.61)',
        exp: 'rgba(28, 144, 192, 0.58)',
        profile: 'rgba(121, 58, 188, 0.75)'
    }
    window.loadResume = function () {
        setTimeout(function () {
            $('header .title').addClass('in-view');
            $('header .name').addClass('in-view');
            $('.main-section .side-menu').addClass('in-view');
            $('.main-section .main-content').addClass('in-view');
            $('.main-content div#summary').addClass('in-view');
        }, 1500);
    };

    window.changeHash = function (id) {
        $('.main-content').css('background-color',bgColors[id]);
        $('.main-content > div').removeClass('in-view');
        $('.main-content > div#' + id).addClass('in-view');
    };

    window.showPopUp = function() {
        $('.overlay').addClass('show');
        $('.modal-wrapper').addClass('fade-in')
    }

    $('.overlay').click(function() {
        $('.overlay').removeClass('show');
        $('.modal-wrapper').removeClass('fade-in')
    })

})();