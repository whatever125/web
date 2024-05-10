package org.whatever125.springbackend.service;

import jakarta.validation.Valid;
import org.whatever125.springbackend.model.Client;
import org.whatever125.springbackend.model.Result;
import org.whatever125.springbackend.model.ResultData;

import java.util.List;

public interface ResultService {
    /**
     * Создает нового клиента
     * @param client - клиент для создания
     */
    Result create(ResultData data, Client client);

    /**
     * Возвращает список всех имеющихся клиентов
     * @return список клиентов
     */
    List<Result> readAll(Client client);

    /**
     * Возвращает клиента по его ID
     * @param id - ID клиента
     * @return - объект клиента с заданным ID
     */
    Result read(long id);

    /**
     * Обновляет клиента с заданным ID,
     * в соответствии с переданным клиентом
     * @param client - клиент в соответсвии с которым нужно обновить данные
     * @param id - id клиента которого нужно обновить
     * @return - true если данные были обновлены, иначе false
     */
    boolean update(Result result, long id);

    /**
     * Удаляет клиента с заданным ID
     * @param id - id клиента, которого нужно удалить
     * @return - true если клиент был удален, иначе false
     */
    boolean delete(long id);

    /**
     * Удаляет клиента с заданным ID
     * @param client - id клиента, которого нужно удалить
     */
    boolean deleteAll(Client client);
}
