package org.whatever125.springbackend.errors;

public class WrongPasswordException extends APIException {
    public WrongPasswordException(String message) {
        super(message);
    }

    public WrongPasswordException() {
        super("Неверный пароль");
    }
}
