<?php
class InputValidator {
    private string $delta_x;
    private string $delta_y;
    private string $delta_r;

    public function __construct(string $delta_x, string $delta_y, string $delta_r)
    {
        $this->delta_x = $delta_x;
        $this->delta_y = $delta_y;
        $this->delta_r = $delta_r;
    }

    public function is_valid(): bool {
        return $this->check_x() && $this->check_y() && $this->check_r();
    }

    private function check_x(): bool {
        return is_numeric($this->delta_x)
            && in_array($this->delta_x, array(-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2));
    }

    private function check_y(): bool {
        return is_numeric($this->delta_y)
            && $this->delta_y >= -5 && $this->delta_y <= 3;
    }

    private function check_r(): bool {
        return is_numeric($this->delta_r)
            && in_array($this->delta_r, array(1, 1.5, 2, 2.5, 3));
    }
}