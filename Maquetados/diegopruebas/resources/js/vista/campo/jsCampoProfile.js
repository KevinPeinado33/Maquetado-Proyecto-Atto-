var campoProfile = (function () {
    var RENDER_LIST_CONTAINER = $('#tab1');
    var RENDER_MIPES_CONTAINER = $('#tab3');
    var RENDER_MODAL_CONTAINER = $("#conModal");

    var campoInfo = {};
    var mapCampoInfo = function () {
        campoInfo.idCampo = parseInt($('#info_campo_idCampo').val());
        campoInfo.nombre = $('#info_campo_nombre').val();
        campoInfo.idUnion = parseInt($('#info_campo_idUnion').val());
    };

    var listDistritos = function (_callback) {
        distritoService.list({idCampo: campoInfo.idCampo}, function (list) {
            var rows = [];
            $('#dis_count').html(list.length);
            for (var i = 0; i < list.length; i++) {
                var distrito = list[i];
                var fecha_registro = dateConverter.format.longStringToDate(distrito.disFechaCreacion);
                rows.push({
                    events: [{type: 'click', action: "redirect('/distrito/profile/" + distrito.idDistrito + "')"}],
                    cols: [
                        {type: 'card-table-image', src: '', default: appDefaults.defaults.logoGrupo},
                        {type: 'card-table-content', label: '', value: distrito.disNombre},
                        {type: 'card-table-content', label: 'Fecha de Creación', value: fecha_registro}
                    ]
                });
                var idPrefix = strings.random(8);
                components.render(RENDER_LIST_CONTAINER, components.cardTable.code(rows, idPrefix));
                components.cardTable.event(rows, idPrefix);
                _callback();
            }

        });
    };

    var regDistrito = function () {
        var t = '<div class="modal-content">';
        t += '<h4>Registro de Distrito</h4>';
        t += '<div class="row">';
        t += '<div class="col l6 m12 s12 input-field">';
        t += '<input type="text" id="n_disNombre" name="n_disNombre" value=""/>';
        t += '<label for="n_disNombre">Nombre del Distrito</label>';
        t += '</div>';
        t += '<div class="col l6 m12 s12 input-field">';
        t += '<input type="text" id="n_disFechaCreacion" name="n_disFechaCreacion" value="" ';
        t += 'class="datepicker"/>';
        t += '<label for="n_disFechaCreacion">Fecha de Creacion</label>';
        t += '</div>';
        t += '</div>';
        t += '</div>';
        components.render(RENDER_MODAL_CONTAINER, t);
        $("#saveModal").empty().append("Registrar");
        $("#saveModal").attr("onclick", "campoProfile.addDistrito()");
        $('.datepicker').pickadate();
    };

    var addDistrito = function () {
        var disNombre = $("#n_disNombre").val();
        var disFechaCreacion = $("#n_disFechaCreacion").val();
        if (validate.incomplete([disNombre, disFechaCreacion])) {
            var distrito = {
                campo: {idCampo: campoInfo.idCampo},
                disNombre: disNombre,
                disFechaCreacion: dateConverter.format.dateSlach(disFechaCreacion)
            };
            distritoService.add(distrito, function (result) {
                listDistritos(function () {});
            });
        } else {
            infoMessage({
                title: message.incomplete.title,
                content: message.incomplete.content
            });
        }
    };

    var regLeader = function () {
        var roles = [
            {id: 16, nombre: "Director de Campo"}, {id: 7, nombre: "MIPES de Campo"}
        ];
        components.render(RENDER_MODAL_CONTAINER, components.modalSetRol.code("persona-enabled", "test", roles));
        select2.init();
        $("#saveModal").empty().append("Asignar");
        $("#saveModal").attr("onclick", "campoProfile.addLeader()");
    };

    var addLeader = function () {
        var idPersona = $("#persona").val();
        var idRol = $("#rolS").val();
        adminLeaders.addLeader(idPersona, idRol, function (result) {
            adminLeaders.listLeaders({tipo: 5, id: campoInfo.idCampo}, RENDER_MIPES_CONTAINER);
        });
    };

    var init = function () {
        mapCampoInfo();
        listDistritos(function () {
        });
        adminLeaders.listLeaders({tipo: 5, id: campoInfo.idCampo}, RENDER_MIPES_CONTAINER);
    };

    return {
        init: init,
        regDistrito: regDistrito,
        addDistrito: addDistrito,
        regLeader: regLeader,
        addLeader: addLeader
    };

}());