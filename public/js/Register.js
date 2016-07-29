/**
 * Created by Admin-AW on 22/07/2016.
 */
'use strict';
function RegisterContext() {
    var registerInput = $('#registerInput');
    var registerView = $('#registerView');
    var hallView = $('#hallView');

    $('#registerButton').click(onClickRegister);

    function onClickRegister() {
        var user = Storager.sessionGetJson('user');

        if (user) {
            GameServer.unregister(user.hash)
                .then(Storager.clearAll)
                .then(function() {
                    return GameServer.register(registerInput.val());
                })
                .then(function(data) {
                    return data.body;
                })
                .then(GameServer.getUsersList)
                .then(function(data) {
                    $('#usersList').arrayToList(data.body, 'username');
                })
                .then(switchView)
                .then(resetView)
                .catch(console.log);
        } else {
            GameServer.register(registerInput.val())
                .then(function(data) {
                    return data.body;
                })
                .then(GameServer.getUsersList)
                .then(function(data) {
                    $('#usersList').arrayToList(data.body, 'username');
                })
                .then(switchView)
                .then(resetView)
                .catch(console.log);
        }
    }

    function resetView() {
        registerInput.val('');
        $('#registerButton').unbind('click');
    }

    function switchView() {
        HallContext();
        registerView.fadeOut();
        hallView.fadeIn();
    }
}
