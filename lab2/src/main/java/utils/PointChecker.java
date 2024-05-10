package utils;

import java.math.BigDecimal;

import static java.lang.Math.abs;
import static java.lang.Math.pow;

public class PointChecker {
    public static boolean isInArea(BigDecimal x, BigDecimal y, BigDecimal r) {
        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return x.pow(2).add(y.pow(2)).compareTo(r.pow(2)) <= 0;
        }
        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return x.abs().add(y.abs()).compareTo(r) <= 0;
        }
        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return (x.abs().compareTo(r) <= 0) && (y.abs().multiply(BigDecimal.valueOf(2)).compareTo(r) <= 0);
        }
        return false;
    }
}