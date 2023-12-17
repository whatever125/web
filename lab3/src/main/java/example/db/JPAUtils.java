package example.db;

import example.entity.ResultEntity;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import lombok.Getter;

import static org.hibernate.cfg.JdbcSettings.*;

public class JPAUtils {
    @Getter
    private static final SessionFactory factory;

    static {
        try {
            factory = new Configuration()
                    .addAnnotatedClass(ResultEntity.class)
                    .setProperty(URL, "jdbc:postgresql://localhost:5432/studs")
                    .setProperty(USER, "")
                    .setProperty(PASS, "")
                    .setProperty(DRIVER, "org.postgresql.Driver")
                    .buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Something went wrong when initializing Hibernate: " + ex);
            throw new ExceptionInInitializerError();
        }
    }
}
