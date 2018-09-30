var campoService = (function () {
    var get = function (campo, _callback) {
        try {
            connector.post(url.campo.get, JSON.stringify(campo), function (result) {
                console.log(result);
                if (result!== undefined && result!==null) {
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.campo.list.title,
                        content: message.campo.list.empty
                    });
                }
            });
        } catch (e) {
            console.error(e);
        }

    };
    return {
        get:get
    };
}());