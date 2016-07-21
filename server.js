/**
 * Created by Admin-AW on 21/07/2016.
 */
'use strict';
const http              = require('http');
const express           = require('express');
const bodyParser        = require('body-parser');

const UCC               = require('./libs/UsersCentralController');
const ResponseHandler   = require('./libs/ResponseHandler');

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());

app.use('/', express.static('./public'));

app.get('/register/:username', function(req, res) {
    const user = UCC.register(req.params.username);

    return user ? ResponseHandler.sendJson(res, 200, 'User correctly registered.', user.hash) :
        ResponseHandler.sendError(res, 500, 1, 'User already registered. Pick another username.');
});

http.createServer(app).listen(80, 'localhost', function() {
    console.log('Server is up...');
});
