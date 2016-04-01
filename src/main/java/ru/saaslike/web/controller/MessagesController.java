package ru.saaslike.web.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import ru.saaslike.Constants;
import ru.saaslike.web.util.ExposedResourceMessageBundleSource;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * returns JS-file with messages and translations in current locale
 */
@Controller
public class MessagesController {

    @Resource(name = "messageSource")
    private MessageSource messageSource;

    @RequestMapping(path = "messages", method = RequestMethod.GET)
    public ModelAndView messages() throws ConfigurationException {
        String message = "{}";

        if (messageSource instanceof ExposedResourceMessageBundleSource) {
            ExposedResourceMessageBundleSource propsSource = (ExposedResourceMessageBundleSource) messageSource;

            try {
                message = Constants.OBJECT_MAPPER.writeValueAsString(propsSource.getMessages(LocaleContextHolder.getLocale()));
            } catch (JsonProcessingException e) {
                // TODO define special exception or use existing
                throw new ConfigurationException("Error while serializing messages", e);
            }
        }

        Map<String, Object> model = new HashMap<>(1);

        model.put("messages", message);

        return new ModelAndView("messages", model);
    }
}
