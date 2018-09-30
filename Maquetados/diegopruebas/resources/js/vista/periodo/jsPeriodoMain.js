
var periodoMain = (function () {
    var idSelected = 0;
    var nameSelected = '';
    var s = userInfo.rolSelected;
    
    var init = function () {
        list();
        checkDirA();
    };
    var checkDirA = function () {
        
        if (s === appDefaults.rols.DIRECTOR_UN || s === appDefaults.rols.MIPES_UN) {
            $('#dirA').append('<option value ="0">Unión</option>');
            $('#dirA').append('<option value ="1">Campo / Misión</option>');
            $('#dirA').append('<option value ="2">Distrito</option>');
            $('#dirA').append('<option value ="3">Iglesia</option>');
            $('#pre_selected').parent().removeClass('hidden');
            $('#pre_selected').val(userInfo.union.uniNombre);
            $('#label_pre_selected').html("Unión");
            idSelected = userInfo.union.idUnion;
            nameSelected = userInfo.union.uniNombre;
        } else if (s === appDefaults.rols.DIRECTOR_CA || s === appDefaults.rols.MIPES_CA) {
            $('#dirA').append('<option value ="1">Campo / Misión</option>');
            $('#dirA').append('<option value ="2">Distrito</option>');
            $('#dirA').append('<option value ="3">Iglesia</option>');
            $('#pre_selected').parent().removeClass('hidden');
            $('#pre_selected').val(userInfo.campo.cmpNombre);
            $('#label_pre_selected').html("Campo / Misión");
            idSelected = userInfo.campo.idCampo;
            nameSelected = userInfo.campo.cmpNombre;
        } else if (s === appDefaults.rols.PASTOR_DI || s === appDefaults.rols.MIPES_DI) {
            $('#dirA').append('<option value ="2">Distrito</option>');
            $('#dirA').append('<option value ="3">Iglesia</option>');
            $('#pre_selected').parent().removeClass('hidden');
            $('#pre_selected').val(userInfo.distrito.disNombre);
            $('#label_pre_selected').html("Distrito Misionero");
            idSelected = userInfo.distrito.idDistrito;
            nameSelected = userInfo.distrito.disNombre;
        } else if (s === appDefaults.rols.ANCIANO_IG || s === appDefaults.rols.MIPES_IG) {
            $('#dirA').append('<option value ="3">Iglesia</option>');
            $('#pre_selected').parent().removeClass('hidden');
            $('#pre_selected').val(userInfo.iglesia.iglNombre);
            $('#label_pre_selected').html("Iglesia");
            idSelected = userInfo.iglesia.idIglesia;
            nameSelected = userInfo.iglesia.iglNombre;
        } else if (s === appDefaults.rols.ADMIN) {
            $('#dirA').append('<option value ="0">Unión</option>');
            $('#dirA').append('<option value ="1">Campo / Misión</option>');
            $('#dirA').append('<option value ="2">Distrito</option>');
            $('#dirA').append('<option value ="3">Iglesia</option>');
        }

        $('#dirA').change(function () {
            $('.buscador').addClass('hidden');
            var v = $(this).val();
            var pre_sel_token = '-1';
            if (s === appDefaults.rols.DIRECTOR_UN || s === appDefaults.rols.MIPES_UN) {
                pre_sel_token = '0';
                idSelected = userInfo.union.idUnion;
                nameSelected = userInfo.union.uniNombre;
            } else if (s === appDefaults.rols.DIRECTOR_CA || s === appDefaults.rols.MIPES_CA) {
                pre_sel_token = '1';
                idSelected = userInfo.campo.idCampo;
                nameSelected = userInfo.campo.cmpNombre;
            } else if (s === appDefaults.rols.PASTOR_DI || s === appDefaults.rols.MIPES_DI) {
                pre_sel_token = '2';
                idSelected = userInfo.distrito.idDistrito;
                nameSelected = userInfo.distrito.disNombre;
            } else if (s === appDefaults.rols.ANCIANO_IG || s === appDefaults.rols.MIPES_IG) {
                pre_sel_token = '3';
                idSelected = userInfo.iglesia.idIglesia;
                nameSelected = userInfo.iglesia.iglNombre;
            }
            if (v === pre_sel_token) {
                $('#pre_selected').parent().removeClass('hidden');
            } else {
                changeDirA(v);
            }
            select2.clear($('.crm-select2'));
        });

        $('#dirA').trigger('change');

        $('.select-buscador').on('select2:select', function () {
            if($(this).val()>0){
                idSelected = $(this).val();
            }
            var id = $(this).attr('id');
            if (id !== undefined) {
                nameSelected = $('#' + id + " option:selected").text();
            }
        });

    };

    var changeDirA = function (v) {
        switch (v) {
            case '0':
                $('#select_union').parent().parent().removeClass('hidden');
                break;
            case '1':
                $('#select_campo').parent().parent().removeClass('hidden');
                break;
            case '2':
                $('#select_distrito').parent().parent().removeClass('hidden');
                break;
            case '3':
                $('#select_iglesia').parent().parent().removeClass('hidden');
                break;
        }
    };

    var validate = function () {
        var cando = true;
        var title = "Gestion de Periodos de Trabajo";
        if (idSelected === 0) {
            errorMessage({
                title: title,
                content: "Debe seleccionar un(a) " + $('#dirA option:selected').text()
            });
            cando = false;
        }
        if(!strings.validate($('#prdFechaInicio').val())){
            errorMessage({
                title: title,
                content: "Debe seleccionar la fecha de inicio"
            });
            cando = false;
        }
        if(!strings.validate($('#prdFechaLimite').val())){
            errorMessage({
                title: title,
                content: "Debe seleccionar la fecha límite"
            });
            cando = false;
        }
        if(!strings.validate($('#prdNombre').val())){
            errorMessage({
                title: title,
                content: "Debe ingresar el nombre del periodo"
            });
            cando = false;
        }
        return cando;
    };

    var save = function () {
        if (validate()) {
            var f1 = $('input[name="prdFechaInicio"]').val();
            var fechaInicio = new Date(f1).getTime();
            var f2 = $('input[name="prdFechaLimite"]').val();
            var fechaLimite = new Date(f2).getTime();
            var periodo = {
                prdUnion: 0,
                prdCampo: 0,
                prdDistrito: 0,
                prdIglesia: 0,
                prdNombre: $('#prdNombre').val() + ' - ' + nameSelected,
                prdFechaInicio: fechaInicio,
                prdFechaLimite: fechaLimite
            };
            var v = $('#dirA').val();
            switch (v) {
                case '0':
                    periodo.prdUnion = idSelected;
                    break;
                case '1':
                    periodo.prdCampo = idSelected;
                    break;
                case '2':
                    periodo.prdDistrito = idSelected;
                    break;
                case '3':
                    periodo.prdIglesia = idSelected;
                    break;
            }
            periodoService.add(periodo, function (result) {
                $('#dirA').val('0');
                $('#dirA').trigger('change');
                list();
            });
        }
    };

    var list = function () {
        var periodo = {prdUnion: 0, prdCampo: 0, prdDistrito: 0, prdIglesia: 0};
        var v = $('#dirA').val();
        switch (v) {
            case '0':
                periodo.prdUnion = idSelected;
                break;
            case '1':
                periodo.prdCampo = idSelected;
                break;
            case '2':
                periodo.prdDistrito = idSelected;
                break;
            case '3':
                periodo.prdIglesia = idSelected;
                break;
        }
        periodoService.list(periodo, function (result) {
            var rows = [];
            for (var i = 0; i < result.length; i++) {
                var row = result[i];
                rows.push({
                    events: [],
                    cols: [
                        {type: 'card-table-icon', icon: 'mdi-image-timer blue-grey white-text'},
                        {type: 'card-table-content', label: '', value: row.prdNombre},
                        {type: 'card-table-content', label: 'Fecha de Inicio', value: dateConverter.format.longStringToDate(row.prdFechaInicio)},
                        {type: 'card-table-content', label: 'Fecha de Límite', value: dateConverter.format.longStringToDate(row.prdFechaLimite)}
                    ]
                });
            }
            var idPrefix = strings.random(8);
            components.render('#list_body', components.cardTable.code(rows, idPrefix));
            components.cardTable.event(rows, idPrefix);
        });
    };
    
    var remove = function(){
        
    };
    var update = function(id){
        periodoService.get({idPeriodo:id}, function(result){
            var periodo = result;
            if(periodo.prdUnion !==0){
                $('#dirA').val('0');
            }else if(periodo.prdCampo !==0){
                $('#dirA').val('1');
            }else if(periodo.prdDistrito !==0){
                $('#dirA').val('2');
            }else if(periodo.prdIglesia !==0){
                $('#dirA').val('3');
            }
            $('#dirA').trigger('change');
            select2.setOption()
        });
    };
    return {
        init: init,
        save: save
    };
}());

$(document).ready(function () {
    periodoMain.init();
});