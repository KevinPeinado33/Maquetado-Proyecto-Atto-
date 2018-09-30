var grupo = (function () {
    var CURRENT_LIST = [];
    var GRUPO_SELECTED = null;
    var ID_ESCUELA = null;
    var SAVE_MODE = 0;
    var RENDER_LIST_CONTAINER = $('#list_body');
    var gService = new grupoService();

    var setIdEscuela = function (id) {
        ID_ESCUELA = id;
    };

    var getIdEscuela = function () {
        return ID_ESCUELA;
    };
    
    var list = function (idEscuela) {
        if (idEscuela !== undefined && idEscuela !== null) {
            ID_ESCUELA = idEscuela;
        }
        renderList([]);
        gService.listGrupo({idEscuela: ID_ESCUELA}, function (list) {
            CURRENT_LIST = list;
            renderList(list);
        });
    };

    var save = function () {
        var nombregp = $("#gpoNombre").val();
        var lreunion = $("#gpoLugar").val();
        var tip = $("#tipModal").val();
        if (nombregp !== "" && lreunion !== "") {
            var grupo;
            if (tip === "create") {
                grupo = {
                    gpoNombre: nombregp,
                    gpoLugarReunion: lreunion,
                    escuela: {idEscuela: idEscuela}
                };
                gService.addGrupo(grupo, reload);
            }
            if (tip === "update") {
                grupo = {
                    gpoNombre: nombregp,
                    gpoLugarReunion: lreunion,
                    idGrupo: grupoAct.idGrupo,
                    gpoEstado: grupoAct.gpoEstado,
                    gpoUsuAdd: grupoAct.gpoUsuAdd,
                    gpoFechaCreacion: grupoAct.gpoFechaCreacion,
                    gpoFechaAdd: grupoAct.gpoFechaAdd,
                    escuela: {idEscuela: grupoAct.escuela.idEscuela}
                };
                gService.updateGrupo(grupo, reload);
            }
            $('#modal1').closeModal();
        } else {
            alert("Campos Incompletos...");
        }
    };

    var mapGrupo = function () {
        var tmp = JSON.parse(JSON.stringify(GRUPO_SELECTED));
        tmp.gpoNombre = $('#gpoNombre').val();
        tmp.gpoLugarReunion = $('#gpoLugarReunion').val();
        tmp.gpoFechaCreacion = document.getElementsByName('gpoFechaCreacion').value;
        return tmp;
    };

    var deleteGrupo = function () {
        confirmMessage({
            title: 'Eliminar Grupo Pequeño',
            content: '¿Seguro que desea eliminar este grupo?'
        }, function () {
            gService.deleteGrupo(GRUPO_SELECTED, grupo.list());
        });
    };

    var renderList = function (list) {
        var rows = [];
        for (var i = 0; i < list.length; i++) {
            var grupo = list[i];
            var date = new Date(grupo.gpoFechaCreacion);
            var year = date.getFullYear();
            var month = 1 + date.getMonth();
            var day = date.getDate();

            rows.push({
                events: [{type: 'click', action: "redirect('/grupo/profile/" + grupo.idGrupo + "')"}],
                cols: [
                    {type: 'card-table-icon', icon: 'mdi-social-group', background: 'green accent-4 white-text'},
                    {type: 'card-table-content', label: '', value: grupo.gpoNombre.toUpperCase()},
                    {type: 'card-table-content', label: 'Lugar de Reunion', value: grupo.gpoLugarReunion},
                    {type: 'card-table-content', label: 'Fecha de Creacion', value: day + '/' + month + '/' + year}

                ]
            });

        }
        var idPrefix = strings.random(8);
        components.render(RENDER_LIST_CONTAINER, components.cardTable.code(rows, idPrefix));
        components.cardTable.event(rows, idPrefix);
        components.dropdownButton.init();
    };
    var showModal = function (id) {
        GRUPO_SELECTED = CURRENT_LIST[id];
        renderModal(GRUPO_SELECTED);
    };
    var renderModal = function (grupo) {
        clearModal();
        if (grupo.gpoLogo !== undefined && grupo.gpoLogo !== null && grupo.gpoLogo !== '' && grupo.gpoLogo !== 'default') {
            renderDropify(grupo.gpoLogo);
        } else {
            renderDropify(appDefaults.defaults.logoGrupo);
        }

        $('#modal_title').html('Actualizar datos de Grupo Pequeño');
        $('#gpoNombre').val(grupo.gpoNombre);
        $('#gpoLugarReunion').val(grupo.gpoLugarReunion);
        var picker = $('#gpoFechaCreacion').pickadate('picker');
        picker.set('select', new Date(grupo.gpoFechaCreacion));
        $('#modal1').openModal();
        Materialize.updateTextFields();
        SAVE_MODE = 1;
    };
    var clearModal = function () {
        SAVE_MODE = 0;
        GRUPO_SELECTED = null;
        renderDropify('');
        $('.dropify-clear').trigger('click');
        $('#modal_title').html('Registro de Grupo Pequeño');
        $('#gpoNombre').val('');
        $('#gpoLugarReunion').val('');
        var picker = $('#gpoFechaCreacion').pickadate('picker');
        picker.set('clear');
    };

    var renderDropify = function (image) {
        var t = '<input type="file" id="gpoLogo" name="gpoLogo" class="dropify" accept="image/*"';
        t += 'data-default-file="' + image + '" data-max-file-size="6M" data-height="150"';
        t += 'data-allowed-file-extensions="png jpg jpeg bmp gif"/>';
        $('#dropify_container').empty();
        $('#dropify_container').append(t);
        dropify.init();
    };
    return {
        IDESCUELA: ID_ESCUELA,
        list: list,
        showModal: showModal,
        'delete': deleteGrupo,
        setIdEscuela: setIdEscuela,
        getIdEscuela: getIdEscuela,
        selected: GRUPO_SELECTED
    };
}());

var gService = new grupoService();
//$(document).ready(function () {
//    $("#title_escuela").html(userInfo.escuela.escNombre);
//    grupo.setIdEscuela(userInfo.escuela.idEscuela);
//    grupo.list();
//});



                                                                