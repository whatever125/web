package org.whatever125.springbackend.service;

import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.whatever125.springbackend.model.*;
import org.whatever125.springbackend.repository.ClientRepository;

import java.util.List;

@Primary
@Service
public class ClientServiceImpl implements ClientService, UserDetailsService {
    private final ClientRepository clientRepository;
    private final PasswordEncoder encoder;

    public ClientServiceImpl(ClientRepository clientRepository, PasswordEncoder encoder) {
        this.clientRepository = clientRepository;
        this.encoder = encoder;
    }

    @Override
    public Client create(ClientData data) {
        if (clientRepository.existsById(data.getUsername()))
            return null;

        Client client = new Client();
        client.setLogin(data.getUsername());
        client.setPassword(this.encoder.encode(data.getPassword()));
        client.setRole(Role.ROLE_USER);

        clientRepository.save(client);
        return client;
    }

    @Override
    public List<Client> readAll() {
        return (List<Client>) clientRepository.findAll();
    }

    @Override
    public Client read(String login) {
        return clientRepository.findById(login.toLowerCase()).orElse(null);
    }

    @Override
    public boolean update(ClientData data, String login) {
        if (clientRepository.existsById(login.toLowerCase())) {
            Client client = new Client();
            client.setLogin(data.getUsername());
            client.setPassword(data.getPassword());
            clientRepository.save(client);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(String login) {
        if (clientRepository.existsById(login.toLowerCase())) {
            clientRepository.deleteById(login.toLowerCase());
            return true;
        }
        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return clientRepository
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("Login not found: " + username));
    }
}
