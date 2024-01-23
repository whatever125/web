package org.whatever125.springbackend.errors;

public class APIException extends Exception {
    public APIException(String message) {
        super(message);
    }

    public APIException() {
        super("Ошибка API");
    }
}
