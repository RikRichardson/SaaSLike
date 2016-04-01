package ru.saaslike.service;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Класс для расчета хэша, использующий алгоритм SHA-1
 */
@Service
public class HashService {

    /**
     * @param parametersMap мап с параметрами запроса
     * @param secret        строка с секретным значением
     */
    public String calculateHash(Map<String, String> parametersMap, String secret) {
        StringBuilder builder = new StringBuilder();

        parametersMap.entrySet().stream()
            .sorted(Map.Entry.<String, String>comparingByKey())
            .forEach(entry -> builder.append(entry.getKey()).append("=").append(entry.getValue()));

        builder.append(secret);

        return calculateHash(builder.toString());
    }

    private String calculateHash(String source) {
        return DigestUtils.sha1Hex(source);
    }
}
