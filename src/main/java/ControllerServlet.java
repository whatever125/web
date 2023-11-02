import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        if (request.getParameter("x") != null && request.getParameter("y") != null && request.getParameter("r") != null) {
            long startTime = System.currentTimeMillis();

            // Retrieve the parameters
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));

            // Perform the check using the model
            PointChecker checker = new PointChecker();
            boolean success = checker.checkPoint(x, y, r);

            // Set the result in the request attribute
            request.setAttribute("success", success);

            // Set time
            Date now = new Date();
            SimpleDateFormat dateFormat = new SimpleDateFormat("H:mm:ss");
            String formattedTime = dateFormat.format(now);
            request.setAttribute("datetime", formattedTime);

            long endTime = System.currentTimeMillis();
            long executionTime = endTime - startTime;
            request.setAttribute("execution_time", formattedTime);

            // Forward the request to the AreaCheckServlet
            RequestDispatcher dispatcher = request.getRequestDispatcher("/areaCheckServlet");
            dispatcher.forward(request, response);
        } else {
            // Forward the request to the JSP page for input
            RequestDispatcher dispatcher = request.getRequestDispatcher("/inputForm.jsp");
            dispatcher.forward(request, response);
        }
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}