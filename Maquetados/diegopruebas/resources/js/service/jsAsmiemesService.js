asmiemesService=(function () {
    var addArray = function(arr,_callback){
        try {
            connector.post(url.asmiemes.addArray, JSON.stringify(arr), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.asmiemes.add.title,
                        content: message.asmiemes.add.success
                    });
                    _callback(result);
                } else {
                    _callback(result);
                    errorMessage({
                        title: message.asmiemes.add.title,
                        content: message.asmiemes.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    return {addArray:addArray};
}());
