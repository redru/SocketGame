/**
 * Created by Admin-AW on 23/07/2016.
 */
'use strict';
function HallContext() {
    var registerView = $('#registerView');
    var hallView = $('#hallView');
    var chatArea = $('#chatArea');

    $('#logoutButton').click(logout);
    var chatInput = $('#chatInput');
    chatInput.keypress(onSubmitMessage);

    var user = Storager.sessionGetJson('user');

    var socket = io.connect('/');
    socket.emit('authenticate', { hash: user.hash });

    socket.on('message', function(data) {
        chatArea.append('<div class="chat-message"><span class="author ' + (function() { return data.author == "SYSTEM" ? "system" : "public" })() + '">[' + data.author + ']: </span><span class="message">' + data.message + '</span></div>');
    });

    socket.on('user-connected', function(data) {
        chatArea.append('<div class="chat-message"><span class="author ' + (function() { return data.author == "SYSTEM" ? "system" : "public" })() + '">[' + data.author + ']: </span><span class="message">' + data.message + '</span></div>');
        GameServer.getUsersList()
            .then(function(data) {
                $('#usersList').arrayToList(data.body, 'username');
            });
    });

    socket.on('user-disconnected', function() {
        GameServer.getUsersList()
            .then(function(data) {
                $('#usersList').arrayToList(data.body, 'username');
            });
    });

    socket.on('disconnect', function() {
        logout();
    });

    function onSubmitMessage(keyevent) {
        if (keyevent.keyCode == 13) {
            var message = chatInput.val();
            if (message) {
                socket.emit('message', {message: message, author: user.username});
                chatArea.append('<div class="chat-message" style="word-wrap: break-word;"><span class="author mine">[YOU]: </span><span class="message">' + message + '</span></div>');
                chatInput.val('');
            }
        }
    }

    function logout() {
        GameServer.unregister(user.hash)
            .then(Storager.clearAll())
            .then(function() {
                resetView();
                switchView();
            })
            .catch(console.log);
    }

    function resetView() {
        $('#logoutButton').unbind('click');
        $('#chatInput').unbind('keypress');
    }

    function switchView() {
        RegisterContext();
        registerView.fadeIn();
        hallView.fadeOut();
    }
}
