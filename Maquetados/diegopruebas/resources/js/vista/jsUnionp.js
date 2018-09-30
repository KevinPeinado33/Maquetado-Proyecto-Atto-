var list_body = $('#list_body');
var uService = new unionpService();

$(document).ready(function(){
    uService.listUnionp(listUnionp);
});

function listUnionp(list){
    var s = "";
    for (var i = 0; i < list.length; i++) {
        var unionp = list[i];
        var r = getLetter(unionp.uniNombre);
        s += '<tr>';
        s += '<td style="width:38px"><button class="btn-floating waves-effect waves-light amber">' + r + '</button></td>';
        s += '<td class="condensed"><h6><strong>' + unionp.uniNombre + '</strong></h6></td>';
        s += '<td class="condensed"></td>';
        s += '<td style="float:right">';
        s += '<a class="grey-text" onclick="updateGrupo()"><i class="mdi-editor-mode-edit actCRUD"></i></a>';
        s += '<a class="grey-text" onclick="deleteGrupo()"><i class="mdi-content-clear actCRUD"></i></a>';
        s += '<a class="grey-text"><i class="mdi-navigation-more-vert actCRUD"></i></a>';
        s += '</td>';
        s += '</tr>';
    }
    $(list_body).empty();
    $(list_body).append(s);
}

function getLetter(nombre) {
    var letter = nombre.split("");
    var Let = letter[0];
    return Let.toUpperCase();
}