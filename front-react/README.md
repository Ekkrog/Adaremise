# AdaRemise

Application de gestion pour **La Remise**, une ressourcerie associative : suivi des dépôts, des objets, des ventes et des bénévoles.

Projet fullstack réalisé dans le cadre du Bloc 1 d'Ada Tech School (semaines 15-16), par Anthony, Julien, et Rémy.

## Sommaire

- [Contexte](#contexte)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Installation](#installation)
- [Lancement](#lancement)
- [Documentation de l'API](#documentation-de-lapi)
- [Choix techniques et limites](#choix-techniques-et-limites)
- [Roadmap](#roadmap)

## Contexte

Aujourd'hui, personne à La Remise ne sait précisément ce qu'il y a en stock ni où en est chaque objet. AdaRemise répond à ce besoin en couvrant tout le cycle de vie d'un objet : de son dépôt par un donateur jusqu'à sa vente, son recyclage, ou son passage par une réparation.

## Fonctionnalités

### V1 — « Je sais ce que j'ai »

- Écran d'identification « Qui es-tu ? » : sélection du bénévole dans une liste (identification, pas d'authentification)
- Enregistrement d'un dépôt : choix du donateur parmi ceux déjà en base, date, dépôt en boutique ou à domicile
- Ajout des objets d'un dépôt, un par un, depuis la fiche du dépôt
- Liste des objets filtrable par statut et par catégorie, avec fiche détaillée
- Changement de statut d'un objet (arrivé → en réparation → en rayon → vendu / recyclé)
- Tableau de bord minimal : nombre d'objets par statut, poids total reçu, nombre d'objets en rayon

### V2 (partiel) — fonctionnalités bonus implémentées

- Enregistrement d'une vente portant sur **plusieurs objets**, avec le prix réellement payé et le mode de paiement
- Formulaire de dépôt complet : saisie de **plusieurs objets en une fois**, sans repasser par la fiche du dépôt
- Création d'un **nouveau donateur** directement depuis le formulaire de dépôt, avec recherche de ses dépôts précédents

### Bonus

- Ajout et suppression de bénévoles

> Les autres points de la V2 (réparations, vitrine publique, tableau de bord enrichi) ainsi que les V3 et V4 du brief n'ont pas été implémentés — voir [Roadmap](#roadmap).

## Stack technique

- **Frontend** : React
- **Backend** : Express (Node.js)
- **Base de données** : PostgreSQL, requêtes SQL écrites à la main et paramétrées via `pg` (pas d'ORM)
- **Documentation API** : Swagger

## Architecture

Le backend respecte une séparation claire :

```
routes/     → définition des routes REST
logique/    → règles métier
data/       → accès aux données (requêtes SQL)
```

La base de données reprend le schéma fourni par Ada Tech School (tables `personne`, `benevole`, `depot`, `objet`, `vente`, `reparer`, `atelier`, `competence`, `maitriser`, `participer`), avec les tables de jonction nécessaires pour les dépôts et ventes multi-objets.

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/Ekkrog/Adaremise.git
   cd adaremise
   ```
2. Copier le fichier d'environnement d'exemple et renseigner ses propres valeurs :
   ```bash
   cp .env.example .env
   ```
3. Installer les dépendances côté serveur et côté client :
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
4. Lancer la base de données PostgreSQL, appliquer les migrations et charger le jeu de données (`seed.sql`) :
   ```bash
   cd ../sql : docker compose up -d
   ```

## Lancement

```bash
# Backend
cd server && npm run dev

# Frontend
cd client && npm run dev
```

L'application est ensuite accessible sur `http://localhost:5173`, l'API sur `http://localhost:3000`.

## Documentation de l'API

La documentation Swagger de l'API est disponible sur `http://localhost:3000/api-docs` une fois le serveur lancé.

## Choix techniques et limites

- **Identification, pas authentification** : l'écran « Qui es-tu ? » permet de savoir qui utilise l'application (comme une caisse en boutique), mais ne sécurise pas l'accès par mot de passe. Ce choix est assumé pour ce périmètre de projet.
- **Rechargement de la page** : l'état de connexion est stocké en LocalStorage, le rechargement de la page est donc possible, malgré React.

## Roadmap

Fonctionnalités du brief non réalisées, par manque de temps :

- **V2** : saisie des réparations, vitrine publique du catalogue, tableau de bord enrichi (chiffre d'affaires, heures de bénévolat, taux de réussite des réparations, graphique)
- **V3** : gestion des ateliers et inscriptions, recherche et pagination, alertes sur les objets en rayon depuis longtemps, export CSV
- **V4** (hors périmètre du Bloc 1) : authentification réelle avec comptes et rôles, upload de photos, envoi d'emails, tests end-to-end automatisés