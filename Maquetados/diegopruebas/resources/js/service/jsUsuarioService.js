var usuarioService = (function () {
    var addUsuario = function (usuario, _callback) {
        try {
            connector.post(url.usuario.add, usuario, function (result) {
                //Aqui va la validación de la respuesta del servidor
                if (result !== undefined && result !== null) {
                    successMessage({
                        title: message.usuario.add.title,
                        content: message.usuario.add.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.usuario.add.title,
                        content: message.usuario.add.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };
    var updateUsuario = function (usuario, _callback) {
        try {
            connector.post(url.usuario.update, usuario, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.usuario.update.title,
                        content: message.usuario.update.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.usuario.update.title,
                        content: message.usuario.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    };

    var deleteUsuario = function (usuario, _callback) {
        try {
            connector.post(url.usuario.delete, usuario, function (result) {
                if (result !== undefined && result !== null && result === 1) {
                    successMessage({
                        title: message.usuario.delete.title,
                        content: message.usuario.delete.success
                    });
                    _callback(result);
                } else {
                    errorMessage({
                        title: message.usuario.delete.title,
                        content: message.usuario.delete.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    var listUsuario = function (_callback) {
        try {
            connector.post(url.usuario.list, JSON.stringify({id: 1}), function (result) {
                if (result !== undefined && result !== null && result.length > 0) {
                    _callback(result);
                } else {
                    infoMessage({
                        title: message.usuario.list.title,
                        content: message.usuario.list.empty
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var updateGrupoTree = function (usuario, _callback) {
        try {
            connector.post(url.usuario.updateTree, JSON.stringify(usuario), function (result) {
                if (result !== undefined && result !== null) {
                    _callback(result);
                    successMessage({
                        title: message.usuario.update.title,
                        content: message.usuario.update.success
                    });
                } else {
                    infoMessage({
                        title: message.usuario.update.title,
                        content: message.usuario.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    var updateUsuarioClave = function (usuario, _callback) {
        try {
            connector.post(url.usuario.updateClave, JSON.stringify(usuario), function (result) {
                if (result !== undefined && result !== null) {
                    if (result === 0) {
                        errorMessage({
                        title: message.usuario.update.title,
                        content: message.usuario.update.clave
                    });
                    } else {
                        _callback(result);
                        successMessage({
                            title: message.usuario.update.title,
                            content: message.usuario.update.success
                        });
                    }
                } else {
                    infoMessage({
                        title: message.usuario.update.title,
                        content: message.usuario.update.error
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }
    };
    return {
        updateGrupoTree: updateGrupoTree,
        updateUsuarioClave:updateUsuarioClave
    };
}());
