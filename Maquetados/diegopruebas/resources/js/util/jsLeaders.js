
var adminLeaders = (function () {
    var addLeader = function (idPersona, idRol, _callback) {
        var detrol = {
            persona: {
                idPersona: idPersona
            },
            rol: {
                idRol: idRol
            }
        };
        detrolService.add(detrol, function (result) {
            _callback(result);
        });
    };
    var listLeaders = function (option, RENDER_MIPES_CONTAINER) {
        detrolService.getLeaders(option, function (result) {
            var rows = [];
            for (var i = 0; i < result.length; i++) {
                var directivo = result[i];
                rows.push({
                    events: [{type: 'click', action: "redirect(/persona/profile/1)"}],
                    cols: [
                        {type: 'card-table-image', src: directivo.PER_FOTO, 'default': appDefaults.defaults.fotoPersona},
                        {type: 'card-table-content', label: '', value: directivo.PER_NOMBRES + ' ' + directivo.PER_APELLIDOS},
                        {type: 'card-table-content', label: 'Cargo', value: directivo.ROL_NOMBRE},
                        {type: 'card-table-action', button: '<button class="btn-floating btn-flat red white-text waves-effect waves-light right btnRemoveLeader" onclick="adminLeaders.removeRol(' + directivo.idPersona + ',' + directivo.idRol + ',' + option + ')">'
                                    + '<i class="mdi-content-clear"></i>'
                                    + '</button>'}
                    ]
                });
                var idPrefix = strings.random(8);
                components.render(RENDER_MIPES_CONTAINER, components.cardTable.code(rows, idPrefix));
                components.cardTable.event(rows, idPrefix);
            }
        });
    };
    var removeRol = function (idPersona, idRol, option) {
        var detrol = {
            persona: {
                idPersona: idPersona
            },
            rol: {
                idRol: idRol
            }
        };
        confirmMessage({
            title: 'Desvinculación',
            content: '¿Seguro que desea desvincular este rol a esta persona?'
        }, function () {
            detrolService.remove(detrol, function (result) {
                adminLeaders.listLeaders(option, $('#tab3'));
            });
        });
    };
    return {
        addLeader: addLeader,
        listLeaders: listLeaders,
        removeRol: removeRol
    };
}());
