/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {

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

