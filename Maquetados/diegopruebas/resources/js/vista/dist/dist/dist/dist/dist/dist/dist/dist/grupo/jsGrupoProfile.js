var documentos=[],grupoProfile=function(){var c=$("#tab1"),n=$("#tab3"),e=$("#conModal"),t={},a=function(i){miembrogpService.list({idGrupo:t.idGrupo},function(e){var o=[];$("#mbm_count").html(e.length);for(var n=0;n<e.length;n++){var a=e[n],r=dateConverter.format.longStringToDate(a.mgpFechaRegistro);o.push({events:[{type:"click",action:"redirect('/persona/profile/"+a.persona.idPersona+"')"}],cols:[{type:"card-table-image",src:a.persona.perFoto,default:appDefaults.defaults.fotoPersona},{type:"card-table-content",label:"",value:a.persona.perNombres+" "+a.persona.perApellidos},{type:"card-table-content",label:"Fecha de Registro",value:r},{type:"card-table-action",button:'<button class="btn-remove-migp btn-floating btn-flat red white-text waves-effect waves-light right" onclick="event.stopPropagation(); grupoProfile.removeMiembro('+a.idMiembrogp+')"><i class="mdi-content-clear"></i></button>'}]});var t=strings.random(8);components.render(c,components.cardTable.code(o,t)),components.cardTable.event(o,t),i()}})},o=function(){for(var e="",o=0;o<documentos.length;o++)e+='<option value="'+documentos[o].idDocumento+'">'+documentos[o].docDescripcion+"</option>";$("#documento").append(e)},i=function(e){void 0===e&&(e=$("#persona").val());var o={persona:{idPersona:e},grupo:{idGrupo:t.idGrupo}};miembrogpService.add(o,function(e){a(function(){})})};return{init:function(){t.idGrupo=parseInt($("#info_grupo_idGrupo").val()),t.nombre=$("#info_grupo_nombre").val(),t.idEscuela=parseInt($("#info_grupo_idEscuela").val()),a(function(){}),adminLeaders.listLeaders(1,n)},searchMember:function(){components.render(e,components.modalMemberSearch.code("persona-enabled","test","Anexar Personas")),select2.init(),$("#saveModal").empty().append("Agregar"),$("#saveModal").attr("onclick","grupoProfile.addMember()")},regMember:function(){components.render(e,components.modalNewPerson.code()),select2.init(),$("#saveModal").empty().append("Registrar y Agregar"),$("#saveModal").attr("onclick","grupoProfile.addPerson()"),null===documentos||0===documentos.length?documentoService.list(function(e){documentos=e,o()}):o()},regLeader:function(){components.render(e,components.modalSetRol.code("persona-enabled","test",[{id:2,nombre:"Lider de Grupo Pequeño"},{id:12,nombre:"MIPES de Grupo Pequeño"}])),select2.init(),$("#saveModal").empty().append("Asignar"),$("#saveModal").attr("onclick","grupoProfile.addLeader()")},addPerson:function(){var e=$("#perNombres").val(),o=$("#perApellidos").val(),n=$("#perDocumento").val(),a=$("input:radio[name=group1]:checked").val(),r=$("#documento").val();if(validate.incomplete([e,o,n,a,r])){var t={perNombres:e,perApellidos:o,perDocumento:n,perSexo:a,documento:{idDocumento:r}};personaService.add(t,function(e){i(e)})}else infoMessage({title:message.incomplete.title,content:message.incomplete.content})},addMember:i,update:function(){var o,n=$("#gpoNombre").val(),a=$("#gpoLugarReunion").val(),e=$("#gpoFechaCreacion").val().split(" ");o=validate.incomplete([e[1]])?dateConverter.format.datePickerToString($("#gpoFechaCreacion").val()):e[0];var r={idGrupo:t.idGrupo,escuela:{idEscuela:t.idEscuela},gpoNombre:n,gpoFechaCreacion:o,gpoLugarReunion:a,gpoFechaRegistro:new Date($("#info_grupo_gpoFechaRegistro").val()),gpoEstado:"1"};grupoService.update(r,function(e){t.nombre=n,$("#tit_grupo").empty().append(n+'<i class="mdi-navigation-more-vert right"></i>'),$("#g_fec").empty().append("Fecha de Creación : "+o),$("#g_reu").empty().append("Lugar de Reuniòn : "+a),$("#gpoFechaCreacion").val(o)})},removeMiembro:function(e){confirmMessage({title:"Desvinculación",content:"¿Seguro que desea desvincular a esta persona del grupo?"},function(){miembrogpService.remove({idMiembrogp:e},function(e){a(function(){})})})},addLeader:function(){var e=$("#persona").val(),o=$("#rolS").val();adminLeaders.addLeader(e,o,function(e){adminLeaders.listLeaders(1,n)})}}}();