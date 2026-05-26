<?php
# view/guestbookView.php
?>
<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TI2 | Livre d'or</title>
    <link rel="icon" type="image/png" href="img/favicon.png">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<h1>TI2 | Livre d'or</h1>
<!-- Formulaire d'ajout d'un message -->
<form id="commentForm" class="form-card" method="POST" action="" novalidate>
        <h2>Votre avis sur ma passion</h2>

        <div class="form-group">
            <label for="firstname">Prénom</label>
            <input 
                type="texte" 
                name="firstname" 
                id="firstname" 
            >
            <small class="field-error" id="firstnameError"></small>
        </div>

        <div class="form-group">
            <label for="lastname">Nom</label>
            <input 
                type="text" 
                name="lastname" 
                id="lastname" 
            >
            <small class="field-error" id="lastnameError"></small>
        </div>

        <div class="form-group">
            <label for="usermail">É-mail</label>
            <input 
                type="texte" 
                name="usermail" 
                id="usermail"
            >
            <small class="field-error" id="titleError"></small>
        </div>

        <div class="form-group">
            <label for="postcode">Code Postal</label>
            <input
                type="texte"
                name="postcode" 
                id="postcode"
            >
            <small class="field-error" id="textCommentError"></small>
        </div>

        <div class="form-group">
            <label for="phone">Télephone</label>
            <input
                type="texte"
                name="phone" 
                id="phone"
            >
            <small class="field-error" id="textCommentError"></small>
        </div>

        <div class="form-group">
            <label for="message">Message</label>
            <textarea 
                name="message" 
                id="message"
            ></textarea>
            <small class="field-error" id="textCommentError"></small>
        </div>

        <button type="submit">Envoyer le message</button>
    </form>
<!-- Si pas de message -->
<h3>Pas encore de message</h3>
<!-- Si 1 message -->
<h3>Il y a 1 message</h3>
<!-- Si plusieurs messages -->
<h3>Il y a X messages</h3>

<!-- Pagination (BONUS) -->

<!-- Liste des messages -->
<ul>
    <li>
        <p><strong>firstname lastname</strong></p>
        <p><em>datemessage</em></p>
        <p>message</p>
    </li>
    <!-- Autres messages -->
    <li>
        <p><strong>firstname lastname</strong></p>
        <p><em>datemessage</em></p>
        <p>message</p>
    </li>
</ul>
etc ...
<!-- Pagination (BONUS) -->
<?php
// À commenter quand on a fini de tester
echo "<h3>Nos var_dump() pour le débugage</h3>";
echo '<p>$_POST</p>';
var_dump($_POST);
echo '<p>$_GET</p>';
var_dump($_GET);
var_dump($connectDB);
?>

<script src="js/validation.js"></script>
</body>
</html>

