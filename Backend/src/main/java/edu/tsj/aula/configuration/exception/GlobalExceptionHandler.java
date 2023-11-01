package edu.tsj.aula.configuration.exception;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.tsj.aula.persistance.models.control.dto.ErrorResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    private ObjectMapper mapper = new ObjectMapper();

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorResponseDto> handleConflict (Exception ex, WebRequest request) {
        log.error("Exception " + ex.getMessage(), ex);
        var error = new ErrorResponseDto(ex.getMessage(), "" + HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now());

        return ResponseEntity.internalServerError().body(error);
    }

    @ExceptionHandler(HttpClientErrorException.class)
    protected ResponseEntity<ErrorResponseDto> handleConflict (HttpClientErrorException ex, WebRequest request)
        throws JsonProcessingException {
            log.error("HttpClientErrorException " + ex.getMessage(), ex);
            var json = convertToJson(ex.getMessage());
            var error = new ErrorResponseDto(json.get("message").asText(), "" + ex.getRawStatusCode(), LocalDateTime.now());

            return new ResponseEntity<>(error, HttpStatus.valueOf(ex.getRawStatusCode()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    protected ResponseEntity<ErrorResponseDto> handleConflict(ResourceNotFoundException ex, WebRequest request) {
        log.error("ResourceNotFoundException " + ex.getMessage(), ex);
        var error = new ErrorResponseDto(ex.getMessage(), "" + ex.getHttpStatus().value(), LocalDateTime.now());

        return new ResponseEntity<>(error, ex.getHttpStatus());
    }

    private JsonNode convertToJson(String message) throws JsonProcessingException {
        var messageTemp = message.split(":\"")[1];
        messageTemp = messageTemp.substring(0, messageTemp.length() - 1);

        return mapper.readTree(messageTemp);
    }


    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {
        log.error("HandleMethodArgumentNotValid " + ex.getMessage(), ex);
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach((error) -> {
            String field = error.getField();
//            field = field.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
            String message = error.getDefaultMessage();
            errors.put(field, message);
        });
        var error = new ErrorResponseDto("Validation field for argument",
                "" + HttpStatus.BAD_REQUEST.value(), LocalDateTime.now(), errors);

        return ResponseEntity.badRequest().body(error);
    }
}
