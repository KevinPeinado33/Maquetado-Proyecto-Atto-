/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function tipoeventoService() {
    var connector = new jsConnector();
    //Aqui se registra cada método a utilizarse
    //Evitar la interaccion con HTML
    this.addTipoevento = function (tipoevento, _callback) {
        try {
            connector.post(url.tipoevento.add, tipoevento, function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.tipoevento.add.title,
                        content: message.tipoevento.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.tipoevento.add.title,
                        content: message.tipoevento.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    this.updateTipoevento = function (tipoevento, _callback) {
        try {
            connector.post(url.tipoevento.update, tipoevento, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.tipoevento.update.title,
                        content: message.tipoevento.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.tipoevento.update.title,
                        content: message.tipoevento.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    this.deleteTipoevento = function (tipoevento, _callback) {
        try {
            connector.post(url.tipoevento.delete, tipoevento, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.tipoevento.delete.title,
                        content: message.tipoevento.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.tipoevento.delete.title,
                        content: message.tipoevento.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    this.listTipoevento = function (_callback) {
        try {
            connector.post(url.tipoevento.list, JSON.stringify({id: 1}), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.tipoevento.list.title,
                        content: message.tipoevento.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
}