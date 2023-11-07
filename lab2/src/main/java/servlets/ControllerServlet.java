package servlets;

import utils.ErrorManager;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            if (request.getParameter("x") != null && request.getParameter("y") != null && request.getParameter("r") != null) {
                request.getRequestDispatcher("/check").forward(request, response);
            } else {
                request.getRequestDispatcher("/index.jsp").forward(request, response);
            }
        } catch (ServletException | IOException e) {
            ErrorManager.sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error");
            e.printStackTrace();
        }
    }
}