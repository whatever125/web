<%@ page import="ShoppingItem" %>
<%@ page import="ShoppingItemContainer" %>
<jsp:useBean id="content" scope="session" class="ShoppingItemContainer" %>

<html>
    <head>

    </head>
    <body>
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            <% for (item: content.getShoppingItems()) { %>
            <tr>
                <th><% out.println(item.name) %></th>
                <th><% out.println(item.price) %></th>
            </tr>
            <% } %>
        </table>
    </body>
</html>