package utils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ErrorManager {
    public static void sendError(HttpServletResponse response, int errorCode, String message) throws IOException {
        response.setStatus(errorCode);
        PrintWriter out = response.getWriter();
        out.println("An error occurred: " + message);
    }
}
