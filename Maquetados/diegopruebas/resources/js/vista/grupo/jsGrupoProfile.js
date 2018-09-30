var documentos = [];
var grupoProfile = (function () {
    var RENDER_LIST_CONTAINER = $('#tab1');
    var RENDER_MIPES_CONTAINER = $('#tab3');
    var RENDER_MODAL_CONTAINER = $("#conModal");
    var grupoInfo = {};
    var mapGrupoInfo = function () {
        grupoInfo.idGrupo = parseInt($('#info_grupo_idGrupo').val());
        grupoInfo.nombre = $('#info_grupo_nombre').val();
        grupoInfo.idEscuela = parseInt($('#info_grupo_idEscuela').val());
    };

    var listMembers = function (_callback) {
        miembrogpService.list({idGrupo: grupoInfo.idGrupo}, function (list) {
            var rows = [];
            $('#mbm_count').html(list.length);
            for (var i = 0; i < list.length; i++) {
                var miembrogp = list[i];
                var fecha_registro = dateConverter.format.longStringToDate(miembrogp.mgpFechaRegistro);
                rows.push({
                    events: [{type: 'click', action: "redirect(\'/persona/profile/" + miembrogp.persona.idPersona + "\')"}],
                    cols: [
                        {type: 'card-table-image', src: miembrogp.persona.perFoto, 'default': appDefaults.defaults.fotoPersona},
                        {type: 'card-table-content', label: '', value: miembrogp.persona.perNombres + ' ' + miembrogp.persona.perApellidos},
                        {type: 'card-table-content', label: 'Fecha de Registro', value: fecha_registro},
                        {type: 'card-table-action', button: '<button class="btn-remove-migp btn-floating btn-flat red white-text waves-effect waves-light right" onclick="event.stopPropagation(); grupoProfile.removeMiembro(' + miembrogp.idMiembrogp + ')">'
                                    + '<i class="mdi-content-clear"></i>'
                                    + '</button>'}
                    ]
                });
                var idPrefix = strings.random(8);
                components.render(RENDER_LIST_CONTAINER, components.cardTable.code(rows, idPrefix));
                components.cardTable.event(rows, idPrefix);
                _callback();
            }
        });
    };

    var searchMember = function () {
        components.render(RENDER_MODAL_CONTAINER, components.modalMemberSearch.code("persona-enabled", "test", "Anexar Personas"));
        select2.init();
        $("#saveModal").empty().append("Agregar");
        $("#saveModal").attr("onclick", "grupoProfile.addMember()");
    };

    var update = function () {
        var gpoNombre = $("#gpoNombre").val();
        var gpoLugarReunion = $("#gpoLugarReunion").val();
        var fec = $("input[name='gpoFechaCreacion']").val()+ " 00:00";
        fec = new Date(fec).getTime();
        var grupo = {
            idGrupo: grupoInfo.idGrupo,
            escuela: {idEscuela: grupoInfo.idEscuela},
            gpoNombre: gpoNombre,
            gpoFechaCreacion: fec,
            gpoLugarReunion: gpoLugarReunion,
            gpoEstado: '1'
        };
        grupoService.update(grupo, function (result) {
            redirect("/grupo/profile/" + grupo.idGrupo);
        });
    };

    var regMember = function () {
        components.render(RENDER_MODAL_CONTAINER, components.modalNewPerson.code());
        select2.init();
        $("#saveModal").empty().append("Registrar y Agregar");
        $("#saveModal").attr("onclick", "grupoProfile.addPerson()");
        if (documentos === null || documentos.length === 0) {
            documentoService.list(function (result) {
                documentos = result;
                renderDocumento();
            });
        } else {
            renderDocumento();
        }
    };

    var renderDocumento = function () {
        var s = "";
        for (var i = 0; i < documentos.length; i++) {
            s += '<option value="' + documentos[i].idDocumento + '">' + documentos[i].docDescripcion + '</option>';
        }
        $('#documento').append(s);
    };


    var regLeader = function () {
        var roles = [
            {id: 2, nombre: "Lider de Grupo Pequeño"}, {id: 12, nombre: "MIPES de Grupo Pequeño"}
        ];
        components.render(RENDER_MODAL_CONTAINER, components.modalSetRol.code("persona-enabled", "test", roles));
        select2.init();
        $("#saveModal").empty().append("Asignar");
        $("#saveModal").attr("onclick", "grupoProfile.addLeader()");
    };

    var addPerson = function () {
        var perNombres = $("#perNombres").val();
        var perApellidos = $("#perApellidos").val();
        var perDocumento = $("#perDocumento").val();
        var perSexo = $('input:radio[name=group1]:checked').val();
        var idDocumento = $("#documento").val();
        if (validate.incomplete([perNombres, perApellidos, perDocumento, perSexo, idDocumento])) {
            var persona = {
                perNombres: perNombres,
                perApellidos: perApellidos,
                perDocumento: perDocumento,
                perSexo: perSexo,
                documento: {
                    idDocumento: idDocumento
                }
            };
            personaService.add(persona, function (p) {
                addMember(p);
            });
        } else {
            infoMessage({
                title: message.incomplete.title,
                content: message.incomplete.content
            });
        }
    };

    var addMember = function (idPersona) {
        if (idPersona === undefined) {
            idPersona = $("#persona").val();
        }
        var miembrogp = {
            persona: {
                idPersona: idPersona
            },
            grupo: {
                idGrupo: grupoInfo.idGrupo
            }
        };
        miembrogpService.add(miembrogp, function (a) {
            listMembers(function () {
            });
        });
    };

    var addLeader = function () {
        var idPersona = $("#persona").val();
        var idRol = $("#rolS").val();
        adminLeaders.addLeader(idPersona, idRol, function (result) {
            adminLeaders.listLeaders({tipo: 1, id: grupoInfo.idGrupo}, RENDER_MIPES_CONTAINER);
        });
    };

    var removeMiembro = function (idMiembrogp) {
        confirmMessage({
            title: 'Eliminar miembro',
            content: '¿Seguro que desea eliminar a este miembro del grupo?'
        }, function () {
            miembrogpService.remove({idMiembrogp: idMiembrogp}, function (a) {
                listMembers(function () {
                });
            });
        });
    };

    var removeGrupo = function () {
        confirmMessage({
            title: 'Eliminar Grupo',
            content: '¿Seguro que desea eliminar este grupo pequeño?'
        }, function () {
            grupoService.remove({idGrupo: grupoInfo.idGrupo}, function (a) {
                redirect('/escuela/profile/' + grupoInfo.idEscuela);
            });
        });
    };

    var init = function () {
        mapGrupoInfo();
        listMembers(function () {});
        adminLeaders.listLeaders({tipo: 1, id: grupoInfo.idGrupo}, RENDER_MIPES_CONTAINER);
        $('#btnEliminarGP').click(function () {
            removeGrupo();
        });
    };

    return {
        init: init,
        searchMember: searchMember,
        regMember: regMember,
        regLeader: regLeader,
        addPerson: addPerson,
        addMember: addMember,
        update: update,
        removeMiembro: removeMiembro,
        addLeader: addLeader
    };

}());

