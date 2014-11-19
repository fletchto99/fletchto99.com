/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
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

    $('.portfolio-caption').each(function() {
        $(this).hide();
    });

    $('.portfolio-item').each(function() {
        $(this).find('.portfolio-button').click(function() {
            $caption = $(this).parent().find('.portfolio-caption');
            if ($caption.hasClass('portfolio-active')) {
                $caption.fadeOut();
                $caption.removeClass('portfolio-active');
                return;
            }
            console.log('clicked');
            $('.portfolio-active').each(function () {
                $(this).fadeOut();
                $(this).removeClass('portfolio-active');
            });
            $caption.addClass('portfolio-active');
            $caption.fadeIn();
        });
    });

    $('body').scrollspy({
        offset: 50,
        target: '.navbar-fixed-top'
    });

    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggle:visible').click();
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

