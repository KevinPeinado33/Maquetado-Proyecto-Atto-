
function appendHref(e, value) {
    if (e !== undefined && e !== null && value !== undefined && value !== null && value !== '' && value !== "null") {
        var href = $(e).attr('href');
        href += value;
        $(e).attr('href', href);
    }
}
function redirect(href) {
    location.href = crm_context_path + href;
}


var url = {
    image: {
        upload: "/image/upload"
    },
    persona: {
        add: "/persona/add",
        update: "/persona/update",
        updateFoto: "/persona/update/foto",
        delete: "/persona/delete",
        list: "/persona/list",
        search: "/persona/search",
        get: "/persona/get"
    },
    usuario: {
        add: "/usuario/add",
        update: "/usuario/update",
        delete: "/usuario/delete",
        list: "/usuario/list",
        updateTree: '/usuario/updateTree',
        updateClave: '/usuario/updateClave'
    },
    grupo: {
        add: "/grupo/add",
        update: "/grupo/update",
        delete: "/grupo/delete",
        list: "/grupo/list",
        search: "/grupo/search",
        get: "/grupo/get",
        rolsGroup: "/grupo/getRolsGroup"
    },
    ministerio: {
        add: "/ministerio/add",
        update: "/ministerio/update",
        delete: "/ministerio/delete",
        list: "/ministerio/list",
        search: "/ministerio/search",
        get: "/ministerio/get"
    },
    evento: {
        add: "/evento/add",
        update: "/evento/update",
        delete: "/evento/delete",
        list: "/evento/list",
        get: "/evento/get",
        checkGrupo: "/evento/asistencia/check/grupo",
        checkEscuela: "/evento/asistencia/check/escuela"
    },
    asgrupo: {
        add: "/asgrupo/add"
    },
    asescuela: {
        add: "/asescuela/add"
    },
    asmiemgp: {
        addArray: "/asmiemgp/addArray",
        update: "/asmiemgp/update",
        delete: "/asmiemgp/delete",
        list: "/asmiemgp/list"
    },
    asmiemes: {
        addArray: "/asmiemes/addArray",
        update: "/asmiemes/update",
        delete: "/asmiemes/delete",
        list: "/asmiemes/list"
    },
    periodo: {
        add: "/periodo/add",
        update: "/periodo/update",
        delete: "/periodo/delete",
        list: "/periodo/list",
        get: "/periodo/get"
    },
    escuela: {
        add: "/escuela/add",
        update: "/escuela/update",
        delete: "/escuela/delete",
        list: "/escuela/list",
        search: "/escuela/search",
        get: "/escuela/get"
    },
    iglesia: {
        add: "/iglesia/add",
        update: "/iglesia/update",
        delete: "/iglesia/delete",
        list: "/iglesia/list",
        search: "/iglesia/search",
        get: "/iglesia/get"
    },
    distrito: {
        add: "/distrito/add",
        update: "/distrito/update",
        delete: "/distrito/delete",
        list: "/distrito/list",
        search: "/distrito/search",
        get: "/distrito/get"
    },
    campo: {
        add: "/campo/add",
        update: "/campo/update",
        delete: "/campo/delete",
        list: "/campo/list",
        get: "/campo/get"
    },
    unionp: {
        add: "/unionp/add",
        update: "/unionp/update",
        delete: "/unionp/delete",
        list: "/unionp/list"
    },
    eventogrupo: {
        add: "/eventogrupo/add",
        update: "/eventogrupo/update",
        delete: "/eventogrupo/delete",
        list: "/eventogrupo/list",
        info: "/eventogrupo/getinfo"
    },
    eventopersona: {
        add: "/eventopersona/add",
        update: "/eventopersona/update",
        delete: "/eventopersona/delete",
        list: "/eventopersona/list"
    },
    miembrogp: {
        add: "/miembrogp/add",
        update: "/miembrogp/update",
        delete: "/miembrogp/delete",
        list: "/miembrogp/list",
        listPersona: "/miembrogp/listPersona",
        listEscuela: "/miembrogp/listEscuela",
        listIglesia: "/miembrogp/listIglesia"
    },
    documento: {
        list: "/documento/list",
        search: "/documento/search"
    },
    detrol: {
        add: "detrol/add",
        delete: "/detrol/delete"
    }
};

