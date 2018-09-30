var miembrogpService = (function () {
    var add = function (miembrogp, _callback) {
        try {
            connector.post(url.miembrogp.add, JSON.stringify(miembrogp), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.miembrogp.add.title,
                        content: message.miembrogp.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.miembrogp.add.title,
                        content: message.miembrogp.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var update = function (miembrogp, _callback) {
        try {
            connector.post(url.miembrogp.update, miembrogp, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.miembrogp.update.title,
                        content: message.miembrogp.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.miembrogp.update.title,
                        content: message.miembrogp.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var remove = function (miembrogp, _callback) {
        try {
            connector.post(url.miembrogp.delete, JSON.stringify(miembrogp), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.miembrogp.delete.title,
                        content: message.miembrogp.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.miembrogp.delete.title,
                        content: message.miembrogp.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var list = function (grupo, _callback) {
        try {
            connector.post(url.miembrogp.list, JSON.stringify(grupo), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    _callback(result);
                    infoMessage({
                        title: message.miembrogp.list.title,
                        content: message.miembrogp.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var listPersona = function (persona, _callback) {
        try {
            connector.post(url.miembrogp.listPersona, JSON.stringify(persona), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    _callback(result);
                    infoMessage({
                        title: message.miembrogp.list.title,
                        content: message.miembrogp.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var listEscuela = function (escuela, _callback) {
        try {
            connector.post(url.miembrogp.listEscuela, JSON.stringify(escuela), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    _callback(result);
                    infoMessage({
                        title: message.miembrogp.list.title,
                        content: message.miembrogp.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var listIglesia = function (iglesia, _callback) {
        try {
            connector.post(url.miembrogp.listIglesia, JSON.stringify(iglesia), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    _callback(result);
                    infoMessage({
                        title: message.miembrogp.list.title,
                        content: message.miembrogp.list.empty
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
        list: list,
        listPersona:listPersona,
        listEscuela:listEscuela,
        listIglesia:listIglesia
    };
}());