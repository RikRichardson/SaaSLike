package ru.saaslike.web.controller;

import org.springframework.core.NestedRuntimeException;

public class ConfigurationException extends NestedRuntimeException {
    public ConfigurationException(String msg) {
        super(msg);
    }

    public ConfigurationException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
