# AGENTS.md

Instructions pour les agents qui travaillent dans ce dépôt d'exemple.

- Répondre en français ; code, identifiants et messages de commit en anglais.
- Interface Next.js (App Router, Tailwind) : `src/app`. Elle appelle `facturation-api` depuis le navigateur, à
  l'adresse `API_URL` ; les montants arrivent en centimes et s'affichent en euros.
- Les commandes passent par le Makefile : `make install`, `make dev`, `make typecheck`, `make build`.
- Avant de rendre la main : `pnpm format:check`, `make typecheck build`.
- Commits en [Conventional Commits](https://www.conventionalcommits.org/) (`feat(invoices): …`), une PR par ticket, qui
  cite son numéro (`Closes #3`).
