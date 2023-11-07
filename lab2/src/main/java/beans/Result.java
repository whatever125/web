package beans;

import java.io.Serializable;
import java.math.BigDecimal;

public class Result implements Serializable {
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;
    private boolean success;
    private String dateTime;
    private long executionTime;

    public Result() {}

    public Result(BigDecimal x, BigDecimal y, BigDecimal r, boolean success, String dateTime, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.success = success;
        this.dateTime = dateTime;
        this.executionTime = executionTime;
    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public BigDecimal getR() {
        return r;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }

    @Override
    public String toString() {
        return "{" +
                "\"x\":" + x +
                ", \"y\":" + y +
                ", \"r\":" + r +
                ", \"success\":" + success +
                ", \"dateTime\":\"" + dateTime + "\"" +
                ", \"executionTime\":" + executionTime +
                "}";
    }
}
