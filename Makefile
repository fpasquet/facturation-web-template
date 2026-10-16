SHELL := /bin/bash

.PHONY: help install dev build typecheck test format clean
.DEFAULT_GOAL := help

help: ## Liste les commandes
	@grep -E '^[a-z-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "} {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

install: ## Installe les dépendances et crée .env s'il manque
	pnpm install
	@test -f .env || (cp .env.example .env && echo "Créé .env depuis .env.example")

dev: ## L'interface sur http://localhost:3010 (lancer aussi facturation-api)
	pnpm dev

build: ## Construit l'interface
	pnpm build

typecheck: ## Vérifie les types
	pnpm typecheck

test: ## Tests unitaires
	pnpm test

format: ## Met en forme le code (Prettier)
	pnpm format

clean: ## Supprime la sortie de build
	rm -rf .next
