/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var documentoService = (function () {
    var add = function (documento, _callback) {
        try {
            connector.post(url.documento.add, documento, function (result) {
//Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.documento.add.title,
                        content: message.documento.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.documento.add.title,
                        content: message.documento.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var update = function (documento, _callback) {
        try {
            connector.post(url.documento.update, documento, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.documento.update.title,
                        content: message.documento.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.documento.update.title,
                        content: message.documento.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var remove = function (documento, _callback) {
        try {
            connector.post(url.documento.delete, documento, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.documento.delete.title,
                        content: message.documento.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.documento.delete.title,
                        content: message.documento.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var list = function (_callback) {
        try {
            connector.post(url.documento.list, null, function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.documento.list.title,
                        content: message.documento.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return {
        add: add,
        update: update,
        remove: remove,
        list: list
    };

}());