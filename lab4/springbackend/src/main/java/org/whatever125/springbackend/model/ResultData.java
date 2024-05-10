package org.whatever125.springbackend.model;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ResultData {
    @NotNull(message = "X не можеть быть пустым")
    private Double x;
    @NotNull(message = "Y не можеть быть пустым")
    private Double y;
    @NotNull(message = "R не можеть быть пустым")
    @Positive(message = "R должен быть > 0")
    private Double r;
}
