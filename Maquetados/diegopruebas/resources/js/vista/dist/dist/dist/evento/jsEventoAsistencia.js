var idEvento=-1,evento=null,puntualidad="0";eventoAsistencia=function(){var f=function(){successMessage({title:"Registro de Asistencia",content:"Ya se realizó el registro de Asistencia"}),$("#main_card").addClass("hidden"),$("#save_card").addClass("hidden"),$("#error_card").addClass("hidden"),setTimeout(function(){location.href=crm_context_path+"/evento/listEvento"},1500)},g=function(e,t){console.log(e);var a=[];if(null!=e){totalCount=e.length;for(var o=0;o<e.length;o++){var s=e[o];switch(t){case 0:a.push(n(s,o));break;case 1:a.push(l(s,o));break;case 2:a.push(r(s,o))}}}else totalFalta=totalVisita=totalPresente=totalCount=0;var i=strings.random(8);components.render("#list_body",components.cardTable.code(a,i)),components.cardTable.event(a,i)},n=function(e,t){return{events:[],cols:[{type:"card-table-image",src:e.persona.perFoto,default:appDefaults.defaults.fotoPersona},{type:"card-table-content",label:"",value:e.persona.perNombres+" "+e.persona.perApellidos},{type:"card-table-content",label:"Documento",value:e.persona.perDocumento},{type:"card-table-content",label:"Grupo Pequeño",value:userInfo.grupo.gpoNombre},{type:"card-table-action",button:a("chk_"+t,e.idMiembrogp,"eventoAsistencia.mapMGP()")}]}},l=function(e,t){var a='<select class="browser-default" id="sel_'+t+'" onchange="eventoAsistencia.mapES()" data-persona="'+e.idMiembrogp+'">';return a+='<option value="-1">Ausente</option>',a+='<option value="0">0 días</option>',a+='<option value="1">1 día</option>',a+='<option value="2">2 días</option>',a+='<option value="3">3 días</option>',a+='<option value="4">4 días</option>',a+='<option value="5">5 días</option>',a+='<option value="6">6 días</option>',a+='<option value="7">7 días</option>',a+="</select>",{events:[],cols:[{type:"card-table-image",src:e.persona.perFoto,default:appDefaults.defaults.fotoPersona},{type:"card-table-content",label:"",value:e.persona.perNombres+" "+e.persona.perApellidos},{type:"card-table-content",label:"Grupo Pequeño",value:e.grupo.gpoNombre+"/"+e.grupo.escuela.escNombre},{type:"card-table-action",button:a}]}},r=function(e,t){return{events:[],cols:[{type:"card-table-image",src:e.persona.perFoto,default:appDefaults.defaults.fotoPersona},{type:"card-table-content",label:"",value:e.persona.perNombres+" "+e.persona.perApellidos},{type:"card-table-content",label:"Grupo Pequeño",value:e.grupo.gpoNombre+"/"+e.grupo.escuela.escNombre+"/"+e.grupo.escuela.iglesia.iglNombre},{type:"card-table-action",button:a("chk_"+t,e.idMiembrogp,"eventoAsistencia.mapMGP()")}]}},a=function(e,t,a){return'<div class="switch"><label>F<input type="checkbox" id="'+e+'" data-persona="'+t+'" onclick="'+a+'"><span class="lever"></span> P</label></div>'};return{init:function(){idEvento=$("#idEvento").val(),$("#error_title").html("Acceso no autorizado"),$("#error_content").html('Lo sentimos, el rol que has seleccionado <strong>"'+appDefaults.rolName(userInfo.rolSelected)+'"</strong> no tiene los privilegios suficientes para realizar esta operación.'),eventoService.get({idEvento:idEvento},function(e){evento=e,$("#error_card").addClass("hidden"),$("#main_card").removeClass("hidden"),$("#save_card").removeClass("hidden");var t,a,o,s,i,n,l,r=userInfo.rolSelected;if(i=r,n=evento.evtTipo,l=!1,i===appDefaults.rols.MIPES_GP||i===appDefaults.rols.LIDER_GP?(selected_id=userInfo.grupo.idGrupo,"0"!==n&&"4"!==n&&"9"!==n||(l=!0)):i===appDefaults.rols.LIDER_MI?(selected_id=userInfo.ministerio.idMinisterio,"1"===n&&(l=!0)):i===appDefaults.rols.MIPES_ES?(selected_id=userInfo.escuela.idEscuela,"2"===n&&(l=!0)):i===appDefaults.rols.MIPES_IG?(selected_id=userInfo.iglesia.idIglesia,"3"===n&&(l=!0)):i===appDefaults.rols.ADMIN&&(l=!0),l)if(selected_id+""!="0"&&"null"!==selected_id){components.render("#main_card",components.cardEvent.code([evento],{actions:!1,classes:"l12 m12 s12"})),$("#main_card > .col > .crm-event-container").append('<div id="list_card" style ="border-top:1px solid #eee;padding:16px"></div>'),$("#list_card").append('<table class="card-table"><tbody id="list_body"></tbody></table>');var d=!1;if("0"!==evento.evtPart){for(var c=math.intervalStringToArray(evento.evtPart),u=0;u<c.length;u++)if(c[u]+""==selected_id+""){d=!0;break}}else if("0"!==evento.evtExcepcion){for(d=!0,c=math.intervalStringToArray(evento.evtExcepcion),u=0;u<c.length;u++)if(c[u]+""==selected_id+""){d=!1;break}}else d=!0;if(d)if(t=evento,a=(new Date).getTime(),o=dateConverter.parse.longToDate(t.evtFecha).getTime(),s=dateConverter.addTime(o,t.evtFechaLimite),a<o||(puntualidad=o<=a&&a<=s?"1":"0",0))$("#save_card").addClass("hidden"),$("#error_card").addClass("hidden");else if("0"===evento.evtTipo||"4"===evento.evtTipo||"9"===evento.evtTipo){var p={evento:{idEvento:idEvento},grupo:{idGrupo:selected_id}};eventoService.checkAsistenciaGrupo(p,function(e){!1===e?miembrogpService.list({idGrupo:selected_id},function(e){g(e,0)}):f()})}else if("1"===evento.evtTipo);else if("2"===evento.evtTipo){var v={evento:{idEvento:idEvento},escuela:{idEscuela:selected_id}};eventoService.checkAsistenciaEscuela(v,function(e){!1===e?miembrogpService.listEscuela({idEscuela:selected_id},function(e){g(e,1)}):f()})}else"3"===evento.evtTipo&&miembrogpService.listIglesia({idIglesia:selected_id},function(e){g(e,2)});else $("#error_content").html("Lo sentimos, usted o el grupo de peronas al cual lidera no estan invitados a participar en este evento"),$("#main_card").addClass("hidden"),$("#save_card").addClass("hidden"),$("#error_card").removeClass("hidden")}else requestGrupo();else $("#main_card").addClass("hidden"),$("#save_card").addClass("hidden"),$("#error_card").removeClass("hidden")})},mapMGP:function(){listMGP=[];for(var e=0;e<totalCount;e++)listMGP.push({idPersona:$("#chk_"+e).data("persona"),value:$("#chk_"+e).is(":checked")});var t=0;for(e=0;e<listMGP.length;e++)listMGP[e].value&&(t+=1);totalFalta=totalCount-(totalPresente=t),$("#asgPresentes").html(totalPresente),$("#asgFaltas").html(totalFalta)},mapES:function(){listES=[];for(var e=0;e<totalCount;e++)listES.push({idPersona:$("#sel_"+e).data("persona"),dias:parseInt($("#sel_"+e).val()),value:0<=parseInt($("#sel_"+e).val())?"1":"0"});var t=0;for(e=0;e<listES.length;e++)"1"===listES[e].value&&(t+=1);totalFalta=totalCount-(totalPresente=t),$("#asgPresentes").html(totalPresente),$("#asgFaltas").html(totalFalta)},save:function(){if(a=!0,""===$("#asgVisitas").val()&&$("#asgVisitas").val("0"),strings.validate($("#asgLugar").val())||(a=!1,errorMessage({title:"Registro de Asistencia",content:"Debe especificar el lugar de reunión"})),a)if("0"===evento.evtTipo||"4"===evento.evtTipo){var e={id:{idEvento:evento.idEvento,idGrupo:userInfo.grupo.idGrupo},evento:{idEvento:evento.idEvento},grupo:{idGrupo:userInfo.grupo.idGrupo},asgPresentes:totalPresente,asgFaltas:totalFalta,asgVisitas:totalVisita,asgLugar:$("#asgLugar").val(),asgFechaRegistro:1519231804e3,asgPuntualidad:puntualidad};asGrupoService.add(e,function(e){for(var t=[],a=0;a<listMGP.length;a++)t.push({id:{idGrupo:e.idGrupo,idEvento:e.idEvento,idMiembrogp:listMGP[a].idPersona},amgAsistencia:listMGP[a].value?"1":"0"});asmiemgpService.addArray(t,function(e){setTimeout(function(){location.href=crm_context_path+"/evento/listEvento"},1500)})})}else if("2"===evento.evtTipo){var t={id:{idEvento:evento.idEvento,idEscuela:userInfo.escuela.idEscuela},evento:{idEvento:evento.idEvento},escuela:{idEscuela:userInfo.escuela.idEscuela},asePresentes:totalPresente,aseFaltas:totalFalta,aseVisitas:totalVisita,aseLugar:$("#asgLugar").val(),aseFechaRegistro:1519231804e3,asePuntualidad:puntualidad};asEscuelaService.add(t,function(e){for(var t=[],a=0;a<listES.length;a++)t.push({id:{idEvento:e.idEvento,idEscuela:e.idEscuela,idMiembrogp:listES[a].idPersona},ameAsistencia:listES[a].value,ameDias:listES[a].dias});asmiemesService.addArray(t,function(e){setTimeout(function(){location.href=crm_context_path+"/evento/listEvento"},1500)})})}var a}}}(),$(document).ready(function(){eventoAsistencia.init(),$(".select-buscador").on("select2:select",function(){var e=$(this).val();seleccionarBuscador(e)}),$("#btn_save").click(function(){eventoAsistencia.save()})});var idName=null,selected_id=0,totalCount=0,totalPresente=0,totalVisita=0,totalFalta=0,listMGP=[],listES=[];