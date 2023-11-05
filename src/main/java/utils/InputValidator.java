package utils;

import java.util.Arrays;
import java.util.List;

public class InputValidator {
    private final double x;
    private final double y;
    private final double r;

    public InputValidator(double x, double y, double r)
    {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public boolean isValid() {
        return this.checkX() && this.checkY() && this.checkR();
    }

    private boolean checkX() {
        List<Double> validXValues = Arrays.asList(-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0);
        return validXValues.contains(this.x);
    }

    private boolean checkY() {
        return this.y >= -5 && this.y <= 3;
    }

    private boolean checkR() {
        List<Integer> validRValues = Arrays.asList(1, 2, 3, 4, 5);
        return (this.r == (int) this.r) && validRValues.contains((int) this.r);
    }
}