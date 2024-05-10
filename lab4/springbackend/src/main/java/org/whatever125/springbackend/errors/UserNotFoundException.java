package org.whatever125.springbackend.errors;

public class UserNotFoundException extends APIException {
    public UserNotFoundException() {
        super("Пользователь не найден");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
