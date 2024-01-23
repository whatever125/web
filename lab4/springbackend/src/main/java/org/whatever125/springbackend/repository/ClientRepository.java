package org.whatever125.springbackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.whatever125.springbackend.model.Client;

@Repository
public interface ClientRepository extends CrudRepository<Client, String> {

}
