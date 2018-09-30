/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function asmiemminService(){
    var connector = new jsConnector();
    this.addAsmiemmin = function(asmiemmin,_callback){
        try {
            connector.post(url.asmiemmin.add, asmiemmin, function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.asmiemmin.add.title,
                        content: message.asmiemmin.add.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.asmiemmin.add.title,
                       content:message.asmiemmin.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    this.updateAsmiemmin = function(asmiemmin, _callback){
        try {
            connector.post(url.asmiemmin.update,asmiemmin,function(result){
                if (result!== undefined && result!==null && result === 1) {
                    successMessage({
                        title:message.asmiemmin.update.title,
                        content:message.asmiemmin.update.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.asmiemmin.update.title,
                       content:message.asmiemmin.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    
    this.deleteAsmiemmin = function(asmiemmin, _callback){
        try {
            connector.post(url.asmiemmin.delete,asmiemmin,function(result){
                if (result!== undefined && result!==null && result === 1) {
                    successMessage({
                        title:message.asmiemmin.delete.title,
                        content:message.asmiemmin.delete.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.asmiemmin.delete.title,
                       content:message.asmiemmin.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    this.listAsmiemmin = function (_callback) {
        try {
            connector.post(url.asmiemmin.list, JSON.stringify({id:1}), function (result) {
                if (result !== undefined && result !== null && result.length>0) {
                    _callback(result);
                }else{
                    infoMessage({
                       title:message.asmiemmin.list.title,
                       content:message.asmiemmin.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
}