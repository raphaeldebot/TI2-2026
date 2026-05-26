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
<script src="js/jquery-3.7.1.min.js"></script>
</head>
<body>
    <header>
        <h1>TI2 | Livre d'or</h1>
    
    <?php if (isset($_GET['merci'])): ?>
        <p class="success-message">
            Merci, votre commentaire a bien été ajouté.
        </p>
        <?php else :?>
        <p> Laissez une trace de votre passage !!</p>
    <?php endif; ?>
    </header>

    <div>
        <img src="img/waifbook.png" alt="">
    </div>
<!-- Formulaire d'ajout d'un message -->
<form id="messageForm" class="form-card" method="POST" action="" novalidate>
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
            <small class="field-error" id="usermailError"></small>
        </div>

        <div class="form-group">
            <label for="postcode">Code Postal</label>
            <input
                type="texte"
                name="postcode" 
                id="postcode"
            >
            <small class="field-error" id="postcodeError"></small>
        </div>

        <div class="form-group">
            <label for="phone">Télephone</label>
            <input
                type="texte"
                name="phone" 
                id="phone"
            >
            <small class="field-error" id="phoneError"></small>
        </div>

        <div class="form-group">
            <label for="message">Message</label>
            <textarea 
                name="message" 
                id="message"
            ></textarea>
            <small class="field-error" id="messageError"></small>
        </div>

        <button type="submit">Envoyer le message</button>
    </form>

<?php if ($countMessages === 0): ?>

        <h3>Pas encore de commentaire</h3>

    <?php elseif ($countMessages === 1): ?>

        <h3>Il y a 1 commentaire</h3>

    <?php else: ?>

        <h3>Il y a <?= $countMessages ?> commentaires</h3>

    <?php endif; ?>
<!-- Pagination (BONUS) -->

<?php if (!empty($messages)): ?>
        <ul class="comments-list">
            <?php foreach ($messages as $message): ?>
                <li class="commentaire-card">
                    <p class="comment-name"><strong><?= htmlspecialchars($message['firstname']) ?></strong> <strong><?= htmlspecialchars($message['lastname']) ?></strong> </h3>

                    <p class="comment-usermail">
                        <p><em><?= htmlspecialchars($message['usermail']) ?></em></p>
                    </p>


                    <p class="comment-meta">
                        <p><em><?= htmlspecialchars($message['datemessage']) ?></em></p>
                    </p>

                    <p class="comment-text">
                        <?= htmlspecialchars($message['message']) ?>
                    </p>
            </li>
            <?php endforeach; ?>
            </ul>
    <?php endif; ?>
    <p class="pagination">
<?php echo $pagination ?></p>
<script src="js/validation.js"></script>
</body>
</html>

