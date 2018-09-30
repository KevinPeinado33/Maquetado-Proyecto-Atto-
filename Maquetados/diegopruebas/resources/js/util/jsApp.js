/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dependencies = [''];
var SELECT2_CLASS = '.crm-select2';
var CRM_LANGUAGE = 'es';
var IMAGE_PREVIEW_CLASS = '.image-preview';
var MODAL_HEADER_MOBILE_CLASS = '.modal-header-mobile';
var CARD_TABLE_CLASS = '.card-table';
var DEFAULT_THEME_COLOR = '#424242';

var appDefaults = (function () {
    return {
        date: {
            mysqlDateFormat: 'YYYY-MM-DD',
            mysqlDateTimeFormat: 'YYYY-MM-DD hh:mm A',
            defaultDateFormat: 'DD [de] MMM [del] YYYY',
            defaultDateTimeFormat: 'DD [de] MMM [del] YYYY [a las] hh:mm A',
            defaultTimeFormat: 'hh:mm A',
            defaultTimeFormat24: 'HH:mm',
            defaultMonthNameFormat: 'MMM',
            defaultDayFormat: 'DD'
        },
        language: 'es',
        themeColor: '#424242',
        classes: {
            select2: '.crm-select2',
            imagePreview: '.image-proview',
            cardTable: '.card-table',
            cardTableRow: '.card-table-row',
            urlAppend: '.url-append',
            formatDate: '.format-date',
            formatDia: '.format-dia',
            modalPictureSelector: '.modal-picture-selector',
            validateHTML: '.validate-html'
        },
        defaults: {
            logoGrupo: '/resources/images/default/grupo_icon_001.png',
            fotoPersona:'/resources/images/default/person_icon_002.png',
            searchTypes: {
                miembroGP: '1',
                miembroMI: '2',
                discipulador: '3',
                discipulo: '4',
                usuario: '5',
                enabled: '6',
                all: '7'
            }
        },
        rols: {
            MIEMBRO_GP: 'MIGP',
            MIEMBRO_MI: 'MIMI',
            MIPES_GP: 'MPGP',
            LIDER_GP: 'LIGP',
            LIDER_MI: 'LIMI',
            LIDER_ES: 'LIES',
            MIPES_ES: 'MPES',
            MIPES_IG: 'MPIG',
            ANCIANO_IG: 'ANIG',
            MIPES_DI: 'MPDI',
            PASTOR_DI: 'PSDI',
            MIPES_CA: 'MPCA',
            DIRECTOR_CA: 'DICA',
            MIPES_UN: 'MPUN',
            DIRECTOR_UN: 'DIUN',
            DISCIPULADOR:'DISC',
            ADMIN:'ROOT'
        },
        rolName:function(code){
            switch (code) {
                case appDefaults.rols.ANCIANO_IG:
                    return 'Anciano de Iglesia';
                    break;
                case appDefaults.rols.DIRECTOR_CA:
                    return 'Director de Campo/Mision';
                    break;
                case appDefaults.rols.DIRECTOR_UN:
                    return 'Director de Union';
                    break;
                case appDefaults.rols.LIDER_ES:
                    return 'Lider de Escuela Sabática';
                    break;
                case appDefaults.rols.LIDER_GP:
                    return 'Lider de Grupo Pequeño';
                    break;
                case appDefaults.rols.LIDER_MI:
                    return 'Lider de Ministerio';
                    break;
                case appDefaults.rols.MIEMBRO_GP:
                    return 'Miembro de Grupo Pequeño';
                    break;
                case appDefaults.rols.MIEMBRO_MI:
                    return 'Miembro de Ministerio';
                    break;
                case appDefaults.rols.MIPES_CA:
                    return 'MIPES de Campo/Mision';
                    break;                    
                case appDefaults.rols.MIPES_DI:
                    return 'MIPES de Distrito';
                    break;                    
                case appDefaults.rols.MIPES_ES:
                    return 'MIPES de Escuela Sabática';
                    break;                    
                case appDefaults.rols.MIPES_GP:
                    return 'MIPES de Grupo Pequeño';
                    break;                    
                case appDefaults.rols.MIPES_IG:
                    return 'MIPES de Iglesia';
                    break;                    
                case appDefaults.rols.MIPES_UN:
                    return 'MIPES de Unión';
                    break;                    
                case appDefaults.rols.PASTOR_DI:
                    return 'Pastor Distrital';
                    break;                    
                case appDefaults.rols.DISCIPULADOR:
                    return 'Discipulador';
                    break;                    
                case appDefaults.rols.ADMIN:
                    return 'Administrador del Sistema';
                    break;                    
            }
        }
    };
}());



var userInfo = null;
$(document).ready(function () {
    userInfo = (function () {
        return {
            union: {
                idUnion: $('#crm_idUnion').val(),
                uniNombre: $('#crm_uniNombre').val()
            },
            campo: {
                idCampo: $('#crm_idCampo').val(),
                cmpNombre: $('#crm_cmpNombre').val()
            },
            distrito: {
                idDistrito: $('#crm_idDistrito').val(),
                disNombre: $('#crm_disNombre').val()
            },
            iglesia: {
                idIglesia: $('#crm_idIglesia').val(),
                iglNombre: $('#crm_iglNombre').val()
            },
            escuela: {
                idEscuela: $('#crm_idEscuela').val(),
                escNombre: $('#crm_escNombre').val()
            },
            ministerio: {
                idMinisterio: $('#crm_idMinisterio').val(),
                minNombre: $('#crm_minNombre').val()
            },
            grupo: {
                idGrupo: $('#crm_idGrupo').val(),
                gpoNombre: $('#crm_gpoNombre').val()
            },
            perNombre: $('#crm_perNombre').val(),
            perApellidos: $('#crm_perApellidos').val(),
            idPersona: $('#crm_idPersona').val(),
            rolSelected: $('#crm_selected_rol').val()
        };
    }());
    initModules();
});

function initModules() {
    Materialize.updateTextFields();
    if (select2) {
        select2.init();
    }
    if (imagePreview) {
        imagePreview.init();
    }
    if (mobile) {
        mobile.init();
    }
    if (graphics) {
        graphics.init();
    }
    if (dropify) {
        dropify.init();
    }
    if (dateConverter) {
        dateConverter.init();
    }
    if (image) {
        image.init();
    }
    if (components) {
        components.init();
    }
    if (strings) {
        strings.init();
    }
    if(security){
        security.checkRolSelected();
    }
}




