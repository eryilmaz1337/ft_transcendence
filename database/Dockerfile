# Dockerfile

# Resmi PostgreSQL imajını kullan
FROM postgres:latest

# SQL dosyasını kopyala
COPY ./table/test.sql /docker-entrypoint-initdb.d/

# Ortam değişkenlerini ayarla
ENV POSTGRES_DB=testdb
ENV POSTGRES_USER=testuser
ENV POSTGRES_PASSWORD=testpass

# Bağlantı portunu ayarla
EXPOSE 5432

FROM dpage/pgadmin4 

EXPOSE 5050