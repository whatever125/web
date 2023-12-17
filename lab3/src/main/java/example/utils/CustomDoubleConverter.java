package example.utils;

import jakarta.faces.convert.Converter;
import jakarta.faces.convert.FacesConverter;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.convert.ConverterException;

@FacesConverter("example.utils.CustomDoubleConverter")
public class CustomDoubleConverter implements Converter<Double> {
    @Override
    public Double getAsObject(FacesContext context, UIComponent component, String value) {
        if (value == null) {
            throw new ConverterException("Value is null");
        }
        try {
            return Double.parseDouble(value.replace(',', '.'));
        } catch (NumberFormatException e) {
            throw new ConverterException("Invalid format");
        }
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Double value) {
        if (value == null) {
            return "";
        }
        return value.toString();
    }
}