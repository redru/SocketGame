/**
 * Created by Admin-AW on 25/07/2016.
 */
(function ( $ ) {

    $.fn.arrayToList = function(array, key) {
        var html = '';

        array.forEach(function(obj) {
            html = html + '<li>' + obj[key] + '</li>';
        });

        this.html(html);
    };

}( jQuery ));
