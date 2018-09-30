var list_body = $('#list_body');
var mgpService = new miembrogpService();
var idGrupo = $("#crm_idGrupo").val();
$(document).ready(function () {
    load();
});

function load() {
    var grupo = {idGrupo: idGrupo};
    mgpService.listMiembrogp(grupo, mostrar);
}

function mostrar(list) {
    var s = "";
    for (var i = 0, max = list.length; i < max; i++) {
        var r = getLetter(list[i].persona.perNombres);
        var t = list[i].persona.perTelefono;
        (t === undefined) ? t = "Sin celular" : t;
        var c = list[i].persona.perCorreo;
        (c === undefined) ? c = "Sin correo" : c;
        s += '<tr>';
        s += '<td style="width:38px;"><button class="btn-floating waves-effect waves-light ' + getColor() + '">' + r + '</button></td>';
        s += '<td class="ligth italic">' + list[i].persona.perNombres + ' ' + list[i].persona.perApellidos + '</td>';
        s += '<td class="thin tR"><i class="mdi-communication-call"></i>  ' + t + '</td>';
        s += '<td class="thin tR"><i class="mdi-communication-email"></i>  ' + c + '</td>';
        s += '<td style="float:right">';
        s += '<a class="grey-text" onclick="deleteMGP(' + list[i].idMiembrogp + ')"><i class="mdi-action-delete actCRUD"></i></a>';
        s += '<a class="grey-text"><i class="mdi-social-person actCRUD" onclick="inform()"></i></a>';
        //s += '<a class="grey-text"><i class="mdi-navigation-more-vert actCRUD"></i></a>';
        s += '</td>';
        s += '</tr>';
    }
    $(list_body).empty();
    $(list_body).append(s);

}

function addMiembroGP(idPersona) {
    try {
        var miembrogp = {
            persona: {idPersona: idPersona},
            grupo: {idGrupo: idGrupo}
        };
        mgpService.addMiembrogp(miembrogp, algoritmo);
    } catch (e) {
        console.error("Error jsMiembrogp : " + e);
    }

}

function algoritmo() {
    $('#modal1').closeModal();
    var grupo = {idGrupo: idGrupo};
    mgpService.listMiembrogp(grupo, mostrar);
}

function deleteMGP(idMiembrogp) {
    confirmMessage({
        title: 'Desvinculación de Miembro',
        content: '¿Seguro que desea desvincular a este miembro?'
    }, function () {
        var miembrogp = {idMiembrogp: idMiembrogp};
        mgpService.deleteMiembrogp(miembrogp, load);
    });
}

function inform() {
    new PNotify({
        title: '<span class="blue-text">¡Hey!</span>',
        text: 'Estamos trabajando para tener habilitada esta opción pronto',
        addclass: 'crm-pnotify',
        icon: 'mdi-action-info blue-text',
        buttons: {
            sticker: false
        }
    });
}