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
    <div class="header-content">
        <div class="header-title">
            <h1>TI2 | Livre d'or</h1>

            <?php if (isset($_GET['merci'])): ?>
                <p class="success-message">
                    Merci, votre commentaire a bien été ajouté.
                </p>
            <?php else: ?>
                <p>Laissez une trace de votre passage !!</p>
            <?php endif; ?>
        </div>

        <div class="theme-controls">
            <button type="button" class="theme-btn" data-theme="green">Vert</button>
            <button type="button" class="theme-btn" data-theme="red">Rouge</button>
            <button type="button" class="theme-btn" data-theme="gold">Gold</button>
            <button type="button" class="theme-btn" data-theme="blue">Bleu</button>
            <button type="button" class="theme-btn" data-theme="purple">Violet</button>
        </div>
    </div>
</header>

<div class="book-wrapper">
    <img id="themeImage" src="img/waifbook.png" alt="Livre d'or waifu">
</div>

<form id="messageForm" class="form-card" method="POST" action="" novalidate>

    <div class="form-group">
        <label class="firstname" for="firstname">Prénom</label>
        <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Écrivez votre prénom"
        >
    </div>
    <small class="field-error" id="firstnameError"></small>

    <div class="form-group">
        <label for="lastname">Nom</label>
        <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Écrivez votre nom"
        >
    </div>
    <small class="field-error" id="lastnameError"></small>

    <div class="form-group">
        <label for="usermail">É-mail</label>
        <input
            type="email"
            name="usermail"
            id="usermail"
            placeholder="Écrivez votre èmail"
        >
    </div>
    <small class="field-error" id="usermailError"></small>

    <div class="form-group">
        <label for="postcode">Code Postal</label>
        <input
            type="text"
            name="postcode"
            id="postcode"
            placeholder="Écrivez votre code postal"
        >
    </div>
    <small class="field-error" id="postcodeError"></small>

    <div class="form-group">
        <label for="phone">Téléphone</label>
        <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Écrivez votre numéro de téléphone"
        >
    </div>
    <small class="field-error" id="phoneError"></small>

    <div class="form-group">
        <label for="message">Message</label>
        <textarea
            name="message"
            id="message"
            maxlength="300"
            placeholder="Écrivez votre message"
        ></textarea>
    </div>
    <small class="field-error" id="messageError"></small>
    <small id="messageCounter" class="message-counter">0 / 300 caractères</small>

    <div class="box-accord">
    <input type="checkbox" name="accord" id="case" required>
    <label for="case">Acceptez-vous que vos données soient stockées ?</label>
</div>

<small class="field-error" id="accordError"></small>

    <br>

    <button type="submit">Envoyer le message</button>

    <br>
</form>

<div class="message-container">

    <?php if (!empty($messages)): ?>
        <ul class="comments-list">
            <?php foreach ($messages as $message): ?>
                <li class="commentaire-card">
                    <p class="comment-name">
                        <strong><?= htmlspecialchars($message['firstname']) ?></strong>
                        <strong><?= htmlspecialchars($message['lastname']) ?></strong>
                    </p>

                    <p class="comment-usermail">
                        <em><?= htmlspecialchars($message['usermail']) ?></em>
                    </p>

                    <?php
                    $date = new DateTime($message['datemessage']);

                    $jours = [
                        1 => 'lundi',
                        2 => 'mardi',
                        3 => 'mercredi',
                        4 => 'jeudi',
                        5 => 'vendredi',
                        6 => 'samedi',
                        7 => 'dimanche'
                    ];

                    $mois = [
                        1 => 'janvier',
                        2 => 'février',
                        3 => 'mars',
                        4 => 'avril',
                        5 => 'mai',
                        6 => 'juin',
                        7 => 'juillet',
                        8 => 'août',
                        9 => 'septembre',
                        10 => 'octobre',
                        11 => 'novembre',
                        12 => 'décembre'
                    ];
                    ?>

                    <p class="comment-meta">
                        <em>
                            Posté le
                            <?= $jours[(int)$date->format('N')] ?>
                            <?= $date->format('d') ?>
                            <?= $mois[(int)$date->format('n')] ?>
                            <?= $date->format('Y') ?>
                            à
                            <?= $date->format('H:i') ?>
                        </em>
                    </p>

                    <p class="comment-text">
                        <?= nl2br($message['message']) ?>
                    </p>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>

    <div class="comments-count">
        <?php if ($countMessages === 0): ?>
            <h3>Pas encore de commentaire</h3>
        <?php elseif ($countMessages === 1): ?>
            <h3>Il y a 1 commentaire</h3>
        <?php else: ?>
            <h3>Il y a <?= $countMessages ?> commentaires</h3>
        <?php endif; ?>
    </div>

</div>

<div class="pagination">
    <?= $pagination ?>
</div>

<script src="js/validation.js"></script>
</body>
</html>