<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<meta charset="UTF-8">

<meta name="_csrf" content="${_csrf.token}"/>
<!-- default header name is X-CSRF-TOKEN -->
<meta name="_csrf_header" content="${_csrf.headerName}"/>

<base href="${pageContext.request.contextPath}/">

<script type="application/javascript" src="js/lib/jquery.min.js"></script>
<script type="application/javascript" src="js/lib/jquery-ui.js"></script>

<script type="application/javascript" src="js/lib/jquery.inputmask/min/inputmask/inputmask.min.js"></script>
<script type="application/javascript" src="js/lib/jquery.inputmask/min/inputmask/inputmask.date.extensions.min.js"></script>
<script type="application/javascript" src="js/lib/jquery.inputmask/min/inputmask/jquery.inputmask.min.js"></script>

<script type="application/javascript" src="js/lib/react.js"></script>

<script type="application/javascript" src="messages"></script>

<link rel="stylesheet" type="text/css" href="css/common.css">
<link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="css/jquery-ui.structure.css">
<link rel="stylesheet" type="text/css" href="css/jquery-ui.theme.css">

<!-- This script adds the Roboto font to our project. For more detail go to this site:  http://www.google.com/fonts#UsePlace:use/Collection:Roboto:400,300,500 -->
<!-- TODO discuss with Dima and Dima - may be we must have font resources locally -->
<script>
    var basePath = '${pageContext.request.contextPath}';
    var WebFontConfig = {
        google: { families: [ 'Roboto:400,300,500:latin' ] }
    };
    (function() {
        var wf = document.createElement('script');
        wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'application/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();
</script>