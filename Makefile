
all:
	@sudo docker-compose -f docker-compose.yml up --build

down:
	@sudo docker-compose -f docker-compose.yml down

re: clean all

clean:
	@sudo docker-compose -f docker-compose.yml down -v --remove-orphans     # Down ile konteynerleri durdurur ve bağlı volumeleri kaldırır
	@sudo docker rmi -f $$(docker images -q) # Kullanılmayan imajları siler

clear:
	@sudo docker system prune -a -f

.PHONY: all down re clean clear