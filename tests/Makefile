#
# Makefile for running tests
#

SHELL:=bash
.ONESHELL:
.PHONY: env

export LZMBRANCH ?= $(shell git rev-parse --abbrev-ref HEAD)

PREFIX:=lizmap-$(LZMBRANCH)-tests

LIZMAP_USER_ID ?= $(shell id -u)
LIZMAP_GROUP_ID ?= $(shell id -g)
LZMPOSTGISVERSION ?= 14-3
LZMQGSRVVERSION ?= 3.22
LZMPGPORT ?= 8132
LZMQGSRVPORT ?= 8131
LZMWEBPORT ?= 8130
LIZMAP_ADMIN_LOGIN ?= admin
LIZMAP_ADMIN_EMAIL ?= admin@localhost.local
LIZMAP_ADMIN_DEFAULT_PASSWORD_SOURCE ?= /srv/etc/admin.conf
PHP_VERSION ?= 8.1

env:
	@echo "Creating environment file for Docker Compose"
	@cat <<-EOF > .env
	LIZMAP_USER_ID=$(LIZMAP_USER_ID)
	LIZMAP_GROUP_ID=$(LIZMAP_GROUP_ID)
	LZMPOSTGISVERSION=$(LZMPOSTGISVERSION)
	LZMQGSRVVERSION=$(LZMQGSRVVERSION)
	LZMBRANCH=$(LZMBRANCH)
	LZMPGPORT=$(LZMPGPORT)
	LZMQGSRVPORT=$(LZMQGSRVPORT)
	LZMWEBPORT=$(LZMWEBPORT)
	LIZMAP_ADMIN_LOGIN=$(LIZMAP_ADMIN_LOGIN)
	LIZMAP_ADMIN_EMAIL=$(LIZMAP_ADMIN_EMAIL)
	LIZMAP_ADMIN_DEFAULT_PASSWORD_SOURCE=$(LIZMAP_ADMIN_DEFAULT_PASSWORD_SOURCE)
	COMPOSE_PROJECT_NAME=$(PREFIX)
	PHP_VERSION=$(PHP_VERSION)
	EOF


build-plugins:
	docker run \
	    -u $(LIZMAP_USER_ID):$(LIZMAP_GROUP_ID) \
	    --rm -i \
	    -e QGSRV_SERVER_PLUGINPATH=/srv/plugins \
	    -v $(shell pwd)/qgis-server-plugins:/srv/plugins \
	    -v $(shell pwd)/:/src \
        --entrypoint /src/add_server_plugins.sh \
	    3liz/qgis-map-server:${LZMQGSRVVERSION} \

show-qgis-server-versions:
	docker run \
	    --rm -i \
	    --entrypoint qgisserver \
	    3liz/qgis-map-server:${LZMQGSRVVERSION} \
	    --version
	docker run \
	    -u $(LIZMAP_USER_ID):$(LIZMAP_GROUP_ID) \
	    --rm -i \
	    -e QGSRV_SERVER_PLUGINPATH=/srv/plugins \
	    -v $(shell pwd)/qgis-server-plugins:/srv/plugins \
	    -v $(shell pwd)/:/src \
	    --entrypoint qgis-plugin-manager \
	    3liz/qgis-map-server:${LZMQGSRVVERSION} \
	    list

up: env
	docker compose up  -V --force-recreate -d

stop:
	docker compose stop

reset:
	docker compose down -v --remove-orphans
	./lizmap-ctl clean
