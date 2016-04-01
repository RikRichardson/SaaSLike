package ru.saaslike.web.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.ResourceBundle;

/**
 * Translates ResourceBundle to map and serializes map with existing serializer
 */
public class ResourceBundleSerializer extends StdSerializer<ResourceBundle> {

    public ResourceBundleSerializer() {
        this(ResourceBundle.class);
    }

    protected ResourceBundleSerializer(Class<ResourceBundle> t) {
        super(t);
    }

    protected ResourceBundleSerializer(JavaType type) {
        super(type);
    }

    protected ResourceBundleSerializer(Class<?> t, boolean dummy) {
        super(t, dummy);
    }

    protected ResourceBundleSerializer(StdSerializer<?> src) {
        super(src);
    }

    @Override
    public void serialize(ResourceBundle value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        Map<String, String> map = new HashMap<String, String>();
        Enumeration<String> keys = value.getKeys();

        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            map.put(key, value.getString(key));
        }

        gen.writeObject(map);
    }
}
