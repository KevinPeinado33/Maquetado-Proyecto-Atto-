/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function unionpService(){
    var connector = new jsConnector();
    this.addUnionp = function(unionp,_callback){
        try {
            connector.post(url.unionp.add, JSON.stringify(unionp), function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.unionp.add.title,
                        content: message.unionp.add.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.unionp.add.title,
                       content:message.unionp.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    this.updateUnionp = function(unionp, _callback){
        try {
            connector.post(url.unionp.update,unionp,function(result){
                if (result!== undefined && result!==null && result === 1) {
                    successMessage({
                        title:message.unionp.update.title,
                        content:message.unionp.update.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.unionp.update.title,
                       content:message.unionp.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    
    this.deleteUnionp = function(unionp, _callback){
        try {
            connector.post(url.unionp.delete,unionp,function(result){
                if (result!== undefined && result!==null && result === 1) {
                    successMessage({
                        title:message.unionp.delete.title,
                        content:message.unionp.delete.success
                    });
                    _callback(result);
                }else{
                    errorMessage({
                       title:message.unionp.delete.title,
                       content:message.unionp.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    this.listUnionp = function (_callback) {
        try {
            connector.post(url.unionp.list, null, function (result) {
                if (result !== undefined && result !== null && result.length>0) {
                    _callback(result);
                }else{
                    infoMessage({
                       title:message.unionp.list.title,
                       content:message.unionp.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
}