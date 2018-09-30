var EVT_TIPO = "-1";
var EVT_FECHA = "future";

var eventoList = (function () {
    var init = function () {
        $('#evtTipo').change(function () {
            EVT_TIPO = $(this).val();
            list();
        });
        $('#evtFechaTipo').change(function () {
            EVT_FECHA = $(this).val();
            list();
        });
        $('.evt-type').click(function () {
            $(this).parent().parent().find('a').removeClass('active');
            $(this).addClass("active");
            EVT_TIPO = $(this).data("type");
            list();
        });
        $('.evt-fecha').click(function () {
            $(this).parent().parent().find('a').removeClass('active');
            $(this).addClass("active");
            EVT_FECHA = $(this).data("fecha");
            list();
        });

        list();
    };
    var list = function () {
        if (strings.validate(userInfo.grupo.idGrupo)) {
            var query = {
                tipo: EVT_TIPO,
                fecha: EVT_FECHA,
                union: userInfo.union.idUnion,
                campo: userInfo.campo.idCampo,
                distrito: userInfo.distrito.idDistrito,
                iglesia: userInfo.iglesia.idIglesia
            };
            eventoService.list(query, function (result) {
                components.render("#list_body", components.cardEvent.code(result, {actions: true, classes: 'l12 m12 s12'}));
                security.init('evento/listEvento');
                $('.btn-delete-evento').each(function () {
                    var id = $(this).data('evento');
                    $(this).click(function () {
                        confirmMessage({
                            title: "Eliminar Evento",
                            content: "¿Está seguro de eliminar este evento?"
                        }, function () {
                            eventoService.remove({idEvento: id}, function (result) {
                                list();
                            });
                        });
                    });
                });
            });
        } else {
            errorMessage({
                title: "Listado de Eventos",
                content: "Usted no está registrado en un grupo pequeño"
            });
        }
    };
    return {
        init: init
    };
}());

$(document).ready(function () {
    eventoList.init();
    security.init('evento/listEvento');
});