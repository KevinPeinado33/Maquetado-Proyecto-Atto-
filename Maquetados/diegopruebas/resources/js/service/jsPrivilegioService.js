/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function privilegioService() {
    var connector = new jsConnector();
    //Aqui se registra cada método a utilizarse
    //Evitar la interaccion con HTML
    this.addPrivilegio = function (privilegio, _callback) {
        try {
            connector.post(url.privilegio.add, privilegio, function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.privilegio.add.title,
                        content: message.privilegio.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.privilegio.add.title,
                        content: message.privilegio.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    this.updatePrivilegio = function (privilegio, _callback) {
        try {
            connector.post(url.privilegio.update, privilegio, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.privilegio.update.title,
                        content: message.privilegio.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.privilegio.update.title,
                        content: message.privilegio.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    this.deletePrivilegio = function (privilegio, _callback) {
        try {
            connector.post(url.privilegio.delete, privilegio, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.privilegio.delete.title,
                        content: message.privilegio.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.privilegio.delete.title,
                        content: message.privilegio.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    this.listPrivilegio = function (_callback) {
        try {
            connector.post(url.privilegio.list, JSON.stringify({id: 1}), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.privilegio.list.title,
                        content: message.privilegio.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
}