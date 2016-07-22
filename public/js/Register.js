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
        var key = sessionStorage.getItem('key');

        if (key) {
            unregister(key)
                .then(sessionStorage.clear())
                .then(register(registerInput.val()))
                .catch(console.log);
        } else {
            register(registerInput.val()).catch(console.log);
        }
    }

    function register(username) {
        return new Promise(function(resolve, reject) {
            $.get('/register/' + username).done(function(response) {
                console.log(response);

                if (response.body) {
                    sessionStorage.setItem('key', response.body);
                    registerView.fadeOut();
                    hallView.fadeIn();
                    return resolve(response);
                }
            }).fail(function(response) {
                return reject(response);
            });
        });
    }

    function unregister(key) {
        return new Promise(function(resolve, reject) {
            $.get('/unregister/' + key).done(function(response) {
                console.log(response);

                if (response.body) {
                    sessionStorage.setItem('key', response.body);
                    registerView.fadeOut();
                    hallView.fadeIn();
                    return resolve(response);
                }
            }).fail(function(response) {
                return reject(response);
            });
        });
    }

})();
