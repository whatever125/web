package servlets;

import beans.Result;
import beans.ResultsList;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        long startTime = System.currentTimeMillis();

        ServletContext context = getServletContext();

        HttpSession session = request.getSession();
        String id = session.getId();

        Object sessionsObject = context.getAttribute("sessions");
        HashMap<String, ResultsList> sessions;
        if (sessionsObject instanceof HashMap) {
            sessions = (HashMap<String, ResultsList>) sessionsObject;
        } else {
            sessions = new HashMap<>();
            context.setAttribute("sessions", sessions);
        }
        ResultsList sessionResults;
        if (sessions.containsKey(id)) {
            sessionResults = sessions.get(id);
        } else {
            sessionResults = new ResultsList();
            sessions.put(id, sessionResults);
        }

        if (request.getParameter("x") != null && request.getParameter("y") != null && request.getParameter("r") != null) {

            // Retrieve the parameters
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));

            // Perform the check using the model
//            PointChecker checker = new PointChecker();
//            boolean success = checker.checkPoint(x, y, r);
            boolean success = true;

            // Set time
            Date now = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("H:mm:ss");
            String formattedTime = dateFormat.format(now);

            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;

            Result newResult = new Result(x, y, r, success, formattedTime, executionTime);
            sessionResults.add(newResult);

            sessions.put(id, sessionResults);
            context.setAttribute("sessions", sessions);

            // Forward the request to the AreaCheckServlet
//            RequestDispatcher dispatcher = request.getRequestDispatcher("/areaCheckServlet");
//            dispatcher.forward(request, response);
        }

        request.setAttribute("sessionResults", sessionResults);
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}