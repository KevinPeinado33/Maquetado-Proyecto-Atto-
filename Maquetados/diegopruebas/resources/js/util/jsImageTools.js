var imagePreview = (function () {
    var init = function () {
        $(IMAGE_PREVIEW_CLASS).each(function () {
            var chooser = $(this);
            var href = $(chooser).data('preview');
            if (href !== undefined && href !== null) {
                var reader = new FileReader();
                reader.onload = function () {
                    $(href).attr('src', reader.result);
                };
                reader.readAsDataURL($(chooser)[0].files[0]);
            }
        });
    };
    return {
        init: init
    };
}());

var image = (function () {
    var init = function () {
        loadImage();
    };
    var loadImage = function () {
        $('img').each(function () {
            var src = $(this).data('src');
            if (src !== undefined && src !== null && src !== '' && src !== 'default') {
                $(this).attr('src', crm_context_path + "/image/get/" + src);
            }
        });
    };
    var upload = function (input, _callback) {
        var formData = new FormData();
        formData.append('file', $(input)[0].files[0]);
        connector.upload('POST', url.image.upload, formData, function (result) {
            _callback(result);
        });
    };
    return {
        init: init,
        loadImage: loadImage,
        upload:upload
    };
}());