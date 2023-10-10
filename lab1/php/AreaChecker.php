<?php
class AreaChecker {
    public static function is_in_area(float $delta_x, float $delta_y, float $delta_r): bool {
        if ($delta_x >= 0 && $delta_y <= 0) {
            return pow($delta_x, 2) + pow($delta_y, 2) <= pow($delta_r, 2);
        }
        if ($delta_x <= 0 && $delta_y >= 0) {
            return abs($delta_x) + abs($delta_y) <= $delta_r;
        }
        if ($delta_x < 0 && $delta_y < 0) {
            return (abs($delta_x) <= $delta_r / 2) && (abs($delta_y) <= $delta_r);
        }
        return false;
    }
}