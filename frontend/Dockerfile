# Docker taban alınacak imaj
FROM node:14-alpine

# Çalışma dizini oluştur
WORKDIR /usr/src/app

# HTML, CSS ve JS dosyalarını kopyala
# RUN mkdir img
# COPY img ./img
# COPY /front/index.html .
# COPY style.css .
# COPY style2.css .
# COPY app.js .

# http-server yükleyin
RUN npm install -g http-server

# Portu dışa aç
EXPOSE 423

# Sunucuyu başlat
CMD ["http-server", "--port", "423"]