var eventoMain=function(){var t=function(){var e=!1;userInfo.rolSelected!==appDefaults.rols.MIPES_IG&&userInfo.rolSelected!==appDefaults.rols.MIPES_DI&&userInfo.rolSelected!==appDefaults.rols.MIPES_CA&&userInfo.rolSelected!==appDefaults.rols.MIPES_UN||(e=!0),!1===e&&(location.href=crm_context_path+"/error/403")},a=function(e){var t={idEvento:e};eventoService.get(t,function(e){if($("#evtTipo").val(e.evtTipo),$("#evtNombre").val(e.evtNombre),$("#evtDescripcion").val(e.evtDescripcion),$("#evtLugar").val(e.evtLugar),$("#evtFecha").pickadate("picker").set("select",dateConverter.parse.longToDate(e.evtFecha)),$("#evtHora").val(dateConverter.format.longStringToTime(e.evtFecha)),$("#evtFechaLimite").val(e.evtFechaLimite),$("#evtDirA").val(e.evtDirA),"0"!==e.evtPart){$("#participantes").removeClass("hidden");var t=math.intervalStringToArray(e.evtPart);r($("#tbody_participantes"),t,0)}if("0"!==e.evtExcepcion){t=math.intervalStringToArray(e.evtExcepcion);r($("#tbody_expeciones"),t,1)}})},r=function(e,t,a){o([],0,t,a,e)},o=function(t,a,r,i,n){a===r.length?s(t,i,n):"A"===$("#evtDirA").val()?grupoService.get({idGrupo:r[a]},function(e){t.push(e),o(t,a+=1,r,i,n)}):"B"===$("#evtDirA").val()?ministerioService.get({idMinisterio:r[a]},function(e){t.push(e),o(t,a+=1,r,i,n)}):"C"===$("#evtDirA").val()?escuelaService.get({idEscuela:r[a]},function(e){t.push(e),o(t,a+=1,r,i,n)}):"D"===$("#evtDirA").val()?iglesiaService.get({idIglesia:r[a]},function(e){t.push(e),o(t,a+=1,r,i,n)}):"E"===$("#evtDirA").val()?distritoService.get({idDistrito:r[a]},function(e){t.push(e),o(t,a+=1,r,i,n)}):personaService.get({idPersona:r[a]},function(e){t.push(e),o(t,a+=1,r,i,n)})},s=function(e,t,a){for(var r=[],i=0;i<e.length;i++){var n=e[i];"A"===$("#evtDirA").val()?r.push({events:[],cols:[{type:"card-table-image",src:n.gpoLogo},{type:"card-table-content",label:"",value:n.gpoNombre},{type:"card-table-content",label:"Escuela Sabática",value:n.escuela.escNombre},c(t,n.idGrupo)]}):"B"===$("#evtDirA").val()?r.push({events:[],cols:[{type:"card-table-image",src:n.minLogo},{type:"card-table-content",label:"",value:n.minNombre},{type:"card-table-content",label:"Iglesia",value:n.iglesia.iglNombre},c(t,n.idMinisterio)]}):"C"===$("#evtDirA").val()?r.push({events:[],cols:[{type:"card-table-icon",icon:"mdi-social-school amber"},{type:"card-table-content",label:"",value:n.escNombre},{type:"card-table-content",label:"Iglesia",value:n.iglesia.iglNombre},c(t,n.idEscuela)]}):"D"===$("#evtDirA").val()?r.push({events:[],cols:[{type:"card-table-icon",icon:"mdi-social-location-city green acent-4 white-text"},{type:"card-table-content",label:"",value:n.iglNombre},{type:"card-table-content",label:"Distrito Misionero",value:n.distrito.disNombre},c(t,n.idIglesia)]}):"E"===$("#evtDirA").val()?r.push({events:[],cols:[{type:"card-table-icon",icon:"mdi-social-location-city green acent-4 white-text"},{type:"card-table-content",label:"",value:n.disNombre},{type:"card-table-content",label:"Campo/Misión",value:n.campo.cmpNombre},c(t,n.idDistrito)]}):r.push({events:[],cols:[{type:"card-table-image",src:n.perFoto,default:appDefaults.defaults.fotoPersona},{type:"card-table-content",label:"",value:n.perNombres+" "+n.perApellidos},{type:"card-table-content",label:"Documento",value:n.perDocumento},c(t,n.idPersona)]})}var o=strings.random(8);components.render(a,components.cardTable.code(r,o)),components.cardTable.event(r,o)},c=function(e,t){return{type:"card-table-action",button:'<a class="btn btn-flat btn-floating red white-text right" onclick="'+(0===e?"eventoMain.removeP("+t+")":"eventoMain.removeE("+t+")")+'"><i class="mdi-action-delete"></i></a>'}},e=function(){var e=$('input[name="evtFecha"]').val()+" "+$("#evtHora").val(),t=new Date(e).getTime(),a={idEvento:$("#idEvento").val(),evtNombre:$("#evtNombre").val(),evtDescripcion:$("#evtDescripcion").val(),evtLugar:$("#evtLugar").val(),evtFecha:t,evtFechaLimite:$("#evtFechaLimite").val(),evtDirA:$("#evtDirA").val(),evtPart:i(0),evtExcepcion:i(1),evtTipo:$("#evtTipo").val(),evtUnion:0,evtCampo:0,evtDistrito:0,evtIglesia:0,evtEstado:"1"};return userInfo.rolSelected===appDefaults.rols.MIPES_UN||userInfo.rolSelected===appDefaults.rols.DIRECTOR_UN?a.evtUnion=userInfo.union.idUnion:userInfo.rolSelected===appDefaults.rols.MIPES_CA||userInfo.rolSelected===appDefaults.rols.DIRECTOR_CA?a.evtCampo=userInfo.campo.idCampo:userInfo.rolSelected===appDefaults.rols.MIPES_DI||userInfo.rolSelected===appDefaults.rols.PASTOR_DI?a.evtDistrito=userInfo.distrito.idDistrito:userInfo.rolSelected!==appDefaults.rols.MIPES_IG&&userInfo.rolSelected!==appDefaults.rols.ANCIANO_IG||(a.evtIglesia=userInfo.iglesia.idIglesia),a},i=function(e){return 0===e?"0"!==$("#evtPartS").val()?math.formatArrayInterval(partID):"0":0<exID.length?math.formatArrayInterval(exID):"0"},n=function(){var e="idPersona";switch($("#evtDirA").val()){case"A":e="idGrupo";break;case"B":e="idMinisterio";break;case"C":e="idEscuela";break;case"D":e="idIglesia";break;case"E":e="idDistrito"}return e};return{init:function(){t();var e=$("#idEvento").val();"0"!==e.toString()&&a(e)},validate:function(){var e=!0,t="Registro de Evento";return!1===strings.validate($("#evtNombre").val())&&(e=!1,errorMessage({title:t,content:"Debe ingresar el nombre del evento"})),!1===strings.validate($("#evtDescripcion").val())&&(e=!1,errorMessage({title:t,content:"Debe ingresar la descripcion del evento"})),!1===strings.validate($("#evtLugar").val())&&(e=!1,errorMessage({title:t,content:"Debe ingresar el Lugar donde se realizará el evento"})),!1===strings.validate($('input[name="evtFecha"]').val())&&(e=!1,errorMessage({title:t,content:"Debe seleccionar la fecha del evento"})),"0"!==$("#evtPartS").val()&&0===participantes.length&&(e=!1,errorMessage({title:t,content:"Debe seleccionar los participantes al evento"})),e},save:function(){"0"===$("#idEvento").val().toString()?eventoService.add(e(),function(e){setTimeout(function(){location.href=crm_context_path+"/evento/listEvento"},2e3)}):eventoService.update(e(),function(){setTimeout(function(){location.href=crm_context_path+"/evento/listEvento"},2e3)})},mapEvento:e,render:s,getIDName:n,removeE:function(e){for(var t=n(),a=0;a<excepciones.length;a++)if(excepciones[a][t]+""==e+""){excepciones.splice(a,1);break}for(a=0;a<exID.length;a++)if(exID[a]+""==e+""){exID.splice(a,1);break}s(excepciones,1,"#tbody_expeciones")},removeP:function(e){for(var t=n(),a=0;a<participantes.length;a++)if(participantes[a][t]+""==e+""){participantes.splice(a,1);break}for(a=0;a<partID.length;a++)if(partID[a]+""==e+""){partID.splice(a,1);break}s(participantes,0,"#tbody_participantes")}}}(),participantes=[],excepciones=[],partID=[],exID=[],search_mode=0;function seleccionarBuscador(e){for(var t=eventoMain.getIDName(),a=-1,r=0;r<select_results.length;r++)select_results[r][t]+""==e+""&&(a=r);if(-1<a){if(0===search_mode){participantes.push(select_results[a]),partID.push(select_results[a][t]);var i="#tbody_participantes";eventoMain.render(participantes,search_mode,i)}else{excepciones.push(select_results[a]),exID.push(select_results[a][t]);i="#tbody_expeciones";eventoMain.render(excepciones,search_mode,i)}cerrarBuscador()}}function cerrarBuscador(){$("#modalBuscar").closeModal(),select2.clear($(".crm-select2"))}$(document).ready(function(){eventoMain.init(),$("#evtPartS").change(function(){"0"===$(this).val()?($("#participantes").addClass("hidden"),$("#excepciones").removeClass("hidden")):($("#participantes").removeClass("hidden"),$("#excepciones").addClass("hidden"))}),$("#btnGuardar").click(function(){eventoMain.validate()&&($(this).attr("disabled",!0),$(this).html("Guardando..."),eventoMain.save())}),$("#evtDirA").change(function(){var e=$(this).val();switch($(".buscador").addClass("hidden"),e){case"A":$("#select_grupo").parent().parent().parent().removeClass("hidden");break;case"B":$("#select_ministerio").parent().parent().parent().removeClass("hidden");break;case"C":$("#select_escuela").parent().parent().parent().removeClass("hidden");break;case"D":$("#select_iglesia").parent().parent().parent().removeClass("hidden");break;case"E":$("#select_distrito").parent().parent().parent().removeClass("hidden")}"F"!==e&&"G"!==e&&"H"!==e&&"I"!==e&&"J"!==e&&"K"!==e&&"L"!==e&&"M"!==e&&"N"!==e||$("#select_persona").parent().parent().parent().removeClass("hidden"),participantes=[],excepciones=[],partID=[],exID=[],$("#tbody_participantes").empty(),$("#tbody_expeciones").empty()}),$(".select-buscador").on("select2:select",function(){seleccionarBuscador($(this).val())})});var select_results=[];function loadSelect(e){select_results=e}