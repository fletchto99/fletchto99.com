$(function () {

    var konamiState = 0;
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var timeouts = [];

    var konamiEvent = function(e) {
        if (e.which == konamiCode[konamiState]) {
            konamiState++;
        } else {
            konamiState = 0;
        }
        if (konamiState == konamiCode.length) {
            timeouts.forEach(function(timeout) {
                clearTimeout(timeout);
            });
            document.body.style.webkitAnimationName = '';
            console.log('KONAMIIII!!!!');
            konamiState = 0;
            document.body.className = 'konami';
            timeouts.push(setTimeout(function() {
                document.body.className = '';
                $(window).scrollTop($(window).scrollTop() + 1);
            }, 4010));
        }
    };

    document.addEventListener('keydown', konamiEvent);

    $(".slideshow").owlCarousel({
        autoPlay: 7500,
        singleItem: true,
        stopOnHover: true,
        transitionStyle: 'backSlide'
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
    $('.modal')
        .on('shown', function () {
            console.log('show');
            $('body').css({overflow: 'hidden'});
        })
        .on('hidden', function () {
            $('body').css({overflow: ''});
        });
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

