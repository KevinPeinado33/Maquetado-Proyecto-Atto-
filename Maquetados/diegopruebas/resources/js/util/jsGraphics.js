var graphics = (function () {
    var init = function () {
        if (mobile.isMobile()) {
            setThemeColor(DEFAULT_THEME_COLOR);
        }
    };

    var setThemeColor = function (color) {
        $('.meta-theme-color').each(function () {
            $(this).attr('content', color);
        });
    };

    var disableContextMenu = function () {
        document.oncontextmenu = function () {
            return false;
        };
    };
    
    var reloadModalTrigger = function(){
      $(".modal-trigger").leanModal({ dismissible: !0, opacity: .5, in_duration: 300,
          out_duration: 200, ready: function () { },
          complete: function () { } });
    };


    return {
        init: init,
        themeColor: setThemeColor,
        disableContextMenu:disableContextMenu,
        reloadModalTrigger:reloadModalTrigger
    };
}());
