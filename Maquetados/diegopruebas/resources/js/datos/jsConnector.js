/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var connector = (function () {
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    var csrfToken = $("meta[name='_csrf']").attr("content");

    var get = function (url, data, _callback) {
        connect('GET', url, data, _callback);
    };
    var post = function (url, data, _callback) {
        connect('POST', url, data, _callback);
    };
    var upload = function (type, url, formData, _callback) {
        $.ajax({
            type: type,
            enctype: 'multipart/form-data',
            url: crm_context_path + url,
            data: formData,
            processData: false, // prevent jQuery from automatically
            // transforming the data into a query string
            contentType: false,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader(csrfHeader, csrfToken);
            },
            success: function (result) {
                try {
                    _callback(result);
                } catch (e) {
                    console.log(e);
                }
            },
            error: function (e) {
                errorMessage({
                    title: message.connector.fileUploader.title,
                    content: message.connector.fileUploader.error
                });
                console.log(message.connector.fileUploader.title, message.connector.fileUploader.error);
            }
        });

    };
    var connect = function (type, url, data, _callback) {

        $.ajax({
            url: crm_context_path + url,
            type: type,
            contentType: 'application/json',
            data: data,
            dataType: 'json',
            timeout: 8000,
            beforeSend: function (xhr) {
                xhr.setRequestHeader(csrfHeader, csrfToken);
            },
            success: function (result) {
                try {
                    _callback(result);
                } catch (e) {
                    console.log(e);
                }
            },
            error: function () {
                errorMessage({
                    title: message.connector.title,
                    content: message.connector.error
                });
                console.log(message.connector.title, message.connector.error);
            }
        });
    };
    return {
        get: get,
        post: post,
        upload: upload
    };
}());



