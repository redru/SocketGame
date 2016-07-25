var Storager = {

    sessionSaveJson: function(key, item) {
        sessionStorage.setItem(key, JSON.stringify(item));
    },

    sessionGetJson: function(key) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch(err) {
            return null;
        }
    },

    sessionSaveItem: function(key, item) {
        sessionStorage.setItem(key, item);
    },

    sessionGetItem: function(key) {
        return sessionStorage.getItem(key);
    },

    localSaveJson: function(key, item) {
        localStorage.setItem(key, JSON.stringify(item));
    },

    localGetJson: function(key) {
        return JSON.parse(localStorage.getItem(key));
    },

    localSaveItem: function(key, item) {
        localStorage.setItem(key, item);
    },

    localGetItem: function(key) {
        return localStorage.getItem(key);
    },

    clearAll: function() {
        sessionStorage.clear();
        localStorage.clear();
    },

    clearLocal: function() {
        localStorage.clear();
    },

    clearSession: function() {
        sessionStorage.clear();
    }

};
