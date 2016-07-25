/**
 * Created by Admin-AW on 23/07/2016.
 */
'use strict';
(function() {
    var registerInput = $('#registerInput');
    var registerView = $('#registerView');
    var hallView = $('#hallView');

    $(document).ready(function() {
        $('#logoutButton').click(onClickLogout);
    });

    function onClickLogout() {
        GameServer.unregister(Storager.sessionGetJson('user').hash)
            .then(Storager.clearAll())
            .then(function() {
                registerView.fadeIn();
                hallView.fadeOut();
            }).catch(console.log);
    }

})();