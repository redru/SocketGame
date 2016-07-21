/**
 * Created by Admin-AW on 21/07/2016.
 */
'use strict';
function ResponseData(error, message, data) {
    this.error = error ? error : null;
    this.message = message ? message : '';
    this.body = data ? data : null;
}

function sendError(res, status, code, message) {
    res.status(status).json(new ResponseData({ code: code, message: message }));
}

function sendJson(res, status, message, data) {
    res.status(status).json(new ResponseData(null, message, data));
}

module.exports = {
    sendError: sendError,
    sendJson: sendJson
};
