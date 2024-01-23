package org.whatever125.springbackend.util;

import static java.lang.Math.abs;

public class PointChecker {
    public static boolean isInArea(Double x, Double y, Double r) {
        if (x >= 0 && y <= 0) {
            return x * x + y * y <= r * r;
        }
        if (x <= 0 && y <= 0) {
            return 2 * (abs(x) + abs(y)) <= r;
        }
        if (x >= 0 && y >= 0) {
            return (x <= r) && (y * 2 <= r);
        }
        return false;
    }
}