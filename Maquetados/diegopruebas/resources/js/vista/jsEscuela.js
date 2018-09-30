var list_body = $('#list_body');
var eService = new escuelaService();
var escuelaAct;
var idIglesia = $("#crm_idIglesia").val();
$(document).ready(function () {
    $(".titleTab").empty();
    $(".titleTab").append("Listado de escuelas sabáticas que pertencen a la iglesia <strong>" + $("#crm_iglNombre").val().toUpperCase() + "</strong>");
    var iglesia = {
        idIglesia: idIglesia
    };
    eService.listEscuela(iglesia, listEscuela);
});

function listEscuela(list) {
    var s = "";
    for (var i = 0; i < list.length; i++) {
        var escuela = list[i];
        var r = getLetter(escuela.escNombre);
        var date = new Date(escuela.escFechaCreacion);
        var year = date.getFullYear();
        var month = 1 + date.getMonth();
        var day = date.getDate();
        s += '<tr>';
        s += '<td style="width:38px;"><button class="btn-floating waves-effect waves-light ' + getColor() + '">' + r + '</button></td>';
        s += '<td class="condensed"><h6><strong>' + escuela.escNombre.toUpperCase() + '</strong></h6></td>';
        s += '<td class="tR"><small>Registrado el</small> ' + day + '/' + month + '/' + year + '</td>';
        s += '<td class="tR">' + escuela.escLugarReunion + '</td>';
        s += '<td style="float:right">';
        s += '<a class="grey-text tR" onclick="updateEscuela(' + escuela.idEscuela + ')"><i class="mdi-editor-mode-edit actCRUD"></i></a>';
        s += '<a class="grey-text tR" onclick="deleteEscuela(' + escuela.idEscuela + ')"><i class="mdi-action-delete actCRUD"></i></a>';
        s += '<a class="grey-text tR"><i class="mdi-social-group actCRUD"></i></a>';
        s += '<a class="grey-text tS"><i class="mdi-action-info-outline actCRUD"></i></a>';
        s += '<a class="grey-text dropdown-button tS" data-activates="dropdown' + i + '"><i class="mdi-navigation-more-vert actCRUD"></i></a>';
        s += '<ul id="dropdown' + i + '" class="dropdown-content">';
        s += '<li><a onclick="updateEscuela(' + escuela.idEscuela + ')" class="-text">Editar</a></li>';
        s += '<li><a onclick="deleteEscuela(' + escuela.idEscuela + ')" class="-text">Eliminar</a></li>';
        s += '<li><a href="#!" class="-text">Miembros</a></li>';
        s += '</ul>';
        s += '</td>';
        s += '</tr>';
    }
    $(list_body).empty();
    $(list_body).append(s);
    $('.dropdown-button').dropdown();
}

function updateEscuela(id) {
    var escuela = {idEscuela: id};
    eService.getEscuela(escuela, function (data) {
        escuelaAct = data;
        var s = createModal("update", data.escNombre, data.escLugarReunion, "active");
        $(".modal-content").empty();
        $(".modal-content").append(s);
        $('#modal1').openModal();
    });
}

function deleteEscuela(idEscuela) {
    confirmMessage({
        title: 'Eliminar Escuela Sabática',
        content: '¿Seguro que desea eliminar este escuela?'
    }, function () {
        var escuela = {idEscuela: idEscuela};
        eService.deleteEscuela(escuela, reload);
    });
}

function save() {
    var nombregp = $("#nesc").val();
    var lreunion = $("#lgreu").val();
    var tip = $("#tipModal").val();
    if (nombregp !== "" && lreunion !== "") {
        var escuela;
        if (tip === "create") {
            escuela = {
                escNombre: nombregp,
                escLugarReunion: lreunion,
                iglesia: {idIglesia: idIglesia}
            };
            eService.addEscuela(escuela, reload);
        }
        if (tip === "update") {
            escuela = {
                escNombre: nombregp,
                escLugarReunion: lreunion,
                escEstado: escuelaAct.escEstado,
                escUsuAdd: escuelaAct.escUsuAdd,
                escFechaCreacion: escuelaAct.escFechaCreacion,
                escFechaAdd: escuelaAct.escFechaAdd,
                idEscuela: escuelaAct.idEscuela,
                iglesia: {idIglesia: escuelaAct.iglesia.idIglesia}
            };
            eService.updateEscuela(escuela, reload);
        }
    } else {
        alert("Campos Incompletos...");
    }
}

function reload(id) {
    if (id !== 0) {
        eService.listEscuela({idIglesia: idIglesia}, listEscuela);
    }
}

function createModal(tipo, nombre, lugar, clase) {
    var s = '';
    s += '<h5 class="thin">Escuela Sabática</h5>';
    s += '<div class="row">';
    s += '<form class="col s12">';
    s += '<div class="row">';
    s += '<div class="input-field col s12 l6 m6">';
    s += '<i class="mdi-social-group prefix"></i>';
    s += '<input id="nesc" type="text" class="validate" value="' + nombre + '">';
    s += '<label for="nesc" class="' + clase + '">Nombre</label>';
    s += '</div>';
    s += '<div class="input-field col s12 l6 m6">';
    s += '<i class="mdi-action-home prefix"></i>';
    s += '<input id="lgreu" type="text" class="validate" value="' + lugar + '">';
    s += '<label for="lgreu" class="' + clase + '">Lugar de Reunión</label>';
    s += '</div>';
    s += '</div>';
    s += '<input type="hidden" value=' + tipo + ' id="tipModal">';
    s += '</form>';
    s += '</div>';
    return s;
}

function createEscuela() {
    var s = createModal("create", "", "", "");
    $(".modal-content").empty();
    $(".modal-content").append(s);
    $('#modal1').openModal();
}
                                                                