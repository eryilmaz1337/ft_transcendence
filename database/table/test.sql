CREATE DATABASE test_db;

-- Oluşturduğunuz veritabanını kullan
\c test_db;

-- Test tablosunu oluştur
CREATE TABLE test_t (
    id SERIAL PRIMARY KEY,
    deger VARCHAR(255)
);
