<%@ page contentType="text/html;charset=UTF-8" %>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>404</title>
        <link rel="icon" type="image/x-icon" href="${pageContext.request.contextPath}/images/favicon.ico"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,400;0,700;1,200;1,400;1,700&amp;display=swap"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/main.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>

    <body>
        <header>
            <h1>404 - Not Found</h1>
        </header>
        <a href="<%=request.getContextPath()%>/index.xhtml" class="center">Вернуться в начало</a>
    </body>
</html>
