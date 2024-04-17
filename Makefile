
all:
	@docker-compose -f docker-compose.yml up --build

re: clean all

clean:
	@docker stop $$(docker ps -a -q)
	@docker rm $$(docker ps -a -q)
	@docker-compose -f docker-compose.yml down -v --remove-orphans     # Down ile konteynerleri durdurur ve bağlı volumeleri kaldırır
clear:
	@docker rmi -f $$(docker images -q) # Kullanılmayan imajları siler
	@docker system prune -a -f

.PHONY: all down re clean clear
