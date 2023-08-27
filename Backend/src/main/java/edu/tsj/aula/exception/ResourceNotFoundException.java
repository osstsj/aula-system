package edu.tsj.aula.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    private final String message;
    private final HttpStatus httpStatus;

    public ResourceNotFoundException(String message, HttpStatus httpStatus) {
        super(message);
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
