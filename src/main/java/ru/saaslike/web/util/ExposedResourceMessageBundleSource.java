package ru.saaslike.web.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Locale;
import java.util.Properties;

/**
 * Message source exposing all messages.
 * Default MessageSources return messages by key (org.springframework.context.MessageSource.getMesssage)
 */
public class ExposedResourceMessageBundleSource extends ReloadableResourceBundleMessageSource {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExposedResourceMessageBundleSource.class);

    @Override
    protected Properties loadProperties(Resource resource, String fileName) throws IOException {

        LOGGER.info("Load " + fileName);
        return super.loadProperties(resource, fileName);
    }

    /**
     * Gets all messages for presented Locale.
     *
     * @param locale user request's locale
     * @return all messages
     */
    public Properties getMessages(Locale locale) {
        return getMergedProperties(locale).getProperties();
    }
}

