var iglesiaService = (function () {
    var add = function (iglesia, _callback) {
        try {
            connector.post(url.iglesia.add, JSON.stringify(iglesia), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.iglesia.add.title,
                        content: message.iglesia.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.iglesia.add.title,
                        content: message.iglesia.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var update = function (iglesia, _callback) {
        try {
            connector.post(url.iglesia.update, JSON.stringify(iglesia), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.iglesia.update.title,
                        content: message.iglesia.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.iglesia.update.title,
                        content: message.iglesia.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var remove = function (iglesia, _callback) {
        try {
            connector.post(url.iglesia.delete, JSON.stringify(iglesia), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.iglesia.delete.title,
                        content: message.iglesia.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.iglesia.delete.title,
                        content: message.iglesia.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var list = function (distrito, _callback) {
        try {
            connector.post(url.iglesia.list, JSON.stringify(distrito), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.iglesia.list.title,
                        content: message.iglesia.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var get = function (iglesia, _callback) {
        try {
            connector.post(url.iglesia.get, JSON.stringify(iglesia), function (result) {
                if (result.iglNombre !== undefined) {
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.iglesia.get.title,
                        content: message.iglesia.get.error
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