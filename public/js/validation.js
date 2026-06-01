/* ============================================================================
   TRAVAIL D'INTÉGRATION JAVASCRIPT / jQuery
   Gestion d'un formulaire de contact + Dark Mode
   ============================================================================

   OBJECTIF GÉNÉRAL
   ----------------
   Créer une page contenant un formulaire de contact validé côté client en
   jQuery, avec un système de bascule entre mode clair et mode sombre.
   L'envoi final est géré par PHP qui affiche un message de retour.

   ============================================================================
   PARTIE 1 — STRUCTURE HTML À PRÉVOIR
   ============================================================================

   Vous devez créer un formulaire contenant AU MINIMUM les champs suivants :

     - Nom               (input text)
     - Prénom            (input text)
     - Email             (input email)
     - Code postal belge (input text)
     - Numéro de téléphone belge (input text)
     - Message           (textarea)
     - Bouton d'envoi    (button submit)

   Prévoir également :
     - Une zone <div id="messages"></div> en HAUT du formulaire pour afficher
       les messages d'erreur (rouge) ou de succès (vert).
     - Un bouton <button id="toggle-theme"></button> pour basculer le thème.

   ============================================================================
   PARTIE 2 — VALIDATION JAVASCRIPT (jQuery OBLIGATOIRE)
   ============================================================================

   Au clic sur le bouton d'envoi, vérifier CHAQUE champ.
   Si un champ ne respecte pas sa condition, afficher un message EN ROUGE
   en haut du formulaire, dans la zone #messages.
   Si TOUS les champs sont valides, afficher un message EN VERT et envoyer
   le formulaire (qui sera traité par PHP — voir partie 3).

   --- RÈGLES DE VALIDATION ---

   1) Nom et Prénom
      - Champs obligatoires (non vides)
      - Au moins 2 caractères

   2) Email
      - Champ obligatoire
      - Doit respecter le format d'une adresse email valide
        (utiliser une expression régulière — regex)

   3) Code postal belge
      - 4 chiffres exactement
      - Compris entre 1000 et 9999

   4) Numéro de téléphone belge
      - Doit accepter les formats suivants :
          • 0470123456
          • 0470 12 34 56
          • +32 470 12 34 56
          • 0032470123456
      - Indice : nettoyer la chaîne (enlever espaces, tirets, points)
        AVANT de tester avec une regex

   5) Message
      - Champ obligatoire
      - Au moins 10 caractères

   --- AFFICHAGE DES MESSAGES ---

   - Tous les messages d'erreur s'affichent dans la zone #messages,
     en haut du formulaire.
   - Couleur rouge pour les erreurs, couleur verte pour le succès.
   - Vider la zone à chaque nouvelle tentative d'envoi.

   ============================================================================
   PARTIE 3 — TRAITEMENT CÔTÉ PHP
   ============================================================================

   Si tous les champs sont valides, le formulaire est envoyé à un script PHP.
   Ce script doit afficher :

     - "Merci pour votre nouveau message" en VERT si l'envoi a réussi.
     - "Problème lors de l'envoi du message" en ROUGE si l'envoi a échoué.

   Note : pour cet exercice, le PHP peut simuler la réussite/échec
   (par exemple, vérifier que les variables $_POST sont bien remplies).

   ============================================================================
   PARTIE 4 — DARK MODE
   ============================================================================

   Créer un bouton qui permet de basculer entre deux thèmes :

     ☀️ Mode clair  → body avec fond BLANC
     🌙 Mode sombre → body avec fond NOIR

   COMPORTEMENT DU BOUTON :
   - Le texte du bouton change dynamiquement :
       • "🌙 Dark Mode"  quand on est en mode clair (clic = passer en sombre)
       • "☀️ White Mode" quand on est en mode sombre (clic = passer en clair)
   - L'icône doit correspondre au mode vers lequel on bascule.

   IMPLÉMENTATION SUGGÉRÉE :
   - Utiliser une classe CSS (ex : .dark-mode) sur le <body>.
   - Faire le toggle de cette classe en jQuery avec .toggleClass().
   - Mettre à jour le texte du bouton après chaque toggle.

   ============================================================================
   PARTIE 5 — BONUS
   ============================================================================

   Sur le champ "Message", limiter dynamiquement à 300 caractères MAXIMUM.

   Suggestions :
   - Utiliser l'attribut HTML maxlength="300" (rapide mais peu visuel)
   - OU mieux : afficher un compteur en temps réel sous le champ,
     du type "143 / 300 caractères", qui se met à jour à chaque frappe.
   - Bonus du bonus : passer le compteur en rouge quand il approche
     de la limite (par exemple à partir de 280 caractères).

   ============================================================================
   CRITÈRES D'ÉVALUATION
   ============================================================================

   - Utilisation correcte de jQuery (sélecteurs, événements, manipulation DOM)
   - Validation rigoureuse de tous les champs avec les bonnes regex
   - Affichage clair des messages d'erreur et de succès
   - Dark mode fonctionnel avec changement dynamique du texte/icône
   - Code propre, indenté et commenté
   - HTML sémantique et CSS soigné
   - Bonus implémenté (compteur de caractères)

   ============================================================================
   À RENDRE
   ============================================================================

   - script.js   (toute la logique jQuery)
   - traitement.php

   Bon travail !
   ========================================================================= */



// Regex
  const regexEmail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,6}$/;
  const regexPostcode = /^\d{4}$/;
  const regexPhone = /^(\+32|0032|0)4\d{8}$/;


$(function () {
    // On met le form dans une const
    const $form = $("#messageForm");

    // on met les champs dans des const
    const $firstname = $("#firstname")
    const $lastname = $("#lastname")
    const $usermail = $("#usermail")
    const $postcode = $("#postcode")
    const $phone = $("#phone")
    const $message = $("#message")
    const $accord = $("#case");
    const $accordE = $("#accordError");
    const $messageCounter = $("#messageCounter");
    const maxMessageLength = 300;

    // on met les valeur des champ dans des const
    const firstnameVal = $("#firstname").val().trim();
    const lastnameVal = $("#lastname").val().trim();
    const usermailVal = $("#usermail").val().trim();
    const postcodeVal = $("#postcode").val().trim();
    const phoneVal = $("#phone").val().trim();
    const messageVal = $("#message").val().trim();

    // on met les champ d'erreur dans des const
    const $firstnameE = $("#firstnameError");
    const $lastnameE = $("#lastnameError");
    const $usermailE = $("#usermailError");
    const $postcodeE = $("#postcodeError");
    const $phoneE = $("#phoneError");
    const $messageE = $("#messageError");

    // on créer notre fonction réutilisable pour afficher les erreur
    function showError($input, $error, message) {
    
    $input
        .removeClass("input-success")
        .addClass("input-error");

    $error
        .stop(true, true)
        .removeClass("success")
        .addClass("field-error")
        .hide()
        .text(message)
        .slideDown(200);
    }

    // on créer notre fonction réutilisable pour afficher les success
    function showSuccess($input, $error, message) {

        $input
            .removeClass("input-error")
            .addClass("input-success");

        $error
            .stop(true, true)
            .removeClass("field-error")
            .addClass("success")
            .text(message)
            .fadeIn(200);
    }

    // fonction pour valider le prénom
    function validateFirstname(){

        const firstnameVal = $firstname.val().trim();

        if (firstnameVal.length < 2) {
            showError($firstname, $firstnameE, "Le prenom doit contenir au moins 2 caractères.");
            return false;
        } else if (firstnameVal.length > 120) {
            showError($firstname, $firstnameE, "Le prenom ne peut pas dépasser 120 caractères.");
            return false;
        } else {
            showSuccess($firstname, $firstnameE, "Parfait");
            return true;
        }
    }

    // validation en temps réel du prénom
    $firstname.on("input",function(){

        validateFirstname();

    });
    
    // validation au submit du prénom
    $form.on("submit", function(event){

        const isValidFirstname = validateFirstname();

        if (!isValidFirstname){
            event.preventDefault();
        }
    })

    // fonction pour valider le prénom
    function validateLastname(){

        const lastnameVal = $lastname.val().trim();

        if (lastnameVal.length <= 1) {
            showError($lastname, $lastnameE, "Le nom doit contenir au moins 2 caractères.");
            return false;
        } else if (lastnameVal.length > 120) {
            showError($lastname, $lastnameE, "Le nom ne peut pas dépasser 120 caractères.");
            return false;
        } else {
            showSuccess($lastname, $lastnameE, "Parfait");
            return true;
        }
    }

    // validation en temps réel du prénom
    $lastname.on("input",function(){

        validateLastname();

    });
    
    // validation au submit du prénom
    $form.on("submit", function(event){

        const isValidLastname = validateLastname();

        if (!isValidLastname){
            event.preventDefault();
        }
    })

    // fonction pour la validation regex du mail
    function regexValidationUsermail(email) {
            const regexUsermail = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,6}$/;
            return regexUsermail.test(email);
        }
    // fonction pour validé l'email
    function validateUsermail(){
        const usermailVal = $usermail.val().trim();

        

        if (usermailVal === "") {
            showError($usermail, $usermailE, "L'email est obligatoire.");
            return false;
        } else if (!regexValidationUsermail(usermailVal)){
            showError($usermail, $usermailE, "L'email n'est pas valide.");
            return false;
        } else if (usermailVal.length > 120) {
            showError($usermail, $usermailE, "L'émail ne peut pas dépasser 120 caractères.");
            return false;
        } else {
            showSuccess($usermail, $usermailE, "Parfait");
            return true;
        }
    }

    // validation en temps réel du mail
    $usermail.on("input",function(){

        validateUsermail();

    });
    
    // validation au submit du mail
    $form.on("submit", function(event){

        const isValidUsermail = validateUsermail();

        if (!isValidUsermail){
            event.preventDefault();
        }
    })


    // fonction pour la validation regex du code postal
    function regexValidationPostcode(postcode) {

            const regexPostcode = /^\d{4}$/;

            return regexPostcode.test(postcode);

        }
    // fonction pour validé le code postal
    function validatePostcode(){

        const postcodeVal = $postcode.val().trim();

        if (postcodeVal === "") {
            showError($postcode, $postcodeE, "Le code postal est obligatoire.");
            return false;
        } else if (!regexValidationPostcode(postcodeVal)){
            showError($postcode, $postcodeE, "Le code postal doit etre un nombre entre 1000 et 9999");
            return false;
        } else {
            showSuccess($postcode, $postcodeE, "Parfait");
            return true;
        }
    }

    // validation en temps réel du code postal
    $postcode.on("input",function(){

        validatePostcode();

    });
    
    // validation au submit du code postal
    $form.on("submit", function(event){

        const isValidPostcode = validatePostcode();

        if (!isValidPostcode){
            event.preventDefault();
        }
    })

    // fonction pour la validation regex du numéro de telephone
    function regexValidationPhone(phone) {

            const regexPhone = /^(\+32|0032|0)4\d{8}$/;

            return regexPhone.test(phone);
            
        }
    // fonction pour validé le numéro de télephone
    function validatePhone(){

        const phoneVal = $phone.val().trim();

        if (phoneVal === "") {
            showError($phone, $phoneE, "Le numéro de téléphone est obligatoire.");
            return false;
        } else if (!regexValidationPhone(phoneVal)){
            showError($phone, $phoneE, "Le numéro de téléphone n'est pas valide");
            return false;
        } else {
            showSuccess($phone, $phoneE, "Parfait");
            return true;
        }
    }

    // validation en temps réel du numéro de telephone
    $phone.on("input",function(){

        validatePhone();

    });
    
    // validation au submit du numéro de téléphone
    $form.on("submit", function(event){

        const isValidPhone = validatePhone();

        if (!isValidPhone){
            event.preventDefault();
        }
    })

    // fonction pour valider le message
    function validateMessage(){

        const messageVal = $message.val().trim();

        if (messageVal.length < 10) {
            showError($message, $messageE, "Le message doit contenir au moins 10 caractères.");
            return false;
        } else if (messageVal.length > 500) {
            showError($message, $messageE, "Le prenom ne peut pas dépasser 500 caractères.");
            return false;
        } else {
            showSuccess($message, $messageE, "Parfait");
            return true;
        }
    }

    // validation en temps réel du prénom
    $message.on("input",function(){

        updateMessageCounter();


        validateMessage();

    });

    updateMessageCounter();
    
    // validation au submit du prénom
    $form.on("submit", function(event){

        const isValidMessage = validateMessage();

        if (!isValidMessage){
            event.preventDefault();
        }
    })

    function validateAccord() {
    if (!$accord.is(":checked")) {
        $accordE
            .stop(true, true)
            .removeClass("success")
            .addClass("field-error")
            .hide()
            .text("Vous devez accepter le stockage de vos données.")
            .slideDown(200);

        return false;
    } else {
        $accordE
            .stop(true, true)
            .removeClass("field-error")
            .addClass("success")
            .text("Parfait")
            .fadeIn(200);

        return true;
    }
    }

    $accord.on("change", function () {
    validateAccord();
    });

    $form.on("submit", function(event) {
    const isValidAccord = validateAccord();

    if (!isValidAccord) {
        event.preventDefault();
    }
    });

    function updateMessageCounter() {
    const messageLength = $message.val().length;

    $messageCounter.text(messageLength + " / " + maxMessageLength + " caractères");

    if (messageLength >= 280) {
        $messageCounter.addClass("counter-warning");
    } else {
        $messageCounter.removeClass("counter-warning");
    }
    }

    const themes = {
    green: "img/waifbook.png",
    red: "img/waifbook-red.png",
    gold: "img/waifbook-gold.png",
    blue: "img/waifbook-blue.png",
    purple: "img/waifbook-purple.png"
    };

    function changeTheme(themeName) {
    const newImage = themes[themeName];
    const $image = $("#themeImage");

    $("body")
        .removeClass("theme-green theme-red theme-gold theme-blue theme-purple")
        .addClass("theme-" + themeName);

    $(".theme-btn").removeClass("active");
    $('.theme-btn[data-theme="' + themeName + '"]').addClass("active");

    localStorage.setItem("selectedTheme", themeName);

    if ($image.attr("src") === newImage) {
        return;
    }

    $image.stop(true, true).fadeOut(250, function () {
        $image.attr("src", newImage);
        $image.fadeIn(300);
    });
}

    const savedTheme = localStorage.getItem("selectedTheme") || "green";
    changeTheme(savedTheme);

    $(".theme-btn").on("click", function () {
        const themeName = $(this).data("theme");
        changeTheme(themeName);
    });
});