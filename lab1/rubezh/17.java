import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class Test extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse res) {
        Object name = req.getAttribute("name");
        PrintWriter writer = res.getWriter();
        if (name != null) {
            writer.println(name);
        }
    }
}