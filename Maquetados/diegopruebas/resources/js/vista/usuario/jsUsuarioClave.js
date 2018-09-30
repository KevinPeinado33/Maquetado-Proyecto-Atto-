var usuarioClave = (function () {
    var init = function () {
        renderModal();
        var estadoClave = $('#crm_estadoClave').val();
        var estadoClaveSession = $('#crm_estadoClaveSession').val();
        if (estadoClave === '0') {
            if (strings.validate(estadoClaveSession) === false || estadoClaveSession === '0') {
                $('#modalUsuarioClave').openModal();
            } else {
                check();
            }
        } else {
            check();
        }

        $('#btnGuardarUsuarioClave').click(function () {
            if (validate()) {
                var usuario = {
                    idPersona: userInfo.idPersona,
                    usuUsuario: $('#usuClaveOld').val(),
                    usuClave: $('#usuClaveNew').val()
                };
                usuarioService.updateUsuarioClave(usuario, function () {
                    $('#modalUsuarioClave').closeModal();
                    check();
                });
            }
        });
    };
    var check = function () {
        if (selectRol) {
            selectRol.init();
        }
    };
    var validate = function () {
        var cando = true;
        var title = "Cambio de Clave";
        var old = $("#usuClaveOld").val();
        var nw = $("#usuClaveNew").val();
        if (strings.validate(old) === false) {
            cando = false;
            errorMessage({
                title: title,
                content: "Debe ingresar la clave actual"
            });
        }
        if (strings.validate(nw) === false) {
            cando = false;
            errorMessage({
                title: title,
                content: "Debe ingresar la clave nueva"
            });
        }
        if (strings.validate(nw) && strings.validate(old)) {
            if (nw === old) {
                cando = false;
                errorMessage({
                    title: title,
                    content: "Debe ingresar una clave diferente a la actual"
                });
            }
            if(nw.length < 6){
                cando = false;
                errorMessage({
                    title: title,
                    content: "La nueva clave debe tener por lo menos 6 caracteres"
                });
            }
        }
        return cando;
    };
    var renderModal = function () {
        var s = '<div class="modal white" id="modalUsuarioClave">';
        s += '<div class="modal-content">';
        s += '<h5>Bienvenido(a) al CRM Digital</h5>';
        s += '<p>Para empezar, necesitamos que cambies tu clave</p>';
        s += '<div class="row">';
        s += '<div class="col l6 m12 s12 input-field">';
        s += '<input type="password" id="usuClaveOld" maxlength="255" />';
        s += '<label for="usuClaveOld">Ingresar clave Actual</label>';
        s += '</div>';
        s += '<div class="col l6 m12 s12 input-field">';
        s += '<input type="password" id="usuClaveNew" maxlength="255" />';
        s += '<label for="usuClaveNew">Ingresar clave Nueva</label>';
        s += '</div>';
        s += '</div>';
        s += '<div class="row">';
        s += '<div class="col l12 m12 s12">';
        s += '<button id="btnGuardarUsuarioClave" class="btn purple white-text right">Guardar</button>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        $('body').append(s);
    };
    return {
        init: init
    };
}());

$(document).ready(function () {
    usuarioClave.init();
});