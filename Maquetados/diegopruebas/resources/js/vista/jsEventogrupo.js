var aService = new eventogrupoService();
var nMiembros = 0;
var mgpService = new miembrogpService();
var gpService = new grupoService();
var evtService = new eventoService();
var list_miembros;
var idEventoG;
idGrupo = $("#crm_idGrupo").val();
var grupo = {idGrupo: idGrupo};

$(document).ready(function () {
    getEventosAct();
    /*evtService.listEventoActGroup(grupo,function(a){
     console.log(a);
     });*/
    //loadHeader();
});

//****************NEW CODE**********************//

function getEventosAct() {
    var dis = $("#crm_idDistrito").val();
    //var igl = $("#crm_idIglesia").val();
    var evento = {
        evtDistrito: dis,
        //evtIglesia: igl,
        periodo: {
            idPeriodo: 1
        }
    };
    evtService.getEventoAct(evento, function (evts) {
        if (evts.length > 1) {

        } else {
            loadHeader(evts);
        }
    });
}

//*********     OLD CODE     *******************//


function loadHeader(lista) {
    /*var periodo = {idPeriodo: 1};
     evtService.listEvento(periodo, function (lista) {*/
    idEventoG = lista[0].idEvento;
    var s = '<li class="active">Evento n° ' + idEventoG + '</li>';
    s += '<li class="active">' + lista[0].evtNombre + '</li>';
    s += '<li class="active">' + getActualDateLong() + '</li>';
    s += '<li class="active">Vence el ' + getDateLong(new Date(lista[0].evtFechaLimite)) + '</li>';
    $(".conH").empty();
    $(".conH").append(s);
    testEnabled(idEventoG);
    //});
}

function testEnabled(idEvento) {//provisional
    var eventogrupo = {
        id: {
            idEvento: idEvento,
            idGrupo: idGrupo
        }
    };
    aService.getInfoEventogrupo(eventogrupo, function (l) {
        if (l.length > 0) {//ya hay una asistencia de ese evento
            var texto = "Felicidades, ya ha registrado la asistencia al este evento. Debe esperar a que esté disponible el siguiente evento para poder registrar la asistencia de su Grupo Pequeño";
            $(".contAsis").empty();
            $(".contAsis").append(createMessageAlert("green accent-3", texto));
            //********************      MOSTRAR REGISTRO DISABLED      ***********************//
        } else {//puede registrar
            $(".contAsis").empty();
            $(".contAsis").append(createContextAsis());
            list_miembros = $("#list_miembros");
            var grupo = {idGrupo: $("#crm_idGrupo").val()};
            mgpService.listMiembrogp(grupo, loadMiembros);
            gpService.getGrupo(grupo, dataGroup);
        }
    });
}

function dataGroup(grupo) {
    $(".titleGP").empty();
    $(".titleGP").append("<small>Grupo Pequeño</small><br>" + grupo.gpoNombre);
    var s = '<i class="mdi-action-home prefix grey-text darken-3"></i>';
    s += '<input id="lreunion" type="text" class="validate" value="' + grupo.gpoLugarReunion + '">';
    s += '<label for="lreunion" class="active">Lugar de Reunión</label>';
    $(".contLR").empty();
    $(".contLR").append(s);
}

function loadMiembros(list) {
    var s = "";
    for (var i = 0, max = list.length; i < max; i++) {
        var r = getLetter(list[i].persona.perNombres);
        s += '<tr>';
        s += '<td style="width:38px;"><button class="btn-floating waves-effect waves-light ' + getColor() + '">' + r + '</button></td>';
        s += '<td class="ligth italic">' + list[i].persona.perNombres + ' ' + list[i].persona.perApellidos + '</td>';
        /*s += '<td>';
         s += '<span class="chart presente" data-percent="' + getRandomArbitrary(0, 100) + '">';
         s += '<span class="percent"></span>';
         s += '</span>';
         s += '</td>';*/
        s += '<td><input type="hidden" value="' + list[i].persona.idPersona + '"></td>';
        s += '<td><p><input type="checkbox" class="checkO" onclick="changePF(this.id)" id="as' + list[i].persona.idPersona + '"><label for="as' + list[i].persona.idPersona + '"></label></p></td>';
        s += '</tr>';

    }
    $(list_miembros).empty();
    $(list_miembros).append(s);
    startPieChart();
    nMiembros = list.length;
    $(".valF").attr("value", nMiembros);
    $(".falV").empty();
    $(".falV").append(nMiembros);
}

function saveAsis() {
    confirmMessage({
        title: 'Registro de Asistencia',
        content: '¿Está seguro que desea registrar?'
    }, addEventogrupo);
}

function addEventogrupo() {
    var P = parseInt($(".valP").val());
    var F = parseInt($(".valF").val());
    var V = $("#nvisitas").val();
    var L = $("#lreunion").val();
    if (V === "") {
        V = 0;
    }
    parseInt(V);
    var eventogrupo = {
        evgPresentes: P,
        evgFaltas: F,
        evgVisitas: V,
        evgDescripcion: "",
        evgLugar: L,
        id: {
            idEvento: idEventoG,
            idGrupo: idGrupo
        }
    };
    aService.addEventogrupo(eventogrupo, addAsisMiemgp);
}

function startPieChart() {
    $('.presente').easyPieChart({
        easing: 'easeOutBounce',
        lineWidth: '3',
        barColor: '#00e676',
        size: 60,
        animate: 2000,
        onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });
}

function changeAll() {
    if ($("#as").prop('checked')) {
        $(".checkO").attr("checked", "true");
    } else {
        $(".checkO").removeAttr("checked");
    }
}

function changePF(id) {
    var P = parseInt($(".valP").val());
    var F = parseInt($(".valF").val());
    if ($("#" + id).prop('checked')) {
        P = P + 1;
        F = F - 1;
    } else {
        F = F + 1;
        P = P - 1;
    }
    $(".valF").attr("value", F);
    $(".falV").empty();
    $(".falV").append(F);
    $(".valP").attr("value", P);
    $(".preV").empty();
    $(".preV").append(P);
}

function createContextAsis() {
    var s = '<div class="col l7 s12">';
    s += '<div class="row">';
    s += '<h5 class="light italic left">Registro de Asistencia</h5>';
    s += '</div>';
    s += '<table class="highlight light italic">';
    s += '<tbody id="list_miembros">';
    s += '</tbody>';
    s += '</table>';
    s += '</div>';
    s += '<div class="col l5 s12">';
    s += '<h5 class="light italic titleGP"></h5>';
    s += '<table class="row">';
    s += '<tr style="margin: 0;padding: 0;">';
    s += '<td class="col s3 offset-s3 green-text accent-3" style="text-align: center"><h3 class="thin preV">0</h3><small>Presentes</small></td>';
    s += '<input type="hidden" class="valP" value="0">';
    s += '<td class="col s3 grey-text darken-3" style="text-align: center"><h3 class="thin falV">0</h3><small>Faltas</small></td>';
    s += '<input type="hidden" class="valF" value="0">';
    s += '</tr>';
    s += '</table>';
    s += '<div class="row">';
    s += '<div class="input-field col s10 offset-s1">';
    s += '<i class="mdi-social-people prefix grey-text darken-3"></i>';
    s += '<input id="nvisitas" type="number" class="validate">';
    s += '<label for="nvisitas" class="">Número de visitas</label>';
    s += '</div>';
    s += '<div class="input-field col s10 offset-s1 contLR">';
    s += '</div>';
    s += '</div>';
    s += '<br>';
    s += '<button class="btn waves-effect waves-light green accent-3 col l12 m12 s12" onclick="saveAsis()">Registrar</button>';
    s += '</div>';
    return s;
}

function createMessageAlert(ColorClass, text) {
    var s = '<div class="col l12 m12 s12">';
    s += '<div class="card ' + ColorClass + ' white-text">';
    s += '<div class="card-content">';
    s += '<i class="mdi-social-notifications"></i>';
    s += text;
    s += '</div>';
    s += '</div>';
    s += '</div>';
    return s;
}