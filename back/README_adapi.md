## Adapi est la suite du projet adatabase. 
le contexte est une recyclerie. 
Nous avons créé une base de données (adatabase)
Le projet Adapi va servir de serveur à cette base de données afin de pouvoir communiquer avec elle.
On va tester que le serveur communique bien avec la base de donnée afin de retransmettre les données au client .

## Mon projet se base sur l'architecture suivante:
- un dossier conception dans lequel nous avons créé
un schema ea, un arbre de dépendances, un schema-relation, un dictionnaire
ce dossier etait utile pour la conception de la base de données
- le fichier .env ( caché permettant l'enregistrement des données 
sensibles telles que ID, MP nom de la base de données et le 
port utilisé)
- un dossier db: contenant les migrations (lancement docker)
ainsi que le fichier seed pour récupérer la base de données)
- le fichier server qui permet d'importer le autres fichiers et 
l'écoute du port du serveur
- un fichier route qui servira de fichier principal des requêtes 
inscrite dans le dossier route
- le dossier route avec 5 fichiers requêtes qui renvoient à la route principale
- un fichier docker qui va contacter postgresql pour récupérer les bases de données

## La gestion des imprévus.
 il a fallu gérer plusieurs problèmes:
- bien lancer docker et npm run dev afin de ne pas avoir d'erreur serveur (500)
- bien penser au niveau de la gestion des routes, bien les importer sur la route principale
- le client doit faire les bonnes demandes. si pas de réponse positive du serveur le client recevra une erreur 400

## Que manque t'il?
Il manque toute la partie front-end pour un rendu plus agréable au client

