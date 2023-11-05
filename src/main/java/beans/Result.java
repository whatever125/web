package beans;

import java.io.Serializable;

public class Result implements Serializable {
    private double x;
    private double y;
    private double r;
    private boolean success;
    private String dateTime;
    private long executionTime;

    public Result() {}

    public Result(double x, double y, double r, boolean success, String dateTime, long executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.success = success;
        this.dateTime = dateTime;
        this.executionTime = executionTime;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
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
