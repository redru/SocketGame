/**
 * Created by Admin-AW on 22/07/2016.
 */
'use strict';
(function() {
    $(document).ready(function() {
        $('#registerButton').click(onClickRegister);
    });
})();

function onClickRegister() {
    $.get('/register/' + $('#registerInput').val()).done(function(response) {
        console.log(response);
    });
}
