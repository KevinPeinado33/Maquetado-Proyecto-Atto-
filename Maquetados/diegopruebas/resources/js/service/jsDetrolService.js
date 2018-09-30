var detrolService = (function () {
    var add = function (detrol, _callback) {
        try {
            connector.post("/detrol/add", JSON.stringify(detrol), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.detrol.add.title,
                        content: message.detrol.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.detrol.add.title,
                        content: message.detrol.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var update = function (detrol, _callback) {
        try {
            connector.post(url.detrol.update, detrol, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.detrol.update.title,
                        content: message.detrol.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.detrol.update.title,
                        content: message.detrol.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var remove = function (detrol, _callback) {
        try {
            connector.post(url.detrol.delete, JSON.stringify(detrol), function (result) {
                if (result) {
                    successMessage({
                        title: message.detrol.remove.title,
                        content: message.detrol.remove.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.detrol.remove.title,
                        content: message.detrol.remove.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var list = function (_callback) {
        try {
            connector.post(url.detrol.list, JSON.stringify({id: 1}), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.detrol.list.title,
                        content: message.detrol.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var getLeaders = function (options, _callback) {
        try {
            connector.post("/detrol/getLeaders", JSON.stringify(options), function (result) {
                _callback(result);
            });
        } catch (e) {
            console.error(e);
        }

    };

    return {
        add: add,
        update: update,
        list: list,
        remove: remove,
        getLeaders: getLeaders
    };

}());