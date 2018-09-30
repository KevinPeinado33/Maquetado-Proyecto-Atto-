var selectRol = (function () {
    var init = function () {
        checkGP();

    };
    var checkGP = function () {
        if (strings.validate(userInfo.grupo.idGrupo) === false) {
            modal(0, true);
        }
    };
    var checkMI = function () {
        if (strings.validate(userInfo.ministerio.idMinisterio) === false) {
            modal(0, true);
        }
    };
    var modal = function (n, v) {
        if (n === 0 && v === true) {
            $('#modalGP').openModal();
        } else if (n === 0 && v === false) {
            $('#modalGP').closeModal();
        } else if (n === 1 && v === true) {
            $('#modalMI').openModal();
        } else if (n === 1 && v === false) {
            $('#modalMI').closeModal();
        } else if (n === 2 && v === true) {
            $('#modalAD').openModal();
        } else if (n === 2 && v === false) {
            $('#modalAD').closeModal();
        }
    };

    var updateUsuario = function () {
        var usuario = {};
        grupoService.get({idGrupo: id_grupo}, function (result) {
            usuario.usuGrupo = result.idGrupo;
            usuario.usuEscuela = result.escuela.idEscuela;
            usuario.usuIglesia = result.escuela.iglesia.idIglesia;
            iglesiaService.get({idIglesia: result.escuela.iglesia.idIglesia}, function (result) {
                usuario.usuDistrito = result.distrito.idDistrito;
                usuario.usuCampo = result.distrito.campo.idCampo;
                campoService.get({idCampo: result.distrito.campo.idCampo}, function (result) {
                    usuario.usuUnion = result.unionp.idUnion;
                    usuario.idPersona = userInfo.idPersona;
                    console.log(usuario);
                    usuarioService.updateGrupoTree(usuario, function (result) {
                        modal(1, false);
                        setTimeout(function(){
                            $('#logout_form').submit();
                        },1500);
                    });
                });
            });
        });

    };
    return {
        init: init,
        updateUsuario: updateUsuario
    };
}());

var id_grupo=0;
$(document).ready(function () {
    $('#select_grupo').on('select2:select', function () {
        id_grupo = $(this).val();
    });
});

