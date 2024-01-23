package org.whatever125.springbackend.controller;

import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.whatever125.springbackend.errors.APIException;
import org.whatever125.springbackend.errors.UserAlreadyExistsException;
import org.whatever125.springbackend.model.Client;
import org.whatever125.springbackend.model.ClientData;
import org.whatever125.springbackend.model.JwtAuthenticationResponse;
import org.whatever125.springbackend.model.Role;
import org.whatever125.springbackend.service.AuthenticationService;
import org.whatever125.springbackend.service.ClientService;

import java.util.List;
import java.util.Objects;

@RestController
public class ClientController {
    private final ClientService clientService;
    private final AuthenticationService authenticationService;

    public ClientController(ClientService clientService, AuthenticationService authenticationService) {
        this.clientService = clientService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid ClientData data, Errors errors) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>(errors.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage), HttpStatus.BAD_REQUEST);
        }

        try {
            JwtAuthenticationResponse response = authenticationService.signIn(data);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (APIException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/auth/register")
    public ResponseEntity<?> create(@Valid @RequestBody ClientData data, Errors errors) {
        if (errors.hasErrors()) {
            return new ResponseEntity<>(errors.getAllErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage), HttpStatus.BAD_REQUEST);
        }

        try {
            JwtAuthenticationResponse response = authenticationService.signUp(data);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (UserAlreadyExistsException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (APIException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        }
    }

    @RolesAllowed({Role.Constants.ROLE_ADMIN_VALUE})
    @GetMapping(value = "/clients")
    public ResponseEntity<List<Client>> read() {
        final List<Client> clients = clientService.readAll();

        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping(value = "/clients/{id}")
    public ResponseEntity<?> read(@PathVariable(name = "id") String id) {
        final Client client = clientService.read(id);
        if (client == null)
            return new ResponseEntity<>("Пользователь с таким именем не найден", HttpStatus.NOT_FOUND);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        if (!Objects.equals(currentPrincipalName, client.getLogin()))
            return new ResponseEntity<>("Доступ запрещен", HttpStatus.FORBIDDEN);

        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    @DeleteMapping(value = "/clients/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") String id) {
        final Client client = clientService.read(id);
        if (client == null)
            return new ResponseEntity<>("Пользователь с таким именем не найден", HttpStatus.NOT_FOUND);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        if (!Objects.equals(currentPrincipalName, client.getLogin()))
            return new ResponseEntity<>("Доступ запрещен", HttpStatus.FORBIDDEN);

        final boolean deleted = clientService.delete(id);

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
