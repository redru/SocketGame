/**
 * Created by Admin-AW on 26/07/2016.
 */
'use strict';
const http              = require('http');
const UCC               = require('./UsersCentralController');
const io                = require('socket.io');

const Messaging = function() {

};

Messaging.prototype.attach = function(server) {
    this.io = io(server, {});
    this.io.on('connection', onConnection);
};

function onConnection(socket) {
    console.log('onconnect');
}

module.exports = new Messaging();
