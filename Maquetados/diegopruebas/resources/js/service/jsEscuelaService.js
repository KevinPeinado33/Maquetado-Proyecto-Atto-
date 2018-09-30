var escuelaService = (function () {
    var add = function (escuela, _callback) {
        try {
            connector.post(url.escuela.add, JSON.stringify(escuela), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.escuela.add.title,
                        content: message.escuela.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.escuela.add.title,
                        content: message.escuela.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var update = function (escuela, _callback) {
        try {
            connector.post(url.escuela.update, JSON.stringify(escuela), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.escuela.update.title,
                        content: message.escuela.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.escuela.update.title,
                        content: message.escuela.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var remove = function (escuela, _callback) {
        try {
            connector.post(url.escuela.delete, JSON.stringify(escuela), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.escuela.delete.title,
                        content: message.escuela.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.escuela.delete.title,
                        content: message.escuela.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var list = function (iglesia, _callback) {
        try {
            connector.post(url.escuela.list, JSON.stringify(iglesia), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.escuela.list.title,
                        content: message.escuela.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var get = function (escuela, _callback) {
        try {
            connector.post(url.escuela.get, JSON.stringify(escuela), function (result) {
                if (result.escNombre !== undefined) {
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.escuela.get.title,
                        content: message.escuela.get.error
                    });
                }
            });
        } catch (e) {
            console.error(e);
        }

    };
    var search = function () {};
    return {
        add: add,
        update: update,
        remove: remove,
        list: list,
        get: get,
        search: search
    };
}());
