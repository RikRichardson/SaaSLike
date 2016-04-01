package ru.saaslike.util;

import ru.saaslike.domain.PortalRole;

import javax.persistence.AttributeConverter;
import java.util.Collections;
import java.util.Set;

import static java.util.Arrays.asList;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toSet;

/**
 * Конвертер списка ролей в строку
 */
public class RolesStringAttributeConverter implements AttributeConverter<Set<PortalRole>, String> {

    @Override
    public String convertToDatabaseColumn(Set<PortalRole> roles) {
        return roles != null
            ? roles.stream().map(PortalRole::name).collect(joining(","))
            : "";
    }

    @Override
    public Set<PortalRole> convertToEntityAttribute(String dbData) {
        return (dbData != null)
            ? asList(dbData.split(",")).stream().map(PortalRole::valueOf).collect(toSet())
            : Collections.emptySet();
    }
}