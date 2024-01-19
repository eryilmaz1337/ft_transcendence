docker-install: install-docker-compose
	@if ! command -v docker &> /dev/null; then \
		echo "Docker is not installed. Installing Docker..."; \
		curl -fsSL https://get.docker.com -o get-docker.sh; \
		sudo sh get-docker.sh; \
		rm -f get-docker.sh; \
		echo "Docker installed successfully."; \
	else \
		echo "Docker is already installed."; \
	fi

install-docker-compose:
	@if ! command -v docker-compose &> /dev/null; then \
        echo "Docker Compose is not installed. Installing..."; \
        sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose; \
        sudo chmod +x /usr/local/bin/docker-compose; \
        echo "Docker Compose installed successfully."; \
    else \
        echo "Docker Compose is already installed."; \
    fi

.PHONY: docker-install install-docker-compose