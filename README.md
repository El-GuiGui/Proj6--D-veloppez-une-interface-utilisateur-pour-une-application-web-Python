# Instructions pour projet : Développez une interface utilisateur pour une application web Python
**Instruction** :
Ce projet a pour but de développer une application web pour JustStreamIt. L'objectif est de fournir une plateforme permettant de visualiser en temps réel un classement de films intéressants, s'appuyant sur une API maison, OCMovies-API. 
Le site web devra être fidèle à la maquette fournie, compatible avec les principaux navigateurs (et pour les formats les plus communs : mobile, tablette et desktop) et facilement maintenable !

## Configuration de l'Environnement et prérequis :

**Installation et exécution de l'application :** 

1 - Clonez le dépôt de code de l'api à l'aide de la commande : (vous pouvez également télécharger l'archive au format zip)
  ```bash
  git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
  ```
2 - Rendez-vous depuis un terminal à la racine du répertoire ocmovies-api-fr avec la commande : 

  ```bash
  cd ocmovies-api-fr
  ```
3 - Créez un environnement virtuel pour le projet avec pour windows :
  ```bash
  python -m venv env
  ```
  ou sous macos et linux :
  ```bash
  python3 -m venv env
  ```
4 - Activez l'environnement virtuel sous windows avec :
  ```bash
  env\Scripts\activate
  ```
  ou sous macos et linux :
  ```bash
  env/bin/activate
  ```
5 - Installez les dépendances du projet avec la commande :
  ```bash
  pip install -r requirements.txt
  ```
6 - Créez et alimentez la base de données avec la commande :
  ```bash
  python manage.py create_db
  ```
7 - Démarrez le serveur avec :
  ```bash
  python manage.py runserver
  ```


- Lorsque le serveur fonctionne, après l'étape 7 de la procédure, l'API OCMovies peut être interrogée à partir des points d'entrée commençant par l'url de base
  ```bash
  http://localhost:8000/api/v1/
  ```
  Le point d'entrée principal permettant de consulter les films est :
  ```bash
  http://localhost:8000/api/v1/titles.
  ```
Si vous accédez à cette url depuis un navigateur, ce dernier vous présentera une interface navigable servant de documentation et de laboratoire d'expérimentation.

**Les étapes 1 à 6 ne sont requises que pour l'installation initiale. Pour les lancements ultérieurs du serveur de l'API, il suffit d'exécuter les étapes 4 et 7 à partir du répertoire racine du projet.** 



## Accès à l'interface web :

Téléchargez le repository ici présent et assuré vous d'avoir bien le dossier images et les fichiers HTML, CSS et JS !
Vous pouvez les ajouter directement à la racine du dossier : ocmovies-api-fr ou au dossier parent !
Une fois fait et le serveur près, il suffit simplement d'ouvrir le fichier HTML dans n'importe quel navigateur. 

La mise en œuvre est simple, le style est automatiquement appliqué avec le css et la communication avec l'api se fait avec le fichier JS.

## Note :
Je rajoute ici les rapports du validateur en ligne w3C pour certifier la qualité du code.
- https://validator.w3.org/

![image](https://github.com/El-GuiGui/Proj6--Developpez-une-interface-utilisateur-pour-une-application-web-Python/assets/148984263/5afbf476-868d-4749-9c43-0a47d882b88f)

- https://jigsaw.w3.org/css-validator/validator

![image](https://github.com/El-GuiGui/Proj6--Developpez-une-interface-utilisateur-pour-une-application-web-Python/assets/148984263/0ab9d1fd-db90-48ba-972b-33401ec7077b)


