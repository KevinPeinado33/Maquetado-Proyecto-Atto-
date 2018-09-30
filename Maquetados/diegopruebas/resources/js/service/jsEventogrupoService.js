function eventogrupoService() {
    var connector = new jsConnector();
    this.addEventogrupo = function (eventogrupo, _callback) {
        try {
            connector.post(url.eventogrupo.add, JSON.stringify(eventogrupo), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.eventogrupo.add.title,
                        content: message.eventogrupo.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.eventogrupo.add.title,
                        content: message.eventogrupo.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    this.updateEventogrupo = function (eventogrupo, _callback) {
        try {
            connector.post(url.eventogrupo.update, eventogrupo, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.eventogrupo.update.title,
                        content: message.eventogrupo.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.eventogrupo.update.title,
                        content: message.eventogrupo.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    this.deleteEventogrupo = function (eventogrupo, _callback) {
        try {
            connector.post(url.eventogrupo.delete, eventogrupo, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.eventogrupo.delete.title,
                        content: message.eventogrupo.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.eventogrupo.delete.title,
                        content: message.eventogrupo.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    this.getInfoEventogrupo = function (evento, _callback) {
        try {
            connector.post(url.eventogrupo.info, JSON.stringify(evento), function (result) {
                _callback(result);
            });
        } catch (e) {
            console.log(e);
        }
    };
}