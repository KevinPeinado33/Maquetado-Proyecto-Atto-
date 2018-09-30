var list_body = $('#list_body');
var iService = new iglesiaService();
var iglesiaAct;
var idDistrito = $("#crm_idDistrito").val();
$(document).ready(function () {
    $(".titleTab").empty();
    $(".titleTab").append("Listado de iglesias que pertencen al distrito misionero <strong>" + $("#crm_disNombre").val().toUpperCase() + "</strong>");
    var distrito = {
        idDistrito: idDistrito
    };
    iService.listIglesia(distrito, listIglesia);
});

function listIglesia(list) {
    var s = "";
    for (var i = 0; i < list.length; i++) {
        var iglesia = list[i];
        var r = getLetter(iglesia.iglNombre);
        var date = new Date(iglesia.iglFechaCreacion);
        var year = date.getFullYear();
        var month = 1 + date.getMonth();
        var day = date.getDate();
        s += '<tr>';
        s += '<td style="width:38px;"><button class="btn-floating waves-effect waves-light ' + getColor() + '">' + r + '</button></td>';
        s += '<td class="condensed"><h6><strong>' + iglesia.iglNombre.toUpperCase() + '</strong></h6></td>';
        s += '<td class="tR"><small>Registrado el</small> ' + day + '/' + month + '/' + year + '</td>';
        s += '<td class="tR">' + iglesia.iglDireccion + '</td>';
        s += '<td style="float:right">';
        s += '<a class="grey-text tR" onclick="updateIglesia(' + iglesia.idIglesia + ')"><i class="mdi-editor-mode-edit actCRUD"></i></a>';
        s += '<a class="grey-text tR" onclick="deleteIglesia(' + iglesia.idIglesia + ')"><i class="mdi-action-delete actCRUD"></i></a>';
        s += '<a class="grey-text tR"><i class="mdi-social-group actCRUD"></i></a>';
        s += '<a class="grey-text tS"><i class="mdi-action-info-outline actCRUD"></i></a>';
        s += '<a class="grey-text dropdown-button tS" data-activates="dropdown' + i + '"><i class="mdi-navigation-more-vert actCRUD"></i></a>';
        s += '<ul id="dropdown' + i + '" class="dropdown-content">';
        s += '<li><a onclick="updateIglesia(' + iglesia.idIglesia + ')" class="-text">Editar</a></li>';
        s += '<li><a onclick="deleteIglesia(' + iglesia.idIglesia + ')" class="-text">Eliminar</a></li>';
        //s += '<li><a href="#!" class="-text">Miembros</a></li>';
        s += '</ul>';
        s += '</td>';
        s += '</tr>';
    }
    $(list_body).empty();
    $(list_body).append(s);
    $('.dropdown-button').dropdown();
}

function updateIglesia(id) {
    var iglesia = {idIglesia: id};
    iService.getIglesia(iglesia, function (data) {
        iglesiaAct = data;
        var s = createModal("update", data.iglNombre, data.iglDireccion, "active");
        $(".modal-content").empty();
        $(".modal-content").append(s);
        $('#modal1').openModal();
    });
}

function deleteIglesia(idIglesia) {
    confirmMessage({
        title: 'Eliminar Iglesia',
        content: '¿Seguro que desea eliminar este iglesia?'
    }, function () {
        var iglesia = {idIglesia: idIglesia};
        iService.deleteIglesia(iglesia, reload);
    });
}

function save() {
    var nombregp = $("#nigl").val();
    var lreunion = $("#lgreu").val();
    var tip = $("#tipModal").val();
    if (nombregp !== "" && lreunion !== "") {
        var iglesia;
        if (tip === "create") {
            iglesia = {
                iglNombre: nombregp,
                iglDireccion: lreunion,
                distrito: {idDistrito: idDistrito}
            };
            iService.addIglesia(iglesia, reload);
        }
        if (tip === "update") {
            iglesia = {
                iglNombre: nombregp,
                iglDireccion: lreunion,
                idIglesia: iglesiaAct.idIglesia,
                iglEstado: iglesiaAct.iglEstado,
                iglUsuAdd: iglesiaAct.iglUsuAdd,
                iglFechaCreacion: iglesiaAct.iglFechaCreacion,
                iglFechaAdd: iglesiaAct.iglFechaAdd,
                distrito: {idDistrito: iglesiaAct.distrito.idDistrito}
            };
            iService.updateIglesia(iglesia, reload);
        }
    } else {
        alert("Campos Incompletos...");
    }
}

function reload(id) {
    if (id !== 0) {
        iService.listIglesia({idDistrito: idDistrito}, listIglesia);
    }
}

function createModal(tipo, nombre, lugar, clase) {
    var s = '';
    s += '<h5 class="thin">Iglesia</h5>';
    s += '<div class="row">';
    s += '<form class="col s12">';
    s += '<div class="row">';
    s += '<div class="input-field col s12 l6 m6">';
    s += '<i class="mdi-social-group prefix"></i>';
    s += '<input id="nigl" type="text" class="validate" value="' + nombre + '">';
    s += '<label for="nigl" class="' + clase + '">Nombre</label>';
    s += '</div>';
    s += '<div class="input-field col s12 l6 m6">';
    s += '<i class="mdi-action-home prefix"></i>';
    s += '<input id="lgreu" type="text" class="validate" value="' + lugar + '">';
    s += '<label for="lgreu" class="' + clase + '">Dirección</label>';
    s += '</div>';
    s += '</div>';
    s += '<input type="hidden" value=' + tipo + ' id="tipModal">';
    s += '</form>';
    s += '</div>';
    return s;
}

function createIglesia() {
    var s = createModal("create", "", "", "");
    $(".modal-content").empty();
    $(".modal-content").append(s);
    $('#modal1').openModal();
}
                                                                