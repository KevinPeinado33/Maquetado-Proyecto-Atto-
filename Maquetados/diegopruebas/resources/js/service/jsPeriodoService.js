var periodoService = (function () {
    var addPeriodo = function (periodo, _callback) {
        try {
            connector.post(url.periodo.add, JSON.stringify(periodo), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.periodo.add.title,
                        content: message.periodo.add.success
                    });
                    _callback(result);
                } else {
                    _callback(result);
                    errorMessage({
                        title: message.periodo.add.title,
                        content: message.periodo.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var updatePeriodo = function (periodo, _callback) {
        try {
            connector.post(url.periodo.update, JSON.stringify(periodo), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.periodo.update.title,
                        content: message.periodo.update.success
                    });
                    _callback(result);
                } else {
                    _callback(result);
                    errorMessage({
                        title: message.periodo.update.title,
                        content: message.periodo.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var deletePeriodo = function (periodo, _callback) {
        try {
            connector.post(url.periodo.delete, JSON.stringify(periodo), function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.periodo.delete.title,
                        content: message.periodo.delete.success
                    });
                    _callback(result);
                } else {
                    _callback(result);
                    errorMessage({
                        title: message.periodo.delete.title,
                        content: message.periodo.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var listPeriodo = function (periodo,_callback) {
        try {
            connector.post(url.periodo.list, JSON.stringify(periodo), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    _callback(result);
                    infoMessage({
                        title: message.periodo.list.title,
                        content: message.periodo.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var get = function (periodo,_callback) {
        try {
            connector.post(url.periodo.get, JSON.stringify(periodo), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    _callback(result);
                    infoMessage({
                        title: message.periodo.list.title,
                        content: message.periodo.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    
    return {
        add:addPeriodo,
        update:updatePeriodo,
        remove:deletePeriodo,
        list:listPeriodo,
        get:get
    };
}());
