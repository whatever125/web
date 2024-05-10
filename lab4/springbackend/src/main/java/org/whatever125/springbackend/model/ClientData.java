package org.whatever125.springbackend.model;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ClientData {
    @NotBlank(message = "Имя пользователя не может быть пустым")
    @Size(min = 3, max = 20, message = "Имя пользователя должно быть от 3 до 20 символов")
    @Pattern(regexp = "^[a-z0-9_]+$", message = "Принимаются латинские символы, цифры и _")
    private String username;
    @NotBlank(message = "Пароль не может быть пустым")
    @Size(min = 8, message = "Пароль должно быть от 8 символов")
    private String password;

    public String getUsername() {
        return username.toLowerCase();
    }
}
