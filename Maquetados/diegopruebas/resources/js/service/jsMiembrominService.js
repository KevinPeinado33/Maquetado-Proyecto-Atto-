/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function miembrominService(){
    var connector = new jsConnector();
    this.addMiembromin = function(miembromin,_callback){
        try {
            connector.post(url.miembromin.add, miembromin, function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.miembromin.add.title,
                        content: message.miembromin.add.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.miembromin.add.title,
                       content:message.miembromin.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    this.updateMiembromin = function(miembromin, _callback){
        try {
            connector.post(url.miembromin.update,miembromin,function(result){
                if (result!== undefined && result!==null && result === 1) {
                    successMessage({
                        title:message.miembromin.update.title,
                        content:message.miembromin.update.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.miembromin.update.title,
                       content:message.miembromin.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    
    this.deleteMiembromin = function(miembromin, _callback){
        try {
            connector.post(url.miembromin.delete,miembromin,function(result){
                if (result!== undefined && result!==null && result === 1) {
                    successMessage({
                        title:message.miembromin.delete.title,
                        content:message.miembromin.delete.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.miembromin.delete.title,
                       content:message.miembromin.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    this.listMiembromin = function (_callback) {
        try {
            connector.post(url.miembromin.list, JSON.stringify({id:1}), function (result) {
                if (result !== undefined && result !== null && result.length>0) {
                    _callback(result);
                }else{
                    infoMessage({
                       title:message.miembromin.list.title,
                       content:message.miembromin.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
}