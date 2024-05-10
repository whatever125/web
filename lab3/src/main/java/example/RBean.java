package example;

import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Locale;

/**
 * Managed bean for handling X coordinate value in JSF application.
 * Provides functionality to get and set X value, and to validate it.
 */
@Named
@SessionScoped
@NoArgsConstructor
public class RBean implements Serializable {
    private Double r = 3.0;

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;

        String script1 = String.format(Locale.US, "window.updateCanvas(%f);", r);
        FacesContext.getCurrentInstance().getPartialViewContext().getEvalScripts().add(script1);
    }
}
