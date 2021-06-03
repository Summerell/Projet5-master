const afficheProduit = (idArticle) => {
    /* récupère les produits stocké dans le localStorage et affiche sur la page celui sélectionné sur l'index*/
    var elements;
    /* vérifie l'existence de cameras dans le localStorage et en récupère le tableau qu'il contient */
    if (localStorage.getItem("cameras")) {
        elements = JSON.parse(localStorage.getItem("cameras"));
    } else {
        console.error("Récupérations des articles impossible");
        return;
    }
    /* vérifie que le contenu récupérer du localStorage est bien un tableau et qu'il n'est pas null */
    if (elements != null && Array.isArray(elements)) {
        /* compare l'idArticle avec l'id de tous les articles */
        for (var article of elements) {
            if (article._id == idArticle) {
                /* récupère les détails de l'article et a la variable html */
                let html = "";
                let image = article.imageUrl;
                let nom = article.name;
                let amelioration = article.lenses;
                let prix = article.price;
                prix /= 100;
                let description = article.description;
                let id = article._id;

                html += "<div class=\"objet\"  id=\"" + id + "\">";
                html += "<img class=\"img-produit img-article\" src=\"" + image + "\">";
                html += "<div class=\"detail-article\" ><h3>" + nom + "</h3>";
                html += "<label for=\"lentilles\">lentilles : </label>";
                html += "<select name=\"lentilles\" id=\"lentilles\">";
                /* crée une ligne option pour chaque valeur d’amélioration */
                for (let option of amelioration) {
                    html += "<option value=\"" + option + "\">" + option + "</option>";
                }
                html += "</select>";
                html += "<p>" + description + "</p>";
                html += "<div class=\"prix\">Prix : " + prix + "€</div>";
                html += "<button class=\"bouton\" id=\"bouton\" type=\"button\"";
                html += ">Ajouter au panier</button><span id=\"deja-panier\"></span>";
                html += "</div></div>";
                /* ajoute le contenu de la variable html au DOM */
                document.getElementById("article").innerHTML = html;
                /* contrôle la présence de l'article dans le panier */
                controlPresencePanier(id);
            }
        }
    } else {
        console.error("Extraction impossible des appareils photos du localStorage");
    }
}

/* vérifie si le panier existe et si le produit est déjà dedans et ajoute un message au DOM en cas de présence */
const controlPresencePanier = (id) => {
    if (localStorage.getItem("panier")) {
        var panier = JSON.parse(localStorage.getItem("panier"));
        if (panier != null && Array.isArray(panier)) {
            if (panier.includes(id)) {
                document.getElementById("bouton").disabled = true;
                document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier";
            }
        } else {
            console.error("Lecture du contenu du panier impossible");
        }

    }
}

/* récupère l'article cliqué sur la page d'index */
const urlParams = new URLSearchParams(window.location.search);
const idArticleSelectionne = urlParams.get('id');

/* affiche la fiche de l'article */
afficheProduit(idArticleSelectionne);

/* surveillance du clic sur le bouton ajouté au panier et gestion du cas ou il y est déjà présent */
document.getElementById("bouton").addEventListener("click", function(event) {
    event.stopPropagation;
    let identifiant;
    /* récupère l'id de l'article de la page */
    if (document.getElementById("bouton").parentElement.parentElement.getAttribute('id')) {
        identifiant = document.getElementById("bouton").parentElement.parentElement.getAttribute('id');
    } else {
        console.error("Récupération de l'id de l'article impossible");
        return;
    }
    var panier = [];
    /* désactive le bouton "ajouter au panier" */
    document.getElementById("bouton").disabled = true;
    /* ajoute l'id au panier si il existe et que l'id n'y figure pas sinon le crée */
    if (localStorage.panier) {
        panier = JSON.parse(localStorage.getItem("panier"));
        if (Array.isArray(panier)) {
            if (panier.find(element => element == identifiant)) {
                document.getElementById("deja-panier").innerHTML = "Cet article est déjà dans votre panier.";
                return 0;
            } else {
                panier.push(identifiant);
            }
        } else {
            console.error("Contenu du panier invalide");
            return;
        }
    } else {
        panier = [identifiant];
    }
    localStorage.setItem("panier", JSON.stringify(panier));
    document.getElementById("deja-panier").innerHTML = "Cet article a été ajouté à votre panier.";
});