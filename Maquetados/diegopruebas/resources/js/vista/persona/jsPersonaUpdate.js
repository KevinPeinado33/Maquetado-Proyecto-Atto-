personaUpdate = (function () {
    var init = function () {
        if (strings.validate($('#perFechaBautismo').val())) {
            var picker = $('#perFechaBautismo').pickadate('picker');
            picker.set('select', new Date($('#perFechaBautismo').val()+" 00:00"));
        }
        if (strings.validate($('#perFechaNacimiento').val())) {
            var picker = $('#perFechaNacimiento').pickadate('picker');
            picker.set('select', new Date($('#perFechaNacimiento').val()+" 00:00"));
        }
    };

    var mapPersona = function () {
        var persona = {
            idPersona: $('#id_persona_selected').val(),
            perNombres: $('#perNombres').val(),
            perApellidos: $('#perApellidos').val(),
            documento: {idDocumento: $('#documento').val()},
            perSexo: $('input:radio[name ="perSexo"]:checked').val(),
            perDocumento: $('#perDocumento').val(),
            perCorreo: $('#perCorreo').val(),
            perDireccion: $('#perDireccion').val(),
            perTelefono: $('#perTelefono').val(),
            perFecNacimiento: $('input[name="perFechaNacimiento"]').val(),
            perFechaBautismo: $('input[name="perFechaBautismo"]').val(),
            perFoto: $('#perFoto').val(),
            perEstado: $('#perEstado').val()
        };
        return persona;
    };

    var validate = function () {
        var persona = mapPersona();
        var cando = true;
        var title = 'Actualizar datos Personales';
        if (!strings.validate(persona.perNombres)) {
            cando = false;
            errorMessage({
                title: title,
                content: 'Debes ingresar los nombres'
            });
        }
        if (!strings.validate(persona.perApellidos)) {
            cando = false;
            errorMessage({
                title: title,
                content: 'Debes ingresar los apellidos'
            });
        }
        if (!strings.validate(persona.perDocumento)) {
            cando = false;
            errorMessage({
                title: title,
                content: 'Debes ingresar el número de documento de identidad'
            });
        }
        return cando;
    };

    var save = function () {
        if (validate()) {
            var persona = mapPersona();
            persona.perNombres = persona.perNombres.toUpperCase();
            persona.perApellidos = persona.perApellidos.toUpperCase();
            if (strings.validate(persona.perFecNacimiento)) {
                persona.perFecNacimiento = new Date(persona.perFecNacimiento + " 00:00").getTime();
            }
            if (strings.validate(persona.perFechaBautismo)) {
                persona.perFechaBautismo = new Date(persona.perFechaBautismo + " 00:00").getTime();
            }
            personaService.update(persona, function (result) {
                location.href = crm_context_path + "/persona/profile/" + persona.idPersona;
            });
        }
    };

    return {
        init: init,
        save: save,
        map:mapPersona
    };
}());

$(document).ready(function () {
    personaUpdate.init();
});
