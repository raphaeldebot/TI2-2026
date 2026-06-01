<?php
# model/guestbookModel.php
/********************************
 * Model de la page livre d'or
 *******************************/

// INSERTION d'un message dans le livre d'or

/**
 * @param PDO $db
 * @param string $firstname
 * @param string $lastname
 * @param string $usermail
 * @param string $phone
 * @param string $postcode
 * @param string $message
 * @return bool
 * Fonction qui insère un message dans la base de données 'ti2web2026' et sa table 'guestbook'
 * Renvoie true si l'insertion a réussi, false sinon
 * Une requête préparée est utilisée pour éviter les injections SQL
 * Les données sont échappées pour éviter les injections XSS (protection backend)
 */
function addGuestbook(PDO $db,
                    string $firstname,
                    string $lastname,
                    string $usermail,
                    string $phone,
                    string $postcode,
                    string $message
): bool
{
    // traitement des données backend (SECURITE)
    $usermail   =   filter_var($usermail,FILTER_VALIDATE_EMAIL);
    $firstname  =   htmlspecialchars(trim(strip_tags($firstname)));
    $lastname   =   htmlspecialchars(trim(strip_tags($lastname)));
    $phone      =   htmlspecialchars(trim(strip_tags($phone)));
    $postcode   =   htmlspecialchars(trim(strip_tags($postcode)));
    $message    =   htmlspecialchars(trim(strip_tags($message)));


    // si pas de données complètes ou ne correspondant pas à nos attentes, on renvoie false
    // vérification É-mail
    if
      ($usermail===false                ||
    strlen($usermail)       >   200     ||
    // vérification prénom
    empty($firstname)                   ||
    strlen($firstname)      >  100      ||
    // vérification nom
    empty($lastname)                    ||
    strlen($lastname)       >   100     ||
    // vérification message
    empty($message)                     ||
    strlen($message)        <   5       ||
    strlen($message)        >   500

     
    ) return false;

    
    // Validation code postal belge : 4 chiffres entre 1000 et 9999
        if (!preg_match('/^\d{4}$/', $postcode)) return false;
        $postcodeInt = (int)$postcode;
        if ($postcodeInt < 1000 || $postcodeInt > 9999) return false;
    
        // Validation du numéro de téléphone : +32 || 0032 || 04
        if (!preg_match('/^(\+32|0032|0)4\d{8}$/', $phone)) return false;

    // requête préparée obligatoire !

    $prepare = $db->prepare("
    INSERT INTO `guestbook`(    
                            `usermail`,
                            `firstname`,
                            `lastname`,
                            `phone`,
                            `postcode`,
                            `message`
                            )
    VALUES( 
            :usermail,
            :firstname,
            :lastname,
            :phone,
            :postcode,
            :message); 
    ");

    $prepare->bindValue(':usermail',$usermail);
    $prepare->bindValue(':firstname',$firstname);
    $prepare->bindValue(':lastname',$lastname);
    $prepare->bindValue(':phone',$phone);
    $prepare->bindValue(':postcode',$postcode);
    $prepare->bindValue(':message',$message);

    // envoi de la requete
    $retour=$prepare->execute();

    // si l'insertion a réussi on renvoie true. sinon, on renvoie false.
    return $retour;
    // 


    // 



}

/***************************
 * Sans le Bonus Pagination
 **************************/

// SELECTION de messages dans le livre d'or par ordre de date croissante
/**
 * @param PDO $db
 * @return array
 * Fonction qui récupère tous les messages du livre d'or par ordre de date croissante
 * venant de la base de données 'ti2web2026' et de la table 'guestbook'
 * Si pas de message, renvoie un tableau vide
 */
function getAllGuestbook(PDO $db): array
{
    // try catch
    // si la requête a réussi,
    // bonne pratique, fermez le curseur
    // renvoyer le tableau de(s) message(s)

    $stmt=$db->query("SELECT * FROM `guestbook` ORDER BY `datemessage` DESC");
// un tableau avec les results
    $result= $stmt-> fetchAll(PDO::FETCH_ASSOC);

// Bonne pratique 
    $stmt->closeCursor();
// retour du tableau
    return $result;

}

/**************************
 * Pour le Bonus Pagination
 **************************/

// SELECTION du nombre total de messages
/**
 * @param PDO $db
 * @return int
 * Fonction qui compte le nombre total de messages dans la table 'guestbook'
 */
function getNbTotalGuestbook(PDO $db): int
{
    $stmt = $db->query("SELECT COUNT(*) AS count FROM guestbook");
    return (int) $stmt->fetch()['count'];
    // bonne pratique, fermez le curseur,
    // renvoyez le nombre total de messages


}
// SELECTION de messages dans le livre d'or par ordre de date croissante
// en lien avec la pagination
/**
 * @param PDO $db
 * @param int $pageActu = 1
 * @param int $limit = 5
 * @return array
 * Fonction qui récupère les messages du livre d'or par ordre de date croissante
 * venant de la base de données 'ti2web2026' et de la table 'guestbook'
 * en utilisant une requête préparée (injection SQL), n'affiche que les messages
 * de la page courante
 */
function getGuestbookPagination(PDO $db, int $pageActu=1, int $limit=5): array
{
    // pour touver l'offset (départ)
    $offset = ($pageActu - 1) * PAGINATION_NB;
    $limit = PAGINATION_NB;

    // préparation de la requête
    $sql = "SELECT * FROM `guestbook` ORDER BY `datemessage` DESC LIMIT :offset, :limit;";
    $stmt = $db->prepare($sql);
    // on passe les variables à lar requêtes, ! ils doivent passer au format integer !
    $stmt->bindValue("offset",$offset,PDO::PARAM_INT);
    $stmt->bindValue("limit",$limit,PDO::PARAM_INT);
    $stmt->execute();
    $return = $stmt->fetchAll();
    $stmt->closeCursor();
    return $return;
    // Requête préparée obligatoire !
    // Le $offset et le $limit sont des entiers, il faut donc les passer
    // en paramètres de la requête préparée en tant qu'entiers !
    // si la requête a réussi,
    // bonne pratique, fermez le curseur
    // renvoyer le tableau de(s) message(s) (vide si pas de résultats)
}

# Pour afficher la pagination dans la vue
// FONCTION de pagination
/**
 * @param int $nbtotalMessage
 * @param string $url
 * @param string $get
 * @param int $pageActu
 * @param int $perPage
 * @return string
 * Fonction qui génère le code HTML de la pagination
 * si le nombre de pages est supérieur à une.
 */
function pagination(int $nbtotalMessage, string $url="./?", string $get="page", int $pageActu=1, int $perPage=5 ): string
{
    $sortie = "";
    if ($nbtotalMessage === 0) return "";
    $nbPages = ceil($nbtotalMessage / $perPage);
    if ($nbPages == 1) return "";
    $sortie .= "<p>";
    for ($i = 1; $i <= $nbPages; $i++) {
        if ($i === 1) {
            if ($pageActu === 1) {
                $sortie .= "<< < 1 |";
            } elseif ($pageActu === 2) {
                $sortie .= " <a href='$url'><<</a> <a href='$url'><</a> <a href='$url'>1</a> |";
            } else {
                $sortie .= " <a href='$url'><<</a> <a href='$url?&$get=" . ($pageActu - 1) . "'><</a> <a href='$url'>1</a> |";
            }
        } elseif ($i < $nbPages) {
            if ($i === $pageActu) {
                $sortie .= "  $i |";
            } else {
                $sortie .= "  <a href='$url?&$get=$i'>$i</a> |";
            }
        } else {
            if ($pageActu >= $nbPages) {
                $sortie .= "  $nbPages > >>";
            } else {
                $sortie .= "  <a href='$url?&$get=$nbPages'>$nbPages</a> <a href='$url?&$get=" . ($pageActu + 1) . "'>></a> <a href='$url?&$get=$nbPages'>>></a>";
            }
        }
    }
    $sortie .= "</p>";
    return $sortie;

}