<%@ page contentType="application/javascript; charset=UTF-8" language="java" pageEncoding="UTF-8" %>
    function _ (key) {
        var messages = ${messages};
        var result = messages[key];

        if (!result)
            result = key;

        return result;
    }
