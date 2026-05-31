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


   $(function () {
    const $form = $("#messageForm");

    if ($form.length === 0) {
        return;
    }

    function showError(inputSelector, errorSelector, message) {
        $(inputSelector).addClass("input-error");
        $(errorSelector).text(message);
    }

    function clearError(inputSelector, errorSelector) {
        $(inputSelector).removeClass("input-error");
        $(errorSelector).text("");
    }

    function isValidEmail(email) {
        const regex = /^[a-zA-Z]+\@[a-zA-Z]+\.[a-zA-Z{2,}]+$/;
        return regex.test(email);
    }

    $form.on("keyup", function (event) {
        let isValid = true;

        const firstname = $("#firstname").val().trim();
        const lastname = $("#lastname").val().trim();
        const usermail = $("#usermail").val().trim();
        const postcode = $("#postcode").val().trim();
        const phone = $("#phone").val().trim();
        const message = $("#message").val().trim();

        

        if (firstname.length <= 1) {
            showError("#firstname", "#firstnameError", "Le prenom doit contenir au moins 2 caractères.");
            isValid = false;
        } else if (firstname.length > 120) {
            showError("#firstname", "#firstnameError", "Le prenom ne peut pas dépasser 120 caractères.");
            isValid = false;
        } else if (firstname.length >= 2){
            $("#firstnameError").fadeIn(600, function(){
                $("#firstnameError").removeClass("field-error");
                $("#firstnameError").addClass("success")
                $("#firstnameError").text("parfait")});
        } else {
            
                $("#firstnameError").addClass("field-error");
                $("#firstnameError").removeClass("success")
        }

        if (lastname.length <= 1) {
            showError("#lastname", "#lastnameError", "Le nom doit contenir au moins 2 caractères.");
            isValid = false;
        } else if (lastname.length > 120) {
            showError("#lastname", "#lastnameError", "Le nom  ne peut pas dépasser 120 caractères.");
            isValid = false;
        }   else if (lastname.length >= 2){
            $("#lastnameError").fadeIn(600, function(){
                $("#lastnameError").removeClass("field-error");
                $("#lastnameError").addClass("success")
                $("#lastnameError").text("parfait")});
        } else {
            $("#lastnameError").fadeOut(600, function(){
                $("#lastname").removeClass("field-error");
                $("##lastname").removeClass("success")})
        }

        if (usermail === "") {
            showError("#usermail", "#usermailError", "L'email est obligatoire.");
            isValid = false;
        } else if (!isValidEmail(usermail)) {
            showError("#usermail", "#usermailError", "L'email n'est pas valide.");
            isValid = false;
        } else if (usermail.length > 120) {
            showError("#usermail", "#usermailError", "L'email ne peut pas dépasser 120 caractères.");
            isValid = false;
        } else if (usermail){
            $("#usermailError").fadeIn(600, function(){
                $("#usermailError").removeClass("field-error");
                $("#usermailError").addClass("success")
                $("#usermailError").text("parfait")});
         } else {
         
                 $("#usermailError").addClass("field-error");
               $("#usermailError").removeClass("success")
         }

        if ((parseFloat(postcode) < 1000  )|| (parseFloat(postcode) > 9999  )) {
            showError("#postcode", "#postcodeError", "Le code postal doit contenir 4 caractères et etre entre 1000 et 9999 .");
            isValid = false;
        }else if (postcode.length != 4){
 showError("#postcode", "#postcodeError", "Le code postal doit contenir 4 caractères et etre entre 1000 et 9999 .");
            isValid = false;
        }else  {
            $("#postcodeError").removeClass("field-error");
                $("#postcodeError").addClass("success")
                $("#postcodeError").text("parfait");
        }
        
        // } else if (instpostcode < 1000 && instpostcode > 9000) {
        //     showError("#postcode", "#postcodeError", "Le code postal doit etre entre 1000 et 9000");
        //     isValid = false;
        // }

        if (phone.length != 10) {
            showError("#phone", "#phoneError", "Il y a 10 chiffres dans les numero belge");
            isValid = false;
             } else  {
            $("#phoneError").removeClass("field-error");
                $("#phoneError").addClass("success")
                $("#phoneError").text("parfait");
        }

        if (message.length < 10) {
            showError("#message", "#messageError", "Le message doit contenir au moins 10 caractères.");
            isValid = false;
        } else if (message.length > 500) {
            showError("#message", "#messageError", "Le message ne peut pas dépasser 500 caractères.");
            isValid = false;
        } else  {
            $("#messageError").removeClass("field-error");
                $("#messageError").addClass("success")
                $("#messageError").text("parfait");
        }

         if (!isValid) {
             event.preventDefault();
         };
    });
});


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

    
});