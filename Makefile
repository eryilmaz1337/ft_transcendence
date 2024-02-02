
all:
	@docker-compose -f docker-compose.yml up --build

down:
	@docker-compose -f srcs/docker-compose.yml down

re: clean all

clean:
	@docker-compose -f docker-compose.yml down -v --remove-orphans     # Down ile konteynerleri durdurur ve bağlı volumeleri kaldırır
	@docker rmi -f $$(docker images -q) # Kullanılmayan imajları siler
clear:
	@docker system prune -a -f

.PHONY: all down re clean clear
