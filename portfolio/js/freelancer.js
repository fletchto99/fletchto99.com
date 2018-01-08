$(function () {
    var konamiState = 0;
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    var checkHash = function (location) {
        if (!location) {
            location = window.location;
        }
        var hash = location.hash.substr(1);
        if (hash.length > 0) {
            history.replaceState(null, null, '/');
        }
    };

    var konamiEvent = function(e) {
        if (e.which == konamiCode[konamiState]) {
            konamiState++;
        } else {
            konamiState = 0;
        }
        if (konamiState == konamiCode.length) {
            HarlemShake.shake(document.getElementsByClassName('navbar-header')[0]);
        }
    };

    document.addEventListener('keydown', konamiEvent);

    $(".slideshow").owlCarousel({
        autoPlay: 7500,
        singleItem: true,
        stopOnHover: true,
        lazyLoad: true
    });

    var $viewport = $('body, html');

    $('.page-scroll a').bind('click', function () {
        $viewport.stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });
    $viewport.bind("scroll mousedown DOMMouseScroll mousewheel keyup touchstart", function (e) {
        if (e.which > 0 || e.type === "mousedown" || e.type === "mousewheel" || e.type === "touchstart") {
            $viewport.stop();
        }
    });

    $('.portfolio-link').on('click', function () {
        $('#toTop').fadeOut();
    });

    $('.close-portfolio-item').on('click', function () {
        if ($(window).scrollTop() > 50 && (findBootstrapEnvironment() === "ExtraSmall" || findBootstrapEnvironment() === "Small")) {
            $('#toTop').fadeIn();
        }
        history.back();
    });

    $('.close-modal').on('click', function () {
        if ($(window).scrollTop() > 50 && (findBootstrapEnvironment() === "ExtraSmall" || findBootstrapEnvironment() === "Small")) {
            $('#toTop').fadeIn();
        }
        history.back();
    });


    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            if (findBootstrapEnvironment() === "ExtraSmall" || findBootstrapEnvironment() === "Small") {
                $('#toTop').fadeIn();
            }
            $('.navbar-fixed-top').addClass('navbar-shrink');
        } else {
            $('#toTop').fadeOut();
            $('.navbar-fixed-top').removeClass('navbar-shrink');
        }
    });

    $('body').scrollspy({
        offset: 50,
        target: '.navbar-fixed-top'
    });

    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
    });

    $('.modal').on('show.bs.modal', function () {
        history.pushState(null, null, "#" + $(this).attr('id'));
        document.body.style.overflow = 'hidden';
    }).on('hide.bs.modal', function () {
        document.body.style.overflow = '';
    });
    // If a pushstate has previously happened and the back button is clicked, hide any modals.
    $(window).on('popstate', function (event) {
        $(".modal").modal('hide');
    });

    checkHash();
});

function findBootstrapEnvironment() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envValues = ["xs", "sm", "md", "lg"];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        $el.addClass('hidden-' + envVal);
        if ($el.is(':hidden')) {
            $el.remove();
            return envs[i]
        }
    }
}