package org.whatever125.springbackend.service;

import org.whatever125.springbackend.model.Client;
import org.whatever125.springbackend.model.ClientData;

import java.util.List;

public interface ClientService {

    /**
     * Создает нового клиента
     * @param client - клиент для создания
     */
    Client create(ClientData client);

    /**
     * Возвращает список всех имеющихся клиентов
     * @return список клиентов
     */
    List<Client> readAll();

    /**
     * Возвращает клиента по его ID
     * @param id - ID клиента
     * @return - объект клиента с заданным ID
     */
    Client read(String login);

    /**
     * Обновляет клиента с заданным ID,
     * в соответствии с переданным клиентом
     * @param client - клиент в соответсвии с которым нужно обновить данные
     * @param id - id клиента которого нужно обновить
     * @return - true если данные были обновлены, иначе false
     */
    boolean update(ClientData data, String login);

    /**
     * Удаляет клиента с заданным ID
     * @param login - id клиента, которого нужно удалить
     * @return - true если клиент был удален, иначе false
     */
    boolean delete(String login);
}
