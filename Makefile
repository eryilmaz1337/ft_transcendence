UNAME := $(shell uname)
CURRENT_USER := $(shell whoami)

# Define default DOCKER_COMMAND
DOCKER_COMMAND := make up

# Check if the operating system is Linux
ifeq ($(UNAME),Linux)
	ifeq ($(CURRENT_USER),root)
		DOCKER_COMMAND := make up
	else
		DOCKER_COMMAND := sudo su -c "make up"
	endif
endif

all: docker-up

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

docker-up:
	@$(shell $(DOCKER_COMMAND))

.PHONY: all down re clean clear up docker-up
