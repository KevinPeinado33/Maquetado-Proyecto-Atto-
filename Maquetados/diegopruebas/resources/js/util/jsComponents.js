var components = (function () {

    var init = function () {
        $(appDefaults.classes.modalPictureSelector).each(function () {
            render($(this), modalPictureSelector.code());
            dropify.init();
        });
    };

    var render = function (container, content) {
        $(container).empty();
        $(container).append(content);
    };
    var cardTable = {
        code: function (rows, idPrefix) {
            var TYPE_ICON = 'card-table-icon';
            var TYPE_IMAGE = 'card-table-image';
            var TYPE_CONTENT = 'card-table-content';
            var TYPE_ACTION = 'card-table-action';
            var s = '<table class="card-table">';
            s += '<tbody>';
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                s += '<tr id="' + idPrefix + i + '">';
                for (var j = 0; j < row.cols.length; j++) {
                    var col = row.cols[j];
                    if (col.type === TYPE_ICON && j === 0) {
                        s += '<td class="' + TYPE_ICON + '"><i class="' + col.icon + '"></i></td>';
                    }
                    if (col.type === TYPE_IMAGE && j === 0) {
                        s += '<td class="' + TYPE_ICON + '"><img class="circle" width="48px" height="48px" src="' + crm_context_path + "/image/get/" + col.src + '" onerror="this.src = \'' + crm_context_path + col.default + '\'" /></td>';
                    }
                    if (col.type === TYPE_CONTENT) {
                        if (j === 1) {
                            s += '<td class="' + TYPE_CONTENT + '">';
                            s += '<span class="card-table-title">' + col.value + '</span>';
                            if (mobile.isMobile()) {
                                for (var k = 2; k < row.cols.length; k++) {
                                    if (row.cols[k].type !== TYPE_ACTION) {
                                        s += '<br class="hide-on-med-and-up" />';
                                        s += '<span class="hide-on-med-and-up card-table-subtitle">' + row.cols[k].value + '</span>';
                                    }
                                }
                            }
                        } else {
                            if (mobile.isMobile() === false) {
                                s += '<td class="' + TYPE_CONTENT + ' hide-on-small-only">';
                                s += '<span class="card-table-subtitle">' + col.label + '</span><br><span>' + col.value + '</span>';
                            }
                        }
                        s += '</td>';
                    }
                    if (col.type === TYPE_ACTION && j === row.cols.length - 1) {
                        s += '<td class="' + TYPE_ACTION + '">';
                        s += col.button;
                        s += '</td>';
                    }
                }
                s += '</tr>';
            }


            s += '</tbody>';
            s += '</table>';
            return s;
        },
        event: function (rows, idPrefix) {
            var EVENT_CLICK = 'click';
            var EVENT_RIGHT_CLICK = 'rightclick';
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                for (var j = 0; j < row.events.length; j++) {
                    var event = row.events[j];
                    if (event.type === EVENT_CLICK) {
                        $('#' + idPrefix + i).attr('onclick', event.action);
                    }
                    if (event.type === EVENT_RIGHT_CLICK && !mobile.isMobile()) {
                        $("#" + idPrefix + i).attr('oncontextmenu', event.action);
                    }
                }
            }
        }
    };

    var cardEvent = {
        code: function (items, options) {
            var s = '';
            if (items !== undefined && undefined !== null) {
                for (var i = 0; i < items.length; i++) {
                    var row = items[i];
                    var icon = '';
                    var title = '';
                    if (row.evtTipo === '0') {
                        icon = 'circle-32 mdi-action-home green accent-4 white-text';
                        title = "Reunión de Grupos Pequeños";
                    } else if (row.evtTipo === '1') {
                        icon = 'circle-32 mdi-action-favorite red white-text';
                        title = "Trabajo de Ministerios";
                    } else if (row.evtTipo === '2') {
                        icon = 'circle-32 mdi-social-school amber white-text';
                        title = "Reunion de la Escuela Sabática";
                    } else if (row.evtTipo === '3') {
                        icon = 'circle-32 mdi-action-accessibility purple white-text';
                        title = "Capacitación";
                    } else if (row.evtTipo === '4') {
                        icon = 'circle-32 mdi-content-flag green accent-4 white-text';
                        title = "Desfile de Grupos Pequeños";
                    } else if (row.evtTipo === '9') {
                        icon = 'circle-32 mdi-action-event blue-grey white-text';
                        title = "Otros";
                    }

                    var fecha_actual = new Date().getTime();
                    var fecha_evento = dateConverter.parse.longToDate(row.evtFecha).getTime();
                    var fecha_limite = dateConverter.addTime(fecha_evento, row.evtFechaLimite);

                    var mes = dateConverter.format.longToMonthName(row.evtFecha);
                    mes = mes.replace(".", "");
                    mes = mes.toUpperCase();
                    var dia = dateConverter.format.longToDayNumber(row.evtFecha);
                    var hora = dateConverter.format.longStringToTime(row.evtFecha);
                    var duracion = row.evtDuracion + " horas";
                    var limite = dateConverter.format.longToDateTime(dateConverter.addTime(parseInt(row.evtFecha), row.evtFechaLimite).getTime());

                    var color = '';
                    var t = '';
                    var is_time = true;
                    if (fecha_actual < fecha_evento) {
                        color = 'blue-text';
                        t += 'AUN NO ES TIEMPO';
                        is_time = false;
                    } else if (fecha_actual >= fecha_evento && fecha_actual <= fecha_limite) {
                        color = 'green-text';
                        t += 'A TIEMPO';
                    } else {
                        color = 'red-text';
                        t += 'TARDE';
                    }

                    s += '<div class="col ' + options.classes + ' no-padding-left-mobile no-padding-right-mobile">';
                    s += '<div class="crm-event-container crm-box-shadow-1">';
                    s += '<div class="crm-event-title">';
                    s += '<i class="' + icon + '"></i>';
                    s += '<span>&nbsp;&nbsp;&nbsp;&nbsp;' + row.evtNombre + '</span>';
                    if (options.actions === true) {
                        s += '<div class="fixed-action-btn horizontal click-to-toggle btn-options-evento">';
                        s += '<a class="btn-floating btn-flat white">';
                        s += '<i class="mdi-navigation-more-vert black-text"></i>';
                        s += '</a>';
                        s += '<ul>';
                        s += '<li><a class="btn-floating red btn-delete-evento" data-evento="' + row.idEvento + '"><i class="large mdi-action-delete"></i></a>';
                        s += '</li>';
                        s += '<li><a class="btn-floating green accent-4 btn-update-evento" href="' + crm_context_path + '/evento/main/' + row.idEvento + '"><i class="large mdi-image-edit"></i></a>';
                        s += '</li>';
                        s += '</ul>';
                        s += '</div>';
                    }
                    s += '</div>';
                    s += '<div class="crm-event-time grey-text">';
                    s += '<div class="row">';
                    s += '<div class="col l12 m12 s12">';
                    s += '<span class="font-small">Fecha límite: ' + limite + '</span>';
                    s += '<span class="right ' + color + ' bold"><i class="mdi-image-timer"></i> ' + t + '</span>';
                    s += '</div>';
                    s += '</div>';
                    s += '</div>';
                    s += '<div>';
                    s += '<div class="crm-event-date">';
                    s += '<span>' + mes + '</span><br />';
                    s += '<span class="font-large">' + dia + '</span><br />';
                    s += '<span class="font-small">' + hora + '</span><br />';
                    s += '</div>';
                    s += '<div class="crm-event-description">';
                    //s += '<span class="bold">' + row.evtNombre + '</span><br />';
                    s += row.evtDescripcion + '<br />';
                    if (strings.validate(row.evtLugar)) {
                        s += '<strong>Lugar:</strong> ' + row.evtLugar + ' <br />';
                    }
                    s += '<strong>Duración:</strong>' + duracion;
                    s += '</div>';
                    s += '</div>';
                    if (options.actions === true && is_time === true) {
                        s += '<div class="crm-event-actions">';
                        s += '<div class="row">';
                        s += '<div class="col l12 m12 s12">';
                        s += '<a href="' + crm_context_path + '/evento/asistencia/' + row.idEvento + '"  class="crm-event-action-button right">Registrar Asistencia</a>';
                        s += '</div>';
                        s += '</div>';
                        s += '</div>';
                    }
                    s += '</div>';
                    s += '</div>';
                }
            }
            return s;
        }
    };

    var actionMenu = {
        code: function (items) {
            var id = strings.random(8);
            var s = '<ul id="action_menu' + id + '" class="dropdown-content">';
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                s += '<li><a onclick ="' + item.action + '">' + item.value + '</a></li>';
            }
            s += '</ul>';
            s += '<a class="dropdown-button waves-effect waves-light" data-activates = "action_menu' + id + '">';
            s += '<i class="mdi-navigation-more-vert"></i>';
            s += '</a>';
            return s;
        }
    };
    var dropdownButton = {
        init: function () {
            $(".dropdown-button").dropdown({
                inDuration: 300,
                outDuration: 125,
                constrain_width: !0,
                hover: !1,
                alignment: "left",
                gutter: 0,
                belowOrigin: !0});
        }
    };

    var modalPictureSelector = {
        code: function () {
            var t = '';
            t += '<div id="image_box" class="modal-content">';
            t += '<input type="file" id="dropifyContent" name="dropifyContent" class="dropify" accept="image/*"';
            t += 'data-default-file="" data-max-file-size="6M" data-height="250"';
            t += 'data-allowed-file-extensions="png jpg jpeg bmp gif"/>';
            t += '</div>';
            t += '<div id="loader_box" class="modal-content hidden">';
            t += '<center>';
            t += '<div class="preloader-wrapper small active">';
            t += '<div class="spinner-layer spinner-blue-only">';
            t += '<div class="circle-clipper left">';
            t += '<div class="circle"></div>';
            t += '</div>';
            t += '<div class="gap-patch">';
            t += '<div class="circle"></div>';
            t += '</div>';
            t += '<div class="circle-clipper right">';
            t += '<div class="circle"></div>';
            t += '</div>';
            t += '</div>';
            t += '</div><br />';
            t += '<span>Espere un momento por favor</span>';
            t += '</center>';
            t += '</div>';
            t += '<div class="modal-footer white">';
            t += '<div class="row">';
            t += '<div class="col l12 m12 s12">';
            t += '<a id="btnUpload" class="waves-effect waves-light purple white-text ';
            t += 'btn-flat">Subir Foto</a>';
            t += '<a class="waves-effect waves-light btn-flat modal-action modal-close">Cancelar</a>';
            t += '</div>';
            t += '</div>';
            t += '</div>';
            return t;
        }
    };

    var modalMemberSearch = {
        code: function (id, data_callback, title) {
            var t = '';
            t += '<div class="modal-content">';
            t += '<h4>' + title + '</h4>';
            t += '<div class="row">';
            t += '<div class="col s12 m12 l12 no-padding-mobile">';
            t += '<div class="card crm-box-shadow-1">';
            t += '<div class="card-content">';
            t += '<select name="test" id="persona" class="crm-select2" ';
            t += 'data-profile-id="' + id + '" data-callback="' + data_callback + '">';
            t += '<option value="0">Seleccione una persona</option></select>';
            t += '<br/>';
            t += '<p class="grey-text font-small">';
            t += 'Ingrese nombres, apellidos o número de documento de la persona';
            t += 'para iniciar la búsqueda.';
            t += '</p>';
            t += '</div>';
            t += '</div>';
            t += '</div>';
            t += '</div>';
            t += '</div>';
            return t;
        }
    };

    var modalSetRol = {
        code: function (id, data_callback, roles) {
            var t = '';
            t += '<div class="modal-content">';
            t += '<h4>Asignar Roles</h4>';
            t += '<div class="row">';
            t += '<div class="col s12 m12 l12 no-padding-mobile">';
            t += '<div class="card crm-box-shadow-1">';
            t += '<div class="card-content">';
            t += '<label for="rolS">Rol</label>';
            t += '<select name="ad" id="rolS" class="browser-default">';
            t += '<option value="0">Seleccione un rol</option>';
            for (var i = 0; i < roles.length; i++) {
                t += '<option value="' + roles[i].id + '">' + roles[i].nombre + '</option>';
            }
            t += '</select>';
            t += '<label for="fd">Persona</label>';
            t += '<select name="test" id="persona" class="crm-select2"  ';
            t += 'data-profile-id="' + id + '" data-callback="' + data_callback + '">';
            t += '<option value="0">Seleccione una persona</option></select>';
            t += '<br/>';
            t += '<p class="grey-text font-small">';
            t += 'Ingrese nombres, apellidos o número de documento de la persona';
            t += 'para iniciar la búsqueda.';
            t += '</p>';
            t += '</div>';
            t += '</div>';
            t += '</div>';
            t += '</div>';
            t += '</div>';
            return t;
        }
    };

    var modalNewPerson = {
        code: function () {
            var t = '';
            t += '<div class="modal-content">';
            t += '<h4>Registro de Persona</h4>';
            t += '<div class="row">';
            t += '<div class="col l6 m12 s12 input-field">';
            t += '<input type="text" id="perNombres" name="perNombres" value=""/>';
            t += '<label for="perNombres">Nombre(s)</label>';
            t += '</div>';
            t += '<div class="col l6 m12 s12 input-field">';
            t += '<input type="text" id="perApellidos" name="perApellidos" value=""/>';
            t += '<label for="perApellidos">Apellidos</label>';
            t += '</div>';
            t += '</div>';
            t += '<div class="row">';
            t += '<div class="col l6 m12 s12">';
            t += '<label>Documento</label>';
            t += '<select name="test" id="documento" class="browser-default"></select>';
            t += '<br/>';
            t += '</div>';
            t += '<div class="col l6 m12 s12 input-field">';
            t += '<input type="text" id="perDocumento" name="perDocumento" value=""/>';
            t += '<label for="perDocumento">N° de Documento</label>';
            t += '</div>';
            t += '</div>';
            t += '<label>Género</label>';
            t += '<div class="row">';
            t += '<p class="col l3 m6 s6">';
            t += '<input name="group1" type="radio" id="test1" value="M">';
            t += '<label for="test1">Masculino</label>';
            t += '</p>';
            t += '<p class="col l3 m6 s6">';
            t += '<input name="group1" type="radio" id="test2" value="F">';
            t += '<label for="test2">Femenino</label>';
            t += '</p>';
            t += '</div>';
            t += '</div>';
            return t;
        }
    };

    return {
        render: render,
        cardTable: cardTable,
        actionMenu: actionMenu,
        dropdownButton: dropdownButton,
        modalPictureSelector: modalPictureSelector,
        cardEvent: cardEvent,
        modalMemberSearch: modalMemberSearch,
        modalNewPerson: modalNewPerson,
        modalSetRol: modalSetRol,
        init: init
    };
}());
