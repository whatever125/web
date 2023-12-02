import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;

public class Test implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) {
        if (((HttpServletRequest) servletRequest).getHeader("X-Application-User") == null) {
            PrintWriter writer = servletResponse.getWriter();
            writer.println("not auth");
            return;
        }
        chain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {

    }
}