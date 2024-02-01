# Resmi Nginx taban imajını kullan
FROM nginx:alpine

# Çalışma dizinini belirle
COPY ./nginx.conf /etc/nginx/conf.d/default.conf


WORKDIR /usr/share/nginx/html

# HTML, CSS ve JavaScript dosyalarını kopyala
RUN mkdir img
COPY img ./img
COPY index.html .
COPY style.css .
COPY style2.css .
COPY app.js .

EXPOSE 423

RUN mkdir -p /run/nginx

# Nginx'i çalıştır
CMD ["nginx", "-g", "daemon off;"]
