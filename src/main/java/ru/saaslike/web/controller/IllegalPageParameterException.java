package ru.saaslike.web.controller;

/**
 * Исключение для случаев, когда переданы некорректные данные пейджинга или сортировки с клиента
 */
public class IllegalPageParameterException extends RuntimeException {

    public IllegalPageParameterException(String message) {
        super(message);
    }

}
