var idEvento = -1;
var evento = null;
var puntualidad = '0';
eventoAsistencia = (function () {
    var init = function () {
        idEvento = $('#idEvento').val();
        $('#error_title').html("Acceso no autorizado");
        $('#error_content').html("Lo sentimos, el rol que has seleccionado <strong>\""
                + appDefaults.rolName(userInfo.rolSelected) + "\"</strong> no tiene los privilegios suficientes para realizar esta operación.");
        list();
    };
    var list = function () {

        eventoService.get({idEvento: idEvento}, function (result) {
            evento = result;

            $('#error_card').addClass('hidden');
            $('#main_card').removeClass('hidden');
            $('#save_card').removeClass('hidden');
            var rs = userInfo.rolSelected;
            if (checkAuth(rs, evento.evtTipo)) {
                if (selected_id + '' !== '0' && selected_id !== 'null') {
                    renderEvento();
                    //Verificando si el evento es general y si esta invitado
                    var cando = false;
                    if (evento.evtPart !== '0') {
                        var arr = math.intervalStringToArray(evento.evtPart);
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] + "" === selected_id + "") {
                                cando = true;
                                break;
                            }
                        }
                    } else if (evento.evtExcepcion !== '0') {
                        cando = true;
                        var arr = math.intervalStringToArray(evento.evtExcepcion);
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i] + "" === selected_id + "") {
                                cando = false;
                                break;
                            }
                        }
                    } else {
                        cando = true;
                    }
                    
                    if (cando) {
                        if (checkTime(evento)) {
                            if (evento.evtTipo === '0' || evento.evtTipo === '4' || evento.evtTipo === '9') {
                                var asgrupo = {
                                    evento: {idEvento: idEvento},
                                    grupo: {idGrupo: selected_id}
                                };
                                eventoService.checkAsistenciaGrupo(asgrupo, function (r) {
                                    if (r === false) {
                                        miembrogpService.list({idGrupo: selected_id}, function (result) {
                                            renderResult(result, 0);
                                        });
                                    } else {
                                        msgRegistrado();
                                    }
                                });

                            } else if (evento.evtTipo === '1') {

                            } else if (evento.evtTipo === '2') {
                                var asescuela = {
                                    evento: {idEvento: idEvento},
                                    escuela: {idEscuela: selected_id}
                                };
                                eventoService.checkAsistenciaEscuela(asescuela, function (r) {
                                    if (r === false) {
                                        miembrogpService.listEscuela({idEscuela: selected_id}, function (result) {
                                            renderResult(result, 1);
                                        });
                                    } else {
                                        msgRegistrado();
                                    }
                                });
                            } else if (evento.evtTipo === '3') {
                                miembrogpService.listIglesia({idIglesia: selected_id}, function (result) {
                                    renderResult(result, 2);
                                });
                            }
                        } else {
                            $('#save_card').addClass('hidden');
                            $('#error_card').addClass('hidden');
                        }

                    } else {
                        $('#error_content').html("Lo sentimos, usted o el grupo de peronas al cual lidera no estan invitados a participar en este evento");
                        $('#main_card').addClass('hidden');
                        $('#save_card').addClass('hidden');
                        $('#error_card').removeClass('hidden');
                    }
                } else {
                    requestGrupo();
                }
            } else {
                $('#main_card').addClass('hidden');
                $('#save_card').addClass('hidden');
                $('#error_card').removeClass('hidden');
            }
        });
    };

    var msgRegistrado = function () {
        successMessage({
            title: "Registro de Asistencia",
            content: "Ya se realizó el registro de Asistencia"
        });
        $('#main_card').addClass('hidden');
        $('#save_card').addClass('hidden');
        $('#error_card').addClass('hidden');
        setTimeout(function () {
            location.href = crm_context_path + "/evento/listEvento";
        }, 1500);
    };

    var checkTime = function (evento) {
        var fecha_actual = new Date().getTime();
        var fecha_evento = dateConverter.parse.longToDate(evento.evtFecha).getTime();
        var fecha_limite = dateConverter.addTime(fecha_evento, evento.evtFechaLimite);
        if (fecha_actual < fecha_evento) {
            return false;
        } else if (fecha_actual >= fecha_evento && fecha_actual <= fecha_limite) {
            puntualidad = '1';
            return true;
        } else {
            puntualidad = '0';
            return true;
        }
    };

    var renderEvento = function () {
        components.render("#main_card", components.cardEvent.code([evento], {actions: false, classes: 'l12 m12 s12'}));
        var list_card = '<div id="list_card" style ="border-top:1px solid #eee;padding:16px"></div>';
        $('#main_card > .col > .crm-event-container').append(list_card);
        $('#list_card').append('<table class="card-table"><tbody id="list_body"></tbody></table>');
    };

    var renderResult = function (result, type) {
        console.log(result);
        var rows = [];
        if (result !== undefined && result !== null) {
            totalCount = result.length;
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                switch (type) {
                    case 0:
                        rows.push(renderResultGP(row, i));
                        break;
                    case 1:
                        rows.push(renderResultES(row, i));
                        break;
                    case 2:
                        rows.push(renderResultIG(row, i));
                        break;
                }
            }
        } else {
            totalCount = 0;
            totalPresente = 0;
            totalVisita = 0;
            totalFalta = 0;
        }
        var idPrefix = strings.random(8);
        components.render('#list_body', components.cardTable.code(rows, idPrefix));
        components.cardTable.event(rows, idPrefix);
    };
    var mapMGP = function () {
        listMGP = [];
        for (var i = 0; i < totalCount; i++) {
            listMGP.push({
                idPersona: $('#chk_' + i).data('persona'),
                value: $('#chk_' + i).is(':checked')
            });
        }
        var c = 0;
        for (var i = 0; i < listMGP.length; i++) {
            if (listMGP[i].value) {
                c = c + 1;
            }
        }
        totalPresente = c;
        totalFalta = totalCount - totalPresente;
        $('#asgPresentes').html(totalPresente);
        $('#asgFaltas').html(totalFalta);
    };
    var mapES = function () {
        listES = [];
        for (var i = 0; i < totalCount; i++) {
            listES.push({
                idPersona: $('#sel_' + i).data('persona'),
                dias: parseInt($('#sel_' + i).val()),
                value: (parseInt($('#sel_' + i).val()) >= 0) ? '1' : '0'
            });
        }
        var c = 0;
        for (var i = 0; i < listES.length; i++) {
            if (listES[i].value === '1') {
                c = c + 1;
            }
        }
        totalPresente = c;
        totalFalta = totalCount - totalPresente;
        $('#asgPresentes').html(totalPresente);
        $('#asgFaltas').html(totalFalta);
    };

    var save = function () {
        if (validate()) {
            if (evento.evtTipo === '0' || evento.evtTipo === '4' || evento.evtTipo === '9') {
                var asgrupo = {
                    id: {
                        idEvento: evento.idEvento,
                        idGrupo: userInfo.grupo.idGrupo
                    },
                    evento: {idEvento: evento.idEvento},
                    grupo: {idGrupo: userInfo.grupo.idGrupo},
                    asgPresentes: totalPresente,
                    asgFaltas: totalFalta,
                    asgVisitas: totalVisita,
                    asgLugar: $('#asgLugar').val(),
                    asgFechaRegistro: 1519231804000,
                    asgPuntualidad: puntualidad
                };
                asGrupoService.add(asgrupo, function (result) {
                    var arr = [];
                    for (var i = 0; i < listMGP.length; i++) {
                        arr.push({
                            id: {
                                idGrupo: result.idGrupo,
                                idEvento: result.idEvento,
                                idMiembrogp: listMGP[i].idPersona
                            },
                            amgAsistencia: (listMGP[i].value) ? '1' : '0'
                        });
                    }
                    asmiemgpService.addArray(arr, function (r) {
                        setTimeout(function () {
                            location.href = crm_context_path + "/evento/listEvento";
                        }, 1500);
                    });
                });
            } else if (evento.evtTipo === '2') {
                var asescuela = {
                    id: {
                        idEvento: evento.idEvento,
                        idEscuela: userInfo.escuela.idEscuela
                    },
                    evento: {idEvento: evento.idEvento},
                    escuela: {idEscuela: userInfo.escuela.idEscuela},
                    asePresentes: totalPresente,
                    aseFaltas: totalFalta,
                    aseVisitas: totalVisita,
                    aseLugar: $('#asgLugar').val(),
                    aseFechaRegistro: 1519231804000,
                    asePuntualidad: puntualidad
                };
                asEscuelaService.add(asescuela, function (result) {
                    var arr = [];
                    for (var i = 0; i < listES.length; i++) {
                        arr.push({
                            id: {
                                idEvento: result.idEvento,
                                idEscuela: result.idEscuela,
                                idMiembrogp: listES[i].idPersona
                            },
                            ameAsistencia: listES[i].value,
                            ameDias: listES[i].dias
                        });
                    }
                    asmiemesService.addArray(arr, function (r) {
                        setTimeout(function () {
                            location.href = crm_context_path + "/evento/listEvento";
                        }, 1500);
                    });
                });

            }

        }
    };

    var validate = function () {
        var cando = true;
        if ($('#asgVisitas').val() === '') {
            $('#asgVisitas').val('0');
        }
        if (!strings.validate($('#asgLugar').val())) {
            cando = false;
            errorMessage({
                title: "Registro de Asistencia",
                content: "Debe especificar el lugar de reunión"
            });
        }
        return cando;
    };

    var renderResultGP = function (row, index) {
        return {
            events: [],
            cols: [{type: 'card-table-image', src: row.persona.perFoto, 'default': appDefaults.defaults.fotoPersona},
                {type: 'card-table-content', label: '', value: row.persona.perNombres + " " + row.persona.perApellidos},
                {type: 'card-table-content', label: 'Documento', value: row.persona.perDocumento},
                {type: 'card-table-content', label: 'Grupo Pequeño', value: userInfo.grupo.gpoNombre},
                {type: 'card-table-action', button: renderSwitch('chk_' + index, row.idMiembrogp, 'eventoAsistencia.mapMGP()')}
            ]
        };
    };
    var renderResultES = function (row, index) {
        var s = '<select class="browser-default" id="sel_' + index + '" onchange="eventoAsistencia.mapES()" data-persona="' + row.idMiembrogp + '">';
        s += '<option value="-1">Ausente</option>';
        s += '<option value="0">0 días</option>';
        s += '<option value="1">1 día</option>';
        s += '<option value="2">2 días</option>';
        s += '<option value="3">3 días</option>';
        s += '<option value="4">4 días</option>';
        s += '<option value="5">5 días</option>';
        s += '<option value="6">6 días</option>';
        s += '<option value="7">7 días</option>';
        s += '</select>';
        return {
            events: [],
            cols: [{type: 'card-table-image', src: row.persona.perFoto, 'default': appDefaults.defaults.fotoPersona},
                {type: 'card-table-content', label: '', value: row.persona.perNombres + " " + row.persona.perApellidos},
                {type: 'card-table-content', label: 'Grupo Pequeño', value: row.grupo.gpoNombre + "/" + row.grupo.escuela.escNombre},
                {type: 'card-table-action', button: s}
            ]
        };
    };
    var renderResultIG = function (row, index) {
        return {
            events: [],
            cols: [{type: 'card-table-image', src: row.persona.perFoto, 'default': appDefaults.defaults.fotoPersona},
                {type: 'card-table-content', label: '', value: row.persona.perNombres + " " + row.persona.perApellidos},
                {type: 'card-table-content', label: 'Grupo Pequeño', value: row.grupo.gpoNombre + "/" + row.grupo.escuela.escNombre + "/" + row.grupo.escuela.iglesia.iglNombre},
                {type: 'card-table-action', button: renderSwitch('chk_' + index, row.idMiembrogp, 'eventoAsistencia.mapMGP()')}
            ]
        };
    };

    var renderSwitch = function (id, persona, call) {
        var s = '<div class="switch"><label>F<input type="checkbox" id="' + id + '" data-persona="' + persona + '" onclick="' + call + '"><span class="lever"></span> P</label></div>';
        return s;
    };

    var checkAuth = function (rol, type) {
        var cando = false;
        //0 -- reunion Grupos Pequeños
        //1 -- Trabajo de Ministerios
        //2 -- Reunion de la escuela sabatica
        //3 -- Capacitacion
        //4 -- Desfile de Grupos Pequeños
        //9 -- Otros
        if (rol === appDefaults.rols.MIPES_GP || rol === appDefaults.rols.LIDER_GP) {
            selected_id = userInfo.grupo.idGrupo;
            if (type === '0' || type === '4' || type === '9') {
                cando = true;
            }
        } else if (rol === appDefaults.rols.LIDER_MI) {
            selected_id = userInfo.ministerio.idMinisterio;
            if (type === '1') {
                cando = true;
            }
        } else if (rol === appDefaults.rols.MIPES_ES) {
            selected_id = userInfo.escuela.idEscuela;
            if (type === '2') {
                cando = true;
            }
        } else if (rol === appDefaults.rols.MIPES_IG) {
            selected_id = userInfo.iglesia.idIglesia;
            if (type === '3') {
                cando = true;
            }
        } else if (rol === appDefaults.rols.ADMIN) {
            cando = true;
        }
        return cando;
    };

    return {
        init: init,
        mapMGP: mapMGP,
        mapES: mapES,
        save: save
    };
}());

$(document).ready(function () {
    eventoAsistencia.init();
    $('.select-buscador').on('select2:select', function () {
        var id = $(this).val();
        seleccionarBuscador(id);
    });
    $('#btn_save').click(function () {
        eventoAsistencia.save();
    });
});

var idName = null;
var selected_id = 0;
var totalCount = 0;
var totalPresente = 0;
var totalVisita = 0;
var totalFalta = 0;
var listMGP = [];
var listES = [];


