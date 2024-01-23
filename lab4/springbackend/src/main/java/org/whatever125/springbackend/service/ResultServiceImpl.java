package org.whatever125.springbackend.service;

import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.whatever125.springbackend.model.Client;
import org.whatever125.springbackend.repository.ResultRepository;
import org.whatever125.springbackend.model.ResultData;
import org.whatever125.springbackend.model.Result;
import org.whatever125.springbackend.util.InputValidator;
import org.whatever125.springbackend.util.PointChecker;

import java.time.ZonedDateTime;
import java.util.*;

@Primary
@Service
public class ResultServiceImpl implements ResultService {
    private final ResultRepository resultRepository;

    public ResultServiceImpl(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    @Override
    public Result create(ResultData data, Client client) {
        InputValidator validator = new InputValidator(data.getX(), data.getY(), data.getR());
        if (!validator.isValid()) return null;

        Result result = new Result();
        result.setClientId(client);
        result.setX(data.getX());
        result.setY(data.getY());
        result.setR(data.getR());
        result.setSuccess(PointChecker.isInArea(data.getX(), data.getY(), data.getR()));
        result.setDateTime(ZonedDateTime.now());

        resultRepository.save(result);
        return result;
    }

    @Override
    public List<Result> readAll(Client client) {
        return resultRepository.getPointsByClientId(client);
    }

    @Override
    public Result read(long id) {
        return resultRepository.findById(id).orElse(null);
    }

    @Override
    public boolean update(Result result, long id) {
        if (resultRepository.existsById(id)) {
            result.setId(id);
            resultRepository.save(result);
            return true;
        }
        return false;
    }

    @Override
    public boolean delete(long id) {
        if (resultRepository.existsById(id)) {
            resultRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public boolean deleteAll(Client client) {
        resultRepository.deleteResultsByClientId(client);
        return true;
    }
}
