package ru.saaslike.db;

import org.hibernate.dialect.PostgreSQL9Dialect;

import java.sql.Types;

public class CustomPostgresSQL9Dialect extends PostgreSQL9Dialect {

    public CustomPostgresSQL9Dialect() {
        // mapping @Lob to byte[] (default to OID)
        registerColumnType(Types.BLOB, "bytea");
    }
}