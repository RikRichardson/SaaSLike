package ru.saaslike;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.databind.module.SimpleModule;
import ru.saaslike.util.LocalDateUtils;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class Constants {

    public static final String DATE_TIME_PATTERN = "yyyy-MM-dd HH:mm:ss";
    /**
     * Формат даты для REST API
     */
    public static final DateTimeFormatter DATE_TIME_FORMAT = DateTimeFormatter.ofPattern(DATE_TIME_PATTERN);

    /**
     * JSON сериализация
     */
    public static final ObjectMapper OBJECT_MAPPER = createMapper();

    private static ObjectMapper createMapper() {
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(Date.class, new JsonSerializer<Date>() {
            @Override
            public void serialize(Date value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
                if (value != null) {
                    gen.writeString(DATE_TIME_FORMAT.format(LocalDateUtils.toLocalDateTime(value)));
                } else {
                    gen.writeNull();
                }
            }
        });

        module.addDeserializer(Date.class, new JsonDeserializer<Date>() {
            @Override
            public Date deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
                String value = p.getValueAsString();
                return "null".equals(value) ? null : LocalDateUtils.toDate(DATE_TIME_FORMAT.parse(value));
            }
        });

        mapper.registerModule(module);
        return mapper;
    }

    /**
     * Префикс идентификатора платежа для создания платежа с портала (параметр payment)
     */
    public static String PORTAL_PAYMENT_ID_PREFIX = "portal_";
}
