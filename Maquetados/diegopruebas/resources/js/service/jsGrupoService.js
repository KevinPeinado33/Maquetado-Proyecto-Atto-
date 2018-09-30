var grupoService = (function () {
    var add = function (grupo, _callback) {
        try {
            connector.post(url.grupo.add, JSON.stringify(grupo), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.grupo.add.title,
                        content: message.grupo.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.grupo.add.title,
                        content: message.grupo.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var update = function (grupo, _callback) {
        try {
            connector.post(url.grupo.update, JSON.stringify(grupo), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.grupo.update.title,
                        content: message.grupo.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.grupo.update.title,
                        content: message.grupo.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var remove = function (grupo, _callback) {
        try {
            connector.post(url.grupo.delete, JSON.stringify(grupo), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.grupo.delete.title,
                        content: message.grupo.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.grupo.delete.title,
                        content: message.grupo.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var list = function (escuela, _callback) {
        try {
            connector.post(url.grupo.list, JSON.stringify(escuela), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.grupo.list.title,
                        content: message.grupo.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var get = function (grupo, _callback) {
        try {
            connector.post(url.grupo.get, JSON.stringify(grupo), function (result) {
                if (result.gpoNombre !== undefined) {
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.grupo.get.title,
                        content: message.grupo.get.error
                    });
                }
            });
        } catch (e) {
            console.error(e);
        }

    };


    return {
        add: add,
        update: update,
        remove: remove,
        list: list,
        get: get
    };
}());
