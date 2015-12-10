$(function () {
    var konamiState = 0;
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var timeouts = [];
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
            doTheHarlemShake();
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

//Taken from some XSS article I read a while ago
var doTheHarlemShake = function () {
    function c() {
        var e = document.createElement("link");
        e.setAttribute("type", "text/css");
        e.setAttribute("rel", "stylesheet");
        e.setAttribute("href", f);
        e.setAttribute("class", l);
        document.body.appendChild(e)
    }

    function h() {
        var e = document.getElementsByClassName(l);
        for (var t = 0; t < e.length; t++) {
            document.body.removeChild(e[t])
        }
    }

    function p() {
        var e = document.createElement("div");
        e.setAttribute("class", a);
        document.body.appendChild(e);
        setTimeout(function () {
            document.body.removeChild(e)
        }, 100)
    }

    function d(e) {
        return {height: e.offsetHeight, width: e.offsetWidth}
    }

    function v(i) {
        var s = d(i);
        return s.height > e && s.height < n && s.width > t && s.width < r
    }

    function m(e) {
        var t = e;
        var n = 0;
        while (!!t) {
            n += t.offsetTop;
            t = t.offsetParent
        }
        return n
    }

    function g() {
        var e = document.documentElement;
        if (!!window.innerWidth) {
            return window.innerHeight
        } else if (e && !isNaN(e.clientHeight)) {
            return e.clientHeight
        }
        return 0
    }

    function y() {
        if (window.pageYOffset) {
            return window.pageYOffset
        }
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop)
    }

    function E(e) {
        var t = m(e);
        return t >= w && t <= b + w
    }

    function S() {
        var e = document.createElement("audio");
        e.setAttribute("class", l);
        e.src = i;
        e.loop = false;
        e.addEventListener("canplay", function () {
            setTimeout(function () {
                x(k)
            }, 500);
            setTimeout(function () {
                N();
                p();
                for (var e = 0; e < O.length; e++) {
                    T(O[e])
                }
            }, 15500)
        }, true);
        e.addEventListener("ended", function () {
            N();
            h()
        }, true);
        e.innerHTML = " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
        document.body.appendChild(e);
        e.play()
    }

    function x(e) {
        e.className += " " + s + " " + o
    }

    function T(e) {
        e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)]
    }

    function N() {
        var e = document.getElementsByClassName(s);
        var t = new RegExp("\\b" + s + "\\b");
        for (var n = 0; n < e.length;) {
            e[n].className = e[n].className.replace(t, "")
        }
    }

    var e = 30;
    var t = 30;
    var n = 350;
    var r = 350;
    var i = "//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";
    var s = "mw-harlem_shake_me";
    var o = "im_first";
    var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
    var a = "mw-strobe_light";
    var f = "//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";
    var l = "mw_added_css";
    var b = g();
    var w = y();
    var C = document.getElementsByTagName("*");
    var k = document.getElementsByClassName('navbar-header')[0];
    c();
    S();
    var O = [];
    for (var L = 0; L < C.length; L++) {
        var A = C[L];
        if (v(A)) {
            O.push(A)
        }
    }
};