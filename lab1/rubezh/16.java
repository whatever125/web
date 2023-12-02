import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Test extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse res) {
        System.out.println(req.getAttribute("name"));
    }
}