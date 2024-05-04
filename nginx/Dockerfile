FROM debian:buster

# Nginx kurulumu
RUN apt-get update && apt-get install -y nginx openssl

RUN mkdir -p /etc/nginx/ssl

# Nginx yapılandırma dosyasını kopyala
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./tools/nginx_start.sh /var/www

RUN chmod +x /var/www/nginx_start.sh
RUN mkdir -p /run/nginx

# HTTPS için gereken sertifikaları ekleyebilirsiniz (örneğin, self-signed)
# COPY ./certs /etc/nginx/certs

# 443 portunu aç
EXPOSE 443

ENTRYPOINT ["var/www/nginx_start.sh"]

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
