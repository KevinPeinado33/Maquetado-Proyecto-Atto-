var personaReg = (function () {
    var init = function () {
        $('#btnRegistrar').click(function () {
            save();
        });
    };

    var save = function () {
        if (validate()) {
            var persona = {
                documento:{
                    idDocumento:$('#documento').val()
                },
                perNombres: $('#perNombres').val(),
                perApellidos: $('#perApellidos').val(),
                perDocumento: $('#perDocumento').val(),
                perSexo:$('#perSexo').val()
            };
            personaService.add(persona, function (result) {
                redirect("/main");
            });
        }
    };

    var validate = function () {
        var cando = true;
        var title = "Registro de Usuario";
        if (!strings.validate($('#perNombres').val())) {
            cando = false;
            errorMessage({
                title: title,
                content: "Debes ingresar los nombres"
            });
        }
        if (!strings.validate($('#perApellidos').val())) {
            cando = false;
            errorMessage({
                title: title,
                content: "Debes ingresar los apellidos"
            });
        }
        if (!strings.validate($('#perDocumento').val())) {
            cando = false;
            errorMessage({
                title: title,
                content: "Debes ingresar el número de documento"
            });
        }
        return cando;
    };
    return {
        init: init
    };
}());

$(document).ready(function () {
    personaReg.init();
});

