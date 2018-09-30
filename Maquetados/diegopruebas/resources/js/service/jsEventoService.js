var eventoService = (function () {
    var addEvento = function (evento, _callback) {
        try {
            connector.post(url.evento.add, JSON.stringify(evento), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.evento.add.title,
                        content: message.evento.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.evento.add.title,
                        content: message.evento.add.error
                    });
                }

            });
        } catch (e) {
            console.log(e);
        }
    };

    var updateEvento = function (evento, _callback) {
        try {
            connector.post(url.evento.update, JSON.stringify(evento), function (result) {
                if (result !== undefined && result !== null && result !== 0) {
                    successMessage({
                        title: message.evento.update.title,
                        content: message.evento.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.evento.update.title,
                        content: message.evento.update.error
                    });
                }

            });
        } catch (e) {
            console.log(e);
        }
    };

    var deleteEvento = function (evento, _callback) {
        try {
            connector.post(url.evento.delete, JSON.stringify(evento), function (result) {
                if (result !== undefined && result !== null && result !== 0) {
                    successMessage({
                        title: message.evento.delete.title,
                        content: message.evento.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.evento.delete.title,
                        content: message.evento.delete.error
                    });
                }

            });
        } catch (e) {
            console.log(e);
        }
    };

    var listEvento = function (periodo, _callback) {
        try {
            connector.post(url.evento.list, JSON.stringify(periodo), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    _callback(result);
                    infoMessage({
                        title: message.evento.list.title,
                        content: message.evento.list.empty
                    });
                }

            });
        } catch (e) {
            console.log(e);
        }
    };

    var listEventoActGroup = function (grupo, _callback) {
        try {
            connector.post(url.evento.evtActGr, JSON.stringify(grupo), function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.evento.list.title,
                        content: message.evento.list.empty
                    });
                }

            });
        } catch (e) {
            console.log(e);
        }
    };

    var getEventoAct = function (evento, _callback) {
        try {
            connector.post(url.evento.active, JSON.stringify(evento), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    console.log("bla bla");
                    //no eventos activos
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var get = function (evento, _callback) {
        try {
            connector.post(url.evento.get, JSON.stringify(evento), function (result) {
                if (result !== undefined && result !== null) {
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.evento.get.title,
                        content: message.evento.get.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var checkAsistenciaGrupo = function (asgrupo, _callback) {
        try {
            connector.post(url.evento.checkGrupo, JSON.stringify(asgrupo), function (result) {
                if (result !== undefined && result !== null) {
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.evento.get.title,
                        content: message.evento.get.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var checkAsistenciaEscuela = function (asescuela, _callback) {
        try {
            connector.post(url.evento.checkEscuela, JSON.stringify(asescuela), function (result) {
                if (result !== undefined && result !== null) {
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.evento.get.title,
                        content: message.evento.get.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    return {
        add: addEvento,
        update: updateEvento,
        remove: deleteEvento,
        get: get,
        list: listEvento,
        checkAsistenciaEscuela: checkAsistenciaEscuela,
        checkAsistenciaGrupo: checkAsistenciaGrupo
    };
}());

