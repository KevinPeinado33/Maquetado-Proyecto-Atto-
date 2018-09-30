var dropify = (function () {
    var init = function () {
        try {
            $('.dropify').dropify({
                messages: {
                    'default': 'Arrastrar o seleccionar foto',
                    'replace': '',
                    'remove': '<i class="mdi-action-highlight-remove"></i>',
                    'error': 'Ha ocurrido un error'
                },
                error: {
                    'fileSize': 'El archivo seleccionado es muy grande ({{ value }} max).',
                    'minWidth': 'El ancho de la imagen debe ser mas grande ({{ value }}}px min).',
                    'maxWidth': 'El ancho de la imagen sobrepasa el límite ({{ value }}}px max).',
                    'minHeight': 'El alto de la imagen debe ser mas grande ({{ value }}}px min).',
                    'maxHeight': 'El alto de la imagen sobrepasa el límite ({{ value }}px max).',
                    'imageFormat': 'Formato de archivo no permitido. Solo se permite: ({{ value }}).'
                },
                tpl: {
                    wrap: '<div class="dropify-wrapper"></div>',
                    loader: '<div class="dropify-loader"></div>',
                    message: '<div class="dropify-message"><span class="file-icon" /> <p>{{ default }}</p></div>',
                    preview: '<div class="dropify-preview" style="margin-top:-14px"><span class="dropify-render"></span></div>',
                    filename: '',
                    clearButton: '<button type="button" class="dropify-clear">{{ remove }}</button>',
                    errorLine: '<p class="dropify-error">{{ error }}</p>',
                    errorsContainer: '<div class="dropify-errors-container"><ul></ul></div>'
                }
            });
        } catch (e) {
            
        }

    };
    return {init: init};
}());