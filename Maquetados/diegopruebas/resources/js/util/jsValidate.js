var validate = (function () {
    var incomplete = function (content) {
        var response = true;
        for (var i = 0; i < content.length; i++) {
            (content[i] === null || content[i] === undefined || content[i] === "") ? response = false : response;
        }
        return response;
    };

    return {
        incomplete: incomplete
    };
}());