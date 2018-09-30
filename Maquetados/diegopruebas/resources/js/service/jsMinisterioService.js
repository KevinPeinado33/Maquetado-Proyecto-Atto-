var ministerioService = (function () {
    var addMinisterio = function (ministerio, _callback) {
        try {
            connector.post(url.ministerio.add, ministerio, function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.ministerio.add.title,
                        content: message.ministerio.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.ministerio.add.title,
                        content: message.ministerio.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var updateMinisterio = function (ministerio, _callback) {
        try {
            connector.post(url.ministerio.update, ministerio, function (result) {
                if (result !== undefined && result !== null && result !==0) {
                    successMessage({
                        title: message.ministerio.update.title,
                        content: message.ministerio.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.ministerio.update.title,
                        content: message.ministerio.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var deleteMinisterio = function (ministerio, _callback) {
        try {
            connector.post(url.ministerio.delete, ministerio, function (result) {
                if (result !== undefined && result !== null && result !==0) {
                    successMessage({
                        title: message.ministerio.delete.title,
                        content: message.ministerio.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.ministerio.delete.title,
                        content: message.ministerio.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var listMinisterio = function (iglesia,_callback) {
        try {
            connector.post(url.ministerio.list, JSON.stringify(iglesia), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.ministerio.list.title,
                        content: message.ministerio.list.empty
                    });
                    _callback(result);
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var getMinisterio = function (ministerio,_callback) {
        try {
            connector.post(url.ministerio.get, JSON.stringify(ministerio), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.ministerio.get.title,
                        content: message.ministerio.get.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    return {
        add:addMinisterio,
        update:updateMinisterio,
        remove:deleteMinisterio,
        list:listMinisterio,
        get:getMinisterio
    };
}());