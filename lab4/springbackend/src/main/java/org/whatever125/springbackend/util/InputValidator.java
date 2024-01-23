package org.whatever125.springbackend.util;

import java.util.Arrays;
import java.util.List;

public class InputValidator {
    private final Double x;
    private final Double y;
    private final Double r;

    public InputValidator(Double x, Double y, Double r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean isValid() {
        return this.checkX() && this.checkY() && this.checkR();
    }

    private boolean checkX() {
        return this.x != null;
//        List<Double> validXValues = Arrays.asList(-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0);
//        return validXValues.contains(this.x);
    }

    private boolean checkY() {
        return this.y != null;
//        return this.y >= -3 && this.y <= 5;
    }

    private boolean checkR() {
        List<Double> validRValues = Arrays.asList(0.5, 1.0, 1.5, 2.0);
        return this.r != null && validRValues.contains(this.r);
    }
}
