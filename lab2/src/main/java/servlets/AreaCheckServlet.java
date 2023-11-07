package servlets;

import beans.Result;
import beans.ResultsList;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.TimeZone;

import utils.ErrorManager;
import utils.InputValidator;
import utils.PointChecker;

@WebServlet("/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            ServletContext context = getServletContext();
            HttpSession session = request.getSession();
            String id = session.getId();

            // get all sessions
            Object sessionsObject = context.getAttribute("sessions");
            HashMap<String, ResultsList> sessions;
            if (sessionsObject instanceof HashMap) {
                sessions = (HashMap<String, ResultsList>) sessionsObject;
            } else {
                sessions = new HashMap<>();
                context.setAttribute("sessions", sessions);
            }
            // get current session results
            ResultsList sessionResults;
            if (sessions.containsKey(id)) {
                sessionResults = sessions.get(id);
            } else {
                sessionResults = new ResultsList();
                sessions.put(id, sessionResults);
            }

            // start time
            long startTime = System.currentTimeMillis();

            // Retrieve the parameters
            BigDecimal x = new BigDecimal(request.getParameter("x").trim().replace(",", "."));
            BigDecimal y = new BigDecimal(request.getParameter("y").trim().replace(",", "."));
            BigDecimal r = new BigDecimal(request.getParameter("r").trim().replace(",", "."));

            System.out.println(x);
            System.out.println(y);
            System.out.println(r);
            // Validate input data
            InputValidator validator = new InputValidator(x, y, r);
            if (!validator.isValid()) {
                ErrorManager.sendError(response, HttpServletResponse.SC_BAD_REQUEST, "Validation not passed");
                return;
            }

            // Perform the check
            boolean success = PointChecker.isInArea(x, y, r);

            // Set time
            Date now = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("H:mm:ss");
            if (request.getParameter("tz") != null) {
                String timeZoneId = request.getParameter("tz");
                TimeZone timeZone = TimeZone.getTimeZone(timeZoneId);
                dateFormat.setTimeZone(timeZone);
            }
            String formattedTime = dateFormat.format(now);

            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;

            Result newResult = new Result(x, y, r, success, formattedTime, executionTime);

            // store results
            sessionResults.add(newResult);
            sessions.put(id, sessionResults);
            context.setAttribute("sessions", sessions);

            // forming response
            response.setContentType("application/json");
            PrintWriter writer = response.getWriter();

            response.setStatus(200);
            writer.append(newResult.toString());
            writer.flush();
            writer.close();

        } catch (NumberFormatException e) {
            ErrorManager.sendError(response, HttpServletResponse.SC_BAD_REQUEST, "Wrong number format");
        } catch (IOException e) {
            ErrorManager.sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error");
            e.printStackTrace();
        }
    }
}
