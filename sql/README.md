# La Remise — Base de données

Conception et implémentation de la base de données pour **La Remise**, une
ressourcerie associative. Ce dépôt est le socle du projet fullstack

## Initialiser la base en trois commandes

Prérequis : [Docker](https://www.docker.com/) et Docker Compose installés et lancés.

```bash
docker compose up -d
```

Cette seule commande suffit : elle télécharge l'image PostgreSQL 16, crée la
base `la_remise`, puis exécute automatiquement `migration_up.sql` (création
des tables) et `seed.sql` (données de test) au premier démarrage.


```

Tu dois voir les lignes `CREATE TYPE`, `CREATE TABLE` puis les `INSERT`
s'exécuter sans erreur, jusqu'à `database system is ready to accept connections`.

Pour explorer les données visuellement (interface web) :

```bash
# ouvrir http://localhost:8080 dans un navigateur
```

Connexion Adminer :
- Système : `PostgreSQL`
- Serveur : `db`
- Utilisateur : `laremise`
- Mot de passe : `laremise`
- Base de données : `la_remise`

## Réinitialiser complètement la base

Si tu modifies les scripts SQL et veux repartir de zéro :

```bash
docker compose down -v
docker compose up -d
```

## Tester le cycle up → down → up

```bash
docker compose exec -T db psql -U laremise -d la_remise -f - < migration_down.sql
docker compose exec -T db psql -U laremise -d la_remise -f - < migration_up.sql
docker compose exec -T db psql -U laremise -d la_remise -f - < seed.sql
```

## Rejouer les requêtes métier

```bash
docker compose exec -T db psql -U laremise -d la_remise -f - < queries.sql
```

## Structure du dépôt

```
adatabase/
  ├── README.md — comment initialiser la base en trois commandes
  ├── docker-compose.yml
  ├── conception/
  │   ├── dictionnaire.md
  │   ├── decisions.md
  │   ├── schema-ea.png
  │   ├── schema-relationnel.md
  │   └── arbre-dependances.png
  ├── migration_up.sql
  ├── migration_down.sql
  ├── seed.sql
  └── queries.sql
```

## Stack technique

- **Docker Compose** — orchestration de la base + Adminer
- **Adminer** — interface web d'exploration des données (http://localhost:8080)

## Problèmes rencontrés:

- mise en forme 
