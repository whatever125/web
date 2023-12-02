<%@ page import="java.util.LinkedList" %>
<!-- Написать JSP страницу, которая выводит количество пользователей,  -->
<!-- которые отправляли запросы, за последние 60 секунд -->

<%! LinkedList<String> id = new LinkedList<>(); %>
<%! LinkedList<Long> time = new LinkedList<>(); %>

<%
    if (!id.contains(session.getId())) {
        id.add(session.getId());
        time.add(System.currentTimeMillis());
    }
%>

<%
    int count = 0;
    for (int i = 0; i < time.size(); i ++)
        if (System.currentTimeMillis() - time.get(i) <= 60 * 1000 )
            count += 1;
%>
<html>
<head>
    <title>
        <%= count %>
    </title>
</head>
<body>
<p>
    Эту страницу посетили <%=  %> раз
</p>
</body>
</html>