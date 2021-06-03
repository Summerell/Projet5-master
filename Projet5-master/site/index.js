let listeIdArticles = [];

let xhr = (data) => {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", data.url);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {

                if (xhr.status == 200 || xhr.status == 201) {
                    resolve(xhr.responseText);
                } else {
                    reject(new TypeError(xhr.statusText))
                }
            }
        }
        xhr.onerror = function() {
            setTimeout(function() {
                reject(new TypeError('Network request failed'))
            }, 0)
        }
        xhr.send();
    })
}

/* importe les articles depuis l'api vers le localStorage si il n'y sont pas déjà */
const importProduit = () => {
    /* récupère de l'API le tableau des articles et le copie dans le localStorage */
    xhr({ url: "http://localhost:3000/api/cameras" })
        .then(response => {
            localStorage.setItem("cameras", response);
            affichage();
        })
        .catch(error => {
            console.error(error);
        })

}

const afficheProduits = () => {
        /* récupère les produits stocké dans le localStorage et les affiches sur la page*/
        let html = "";
        var elements;
        /* test de l’existence de cameras dans le localStorage et récupère le tableau qu'il contient */
        if (localStorage.getItem("cameras")) {
            elements = JSON.parse(localStorage.getItem("cameras"));
        } else {
            console.error("chargement des cameras impossible");
            return;
        }
        /* vérifie que le tableau récupérer n'est pas null et ajoute tout les articles au DOM*/
        if (elements != null) {
            html += "<div class=\"categorie\"><span class=\"titre-cate\">";
            html += "Nos appareils photos";
            html += "</span>";
            for (var article of elements) {
                let image = article.imageUrl;
                let nom = article.name;
                let prix = article.price;
                prix /= 100;
                let id = article._id;
                listeIdArticles.push(id);

                html += "<a href=\"#\" id=\"" + id + "\"><div class=\"objet\">";
                html += "<img class=\"img-produit\" src=\"" + image + "\">";
                html += "<h3>" + nom + "</h3>";
                html += "</div></a>";
            }
            html += "</div>";
        } else {
            console.error("Extraction impossible des appareils photos du localStorage");
        }
        document.getElementById("produits").innerHTML = html;
    }
    /* lors d'un clic, vérifie que l'id qui a déclenché le clic fait parti des articles */
const actionsClick = (event) => {
    if (event.target.parentElement.parentElement.getAttribute('id') || event.target.parentElement.getAttribute('id')) {
        if (event.target.parentElement.parentElement.getAttribute('id')) {
            var identifiant = event.target.parentElement.parentElement.getAttribute('id');
        } else {
            var identifiant = event.target.parentElement.getAttribute('id');
        }
        event.stopPropagation();
        event.preventDefault();
        /* définie la clé article du localStorage avec la valeur de l'id */
        if (listeIdArticles.includes(identifiant)) {
            localStorage.setItem("article", identifiant);
            /* redirige l'utilisateur vers la page produit.html */
            window.location.href = "produit.html" + "?id=" + identifiant;
        } else {
            console.error("l'id n'appartient a aucun des articles !! ");
        }
    } else {
        console.error("récupération de l'id impossible");
    }

}

const affichage = () => {

    /* Affichage des articles sous formes de liste */
    afficheProduits();

    /* surveille le clic sur les différents articles */
    for (var id of listeIdArticles) {
        document.getElementById(id).addEventListener("click", actionsClick.bind(event));
    }
}

/* Importations des articles et lancement de l'affichage et des écoutes*/
importProduit();