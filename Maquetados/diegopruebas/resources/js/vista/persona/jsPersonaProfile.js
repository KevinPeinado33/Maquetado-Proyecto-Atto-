var personaProfile = (function () {
    var init = function () {
        $('#btnUpload').click(function () {
            if (checkFiles()) {
                subirFoto();
            } else {
                infoMessage({
                    title: "Subir foto de Perfil",
                    content: "Debe seleccionar una imágen"
                });
            }
        });
        loadGrupo();
    };

    var checkFiles = function () {
        return document.getElementById('dropifyContent').files.length > 0;
    };
    var subirFoto = function () {
        $('#image_box').addClass('hidden');
        $('#loader_box').removeClass('hidden');
        image.upload($('#dropifyContent'), function (result) {
            $('#image_box').removeClass('hidden');
            $('#loader_box').addClass('hidden');
            $('#modal1').closeModal();
            $('.dropify-clear').trigger('click');
            var code = result;
            personaService.updateFoto({idPersona: $('#id_persona_selected').val(), perFoto: result}, function (result) {
                $('#profile_image').attr('src', crm_context_path + "/image/get/" + code);
            });
        });
    };

    var loadGrupo = function () {
        miembrogpService.listPersona({idPersona: $('#id_persona_selected').val()}, function (result) {
            var rows = [];
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                var color = (row.mgpEstado === '1') ? 'purple' : 'grey';
                rows.push({
                    events: [],
                    cols: [
                        {type: 'card-table-icon', icon: 'mdi-action-home white-text ' + color},
                        {type: 'card-table-content', label: '', value: row.grupo.gpoNombre},
                        {type: 'card-table-content', label: 'Escuela Sabática', value: row.grupo.escuela.escNombre},
                        {type: 'card-table-content', label: 'Fecha de Registro', value: dateConverter.format.longStringToDate(row.mgpFechaRegistro)}
                    ]
                });
            }
            if (rows.length > 0) {
                var idPrefix = strings.random(8);
                components.render('#list_grupo', components.cardTable.code(rows, idPrefix));
                components.cardTable.event(rows, idPrefix);
            } else {
                var s = '<tr><td class"red-text"<h5>No está registrado en un grupo</h5></td></tr>';
                components.render('#list_grupo', s);
            }
        });
    };
    var loadMinisterio = function () {

    };
    return {
        init: init
    };
}());

$(document).ready(function () {
    personaProfile.init();
    $('.activator').click(function () {
        location.href = crm_context_path + "/persona/update/" + $('#id_persona_selected').val();
    });
    if (!mobile.isMobile()) {
        var ci = $('#card_img').height();
        var cdp = $('#card_dp').height();
        console.log(ci);
        console.log(cdp);
        if (ci > cdp) {
            $('#card_dp').height(ci);
        }
        if (cdp > ci) {
            $('#card_img').height(cdp);
        }
    }
});