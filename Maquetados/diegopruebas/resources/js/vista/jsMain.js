var main = (function () {
    var init = function () {

        $(window).trigger('scroll');
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var grupo = $('#grupo').position();
            var ministerio = $('#ministerio').position();
            var pm = $('#pm').position();
            var escuela = $('#escuela').position();
            var footer = $('#footer').position();
            var k = 64;
            if (math.between(0, grupo.top - k, scroll)) {
                graphics.themeColor('#37474f');
                $('.navbar-color').addClass('blue-grey darken-3');
                $('.navbar-color').removeClass('green accent-4');
                $('.btn-login').removeClass('green accent-3');
                $('.btn-login').addClass('blue');
            }
            if (math.between(grupo.top - k, ministerio.top - k, scroll)) {
                graphics.themeColor('#00C853');
                $('.navbar-color').removeClass('blue-grey darken-3');
                $('.navbar-color').addClass('green accent-4');

                $('.btn-login').removeClass('blue');
                $('.btn-login').addClass('green accent-3');
            }
            if (math.between(ministerio.top - k, pm.top - k, scroll)) {
                graphics.themeColor('#F44336');
                $('.navbar-color').removeClass('green accent-4');
                $('.navbar-color').removeClass('blue');
                $('.navbar-color').addClass('red');

                $('.btn-login').removeClass('green accent-3');
                $('.btn-login').removeClass('blue lighten-2');
                $('.btn-login').addClass('red lighten-2');
            }
            if (math.between(pm.top - k, escuela.top - k, scroll)) {
                graphics.themeColor('#2196F3');
                $('.navbar-color').removeClass('red yellow darken-1');
                $('.navbar-color').addClass('blue');

                $('.btn-login').removeClass('red lighten-2 yellow lighten-2');
                $('.btn-login').addClass('blue lighten-2');
            }
            if (math.between(escuela.top - k, footer.top - k, scroll)) {
                graphics.themeColor('#fdd835');
                $('.navbar-color').removeClass('blue');
                $('.navbar-color').addClass('yellow darken-1');

                $('.btn-login').removeClass('blue lighten-2');
                $('.btn-login').addClass('yellow lighten-2');
            }
        });

        var hashTagActive = "";
        $(".scroll").on("click touchstart", function (event) {
            if (hashTagActive != this.hash) {
                event.preventDefault();
                //calculate destination place
                var dest = 0;
                if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
                    dest = $(document).height() - $(window).height();
                } else {
                    dest = $(this.hash).offset().top;
                }
                //go to destination
                $('html,body').animate({
                    scrollTop: dest
                }, 300, 'swing');
                hashTagActive = this.hash;
            }
        });
    };
    return {
        init: init
    };
}());

$(document).ready(function () {
    main.init();
});





