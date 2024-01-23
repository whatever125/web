package org.whatever125.springbackend.controller;

import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.whatever125.springbackend.model.*;
import org.whatever125.springbackend.service.ClientService;
import org.whatever125.springbackend.service.ResultService;

import java.util.List;
import java.util.Objects;

@RestController
public class ResultController {
    private final ResultService resultService;
    private final ClientService clientService;

    public ResultController(ResultService resultService, ClientService clientService) {
        this.resultService = resultService;
        this.clientService = clientService;
    }

    @PostMapping(value = "/results")
    public ResponseEntity<?> create(@Valid @RequestBody ResultData data, Errors errors) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>(errors.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage), HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Client client = clientService.read(currentPrincipalName);
        if (client == null)
            return new ResponseEntity<>("Доступ запрещен", HttpStatus.FORBIDDEN);

        Result result = resultService.create(data, client);
        if (result != null)
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        return new ResponseEntity<>("Некорректные данные", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @GetMapping(value = "/results")
    public ResponseEntity<?> read() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Client client = clientService.read(currentPrincipalName);
        if (client == null)
            return new ResponseEntity<>("Доступ запрещен", HttpStatus.FORBIDDEN);

        final List<Result> clients = resultService.readAll(client);

        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping(value = "/results/{id}")
    public ResponseEntity<?> read(@PathVariable(name = "id") int id) {
        final Result result = resultService.read(id);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        if (!Objects.equals(result.getClientId().getLogin(), currentPrincipalName))
            return new ResponseEntity<>("Доступ запрещен", HttpStatus.FORBIDDEN);

        return result != null
                ? new ResponseEntity<>(result, HttpStatus.OK)
                : new ResponseEntity<>("Результат не найден", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = "/results/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") int id) {
        final Result result = resultService.read(id);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        if (!Objects.equals(result.getClientId().getLogin(), currentPrincipalName))
            return new ResponseEntity<>("Доступ запрещен", HttpStatus.FORBIDDEN);

        final boolean deleted = resultService.delete(id);

        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping(value = "/results")
    public ResponseEntity<?> delete() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        Client client = clientService.read(currentPrincipalName);
        if (client == null)
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);

        final boolean deleted = resultService.deleteAll(client);

        return deleted
                ? new ResponseEntity<>(HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<?> handleAllUncaughtException(
            Exception exception,
            WebRequest request) {
        return new ResponseEntity<>(
                exception.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
