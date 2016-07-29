/**
 * Created by Admin-AW on 21/07/2016.
 */
'use strict';
const http              = require('http');
const express           = require('express');
const bodyParser        = require('body-parser');
const cors              = require('cors');

const UCC               = require('./libs/UsersCentralController');
const ResponseHandler   = require('./libs/ResponseHandler');
const Messaging         = require('./libs/Messaging');

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.json());

app.use('/', express.static('./public'));

app.post('/register/:username', function(req, res) {
    console.log('Requested register for: ' + req.params.username);
    const user = UCC.register(req.params.username);

    return user ? ResponseHandler.sendJson(res, 200, 'User correctly registered.', user) :
        ResponseHandler.sendError(res, 400, 1, 'User already registered. Pick another username.');
});

app.post('/unregister/:hash', function(req, res) {
    console.log('Requested unregister for: ' + req.params.hash);
    const user = UCC.unregister(req.params.hash);

    return user ? ResponseHandler.sendJson(res, 200, 'User correctly unregistered.', user.username) :
        ResponseHandler.sendError(res, 400, 1, 'User was not registered.');
});

app.get('/users/active', function(req, res) {
    return ResponseHandler.sendJson(res, 200, '', UCC.getUsersList());
});

const server = http.createServer(app).listen(80, 'localhost', function() {
    console.log('Server is up...');
});

Messaging.attach(server);
