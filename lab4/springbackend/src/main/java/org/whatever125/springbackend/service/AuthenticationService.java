package org.whatever125.springbackend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;
import org.whatever125.springbackend.errors.APIException;
import org.whatever125.springbackend.errors.UserAlreadyExistsException;
import org.whatever125.springbackend.errors.UserNotFoundException;
import org.whatever125.springbackend.errors.WrongPasswordException;
import org.whatever125.springbackend.model.Client;
import org.whatever125.springbackend.model.ClientData;
import org.whatever125.springbackend.model.JwtAuthenticationResponse;

@Service
public class AuthenticationService {
    private final ClientService clientService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(ClientService clientService, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.clientService = clientService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public JwtAuthenticationResponse signUp(ClientData data) throws APIException {
        Client client = clientService.create(data);
        if (client == null)
            throw new UserAlreadyExistsException();

        var jwt = jwtService.generateToken(client);
        if (jwt == null)
            throw new APIException("Не удалось создать токен пользователя");

        return new JwtAuthenticationResponse(jwt);
    }

    public JwtAuthenticationResponse signIn(ClientData data) throws APIException {
        Client client = clientService.read(data.getUsername());
        if (client == null)
            throw new UserNotFoundException();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                data.getUsername(),
                data.getPassword()
            ));

            var jwt = jwtService.generateToken(client);
            if (jwt == null)
                throw new APIException("Не удалось создать токен пользователя");

            return new JwtAuthenticationResponse(jwt);

        } catch (AuthenticationException e) {
            throw new WrongPasswordException();
        }
    }
}