<?php
# public/index.php

/*
 * Chargement des dépendances
 */
// chargement de configuration
require_once "../config.php";
// chargement du modèle de la table guestbook
require_once URL_BASE . "/model/guestbookModel.php";


/*
 * Connexion à la base de données en utilisant PDO
 * Avec un try catch pour gérer les erreurs de connexion
 * Utilisez les constantes de config.php
 * Activez le mode d'erreur de PDO à Exception et
 * le mode fetch à tableau associatif
 */
try{
    $connectDB = new PDO(
        dsn: MARIA_DSN,
        username: DB_LOGIN, 
        password: DB_PWD,
        options:[
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]
        );

        $connectDB->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

}catch(Exception $e){
    // arrêt et affichage de l'erreur (en dev)
    die($e->getMessage());
}


/*
 * Si le formulaire a été soumis
 */

$addGuestbook = false;
if(isset($_POST['firstname'],$_POST['lastname'],$_POST['usermail'],$_POST['phone'],$_POST['postcode'],$_POST['message'])){
// on appelle la fonction d'insertion dans la DB (addGuestbook())
    $addGuestbook=addGuestbook($connectDB,$_POST['firstname'],$_POST['lastname'],$_POST['usermail'],$_POST['phone'],$_POST['postcode'],$_POST['message']);

}
if ($addGuestbook) {
        header("Location: ./?&merci=1");
        exit;
    } 

// si l'insertion a réussi

// on redirige vers la page actuelle (ou on affiche un message de succès)

// sinon, on affiche un message d'erreur

/*
 * On récupère les messages du livre d'or
 */

// on appelle la fonction de récupération de la DB (getAllGuestbook())

//$messages = getAllGuestbook($connectDB);
$countMessages = getNbTotalGuestbook($connectDB);

if(isset($_GET[PAGINATION_GET])){
        $page = (int) $_GET[PAGINATION_GET];
    }else{
        $page = 1;
    }

    // récupération de $comments en utilisant la fonction de pagination
    $messages = getGuestbookPagination($connectDB,$page,PAGINATION_NB);
$pagination = pagination($countMessages,'./',PAGINATION_GET,$page,PAGINATION_NB);   

/*********************
 * Ou Bonus Pagination
 *********************/

// on vérifie sur quelle page on est (et que c'est un string qui contient que des numériques sans "." ni "-" => ctype_digit) en utilisant la variable $_GET et les constantes de config.php

# on compte le nombre total de messages (SQL)

# on récupère la pagination

# pour obtenir le $offset pour les messages (calcul)

# on veut récupérer les messages de la page courante

/**************************
 * Fin du Bonus Pagination
 **************************/

// Appel de la vue

// include URL_BASE . "/view/guestbookView.php";

/*
 * Front Controller de la gestion du livre d'or
 */


    //  on charge la page d'accueil
    include URL_BASE."/view/guestbookView.php";




// fermeture de la connexion (bonne pratique)
