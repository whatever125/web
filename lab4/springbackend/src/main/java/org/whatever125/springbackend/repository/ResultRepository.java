package org.whatever125.springbackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.whatever125.springbackend.model.Client;
import org.whatever125.springbackend.model.Result;

import java.util.List;

@Repository
public interface ResultRepository extends CrudRepository<Result, Long> {
    List<Result> getPointsByClientId(Client client);
    void deleteResultsByClientId(Client client);
}
