/* abstract class wrapping method jQuery.ajax
*/
var ajax = {}

/**
 * method executes ajax request using CSRF data from current page's META tag
 */


if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(val) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === val) {
                return i;
            }
        }
        return -1;
    };
}

ajax.exec = function(config)
{
    /* эти методы не защищаются ключом csrf */
    var exceptMethods = ["GET", "TRACE", "HEAD", "OPTIONS"];

    if (exceptMethods.indexOf(config.method) <= -1) {
        var token = $("meta[name='_csrf']").attr("content");
        var header = $("meta[name='_csrf_header']").attr("content");
        var headers = config.headers ? config.headers : {};
        headers[header] = token;
        config.headers = headers;
    }

    return $.ajax(config);
}


/*ajax.exec = function(config)
{
    return $.ajax(config);
}*/

module.exports = ajax;