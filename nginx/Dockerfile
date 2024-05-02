FROM	debian:buster

RUN	apt-get update && apt-get install -y nginx

COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 443


CMD ["nginx", "-g", "daemon off;"]



# Bu Docker dosyası, Debian Buster tabanlı bir Docker görüntüsü oluşturmak için kullanılır ve içerisinde Nginx web sunucusu ve SSL sertifikası oluşturma işlemlerini otomatikleştirmek için tasarlanmıştır. İşte betiğin her bir parçasının ne işe yaradığına dair ayrıntılı açıklamalar:
# 
# Dockerfile
# Copy code
# FROM debian:buster
# Bu satır, Debian Buster tabanlı bir Docker görüntüsü oluşturulacağını belirtir.
# 
# Dockerfile
# Copy code
# RUN apt-get update && apt-get install -y nginx openssl
# Bu satır, apt-get update ile paket listesini günceller ve nginx ile openssl paketlerini kurar.
# 
# Dockerfile
# Copy code
# RUN mkdir -p /etc/nginx/ssl
# Bu komut, Nginx için SSL sertifikalarının saklanacağı dizini oluşturur.
# 
# Dockerfile
# Copy code
# COPY ./conf/nginx.conf /etc/nginx/sites-enabled/default
# Bu komut, yerel dizindeki nginx.conf dosyasını Docker görüntüsünün /etc/nginx/sites-enabled/default yoluna kopyalar. Bu dosya, Nginx'in varsayılan site yapılandırmasını belirtir.
# 
# Dockerfile
# Copy code
# COPY ./tools/nginx_start.sh /var/www
# Bu komut, yerel dizindeki nginx_start.sh betiğini Docker görüntüsünün /var/www yoluna kopyalar.
# 
# Dockerfile
# Copy code
# RUN chmod +x /var/www/nginx_start.sh
# Bu komut, nginx_start.sh betiğini çalıştırılabilir yapar.
# 
# Dockerfile
# Copy code
# RUN mkdir -p /run/nginx
# Bu komut, Nginx'in çalışma sırasında kullanacağı /run/nginx dizinini oluşturur.
# 
# Dockerfile
# Copy code
# EXPOSE 443
# Bu komut, Docker konteynerinin 443 numaralı portu dışarıya açılmasını belirtir. Bu, HTTPS trafiği için kullanılır.
# 
# Dockerfile
# Copy code
# ENTRYPOINT ["var/www/nginx_start.sh"]
# Bu komut, Docker konteyneri başlatıldığında otomatik olarak nginx_start.sh betiğini çalıştırmasını belirtir.
# 
# Dockerfile
# Copy code
# CMD ["nginx", "-g", "daemon off;"]
# Bu komut, Docker konteyneri başlatıldığında varsayılan olarak çalıştırılacak komutu belirtir. Bu durumda, Nginx'i başlatır ve -g "daemon off;" ile daemon modunda çalışmasını sağlar.
# 
# Bu Docker dosyası, Nginx'i Docker içinde çalıştırırken SSL sertifikası oluşturma ve web sunucusunu başlatma işlemlerini otomatikleştirmek için kullanılır.