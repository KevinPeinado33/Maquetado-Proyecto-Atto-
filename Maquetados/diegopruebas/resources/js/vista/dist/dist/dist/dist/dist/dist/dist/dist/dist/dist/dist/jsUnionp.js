var list_body=$("#list_body"),uService=new unionpService;function listUnionp(t){for(var e="",i=0;i<t.length;i++){var n=t[i];e+="<tr>",e+='<td style="width:38px"><button class="btn-floating waves-effect waves-light amber">'+getLetter(n.uniNombre)+"</button></td>",e+='<td class="condensed"><h6><strong>'+n.uniNombre+"</strong></h6></td>",e+='<td class="condensed"></td>',e+='<td style="float:right">',e+='<a class="grey-text" onclick="updateGrupo()"><i class="mdi-editor-mode-edit actCRUD"></i></a>',e+='<a class="grey-text" onclick="deleteGrupo()"><i class="mdi-content-clear actCRUD"></i></a>',e+='<a class="grey-text"><i class="mdi-navigation-more-vert actCRUD"></i></a>',e+="</td>",e+="</tr>"}$(list_body).empty(),$(list_body).append(e)}function getLetter(t){return t.split("")[0].toUpperCase()}$(document).ready(function(){uService.listUnionp(listUnionp)});