var agService = new eventopersonaService();
var asistencia = [];

function addAsisMiemgp(idAsistenciaevt) {
    for (var i = 0, max = document.getElementById("list_miembros").rows.length; i < max; i++) {
        var a = document.getElementById("list_miembros").rows[i].cells[2].innerHTML.split('value="');
        var b = a[1].split('"');
        var idPersona = b[0];
        var asis = "0";
        if ($("#as" + idPersona).prop('checked')) {
            asis = "1";
        }
        asistencia.push(createAsisPersona(idAsistenciaevt.idEvento, parseInt(idPersona), asis));
    }
    agService.addEventopersona(asistencia, function (a) {
    });
    getEventosAct();
}

function createAsisPersona(idAsevt, idPersona, asistencia) {
    var eventopersona = {
        evpAsistencia: asistencia,
        evpEstado: 1,
        id: {
            idPersona: idPersona,
            idEvento: idAsevt
        }
    };
    return eventopersona;
}
