var iglesiaProfile = (function () {
    var RENDER_LIST_CONTAINER = $('#tab1');
    var RENDER_MIPES_CONTAINER = $('#tab3');
    var RENDER_MODAL_CONTAINER = $("#conModal");

    var iglesiaInfo = {};
    var mapIglesiaInfo = function () {
        iglesiaInfo.idIglesia = parseInt($('#info_iglesia_idIglesia').val());
        iglesiaInfo.nombre = $('#info_iglesia_nombre').val();
        iglesiaInfo.idDistrito = parseInt($('#info_iglesia_idDistrito').val());
    };

    var listEscuelas = function (_callback) {
        escuelaService.list({idIglesia: iglesiaInfo.idIglesia}, function (list) {
            var rows = [];
            $('#esc_count').html(list.length);
            for (var i = 0; i < list.length; i++) {
                var escuela = list[i];
                var fecha_registro = dateConverter.format.longStringToDate(escuela.escFechaRegistro);
                rows.push({
                    events: [{type: 'click', action: "redirect('/escuela/profile/" + escuela.idEscuela + "')"}],
                    cols: [
                        {type: 'card-table-image', src: appDefaults.defaults.logoGrupo, 'default':appDefaults.defaults.logoGrupo},
                        {type: 'card-table-content', label: '', value: escuela.escNombre},
                        {type: 'card-table-content', label: 'Lugar de Reunión', value: (escuela.escLugarReunion === undefined) ? 'No registrado' : escuela.escLugarReunion},
                        {type: 'card-table-content', label: 'Fecha de Registro', value: fecha_registro}
                    ]
                });
                var idPrefix = strings.random(8);
                components.render(RENDER_LIST_CONTAINER, components.cardTable.code(rows, idPrefix));
                components.cardTable.event(rows, idPrefix);
                _callback();
            }

        });
    };

    var removeIglesia = function () {
        confirmMessage({
            title: 'Eliminar',
            content: '¿Seguro que desea eliminar esta iglesia?'
        }, function () {
            iglesiaService.remove({idIglesia: iglesiaInfo.idIglesia}, function (a) {
                redirect('/menu');
            });
        });
    };

    var updateIglesia = function () {
        var iglNombre = $("#iglNombre").val();
        var iglDireccion = $("#iglDireccion").val();
        var fec = $("#iglFechaCreacion").val().split(" ");
        var iglFechaCreacion = "";
        if (validate.incomplete([fec[1]])) {
            iglFechaCreacion = dateConverter.format.datePickerToString($("#iglFechaCreacion").val());
        } else {
            iglFechaCreacion = fec[0];
        }
        var iglesia = {
            idIglesia: iglesiaInfo.idIglesia,
            distrito: {idDistrito: iglesiaInfo.idDistrito},
            iglNombre: iglNombre,
            iglDireccion: iglDireccion,
            iglFechaCreacion: iglFechaCreacion,
            iglFechaRegistro: new Date($("#info_iglesia_iglFechaRegistro").val()),
            iglEstado: '1'
        };
        iglesiaService.update(iglesia, function (d) {
            iglesiaInfo.nombre = iglNombre;
            $("#tit_iglesia").empty().append(iglNombre + '<i class="mdi-navigation-more-vert right"></i>');
            $("#i_fec").empty().append("Fecha de Creación : " + iglFechaCreacion);
            $("#iglFechaCreacion").val(iglFechaCreacion);
            $("#i_dir").empty().append("Dirección : " + iglDireccion);
        });
    };

    var addEscuela = function () {
        var escNombre = $("#n_escNombre").val();
        var escFechaCreacion = $("#n_escFechaCreacion").val();
        var escLugarReunion = $("#n_escLugarReunion").val();
        if (validate.incomplete([escNombre, escFechaCreacion, escLugarReunion])) {
            var escuela = {
                iglesia: {idIglesia: iglesiaInfo.idIglesia},
                escNombre: escNombre,
                escFechaCreacion: dateConverter.format.dateSlach(escFechaCreacion),
                escLugarReunion: escLugarReunion
            };
            escuelaService.add(escuela, function (result) {
                listEscuelas(function () {});
            });
        } else {
            infoMessage({
                title: message.incomplete.title,
                content: message.incomplete.content
            });
        }
    };

    var regEscuela = function () {
        var t = '<div class="modal-content white">';
        t += '<h4>Registro de Escuela Sabática</h4>';
        t += '<div class="row">';
        t += '<div class="col l12 m12 s12 input-field">';
        t += '<input type="text" id="n_escNombre" name="n_escNombre" value=""/>';
        t += '<label for="n_escNombre">Nombre de la Escuela Sabática</label>';
        t += '</div>';
        t += '<div class="col l12 m12 s12 input-field">';
        t += '<input type="text" id="n_escFechaCreacion" name="n_iglFechaCreacion" value="" ';
        t += 'class="datepicker"/>';
        t += '<label for="n_iglFechaCreacion">Fecha de Creacion</label>';
        t += '</div>';
        t += '<div class="col l12 m12 s12 input-field">';
        t += '<input type="text" id="n_escLugarReunion" name="n_escLugarReunion" value=""/>';
        t += '<label for="n_escLugarReunion">Lugar de Reunión</label>';
        t += '</div>';
        t += '</div>';
        t += '</div>';
        components.render(RENDER_MODAL_CONTAINER, t);
        $("#saveModal").empty().append("Registrar");
        $("#saveModal").attr("onclick", "iglesiaProfile.addEscuela()");
        $('.datepicker').pickadate();
    };

    var regLeader = function () {
        var roles = [
            {id: 14, nombre: "Anciano de Iglesia"}, {id: 5, nombre: "MIPES de Iglesia"}
        ];
        components.render(RENDER_MODAL_CONTAINER, components.modalSetRol.code("persona-enabled", "test", roles));
        select2.init();
        $("#saveModal").empty().append("Asignar");
        $("#saveModal").attr("onclick", "iglesiaProfile.addLeader()");
    };

    var addLeader = function () {
        var idPersona = $("#persona").val();
        var idRol = $("#rolS").val();
        adminLeaders.addLeader(idPersona, idRol, function (result) {
            adminLeaders.listLeaders({tipo:3,id:iglesiaInfo.idIglesia}, RENDER_MIPES_CONTAINER);
        });
    };

    var init = function () {
        mapIglesiaInfo();
        listEscuelas(function () {
        });
        adminLeaders.listLeaders({tipo:3,id:iglesiaInfo.idIglesia}, RENDER_MIPES_CONTAINER);
    };

    return {
        init: init,
        remove: removeIglesia,
        update: updateIglesia,
        addEscuela: addEscuela,
        regEscuela: regEscuela,
        regLeader: regLeader,
        addLeader: addLeader
    };

}());