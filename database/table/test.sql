
-- create_test_database.sql

-- Veritabanını oluştur
CREATE DATABASE testdb;

-- Kullanılacak veritabanını seç
\c testdb;

-- Test tablosunu oluştur
CREATE TABLE test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Örnek bir veri ekle
INSERT INTO test_table (name) VALUES ('Örnek Veri 1'), ('Örnek Veri 2');
