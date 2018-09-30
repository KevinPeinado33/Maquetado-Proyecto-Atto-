/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var SEARCH_PROFILE_LIST = [];
var select2 = (function () {
    var init = function () {
        populateSelect2Profile();
        $(appDefaults.classes.select2).each(function () {
            var profileID = $(this).data('profile-id');
            var callback = $(this).data('callback');
            var profile = getSelect2ProfileID(profileID);
            if (profile !== undefined && profile !== null) {
                var csrfHeader = $("meta[name='_csrf_header']").attr("content");
                var csrfToken = $("meta[name='_csrf']").attr("content");
                var header = {};
                header[csrfHeader] = csrfToken;
                $(this).select2({
                    width: 'resolve',
                    language: CRM_LANGUAGE,
                    ajax: {
                        url: profile.url,
                        dataType: 'json',
                        contentType: 'application/json',
                        delay: 250,
                        allowClear: true,
                        type: 'post',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader(csrfHeader, csrfToken);
                        },
                        data: function (params) {
                            return profile.param(params.term);
                        },
                        processResults: function (data) {
                            try {
                                window[callback](data);
                            } catch (e) {
                            }
                            return {
                                results: $.map(data, function (obj) {
                                    return {
                                        id: formatArrayForSelect2(profile.result.id, obj, 0),
                                        text: formatArrayForSelect2(profile.result.title, obj, " "),
                                        item: obj,
                                        profile: profile
                                    };
                                })
                            };
                        }
                    },
                    escapeMarkup: function (markup) {
                        return markup;
                    },
                    minimumInputLength: 2,
                    templateResult: renderSelect2Result,
                    templateSelection: renderSelect2Selection
                });
            }
        });
    };
    var getSelect2ProfileID = function (id) {
        for (var i = 0; i < SEARCH_PROFILE_LIST.length; i++) {
            if (SEARCH_PROFILE_LIST[i].id === id) {
                return SEARCH_PROFILE_LIST[i];
            }
        }
        return null;
    };

    var populateSelect2Profile = function () {
        SEARCH_PROFILE_LIST = [];

        var genPersona = function (id, type) {
            return {
                id: id,
                url: url.persona.search,
                param: function (query_) {
                    var p = {query: query_, type: type};
                    return JSON.stringify(p);
                },
                result: {
                    id: "idPersona",
                    title: ['perApellidos', 'perNombres'],
                    subTitle: "perDocumento",
                    description: "perCorreo",
                    image: 'perFoto',
                    'default':appDefaults.defaults.fotoPersona
                }
            };
        };

        var grupo = {
            id: "grupo",
            url: url.grupo.search,
            param: function (query_) {
                var p = {query: query_};
                return JSON.stringify(p);
            },
            result: {
                id: "idGrupo",
                title: ['gpoNombre'],
                subTitle: "escuela.escNombre",
                description: "gpoLugarReunion",
                image: 'gpoLogo',
                'default':appDefaults.defaults.logoGrupo
            }
        };
        var ministerio = {
            id: "ministerio",
            url: url.ministerio.search,
            param: function (query_) {
                var p = {query: query_};
                return JSON.stringify(p);
            },
            result: {
                id: "idMinisterio",
                title: ['minNombre'],
                subTitle: "iglesia.iglNombre",
                description: "minDescripcion",
                image: 'minLogo'
            }
        };
        var escuela = {
            id: "escuela",
            url: url.escuela.search,
            param: function (query_) {
                var p = {query: query_};
                return JSON.stringify(p);
            },
            result: {
                id: "idEscuela",
                title: ['escNombre'],
                subTitle: "iglesia.iglNombre",
                description: "escLugarReunion",
                image: ''
            }
        };
        var iglesia = {
            id: "iglesia",
            url: url.iglesia.search,
            param: function (query_) {
                var p = {query: query_};
                return JSON.stringify(p);
            },
            result: {
                id: "idIglesia",
                title: ['iglNombre'],
                subTitle: "distrito.disNombre",
                description: "iglDireccion",
                image: ''
            }
        };
        var distrito = {
            id: "distrito",
            url: url.distrito.search,
            param: function (query_) {
                var p = {query: query_};
                return JSON.stringify(p);
            },
            result: {
                id: "idDistrito",
                title: ['disNombre'],
                subTitle: "campo.cmpNombre",
                description: "disFechaCreacion",
                image: ''
            }
        };

        var documento = {
            id: "documento",
            url: url.documento.search,
            param: function (query_) {
                var p = {query: query_};
                return JSON.stringify(p);
            },
            result: {
                id: "idDocumento",
                title: ['docDescripcion']
            }
        };

        SEARCH_PROFILE_LIST.push(genPersona('persona-miembrogp', 1));
        SEARCH_PROFILE_LIST.push(genPersona('persona-miembromi', 2));
        SEARCH_PROFILE_LIST.push(genPersona('persona-discipulador', 3));
        SEARCH_PROFILE_LIST.push(genPersona('persona-discipulo', 4));
        SEARCH_PROFILE_LIST.push(genPersona('persona-usuario', 5));
        SEARCH_PROFILE_LIST.push(genPersona('persona-enabled', 6));
        SEARCH_PROFILE_LIST.push(genPersona('persona-all', 7));
        SEARCH_PROFILE_LIST.push(grupo);
        SEARCH_PROFILE_LIST.push(ministerio);
        SEARCH_PROFILE_LIST.push(escuela);
        SEARCH_PROFILE_LIST.push(iglesia);
        SEARCH_PROFILE_LIST.push(distrito);
        SEARCH_PROFILE_LIST.push(documento);
    };

    var renderSelect2Result = function (obj) {
        if (obj.item === null || obj.item === undefined) {
            return obj.text;
        }
        var item = obj.item;
        var profile = obj.profile;
        var html = "";
        html += '<div class="crm-select2-result-option clearfix"><img src="' + crm_context_path + '/image/get/' + formatArrayForSelect2(profile.result.image, item, " ") + '" onerror="this.src =\'' + crm_context_path +profile.result.default+ '\'" class="circle" style="max-width:48px;max-height:48px"/>';
        html += '<div class="crm-select2-result-meta"><div class="font-medium bold font-capitalize" >' + formatArrayForSelect2(profile.result.title, item, " ") + '</div>';
        html += '<div class="font-small">' + formatArrayForSelect2(profile.result.subTitle, item, " ") + '</div>';
        html += '<div class="font-small grey-text">' + formatArrayForSelect2(profile.result.description, item, " ") + '</div>';
        html += '</div></div>';
        return html;
    };

    var renderSelect2Selection = function (obj) {
        return obj.text || "";
    };

    var formatArrayForSelect2 = function (arr, item, separator) {
        if (arr === undefined || arr === null || arr === '') {
            return "";
        }
        var t = "";
        if (arr instanceof Array) {
            for (var i = 0; i < arr.length; i++) {
                var tmp = arr[i].split('.');
                if (tmp.length === 2) {
                    t += item[tmp[0]][tmp[1]];
                }
                if (tmp.length === 3) {
                    t += item[tmp[0]][tmp[1]][tmp[2]];
                }
                if (tmp.length < 2) {
                    t += item[arr[i]];
                }
                if (i < (arr.length - 1)) {
                    t += separator;
                }
            }
            return t;
        } else {
            var tmp = arr.split(".");
            if (tmp.length === 2) {
                var r = item[tmp[0]][tmp[1]];
                return r;
            }
            if (tmp.length === 3) {
                var r = item[tmp[0]][tmp[1]][tmp[2]];
                return r;
            }
            var i = item[arr];
            if (i === undefined) {
                return "";
            }
            return i;
        }
    };

    var setSelect2Option = function (select, option) {
        $(select).find('option').remove().end().append('<option value="' + option.id + '">' + option.text + '</option>').val(option.id);
    };

    var clearSelect2 = function (select) {
        $(select).find('option').remove().end().append('<option value="-1"></option>').val('-1');
    };
    return {
        init: init,
        setOption: setSelect2Option,
        clear: clearSelect2
    };
}());

