var asGrupoService = (function () {
    var add = function (asgrupo, _callback) {
        try {
            connector.post(url.asgrupo.add, JSON.stringify(asgrupo), function (result) {
                if (result !== undefined && result !== null) {
                    _callback(result);
                } else {
                    _callback(result);
                    errorMessage({
                        title: message.asgrupo.add.title,
                        content: message.asgrupo.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    return {add:add};
}());