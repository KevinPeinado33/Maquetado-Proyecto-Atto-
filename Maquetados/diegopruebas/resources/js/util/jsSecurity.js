var security = (function () {
    //Array con la configuracion de cada pagina
    var pages = [];
    var r = appDefaults.rols;

    var init = function (id) {
        pageConfig();
        execute(id);
    };

    var checkRolSelected = function () {
        if (userInfo.rolSelected === undefined
                || userInfo.rolSelected === null
                || userInfo.rolSelected === ''
                || userInfo.rolSelected === 'null') {
            var ex = [];
            ex.push('/rol/select');
            ex.push('/main');
            ex.push('/main?logout');
            ex.push('/main?error');
            ex.push('/main/registro');
            ex.push('/error/404');
            ex.push('/error/403');
            ex.push('/error/500');
            var cando = false;
            for (var i = 0; i < ex.length; i++) {
                if (location.href.endsWith(ex[i])) {
                    cando = true;
                }
            }
            if (cando === false) {
                infoMessage({
                    title: "Advertencia",
                    content: "Debe seleccionar un rol para poder continuar."
                });
                setTimeout(function () {
                    location.href = crm_context_path + "/rol/select";
                }, 1000);
            }
        }
    };

    var execute = function (id) {
        try {
            var currentPages = [];
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].id === id) {
                    currentPages.push(pages[i]);
                }
            }

            for (var i = 0; i < currentPages.length; i++) {
                var page = currentPages[i];
                var has_permission = false;
                for (var j = 0; j < page.permissions.length; j++) {
                    if (page.permissions[j] === userInfo.rolSelected) {
                        has_permission = true;
                        break;
                    }
                }
                if (has_permission === false) {
                    if (page.action === 'remove') {
                        $(page.selector).remove();
                    } else if (page.action === 'removeClass') {
                        $(page.selector).removeClass(page.selector.replace(".", ""));
                    }
                }
            }
        } catch (e) {
            console.err(e);
        }

    };

    var pageConfig = function () {

        /*
         * id: identificador de la pagina (JSP), selector: id o clase del elemento,
         * permissions: array de roles permitidos.
         */


        pages.push({id: 'distrito/profile', selector: '#btnAddIglesia', permissions: [r.ADMIN, r.MIPES_DI], action: 'remove'});
        pages.push({id: 'distrito/profile', selector: '.btnRemoveLeader', permissions: [r.ADMIN, r.MIPES_CA], action: 'remove'});

        pages.push({id: 'iglesia/profile', selector: '#btnAddEscuela', permissions: [r.ADMIN, r.MIPES_IG], action: 'remove'});
        pages.push({id: 'iglesia/profile', selector: '.btnRemoveLeader', permissions: [r.ADMIN, r.MIPES_DI], action: 'remove'});

        pages.push({id: 'escuela/profile', selector: '#btnAddGrupo', permissions: [r.ADMIN, r.MIPES_ES], action: 'remove'});
        pages.push({id: 'escuela/profile', selector: '#btnAddRol', permissions: [r.ADMIN, r.MIPES_IG], action: 'remove'});
        pages.push({id: 'escuela/profile', selector: '#btnAdd', permissions: [r.ADMIN, r.MIPES_IG, r.MIPES_ES], action: 'remove'});
        pages.push({id: 'escuela/profile', selector: '#delete_escuela_box', permissions: [r.ADMIN, r.MIPES_IG], action: 'remove'});
        pages.push({id: 'escuela/profile', selector: '.activator', permissions: [r.ADMIN, r.MIPES_IG, r.MIPES_ES], action: 'removeClass'});
        pages.push({id: 'escuela/profile', selector: '.btnRemoveLeader', permissions: [r.ADMIN, r.MIPES_IG], action: 'remove'});


        pages.push({id: 'grupo/profile', selector: '#delete_grupo_box', permissions: [r.ADMIN, r.MIPES_ES], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '#btnSearch', permissions: [r.ADMIN, r.MIPES_GP, r.LIDER_GP], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '.btn-remove-migp', permissions: [r.ADMIN, r.MIPES_GP, r.LIDER_GP], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '#btnAddMiembro', permissions: [r.ADMIN, r.MIPES_GP, r.LIDER_GP], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '#btnFoto', permissions: [r.ADMIN, r.MIPES_GP, r.LIDER_GP], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '#btnAddRol', permissions: [r.ADMIN, r.MIPES_ES], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '#btnAdd', permissions: [r.ADMIN, r.MIPES_ES, r.MIPES_GP, r.LIDER_GP], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '.activator', permissions: [r.ADMIN, r.MIPES_IG, r.MIPES_ES], action: 'removeClass'});
        pages.push({id: 'grupo/profile', selector: '.btnRemoveMember', permissions: [r.ADMIN, r.MIPES_GP, r.LIDER_GP], action: 'remove'});
        pages.push({id: 'grupo/profile', selector: '.btnRemoveLeader', permissions: [r.ADMIN, r.MIPES_ES], action: 'remove'});
        
        
        pages.push({id: 'evento/listEvento', selector: '.btn-options-evento', permissions: [r.ADMIN, r.MIPES_CA, r.DIRECTOR_CA, r.MIPES_DI, r.PASTOR_DI, r.MIPES_IG, r.ANCIANO_IG], action: 'remove'});
        pages.push({id: 'evento/listEvento', selector: '#btnAddEvento', permissions: [r.ADMIN, r.MIPES_CA, r.DIRECTOR_CA, r.MIPES_DI, r.PASTOR_DI, r.MIPES_IG, r.ANCIANO_IG], action: 'remove'});
    };


    return {init: init, checkRolSelected: checkRolSelected};
}());
