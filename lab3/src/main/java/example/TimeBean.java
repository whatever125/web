package example;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;

import java.time.ZonedDateTime;

@Named
@ApplicationScoped
public class TimeBean {
    public ZonedDateTime getNowTime() {
        return ZonedDateTime.now();
    }
}
