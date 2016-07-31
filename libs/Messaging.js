/**
 * Created by Admin-AW on 26/07/2016.
 */
'use strict';
const http              = require('http');
const UCC               = require('./UsersCentralController');
const io                = require('socket.io');

const Messaging = function() {

};

Messaging.prototype.attachTo = function(server) {
    this.io = io(server, {});
    this.io.on('connection', onConnection);
};

Messaging.prototype.sendMessageAll = function(message, author) {
    const users = UCC.getUsersListFull();
    users.forEach(function(user) {
        if (user.socket && user.username != author)
            user.socket.emit('message', { message: message, author: author});
    });
};

function onConnection(socket) {
    console.log('New user connected requested socket.');

    socket.on('authenticate', function (data) {
        const user = UCC.getUser(data.hash);
        user.socket = socket;
        console.log('User requested to authenticate: ' + user.username + '(' + user.hash + ')');
    });

    socket.on('message', function(data) {
        const users = UCC.getUsersListFull();
        users.forEach(function(user) {
            if (user.socket && user.username != data.author)
                user.socket.emit('message', { message: data.message, author: data.author});
        });
    });
}

module.exports = new Messaging();
