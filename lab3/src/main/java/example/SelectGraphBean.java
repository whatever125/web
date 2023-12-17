package example;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Named
@SessionScoped
@Data
@NoArgsConstructor
public class SelectGraphBean implements Serializable {
    private Double x;
    private Double y;
}
