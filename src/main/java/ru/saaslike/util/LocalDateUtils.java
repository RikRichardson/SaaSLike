package ru.saaslike.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAccessor;
import java.util.Date;

public final class LocalDateUtils {

    private LocalDateUtils() {
    }

    public static LocalDateTime toLocalDateTime(Date date) {
        if (date == null) {
            return null;
        }
        return LocalDateTime.from(date.toInstant().atZone(ZoneId.systemDefault()));
    }

    public static Date toDate(LocalDateTime in) {
        if (in == null) {
            return null;
        }
        return Date.from(in.atZone(ZoneId.systemDefault()).toInstant());
    }

    public static Date toDate(TemporalAccessor temporalAccessor) {
        return Date.from(LocalDateTime.from(temporalAccessor).atZone(ZoneId.systemDefault()).toInstant());
    }

}
