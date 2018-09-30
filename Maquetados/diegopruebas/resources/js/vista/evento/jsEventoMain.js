var tipo_facil = -1;
var eventoMain = (function () {
    var prefab = {
        reuniongp: {
            idEvento: $('#idEvento').val(),
            evtNombre: "Reunión de Grupo Pequeño",
            evtDescripcion: "Cumpliendo con la meta del relacionamiento, los grupos pequeños se reúnen para orar, estudiar la biblia, confraternizar y alabar a Dios",
            evtLugar: "En el lugar designado para cada grupo pequeño",
            evtFechaLimite: "+1d",
            evtDirA: "A",
            evtPart: "0",
            evtExcepcion: "0",
            evtTipo: 0,
            evtUnion: 0,
            evtCampo: 0,
            evtDistrito: 0,
            evtIglesia: 0,
            evtEstado: '1'
        },
        trabajomin: {
            idEvento: $('#idEvento').val(),
            evtNombre: "Trabajo de los Ministerios",
            evtDescripcion: "Cumpliendo con la misión, los jóvenes usan sus talentos al servicio de Dios.",
            evtLugar: "En el campo de acción de cada ministerio",
            evtFechaLimite: "+1d",
            evtDirA: "B",
            evtPart: "0",
            evtExcepcion: "0",
            evtTipo: 1,
            evtUnion: 0,
            evtCampo: 0,
            evtDistrito: 0,
            evtIglesia: 0,
            evtEstado: '1'
        },
        reuniones: {
            idEvento: $('#idEvento').val(),
            evtNombre: "Reunión de la Escuela Sabática",
            evtDescripcion: "La misión de la Escuela Sabática es la de ser un sistema de instrucción religiosa, de discipulado y de crecimiento espiritual de la Iglesia local.",
            evtLugar: "En el lugar designado para cada Escuela Sabática",
            evtFechaLimite: "+1d",
            evtDirA: "C",
            evtPart: "0",
            evtExcepcion: "0",
            evtTipo: 2,
            evtUnion: 0,
            evtCampo: 0,
            evtDistrito: 0,
            evtIglesia: 0,
            evtEstado: '1'
        }
    };
    /*
     * Obtener idEvento
     * si es diferente a cero
     *      cargarEvento
     * 
     */
    var init = function () {
        checkRols();
        var idEvento = $('#idEvento').val();
        if (idEvento.toString() !== '0') {
            $('#card_facil').addClass('hidden');
            $('#card_avanzado').removeClass('hidden');
            loadEvento(idEvento);
        } else {
            $('#card_facil').removeClass('hidden');
            $('#card_avanzado').addClass('hidden');
        }
        $('#evtTipo').trigger('change');
    };
    var checkRols = function () {
        var cando = false;
        if (userInfo.rolSelected === appDefaults.rols.MIPES_IG
                || userInfo.rolSelected === appDefaults.rols.MIPES_DI
                || userInfo.rolSelected === appDefaults.rols.MIPES_CA
                || userInfo.rolSelected === appDefaults.rols.MIPES_UN) {
            cando = true;
        }
        if (cando === false) {
            location.href = crm_context_path + "/error/403";
        }
    };
    var loadEvento = function (id) {
        var evento = {idEvento: id};
        eventoService.get(evento, function (result) {
            $('#evtTipo').val(result.evtTipo);
            $('#evtNombre').val(result.evtNombre);
            $('#evtDescripcion').val(result.evtDescripcion);
            $('#evtLugar').val(result.evtLugar);
            var picker = $('#evtFecha').pickadate('picker');
            picker.set('select', dateConverter.parse.longToDate(result.evtFecha));
            $('#evtHora').val(dateConverter.format.longStringToTime24(result.evtFecha));
            $('#evtFechaLimite').val(result.evtFechaLimite);
            $('#evtDirA').val(result.evtDirA);
            if (result.evtPart !== '0') {
                $('#participantes').removeClass('hidden');
                var arr = math.intervalStringToArray(result.evtPart);
                loadParticipantes($('#tbody_participantes'), arr, 0);
            }
            if (result.evtExcepcion !== '0') {
                var arr = math.intervalStringToArray(result.evtExcepcion);
                loadParticipantes($('#tbody_expeciones'), arr, 1);
            }
        });

    };

    var loadParticipantes = function (container, arr, mode) {
        var partArr = [];
        var status = 0;
        load(partArr, status, arr, mode, container);
    };

    var load = function (partArr, status, arr, mode, container) {
        if (status === arr.length) {
            render(partArr, mode, container);
        } else {
            if ($('#evtDirA').val() === 'A') {
                grupoService.get({idGrupo: arr[status]}, function (result) {
                    partArr.push(result);
                    status = status + 1;
                    load(partArr, status, arr, mode, container);
                });
            } else if ($('#evtDirA').val() === 'B') {
                ministerioService.get({idMinisterio: arr[status]}, function (result) {
                    partArr.push(result);
                    status = status + 1;
                    load(partArr, status, arr, mode, container);
                });
            } else if ($('#evtDirA').val() === 'C') {
                escuelaService.get({idEscuela: arr[status]}, function (result) {
                    partArr.push(result);
                    status = status + 1;
                    load(partArr, status, arr, mode, container);
                });
            } else if ($('#evtDirA').val() === 'D') {
                iglesiaService.get({idIglesia: arr[status]}, function (result) {
                    partArr.push(result);
                    status = status + 1;
                    load(partArr, status, arr, mode, container);
                });
            } else if ($('#evtDirA').val() === 'E') {
                distritoService.get({idDistrito: arr[status]}, function (result) {
                    partArr.push(result);
                    status = status + 1;
                    load(partArr, status, arr, mode, container);
                });
            } else {
                personaService.get({idPersona: arr[status]}, function (result) {
                    partArr.push(result);
                    status = status + 1;
                    load(partArr, status, arr, mode, container);
                });
            }
        }
    };

    var render = function (partArr, mode, container) {
        var rows = [];
        for (var i = 0; i < partArr.length; i++) {
            var row = partArr[i];

            if ($('#evtDirA').val() === 'A') {
                rows.push({
                    events: [],
                    cols: [{type: 'card-table-image', src: row.gpoLogo},
                        {type: 'card-table-content', label: '', value: row.gpoNombre},
                        {type: 'card-table-content', label: 'Escuela Sabática', value: row.escuela.escNombre}
                        , actionButton(mode, row.idGrupo)]
                });
            } else if ($('#evtDirA').val() === 'B') {
                rows.push({
                    events: [],
                    cols: [{type: 'card-table-image', src: row.minLogo},
                        {type: 'card-table-content', label: '', value: row.minNombre},
                        {type: 'card-table-content', label: 'Iglesia', value: row.iglesia.iglNombre}
                        , actionButton(mode, row.idMinisterio)]
                });

            } else if ($('#evtDirA').val() === 'C') {
                rows.push({
                    events: [],
                    cols: [{type: 'card-table-icon', icon: 'mdi-social-school amber'},
                        {type: 'card-table-content', label: '', value: row.escNombre},
                        {type: 'card-table-content', label: 'Iglesia', value: row.iglesia.iglNombre}
                        , actionButton(mode, row.idEscuela)]
                });

            } else if ($('#evtDirA').val() === 'D') {
                rows.push({
                    events: [],
                    cols: [{type: 'card-table-icon', icon: 'mdi-social-location-city green acent-4 white-text'},
                        {type: 'card-table-content', label: '', value: row.iglNombre},
                        {type: 'card-table-content', label: 'Distrito Misionero', value: row.distrito.disNombre}
                        , actionButton(mode, row.idIglesia)]
                });

            } else if ($('#evtDirA').val() === 'E') {
                rows.push({
                    events: [],
                    cols: [{type: 'card-table-icon', icon: 'mdi-social-location-city green acent-4 white-text'},
                        {type: 'card-table-content', label: '', value: row.disNombre},
                        {type: 'card-table-content', label: 'Campo/Misión', value: row.campo.cmpNombre}
                        , actionButton(mode, row.idDistrito)]
                });
            } else {
                rows.push({
                    events: [],
                    cols: [{type: 'card-table-image', src: row.perFoto, 'default': appDefaults.defaults.fotoPersona},
                        {type: 'card-table-content', label: '', value: row.perNombres + " " + row.perApellidos},
                        {type: 'card-table-content', label: 'Documento', value: row.perDocumento}
                        , actionButton(mode, row.idPersona)]
                });
            }
        }
        var idPrefix = strings.random(8);
        components.render(container, components.cardTable.code(rows, idPrefix));
        components.cardTable.event(rows, idPrefix);
    };

    var actionButton = function (mode, id) {
        var eventAction = "";
        if (mode === 0) {
            eventAction = "eventoMain.removeP(" + id + ")";
        } else {
            eventAction = "eventoMain.removeE(" + id + ")";
        }
        return {type: 'card-table-action', button: '<a class="btn btn-flat btn-floating red white-text right" onclick="' + eventAction + '"><i class="mdi-action-delete"></i></a>'};
    };

    var removeP = function (id) {
        var idName = getIDName();
        for (var i = 0; i < participantes.length; i++) {
            if (participantes[i][idName] + "" === id + "") {
                participantes.splice(i, 1);
                break;
            }
        }
        for (var i = 0; i < partID.length; i++) {
            if (partID[i] + "" === id + "") {
                partID.splice(i, 1);
                break;
            }
        }
        render(participantes, 0, '#tbody_participantes');
    };
    var removeE = function (id) {
        var idName = getIDName();
        for (var i = 0; i < excepciones.length; i++) {
            if (excepciones[i][idName] + "" === id + "") {
                excepciones.splice(i, 1);
                break;
            }
        }
        for (var i = 0; i < exID.length; i++) {
            if (exID[i] + "" === id + "") {
                exID.splice(i, 1);
                break;
            }
        }
        render(excepciones, 1, '#tbody_expeciones');
    };

    var save = function () {
        var idEvento = $('#idEvento').val();
        if (idEvento.toString() === '0') {
            eventoService.add(mapEvento(), function (result) {
                setTimeout(function () {
                    location.href = crm_context_path + "/evento/listEvento";
                }, 2000);
            });
        } else {
            eventoService.update(mapEvento(), function () {
                setTimeout(function () {
                    location.href = crm_context_path + "/evento/listEvento";
                }, 2000);
            });
        }
    };

    var mapEvento = function () {
        var fecha = $('input[name="evtFecha"]').val() + " " + $('#evtHora').val();
        var timestamp = new Date(fecha).getTime();
        var evento = {
            idEvento: $('#idEvento').val(),
            evtNombre: $('#evtNombre').val(),
            evtDescripcion: $('#evtDescripcion').val(),
            evtLugar: $('#evtLugar').val(),
            evtFecha: timestamp,
            evtDuracion:$('#evtDuracion').val(),
            evtFechaLimite: $('#evtFechaLimite').val(),
            evtDirA: $('#evtDirA').val(),
            evtPart: mapPart(0),
            evtExcepcion: mapPart(1),
            evtTipo: $('#evtTipo').val(),
            evtUnion: 0,
            evtCampo: 0,
            evtDistrito: 0,
            evtIglesia: 0,
            evtEstado: '1'
        };
        if (userInfo.rolSelected === appDefaults.rols.MIPES_UN || userInfo.rolSelected === appDefaults.rols.DIRECTOR_UN) {
            evento.evtUnion = userInfo.union.idUnion;
        } else if (userInfo.rolSelected === appDefaults.rols.MIPES_CA || userInfo.rolSelected === appDefaults.rols.DIRECTOR_CA) {
            evento.evtCampo = userInfo.campo.idCampo;
        } else if (userInfo.rolSelected === appDefaults.rols.MIPES_DI || userInfo.rolSelected === appDefaults.rols.PASTOR_DI) {
            evento.evtDistrito = userInfo.distrito.idDistrito;
        } else if (userInfo.rolSelected === appDefaults.rols.MIPES_IG || userInfo.rolSelected === appDefaults.rols.ANCIANO_IG) {
            evento.evtIglesia = userInfo.iglesia.idIglesia;
        }
        console.log(evento);
        return evento;
    };

    var mapPart = function (mode) {
        if (mode === 0) {
            var part = $('#evtPartS').val();
            if (part !== '0') {
                return math.formatArrayInterval(partID);
            } else {
                return "0";
            }
        } else {
            if (exID.length > 0) {
                return math.formatArrayInterval(exID);
            } else {
                return "0";
            }
        }
    };

    var validate = function () {
        var cando = true;
        var title = "Registro de Evento";
        if (strings.validate($('#evtNombre').val()) === false) {
            cando = false;
            errorMessage({title: title, content: "Debe ingresar el nombre del evento"});
        }
        if (strings.validate($('#evtDescripcion').val()) === false) {
            cando = false;
            errorMessage({title: title, content: "Debe ingresar la descripcion del evento"});
        }
        if (strings.validate($('#evtLugar').val()) === false) {
            cando = false;
            errorMessage({title: title, content: "Debe ingresar el Lugar donde se realizará el evento"});
        }
        if (strings.validate($('input[name="evtFecha"]').val()) === false) {
            cando = false;
            errorMessage({title: title, content: "Debe seleccionar la fecha del evento"});
        }

        if ($('#evtPartS').val() !== '0' && participantes.length === 0) {
            cando = false;
            errorMessage({title: title, content: "Debe seleccionar los participantes al evento"});
        }
        return cando;
    };

    var getIDName = function () {
        var idName = 'idPersona';
        var val = $('#evtDirA').val();
        switch (val) {
            case "A":
                idName = "idGrupo";
                break;
            case "B":
                idName = "idMinisterio";
                break;
            case "C":
                idName = "idEscuela";
                break;
            case "D":
                idName = "idIglesia";
                break;
            case "E":
                idName = "idDistrito";
                break;
        }
        return idName;
    };

    var openFacil = function (tipo) {
        var label = '';
        switch (tipo) {
            case 0:
                label = 'Reunión de Grupo Pequeño';
                break;
            case 1:
                label = 'Trabajo de los Ministerios';
                break;
            case 2:
                label = 'Reunión de la Escuela Sabática';
                break;
        }
        $('#evtTipoLabel').html(label);
        $('#regFacil').openModal();
        tipo_facil = tipo;
    };

    var saveEasy = function () {
        var fecha = $('input[name="evtFechaF"]').val() + " " + $('#evtHoraF').val();
        var evento = null;
        switch (tipo_facil) {
            case 0:
                evento = prefab.reuniongp;
                break;
            case 1:
                evento = prefab.trabajomin;
                break;
            case 2:
                evento = prefab.reuniones;
                break;
        }
        $('#evtNombre').val(evento.evtNombre);
        $('#evtDescripcion').val(evento.evtDescripcion);
        $('#evtLugar').val(evento.evtLugar);
        var picker = $('#evtFecha').pickadate('picker');
        picker.set('select', new Date(fecha));
        $('#evtHora').val($('#evtHoraF').val());
        $('#evtFechaLimite').val(evento.evtFechaLimite);
        $('#evtDirA').val(evento.evtDirA);
        $('#evtPartS').val(0);
        $('#evtTipo').val(tipo_facil);
        save();
        $('#regFacil').closeModal();
    };
    var clearAll = function () {
        $('#evtNombre').val('');
        $('#evtDescripcion').val('');
        $('#evtLugar').val('');
        var picker = $('#evtFecha').pickadate('picker');
        picker.set('select', new Date());
        $('#evtFechaLimite').val('+1d');
        $('#evtDirA').val('A');
        $('#evtPartS').val(0);
        $('#evtTipo').val(0);
        tipo_facil = -1;
    };
    var modoAvanzado = function (tipo) {
        $('#evtTipo').val(tipo);
        switch (tipo) {
            case 3:
                $('#evtNombre').val('Esta es una Capacitación o seminario');
                $('#evtLugar').val('Lugar de la Capacitación');
                break;
            case 4:
                $('#evtNombre').val('Este es un desfile de Grupos Pequeños');
                $('#evtLugar').val('Lugar donde se realizará el desfile');
                break;
        }
        $('#card_facil').addClass('hidden');
        $('#card_avanzado').removeClass('hidden');
        $('#evtTipo').trigger('change');
        $('#evtNombre').focus();
        
    };

    return {
        init: init,
        validate: validate,
        save: save,
        mapEvento: mapEvento,
        render: render,
        getIDName: getIDName,
        removeE: removeE,
        removeP: removeP,
        openFacil: openFacil,
        saveEasy: saveEasy,
        modoAvanzado: modoAvanzado
    };
}());

var participantes = [];
var excepciones = [];

var partID = [];
var exID = [];

var search_mode = 0;
$(document).ready(function () {
    eventoMain.init();
    $('#evtPartS').change(function () {
        var val = $(this).val();
        if (val === '0') {
            $('#participantes').addClass('hidden');
            $('#excepciones').removeClass('hidden');
        } else {
            $('#participantes').removeClass('hidden');
            $('#excepciones').addClass('hidden');
        }
    });
    $('#btnGuardar').click(function () {
        if (eventoMain.validate()) {
            $(this).attr('disabled', true);
            $(this).html('Guardando...');
            eventoMain.save();
        }
    });

    $('#evtDirA').change(function () {
        var val = $(this).val();
        $('.buscador').addClass('hidden');
        switch (val) {
            case "A":
                $('#select_grupo').parent().parent().parent().removeClass('hidden');
                break;
            case "B":
                $('#select_ministerio').parent().parent().parent().removeClass('hidden');
                break;
            case "C":
                $('#select_escuela').parent().parent().parent().removeClass('hidden');
                break;
            case "D":
                $('#select_iglesia').parent().parent().parent().removeClass('hidden');
                break;
            case "E":
                $('#select_distrito').parent().parent().parent().removeClass('hidden');
                break;
        }
        if (val === 'F' || val === 'G' || val === 'H' || val === 'I' || val === 'J' || val === 'K' || val === 'L' || val === 'M' || val === 'N') {
            $('#select_persona').parent().parent().parent().removeClass('hidden');
        }
        participantes = [];
        excepciones = [];
        partID = [];
        exID = [];
        $('#tbody_participantes').empty();
        $('#tbody_expeciones').empty();
    });


    $('.select-buscador').on('select2:select', function () {
        var id = $(this).val();
        seleccionarBuscador(id);
    });
    
    $('#evtTipo').change(function () {
        var tipo = $(this).val();
        switch (tipo) {
            case '0':
                disableOptions([false,true,true,true,true,true,true,true,true,true,true,true,true,true]);
                break;
            case '1':
                disableOptions([true,false,true,true,true,true,true,true,true,true,true,true,true,true]);
                break;
            case '2':
                disableOptions([true,true,false,true,true,true,true,true,true,true,true,true,true,true]);
                break;
            case '3':
                disableOptions([true,true,true,true,true,false,false,false,false,false,false,false,false,false]);
                break;
            case '4':
                disableOptions([false,true,true,true,true,true,true,true,true,true,true,true,true,true]);
                break;
            case '9':
                disableOptions([false,false,false,false,false,false,false,false,false,false,false,false,false,false]);
                break;
        }
    });

});

function disableOptions(arr) {
    $('#dirA_A').attr('disabled', arr[0]);
    $('#dirA_A').attr('disabled', arr[0]);
    $('#dirA_B').attr('disabled', arr[1]);
    $('#dirA_C').attr('disabled', arr[2]);
    $('#dirA_D').attr('disabled', arr[3]);
    $('#dirA_E').attr('disabled', arr[4]);
    $('#dirA_F').attr('disabled', arr[5]);
    $('#dirA_G').attr('disabled', arr[6]);
    $('#dirA_H').attr('disabled', arr[7]);
    $('#dirA_I').attr('disabled', arr[8]);
    $('#dirA_J').attr('disabled', arr[9]);
    $('#dirA_K').attr('disabled', arr[10]);
    $('#dirA_L').attr('disabled', arr[11]);
    $('#dirA_M').attr('disabled', arr[12]);
    $('#dirA_N').attr('disabled', arr[13]);
    
    $('#dirA_A').attr('selected', !arr[0]);
    $('#dirA_A').attr('selected', !arr[0]);
    $('#dirA_B').attr('selected', !arr[1]);
    $('#dirA_C').attr('selected', !arr[2]);
    $('#dirA_D').attr('selected', !arr[3]);
    $('#dirA_E').attr('selected', !arr[4]);
    $('#dirA_F').attr('selected', !arr[5]);
    $('#dirA_G').attr('selected', !arr[6]);
    $('#dirA_H').attr('selected', !arr[7]);
    $('#dirA_I').attr('selected', !arr[8]);
    $('#dirA_J').attr('selected', !arr[9]);
    $('#dirA_K').attr('selected', !arr[10]);
    $('#dirA_L').attr('selected', !arr[11]);
    $('#dirA_M').attr('selected', !arr[12]);
    $('#dirA_N').attr('selected', !arr[13]);
}

function seleccionarBuscador(id) {
    var idName = eventoMain.getIDName();
    var found = -1;
    for (var i = 0; i < select_results.length; i++) {
        if (select_results[i][idName] + "" === id + "") {
            found = i;
        }
    }
    if (found > -1) {
        if (search_mode === 0) {
            participantes.push(select_results[found]);
            partID.push(select_results[found][idName]);
            var container = '#tbody_participantes';
            eventoMain.render(participantes, search_mode, container);
        } else {
            excepciones.push(select_results[found]);
            exID.push(select_results[found][idName]);
            var container = '#tbody_expeciones';
            eventoMain.render(excepciones, search_mode, container);
        }
        cerrarBuscador();
    }
}

function cerrarBuscador() {
    $('#modalBuscar').closeModal();
    select2.clear($('.crm-select2'));
}

var select_results = [];
function loadSelect(obj) {
    select_results = obj;
}