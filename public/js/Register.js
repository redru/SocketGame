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
        var user = sessionStorage.getItem('user');

        if (user) {
            unregister(user.hash)
                .then(sessionStorage.clear())
                .then(register(registerInput.val()))
                .then(function() {
                    registerView.fadeOut();
                    hallView.fadeIn();
                })
                .catch(console.log);
        } else {
            register(registerInput.val())
                .then(function() {
                    registerView.fadeOut();
                    hallView.fadeIn();
                })
                .catch(console.log);
        }
    }

    function register(username) {
        return new Promise(function(resolve, reject) {
            $.get('/register/' + username).done(function(response) {
                console.log(response);

                if (response.body) {
                    sessionStorage.setItem('user', response.body);
                    return resolve(response);
                } else {
                    return reject(response.error);
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
                    return resolve(response);
                }
            }).fail(function(response) {
                return reject(response);
            });
        });
    }

    function User(username, hash) {
        this.username = username ? username : '';
        this.hash = hash ? hash : '';
    }

})();
