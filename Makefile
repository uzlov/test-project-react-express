# Create .env and docker-compose.override.yml files, if they not exists.
$(shell cp -n \.env.default \.env)
$(shell cp -n \.\/docker-compose\.override\.default\.yml \.\/docker-compose\.override\.yml)

include .env

# Get local values only once.
LOCAL_UID := $(shell id -u)
LOCAL_GID := $(shell id -g)

# Evaluate recursively.
CUID ?= $(LOCAL_UID)
CGID ?= $(LOCAL_GID)

# Network name is sanitized.
COMPOSE_NET_NAME := $(COMPOSE_PROJECT_NAME)_front

.PHONY: include up down info restart exec

all: | include down up

include:
ifeq ($(strip $(COMPOSE_PROJECT_NAME)), projectname)
$(error Project name can not be default, please edit ".env" and set COMPOSE_PROJECT_NAME variable.)
endif

up:
	docker-compose up -d --remove-orphans --force-recreate

stop:
	docker-compose stop

down:
	@echo "Removing containers for $(COMPOSE_PROJECT_NAME)"
	docker-compose down -v --remove-orphans

rebuild: down
	docker-compose up -d --remove-orphans --build

info:
	$(info Containers for "$(COMPOSE_PROJECT_NAME)":)
	$(eval CONTAINERS := $(shell docker ps -f name=$(COMPOSE_PROJECT_NAME) --format "{{ .ID }}"))
	$(foreach CONTAINER, $(CONTAINERS),$(info $(shell docker inspect $(CONTAINER) --format="{{.NetworkSettings.Networks.$(COMPOSE_NET_NAME).IPAddress}} : {{.Name}}" ) ))

# If the first argument is "restart"...
ifeq (restart,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "restart"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

ifeq (exec,$(firstword $(MAKECMDGOALS)))
  EXEC_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  $(eval $(EXEC_ARGS):;@:)
endif

restart:
	$(info "Restarting container $(RUN_ARGS)")
	docker-compose restart $(RUN_ARGS)

exec:
	docker-compose exec -u$(CUID):$(CGID) $(EXEC_ARGS) sh
