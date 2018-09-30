var asEscuelaService =(function () {
    var add = function (asescuela, _callback) {
        try {
            connector.post(url.asescuela.add, JSON.stringify(asescuela), function (result) {
                if (result !== undefined && result !== null) {
                    _callback(result);
                } else {
                    _callback(result);
                    errorMessage({
                        title: message.asescuela.add.title,
                        content: message.asescuela.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    return {add:add};
}());
