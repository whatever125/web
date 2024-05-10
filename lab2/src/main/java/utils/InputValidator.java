package utils;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

public class InputValidator {
    private final BigDecimal x;
    private final BigDecimal y;
    private final BigDecimal r;

    public InputValidator(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean isValid() {
        return checkX() && checkY() && checkR();
    }

    private boolean checkX() {
        List<BigDecimal> validXValues = Arrays.asList(
                new BigDecimal("-2.0"), new BigDecimal("-1.5"), new BigDecimal("-1.0"),
                new BigDecimal("-0.5"), new BigDecimal("0.0"), new BigDecimal("0.5"),
                new BigDecimal("1.0"), new BigDecimal("1.5"), new BigDecimal("2.0")
        );
        for (BigDecimal validX : validXValues) {
            if (validX.compareTo(this.x) == 0) {
                return true;
            }
        }
        return false;
    }

    private boolean checkY() {
        BigDecimal minY = new BigDecimal("-5.0");
        BigDecimal maxY = new BigDecimal("3.0");
        return this.y.compareTo(minY) >= 0 && this.y.compareTo(maxY) <= 0;
    }

    private boolean checkR() {
        List<BigDecimal> validRValues = Arrays.asList(
                new BigDecimal("1.0"), new BigDecimal("2.0"), new BigDecimal("3.0"),
                new BigDecimal("4.0"), new BigDecimal("5.0")
        );
        for (BigDecimal validR : validRValues) {
            if (validR.compareTo(this.r) == 0) {
                return true;
            }
        }
        return false;
    }
}
