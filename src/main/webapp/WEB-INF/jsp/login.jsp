<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Login</title>

    <%@include file="common_header.jsp"%>
    <link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body>
<jsp:include page="top.jsp"/>
<div id="content" class="center-horizontal-block center-vertical">
</div>

<div class="button-container">
        <c:if test="${not empty SPRING_SECURITY_LAST_EXCEPTION}">
            <input type="hidden" value="${SPRING_SECURITY_LAST_EXCEPTION.message}" id="ss_last_message"/>
        </c:if>
    <script src="js/build/login.js">
    </script>
</div>
</body>
</html>
