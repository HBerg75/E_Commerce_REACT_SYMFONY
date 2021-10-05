## Index
1. Infos générales
2. Fonctionnalités
3. Installation
4. Utilisation
5. Prérequis
6. Fonctions / commandes utiles
___
## 1) Infos générales
- Nom du projet : E-commerce
- Statut du projet : Fini
    - Version : 1.0
- Auteurs: 
    - Aurélien Jussaume ( linkedin : https://www.linkedin.com/in/aurelien-jussaume/ )
    - Zino Idiri ( linkedin : https://www.linkedin.com/in/zino-idiri-b5b85a20b/ )
    - Yanis Benhagouga ( linkedin : https://www.linkedin.com/in/yanis-benhagouga-50782120a/ )
    - Christopher Debray  ( linkedin : https://www.linkedin.com/in/christopher-debray/ )
    - Julien Ranson ( linkedin : https://www.linkedin.com/in/julien-ranson/ )
- Compétences apprises
    - Création d'API en symfony
    - Utilisation d'une API avec un framework front ( ici REACT )
___
## 2) Fonctionnalités
#### FRONT-END ( Se servant de l'API pour récupérer et envoyer des données )
- L'affichage pour chaque produit contient :
    - Une image du produit
    - Une description du produit ( tooltip )
    - Le nom du produit
    - Le prix
    - Réduction ( si il y en a )
    - Le résultat du prix avec la réduction
    - Catégorie du produit
    - Les différentes plateformes sur lesquelles le produit est disponible
- Page d'accueil avec :
    - Affichage des derniers produits ajoutés
    - Affichage de certains jeux en promotions 
- Listing de tous les produits disponible
- Listing des produits en fonction de la catégorie choisie
- Listing des produits en fonction de la plateforme choisie
- Inscription
- Connexion 
- Déconnexion
- Possibilité de sauvegarder son moyen de paiement
- Possibilité de sauvegarder son adresse de livraison
- Si connecté sur un compte administrateur :
    - Possibilité de voir tous les produits
    - Possibilité de supprimer un produit
#### BACK-END ( API faite en symfony ) 
- Voici les différentes routes , avec en départ le type de route :
    - POST :  /users/new  ( Créer un utilisateur )
    - POST :  /users/login  ( Cherche un utilisateur correspondant à l'email fournis puis compare les mots de passes, si il y à correspondance, retourne une réponse correspondant à l'id de l'utilisateur. Sert pour la connexion )
    
    - POST :  /user/address/get  ( Récupère la section address d'un utilisateur )
    - POST :  /user/address/new  ( Créer une section address avec la table user_address pour un utilisateur, autrement dit sauvegarde l'adresse / téléphone, etc de l'utilisateur )
    - POST :  /user/address/update  ( Modifie la section address d'un utilisateur en récupérant la section address correspondante au compte de l'email fourni )

    - POST :  /user/payement/get  ( Récupère la section payement d'un utilisateur )
    - POST :  /user/payement/new  ( Créer une section payement avec la table user_payement pour un utilisateur, autrement dit sauvegarde le moyen de paiement de l'utilisateur )
    - POST :  /user/payement/update  ( Modifie la section payement d'un utilisateur en récupérant la section payement correspondante au compte de l'email fourni )

    - GET :  /tous_les_jeux  ( Récupère tous les jeux )
    - GET :  /product/delete/{id}  ( Supprime un jeu, {id} correspond à l'id du jeu que l'on veut supprimer )

    - POST :  /games_by_platform  ( Récupère les jeux par plateforme )

    - GET :  /allCategories  ( Récupère toutes les catégories )
    - POST :  /games  ( Récupère les jeux par catégorie )

- Coté administrateur ( via le serveur de l'api ) :
    - Possibilité de **créer, modifier, voir, supprimer** :
        - Un utilisateur
        - Une catégorie
___
## 3) Installation
Suivez bien les étapes ci-dessous !
###  Étape 1 : Clonner le dossier
###  Étape 2 : installation des dépendances
- Déplacez vous dans votre dossier API :
    - Ouvrez un terminal et lancez la commande : composer install
    - Modifiez le fichier .env à la racine de votre dossier API : 
        - Modifiez la ligne suivante ( ligne 26 normalement ) :  DATABASE_URL="mysql://USER:PASSWORD@127.0.0.1:3306/DB?serverVersion=5.7"
            - Changer USER par votre nom d'utilisateur utilisé pour vous connecter à PHPMyAdmin
            - Changer PASSWORD par votre mot de passe utilisé pour vous connecter à PHPMyAdmin
            - Changer DB par le nom de de la base de données ( normalement :  club_emp_test )
- Déplacez vous dans votre dossier e-commerce :
    - Ouvrez un terminal et lancez la commande : npm install
###  Étape 3 : création de la base de données
- Créer une base de données du nom de ecommerce
***Option 1 ( Plus simple pour tester le site ) : ***
- Importez la base de données avec le fichier :  ecommerce.sql
- Cette option est plus utile car les talbes contiennent certaines données , quelques produits et les utilisateurs :
    - ( ChristopherDebray@outlook.fr , test@test.fr, admin@outlook.fr (compte administrateur) )
    - Le mot de passe de ces utilisateurs est :   yyyyyy
***Option 2 ( Pour vérifier les migrations ) : ***
- Dans le dossier API , lancez la commande :  php bin/console doctrine:migrations:migrate
    - Cette commande ajoutera les tables à votre base de données et vous permettra d'utiliser le projet **LES TABLES SERONT VIDES**
___
## 4) Utilisation
- Ouvrir un terminal dans le dossier API :
    - Lancer la commande :  symfony serve
        - Cela lancera le serveur de l'API sur le port :  https://127.0.0.1:8000 
- Ouvrir un terminal dans le dossier e-commerce :
    - Lancer la commande :  npm start
        - Cela lancera l'application REACT ( le site ) sur le port :  http://localhost:3000
        - Le navigateur s'ouvrira normalement automatiquement afin de montrer le site , si cela n'est pas le cas, allez sur l'url : http://localhost:3000
___
## 5) Prérequis
- PHP 
- MySQL
- Symfony, REACT
- Composer ( SYMFONY : Pour installer les dépendances de composer ), Node ( REACT : Pour lancer les commande npm )
___
## 6) Fonctions / commandes utiles
- Si vous n'importez pas la base de données il n'y aura aucun administrateur ! Pour en créer un il faut :
    - Aller sur phpMyAdmin dans la base de données ecommerce 
    - Puis dans la table user :
        - Sur l'un des utilisateur existant modifier le role en : ["ROLE_ADMIN"] **Cela doit être impérativement des guillement double !**

- Pour le symfony :
    - php bin/console make:migration  // Créer la migration pour fabriquer la table
    - php bin/console doctrine:migrations:migrate  // Utilise les migrations pour créer les tables
## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

