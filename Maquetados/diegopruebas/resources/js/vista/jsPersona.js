/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var list_body = $('#list_body');
var pService = new personaService();
$(document).ready(function () {
    /*var pService = new personaService();
     pService.listPersona(listPersona);*/
});

function searchPersona(){
    
}

function listPersona(list) {
    var t = "";
    for (var i = 0; i < list.length; i++) {
        var persona = list[i];
        t += "<tr>";
        t += "<td>" + persona.perNombres + "</td>";
        t += "<td>" + persona.perApellidos + "</td>";
        t += "<td>" + persona.perDocumento + "</td>";
        t += "<td>" + persona.perFechaNacimiento + "</td>";
        t += "<td>" + persona.perCorreo + "</td>";
        t += "<td>" + persona.perDireccion + "</td>";
        t += "<td>" + persona.perTelefono + "</td>";
        t += "<td>" + persona.perSexo + "</td>";
        t += "<td>" + persona.perFoto + "</td>";
        t += "</tr>";
    }
    $(list_body).empty();
    $(list_body).append(t);
}

function regBasicPersona(idTipoDoc, nDoc, pNombre, pApellido, pSexo, pBautizado) {
    try {
        var persona = {
            perDocumento: nDoc,
            perNombres: pNombre,
            perApellidos: pApellido,
            perSexo: pSexo,
            perBautizado: pBautizado,
            documento: {idDocumento: parseInt(idTipoDoc)}
        };
        pService.addPersona(persona, addMiembroGP);
    } catch (e) {
        console.error("Error jsPersona : " + e);
    }

}


