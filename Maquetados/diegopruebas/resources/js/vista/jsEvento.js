var evento =(function () {
    var list = function(){
        var rol = userInfo.rolSelected;
        if(rol === appDefaults.rols.MIPES_IG || appDefaults.rols.ANCIANO_IG){
            var iglesia = userInfo.iglesia.idIglesia;
            
        }
    };
    return {
        list:list
    };
}());

$(document).ready(function () {
    evento.list();
});