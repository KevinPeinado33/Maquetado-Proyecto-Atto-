var usuarioClave=function(){var l=function(){selectRol&&selectRol.init()},i=function(){var a=!0,e="Cambio de Clave",l=$("#usuClaveOld").val(),i=$("#usuClaveNew").val();return!1===strings.validate(l)&&(a=!1,errorMessage({title:e,content:"Debe ingresar la clave actual"})),!1===strings.validate(i)&&(a=!1,errorMessage({title:e,content:"Debe ingresar la clave nueva"})),strings.validate(i)&&strings.validate(l)&&(i===l&&(a=!1,errorMessage({title:e,content:"Debe ingresar una clave diferente a la actual"})),i.length<6&&(a=!1,errorMessage({title:e,content:"La nueva clave debe tener por lo menos 6 caracteres"}))),a},s=function(){$("body").append('<div class="modal white" id="modalUsuarioClave"><div class="modal-content"><h5>Bienvenido(a) al CRM Digital</h5><p>Para empezar, necesitamos que cambies tu clave</p><div class="row"><div class="col l6 m12 s12 input-field"><input type="password" id="usuClaveOld" maxlength="255" /><label for="usuClaveOld">Ingresar clave Actual</label></div><div class="col l6 m12 s12 input-field"><input type="password" id="usuClaveNew" maxlength="255" /><label for="usuClaveNew">Ingresar clave Nueva</label></div></div><div class="row"><div class="col l12 m12 s12"><button id="btnGuardarUsuarioClave" class="btn purple white-text right">Guardar</button></div></div></div></div>')};return{init:function(){s();var a=$("#crm_estadoClave").val(),e=$("#crm_estadoClaveSession").val();"0"!==a||!1!==strings.validate(e)&&"0"!==e?l():$("#modalUsuarioClave").openModal(),$("#btnGuardarUsuarioClave").click(function(){if(i()){var a={idPersona:userInfo.idPersona,usuUsuario:$("#usuClaveOld").val(),usuClave:$("#usuClaveNew").val()};usuarioService.updateUsuarioClave(a,function(){$("#modalUsuarioClave").closeModal(),l()})}})}}}();$(document).ready(function(){usuarioClave.init()});