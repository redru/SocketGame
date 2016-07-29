/**
 * Created by Admin-AW on 22/07/2016.
 */
'use strict';
var GameServer = {

    register: function(username) {
        return new Promise(function(resolve, reject) {
            $.post('/register/' + username).done(function(response) {
                console.log(response);

                if (response.body) {
                    Storager.sessionSaveJson('user', response.body);
                    return resolve(response.body);
                } else {
                    return reject(response.error);
                }
            }).fail(function(response) {
                return reject(response);
            });
        });
    },

    unregister: function(key) {
        return new Promise(function(resolve, reject) {
            $.post('/unregister/' + key).done(function(response) {
                console.log(response);

                if (response.body) {
                    return resolve(response.body);
                } else {
                    return reject(response.error);
                }
            }).fail(function(response) {
                if (response.responseJSON && response.responseJSON.error) {
                    return resolve(null);
                } else {
                    return reject(response);
                }
            });
        });
    },

    getUsersList: function() {
        return new Promise(function(resolve, reject) {
            $.get('/users/active').done(function(response) {
                console.log(response);

                if (response.body) {
                    return resolve(response);
                } else {
                    return reject(response.error);
                }
            }).fail(function(response) {
                if (response.responseJSON && response.responseJSON.error) {
                    return resolve(null);
                } else {
                    return reject(response);
                }
            });
        });
    }

};

function User(username, hash) {
    this.username = username ? username : '';
    this.hash = hash ? hash : '';
}
