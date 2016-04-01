package ru.saaslike;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public final class JsonUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JsonUtil.class);

    private JsonUtil() {
    }

    public static String toJson(Object params) {
        try {
            return Constants.OBJECT_MAPPER.writeValueAsString(params);
        } catch (JsonProcessingException e) {
            LOGGER.error("Error while serializing to json: value=" + params, e);
            throw new RuntimeException(e);
        }
    }

    public static Map<String, String> jsonToMap(String json) {
        try {
            return Constants.OBJECT_MAPPER.readValue(json, new TypeReference<HashMap<String,String>>() {});
        } catch (IOException e) {
            LOGGER.error("Error while deserializing value=" + json, e);
            throw new RuntimeException(e);
        }
    }
}
