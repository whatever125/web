<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<table id="resultsTable">
    <thead>
        <tr>
            <th>X</th>
            <th>Y</th>
            <th>R</th>
            <th>Результат</th>
            <th>Текущее время</th>
            <th>Время работы</th>
        </tr>
    </thead>
    <tbody>
        <jsp:useBean id="sessionResults" scope="request" type="beans.ResultsList"/>
        <c:forEach var="result" items="${sessionResults.results}">
            <tr>
                <td><c:out value="${result.x}"/></td>
                <td><c:out value="${result.y}"/></td>
                <td><c:out value="${result.r}"/></td>
                <td class=<c:out value="${result.success ? 'td-success' : 'td-fail'}"/>>
                    <c:out value="${result.success ? 'Попадание' : 'Промах'}"/></td>
                <td><c:out value="${result.dateTime}"/></td>
                <td><c:out value="${result.executionTime} ms"/></td>
            </tr>
        </c:forEach>
    </tbody>
</table>