package org.whatever125.springbackend.errors;

public class UserAlreadyExistsException extends APIException {
    public UserAlreadyExistsException(String message) {
        super(message);
    }

    public UserAlreadyExistsException() {
        super("Пользователь с таким именем уже существует");
    }
}
