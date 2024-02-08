CREATE DATABASE test_db;

-- Oluşturduğunuz veritabanını kullan
\c my_database;

-- Test tablosunu oluştur
CREATE TABLE test_t (
    id SERIAL PRIMARY KEY,
    deger VARCHAR(255)
);
