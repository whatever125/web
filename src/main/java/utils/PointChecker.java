package utils;

import static java.lang.Math.abs;
import static java.lang.Math.pow;

public class PointChecker {
    public static boolean isInArea(double x, double y, double r) {
        if (x >= 0 && y <= 0) {
            return pow(x, 2) + pow(y, 2) <= pow(r, 2);
        }
        if (x <= 0 && y >= 0) {
            return abs(x) + abs(y) <= r;
        }
        if (x < 0 && y < 0) {
            return (abs(x) <= r / 2) && (abs(y) <= r);
        }
        return false;
    }
}