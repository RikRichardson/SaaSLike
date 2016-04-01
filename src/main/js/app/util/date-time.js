function _num2Digits (num) {
    var prefix = '';

    if (num < 10) {
        prefix = '0';
    }

    return prefix + num;
}

/// TODO наверняка можно угнать готовый велосипед
function formatDateTime (date) {
    // yyyy-MM-dd HH:mm:ss
    var res = [];
    res.push(date.getFullYear());
    res.push('-');
    res.push(_num2Digits(date.getMonth() + 1));
    res.push('-');
    res.push(_num2Digits(date.getDate()));
    res.push(' ');
    res.push(_num2Digits(date.getHours()));
    res.push(':');
    res.push(_num2Digits(date.getMinutes()));
    res.push(':');
    res.push(_num2Digits(date.getSeconds()));

    return res.join('');
}

function formatTime (date) {
    // HH:mm:ss
    var res = [];
    res.push(_num2Digits(date.getHours()));
    res.push(':');
    res.push(_num2Digits(date.getMinutes()));
    res.push(':');
    res.push(_num2Digits(date.getSeconds()));

    return res.join('');
}

function parseTime (value) {
    var res = [];

    // убираем разделители
    value = value.replace(/\D/g, '');

    if (value.length > 1) {
        res.push(value.substr(0, 2));
    }

    if (value.length > 3) {
        res.push(value.substr(2, 2));
    }

    if (value.length > 5) {
        res.push(value.substr(4, 2));
    }

    return res;
}

/** в переданную дату вписывает переданное время.
 * @returns Date переданную дату с временем из переданного параметра timeStr */
function setTime (date, timeStr) {
    var result = new Date(date);
    var timeFields = parseTime(timeStr);
    var h = 0, m = 0, s = 0;

    if (timeFields.length > 0) {
        h = timeFields[0];
    }

    if (timeFields.length > 1) {
        m = timeFields[1];
    }

    if (timeFields.length > 2) {
        s = timeFields[2];
    }

    result.setHours(h, m, s);

    return result;
}

exports.default = {formatDateTime, formatTime, setTime};
module.exports = exports['default'];

