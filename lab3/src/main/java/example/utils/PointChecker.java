package example.utils;


import static java.lang.Math.abs;

public class PointChecker {
    public static boolean isInArea(Double x, Double y, Double r) {
        if (x >= 0 && y >= 0) {
            return x * x + y * y <= r * r;
        }
        if (x <= 0 && y <= 0) {
            return abs(x) + abs(y) <= r;
        }
        if (x >= 0 && y <= 0) {
            return (abs(x) <= r) && (abs(y) * 2 <= r);
        }
        return false;
    }
}