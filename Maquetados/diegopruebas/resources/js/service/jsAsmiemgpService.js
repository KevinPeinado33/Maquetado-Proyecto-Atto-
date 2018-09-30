var asmiemgpService =(function () {
    var addArray = function(arr,_callback){
        try {
            connector.post(url.asmiemgp.addArray, JSON.stringify(arr), function (result) {
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.asmiemgp.add.title,
                        content: message.asmiemgp.add.success
                    });
                    _callback(result);
                } else {
                    _callback(result);
                    errorMessage({
                        title: message.asmiemgp.add.title,
                        content: message.asmiemgp.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    return {addArray:addArray};
}());