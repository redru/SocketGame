/**
 * Created by Admin-AW on 22/07/2016.
 */
'use strict';
(function() {
    var registerInput = $('#registerInput');
    var registerView = $('#registerView');
    var hallView = $('#hallView');

    $(document).ready(function() {
        $('#registerButton').click(onClickRegister);
    });

    function onClickRegister() {
        var user = Storager.sessionGetJson('user');

        if (user) {
            GameServer.unregister(user.hash)
                .then(Storager.clearAll)
                .then(function() {
                    return GameServer.register(registerInput.val());
                })
                .then(GameServer.getUsersList)
                .then(function(data) {
                    var html = '';
                    data.body.forEach(function(obj) {
                        html = html + '<li>' + obj.username + '</li>';
                    });

                    $('#usersList').html(html);
                })
                .then(switchView)
                .catch(console.log);
        } else {
            GameServer.register(registerInput.val())
                .then(GameServer.getUsersList)
                .then(function(data) {
                    var html = '';
                    data.body.forEach(function(obj) {
                        html = html + '<li>' + obj.username + '</li>';
                    });

                    $('#usersList').html(html);
                })
                .then(switchView)
                .catch(console.log);
        }
    }

    function resetView() {
        registerInput.val('');
    }

    function switchView() {
        registerView.fadeOut();
        hallView.fadeIn();
        resetView();
    }

})();
