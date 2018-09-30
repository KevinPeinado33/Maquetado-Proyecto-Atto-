var distritoProfile = (function () {
    var RENDER_LIST_CONTAINER = $('#tab1');
    var RENDER_MIPES_CONTAINER = $('#tab3');
    var RENDER_MODAL_CONTAINER = $("#conModal");

    var distritoInfo = {};
    var mapDistritoInfo = function () {
        distritoInfo.idDistrito = parseInt($('#info_distrito_idDistrito').val());
        distritoInfo.nombre = $('#info_distrito_nombre').val();
        distritoInfo.idCampo = parseInt($('#info_distrito_idCampo').val());
    };

    var listIglesias = function (_callback) {
        iglesiaService.list({idDistrito: distritoInfo.idDistrito}, function (list) {
            var rows = [];
            $('#igl_count').html(list.length);
            for (var i = 0; i < list.length; i++) {
                var iglesia = list[i];
                var fecha_registro = dateConverter.format.longStringToDate(iglesia.iglFechaCreacion);
                rows.push({
                    events: [{type: 'click', action: "redirect('/iglesia/profile/" + iglesia.idIglesia + "')"}],
                    cols: [
                        {type: 'card-table-image', src:'', 'default': appDefaults.defaults.logoGrupo},
                        {type: 'card-table-content', label: '', value: iglesia.iglNombre},
                        {type: 'card-table-content', label: 'Dirección', value: (iglesia.iglDireccion === undefined) ? 'No registrado' : iglesia.iglDireccion},
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

    var removeDistrito = function () {
        confirmMessage({
            title: 'Eliminar',
            content: '¿Seguro que desea eliminar este distrito?'
        }, function () {
            distritoService.remove({idDistrito: distritoInfo.idDistrito}, function (a) {
                redirect('/menu');
            });
        });
    };

    var updateDistrito = function () {
        var disNombre = $("#disNombre").val();
        var fec = $("#disFechaCreacion").val().split(" ");
        var disFechaCreacion = "";
        if (validate.incomplete([fec[1]])) {
            disFechaCreacion = dateConverter.format.datePickerToString($("#disFechaCreacion").val());
        } else {
            disFechaCreacion = fec[0];
        }
        var distrito = {
            idDistrito: distritoInfo.idDistrito,
            campo: {idCampo: distritoInfo.idCampo},
            disNombre: disNombre,
            disFechaCreacion: disFechaCreacion,
            disFechaRegistro: new Date($("#info_distrito_disFechaRegistro").val()),
            disEstado: '1'
        };
        distritoService.update(distrito, function (d) {
            distritoInfo.nombre = disNombre;
            $("#tit_distrito").empty().append(disNombre + '<i class="mdi-navigation-more-vert right"></i>');
            $("#d_fec").empty().append("Fecha de Creación : " + disFechaCreacion);
            $("#disFechaCreacion").val(disFechaCreacion);
        });
    };

    var addIglesia = function () {
        var iglNombre = $("#n_iglNombre").val();
        var iglFechaCreacion = $("#n_iglFechaCreacion").val();
        var iglDireccion = $("#n_iglDireccion").val();
        if (validate.incomplete([iglNombre, iglFechaCreacion, iglDireccion])) {
            var iglesia = {
                distrito: {idDistrito: distritoInfo.idDistrito},
                iglNombre: iglNombre,
                iglFechaCreacion: dateConverter.format.dateSlach(iglFechaCreacion),
                iglDireccion: iglDireccion
            };
            iglesiaService.add(iglesia, function (result) {
                listIglesias(function () {});
            });
        } else {
            infoMessage({
                title: message.incomplete.title,
                content: message.incomplete.content
            });
        }
    };

    var regIglesia = function () {
        var t = '<div class="modal-content">';
        t += '<h4>Registro de Iglesia</h4>';
        t += '<div class="row">';
        t += '<div class="col l6 m12 s12 input-field">';
        t += '<input type="text" id="n_iglNombre" name="n_iglNombre" value=""/>';
        t += '<label for="n_iglNombre">Nombre de la Iglesia</label>';
        t += '</div>';
        t += '<div class="col l6 m12 s12 input-field">';
        t += '<input type="text" id="n_iglFechaCreacion" name="n_iglFechaCreacion" value="" ';
        t += 'class="datepicker"/>';
        t += '<label for="n_iglFechaCreacion">Fecha de Creacion</label>';
        t += '</div>';
        t += '<div class="col l12 m12 s12 input-field">';
        t += '<input type="text" id="n_iglDireccion" name="n_iglDireccion" value=""/>';
        t += '<label for="n_iglDireccion">Dirección de la Iglesia</label>';
        t += '</div>';
        t += '</div>';
        t += '</div>';
        components.render(RENDER_MODAL_CONTAINER, t);
        $("#saveModal").empty().append("Registrar");
        $("#saveModal").attr("onclick", "distritoProfile.addIglesia()");
        $('.datepicker').pickadate();
    };

    var regLeader = function () {
        var roles = [
            {id: 15, nombre: "Pastor de Distrito"}, {id: 6, nombre: "MIPES de Distrito"}
        ];
        components.render(RENDER_MODAL_CONTAINER, components.modalSetRol.code("persona-enabled", "test", roles));
        select2.init();
        $("#saveModal").empty().append("Asignar");
        $("#saveModal").attr("onclick", "distritoProfile.addLeader()");
    };

    var addLeader = function () {
        var idPersona = $("#persona").val();
        var idRol = $("#rolS").val();
        adminLeaders.addLeader(idPersona, idRol, function (result) {
            adminLeaders.listLeaders(3, RENDER_MIPES_CONTAINER);
        });
    };

    var init = function () {
        mapDistritoInfo();
        listIglesias(function () {
            adminLeaders.listLeaders(4, RENDER_MIPES_CONTAINER);
        });
    };

    return {
        init: init,
        remove: removeDistrito,
        update: updateDistrito,
        addIglesia: addIglesia,
        regIglesia: regIglesia,
        regLeader: regLeader,
        addLeader: addLeader
    };

}());