UNAME := $(shell uname)
CURRENT_USER := $(shell whoami)

all:
	@if [ "$(UNAME)" = "Linux" ]; then \
		if [ "$(CURRENT_USER)" = "root" ]; then \
			make up; \
		else \
			sudo su -c "make up"; \
		fi; \
	fi

up:
	@sudo docker-compose -f docker-compose.yml up --build

down:
	@sudo docker-compose -f docker-compose.yml down

re: clean all

#if koşulu komut boşsa hata almasını önleyip devam ettiriyor
clean:
	@sudo docker-compose -f docker-compose.yml down -v --remove-orphans	 # Down ile konteynerleri durdurur ve bağlı volumeleri kaldırır
	@if [ -n "$$(sudo docker images -q)" ]; then \
		sudo docker rmi -f $$(sudo docker images -q); \
	else \
		echo "No Docker images to clean"; \
	fi

clear:
	@sudo docker system prune -a -f

.PHONY: all down re clean clear up
