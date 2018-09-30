var escuelaProfile = (function () {
    var RENDER_LIST_CONTAINER = $('#tab1');
    var RENDER_MIPES_CONTAINER = $('#tab3');
    var RENDER_MODAL_CONTAINER = $("#conModal");

    var escuelaInfo = {};

    var mapEscuelaInfo = function () {
        escuelaInfo.idEscuela = parseInt($('#info_escuela_idEscuela').val());
        escuelaInfo.nombre = $('#info_escuela_nombre').val();
        escuelaInfo.idIglesia = parseInt($('#info_escuela_idIglesia').val());
    };

    var listGrupos = function (_callback) {
        grupoService.list({idEscuela: escuelaInfo.idEscuela}, function (list) {
            var rows = [];
            $('#gpo_count').html(list.length);
            for (var i = 0; i < list.length; i++) {
                var grupo = list[i];
                var fecha_creacion = dateConverter.format.longStringToDate(grupo.gpoFechaCreacion);
                rows.push({
                    events: [{type: 'click', action: "redirect('/grupo/profile/" + grupo.idGrupo + "')"}],
                    cols: [
                        {type: 'card-table-image', src: grupo.gpoLogo, default: appDefaults.defaults.logoGrupo},
                        {type: 'card-table-content', label: '', value: grupo.gpoNombre.toUpperCase()},
                        {type: 'card-table-content', label: 'Lugar de Reunion', value: grupo.gpoLugarReunion},
                        {type: 'card-table-content', label: 'Fecha de Creacion', value: fecha_creacion}
                    ]
                });
            }
            var idPrefix = strings.random(8);
            components.render(RENDER_LIST_CONTAINER, components.cardTable.code(rows, idPrefix));
            components.cardTable.event(rows, idPrefix);
            _callback();
        });
    };

    var addGrupo = function () {
        var gpoNombre = $("#n_gpoNombre").val();
        var gpoFechaCreacion = $("#n_gpoFechaCreacion").val();
        var gpoLugarReunion = $("#n_gpoLugarReunion").val();
        if (validate.incomplete([gpoNombre, gpoFechaCreacion, gpoLugarReunion])) {
            var grupo = {
                escuela: {idEscuela: escuelaInfo.idEscuela},
                gpoNombre: gpoNombre,
                gpoFechaCreacion: dateConverter.format.dateSlach(gpoFechaCreacion),
                gpoLugarReunion: gpoLugarReunion
            };
            grupoService.add(grupo, function (result) {
                listGrupos(function () {});
            });
        } else {
            infoMessage({
                title: message.incomplete.title,
                content: message.incomplete.content
            });
        }
    };

    var removeEscuela = function () {
        confirmMessage({
            title: 'Eliminar',
            content: '¿Seguro que desea eliminar esta escuela sabática?'
        }, function () {
            escuelaService.remove({idEscuela: escuelaInfo.idEscuela}, function (a) {
                redirect('/iglesia/profile');
            });
        });
    };

    var updateEscuela = function () {
        var escNombre = $("#escNombre").val();
        var escLugarReunion = $("#escLugarReunion").val();
        var fec = $("#escFechaCreacion").val().split(" ");
        var escFechaCreacion = "";
        if (validate.incomplete([fec[1]])) {
            escFechaCreacion = dateConverter.format.datePickerToString($("#escFechaCreacion").val());
        } else {
            escFechaCreacion = fec[0];
        }
        var escuela = {
            idEscuela: escuelaInfo.idEscuela,
            iglesia: {idIglesia: escuelaInfo.idIglesia},
            escNombre: escNombre,
            escLugarReunion: escLugarReunion,
            escFechaCreacion: dateConverter.format.datePickerToString(escFechaCreacion),
            escFechaRegistro: new Date($("#info_escuela_escFechaRegistro").val()),
            escEstado: '1'
        };
        escuelaService.update(escuela, function (d) {
            escuelaInfo.nombre = escNombre;
            $("#tit_escuela").empty().append(escNombre + '<i class="mdi-navigation-more-vert right"></i>');
            $("#e_fec").empty().append("Fecha de Creación : " + escFechaCreacion);
            $("#e_reu").empty().append("Lugar de Reunión : " + escFechaCreacion);
            $("#escFechaCreacion").val(escFechaCreacion);
        });
    };

    var addLeader = function () {
        var idPersona = $("#persona").val();
        var idRol = $("#rolS").val();
        adminLeaders.addLeader(idPersona, idRol, function (result) {
            adminLeaders.listLeaders({tipo:2, id:escuelaInfo.idEscuela}, RENDER_MIPES_CONTAINER);
        });
    };

    var regGrupo = function () {
        var t = '<div class="modal-content">';
        t += '<h4>Registro de Grupo Pequeño</h4>';
        t += '<div class="row">';
        t += '<div class="col l6 m12 s12 input-field">';
        t += '<input type="text" id="n_gpoNombre" name="n_gpoNombre" value=""/>';
        t += '<label for="n_gpoNombre">Nombre del Grupo Pequeño</label>';
        t += '</div>';
        t += '<div class="col l6 m12 s12 input-field">';
        t += '<input type="text" id="n_gpoFechaCreacion" name="n_gpoFechaCreacion" value=""';
        t += 'class="datepicker"/>';
        t += '<label for="n_gpoFechaCreacion">Fecha de Creacion</label>';
        t += '</div>';
        t += '<div class="col l12 m12 s12 input-field">';
        t += '<input type="text" id="n_gpoLugarReunion" name="n_gpoLugarReunion" value=""/>';
        t += '<label for="n_gpoLugarReunion">Lugar de Reunión</label>';
        t += '</div>';
        t += '</div>';
        t += '</div>';
        components.render(RENDER_MODAL_CONTAINER, t);
        $("#saveModal").empty().append("Registrar");
        $("#saveModal").attr("onclick", "escuelaProfile.addGrupo()");
        $('.datepicker').pickadate();
    };

    var regLeader = function () {
        var roles = [
            {id: 13, nombre: "Lider de Escuela Sabática"}, {id: 10, nombre: "MIPES de Escuela Sabática"}
        ];
        components.render(RENDER_MODAL_CONTAINER, components.modalSetRol.code("persona-enabled", "test", roles));
        select2.init();
        $("#saveModal").empty().append("Asignar");
        $("#saveModal").attr("onclick", "escuelaProfile.addLeader()");
    };

    var init = function () {
        mapEscuelaInfo();
        listGrupos(function () {
            adminLeaders.listLeaders({tipo:2, id:escuelaInfo.idEscuela}, RENDER_MIPES_CONTAINER);
        });
    };

    return {
        init: init,
        remove: removeEscuela,
        update: updateEscuela,
        addGrupo: addGrupo,
        addLeader: addLeader,
        regGrupo: regGrupo,
        regLeader: regLeader
    };
}());


//function cargarCuadritos() {
//    // Datos generales
//    var numero_columnas = 50;
//    var numero_filas = 21;
//    var prefijo_id = "cuadrito";
//    var tbody_id = "aqui va el id del tbody";
//
//    //Limpiando Tbody
//    $(tbody_id).empty();
//
//    // Creando filas y columnas
//    var html = '';
//    for (var i = 0; i < numero_filas; i++) {
//        html += '<tr>';
//        for (var j = 0; j < numero_columnas; j++) {
//            html += '<td id="' + prefijo_id + numero_filas + numero_columnas + '"></td>';
//        }
//        html += '</tr>';
//    }
//
//    // Graficando tabla
//    $(tbody_id).append(html);
//
//}