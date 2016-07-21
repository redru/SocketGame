/**
 * Created by Admin-AW on 21/07/2016.
 */
'use strict';
const crypto        = require('crypto');

const secret = 'Af4g_4ggsTyrtyT543hhd';

const UCC = function() {
    const users = {};

    function register(username) {
        if (userExists(username)) {
            return null;
        } else {
            const newUser = new User(username);
            users[newUser.hash] = newUser;
            return newUser;
        }
    }

    function unregister(hash) {
        delete users[hash];
    }

    function userExists(username) {
        for (var hash in users) {
            if (username == users[hash].username)
                return true;
        }

        return false;
    }

    function getUser(hash) {
        return users[hash];
    }

    return {
        register: register,
        unregister: unregister,
        getUser: getUser
    }
};

module.exports = new UCC();

function User(username) {
    this.username = username;
    this.hash = crypto.createHmac('sha256', secret)
        .update(username + Date.now())
        .digest('hex');

    this.socket = null;
}
