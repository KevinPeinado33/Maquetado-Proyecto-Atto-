var rolService = (function () {
    var add = function (rol, _callback) {
        try {
            connector.post(url.rol.add, rol, function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.rol.add.title,
                        content: message.rol.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.rol.add.title,
                        content: message.rol.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var update = function (rol, _callback) {
        try {
            connector.post(url.rol.update, rol, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.rol.update.title,
                        content: message.rol.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.rol.update.title,
                        content: message.rol.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var remove = function (rol, _callback) {
        try {
            connector.post(url.rol.delete, rol, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.rol.delete.title,
                        content: message.rol.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.rol.delete.title,
                        content: message.rol.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var list = function (_callback) {
        try {
            connector.post(url.rol.list, JSON.stringify({id: 1}), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.rol.list.title,
                        content: message.rol.list.empty
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