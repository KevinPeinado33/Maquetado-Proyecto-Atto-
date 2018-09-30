var personaService = (function () {
    var add = function (persona, _callback) {
        try {
            connector.post(url.persona.add, JSON.stringify(persona), function (result) {
                if (result !== undefined && result !== null) {
                    if( result!==0){
                        successMessage({
                        title: message.persona.add.title,
                        content: message.persona.add.success
                    });
                    _callback(result);
                    }else{
                        errorMessage({
                        title: message.persona.add.title,
                        content: message.persona.add.exist
                    });
                    }
                    
                } else {
                    errorMessage({
                        title: message.persona.add.title,
                        content: message.persona.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var update = function (persona, _callback) {
        try {
            connector.post(url.persona.update, JSON.stringify(persona), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.persona.update.title,
                        content: message.persona.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.persona.update.title,
                        content: message.persona.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var remove = function (persona, _callback) {
        try {
            connector.post(url.persona.delete, JSON.stringify(persona), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.persona.delete.title,
                        content: message.persona.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.persona.delete.title,
                        content: message.persona.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var get = function (persona,_callback) {
        try {
            connector.post(url.persona.get, JSON.stringify(persona), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.persona.get.title,
                        content: message.persona.get.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var list = function () {};
    var search = function (searchObject, _callback) {
        try {
            connector.post(url.persona.search, JSON.stringify(searchObject), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.persona.search.title,
                        content: message.persona.search.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    
    var updateFoto = function (persona, _callback) {
        try {
            connector.post(url.persona.updateFoto, JSON.stringify(persona), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.persona.update.title,
                        content: message.persona.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.persona.update.title,
                        content: message.persona.update.error
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
        get: get,
        search: search,
        updateFoto:updateFoto
    };
}());
