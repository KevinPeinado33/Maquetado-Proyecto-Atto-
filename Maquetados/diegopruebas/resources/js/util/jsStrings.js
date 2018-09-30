var strings = (function () {
    var init = function(){
        $(appDefaults.classes.validateHTML).each(function(){
            var message =$(this).data('validate-message');
            if(message===undefined || message===null || message ===''){
                message= 'Sin datos';
            }
            validateHTML($(this),message);
        });
        try {
            $('#user_simple_name').html(firstWord($('#crm_perNombre').val())+" "+firstWord($('#crm_perApellidos').val()));
        } catch (e) {
            
        }

    };
    var randomString = function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        length = (length !== undefined && length !== null) ? length : 1;
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    var firstWord = function(s){
        var sp = s.split(" ");
        return sp[0];
    };
    
    var validateHTML = function(e, message){
        var tmp = $(e).html();
        if(tmp === undefined || tmp===null || tmp===''){
            $(e).html(message);
        }
    };
    var validate = function(str){
        if(str === undefined || str===null || str.trim()==='' || str==='null'){
            return false;
        }else{
            return true;
        }
    };
    return {
        init:init,
        random:randomString,
        firstWord:firstWord,
        validateHTML:validateHTML,
        validate:validate
    };
}());


