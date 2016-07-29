/**
 * Created by Admin-AW on 23/07/2016.
 */
'use strict';
function HallContext() {
    var registerView = $('#registerView');
    var hallView = $('#hallView');

    $('#logoutButton').click(onClickLogout);

    var socket = io.connect('/');
    socket.on('news', function (data) {
        console.log(data);
        //socket.emit('my other event', { my: 'data' });
    });

    function onClickLogout() {
        GameServer.unregister(Storager.sessionGetJson('user').hash)
            .then(Storager.clearAll())
            .then(function() {
                resetView();
                switchView();
            })
            .catch(console.log);
    }

    function resetView() {
        $('#logoutButton').unbind('click');
    }

    function switchView() {
        RegisterContext();
        registerView.fadeIn();
        hallView.fadeOut();
    }
}
