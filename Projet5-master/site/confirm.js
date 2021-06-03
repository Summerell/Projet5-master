/* affiche le retour de la commande */
const afficheCommande = () => {
	let html = "";
	let contenuCoordonne = "";
	var commande
	prixTotal = 0;
	/* Vérifie l'existence de retourCommande dans le localStorage et récupère son contenu puis supprime le panier*/
	if (localStorage.getItem("retourCommande")) {
		commande = JSON.parse(localStorage.getItem("retourCommande"));
		localStorage.removeItem("panier");
	} else {
		return;
	}
	/* ajoute l'id de la commande dans la balise html qui a l'id commande-id */
	document.getElementById("commande-id").innerHTML = commande.orderId;
	/* récupère les éléments de contact du retour de commande et les ajoutent à la page html */
	contenuCoordonne += "<span class=\"titre-contact\">Vos coordonnées : </span>";
	contenuCoordonne += "<div>Nom : "+commande.contact.lastName+"</div>";
	contenuCoordonne += "<div>Prénom : "+commande.contact.firstName+"</div>";
	contenuCoordonne += "<div>Adresse : "+commande.contact.address+"</div>";
	contenuCoordonne += "<div>Ville : "+commande.contact.city+"</div>";
	contenuCoordonne += "<div>Email : "+commande.contact.email+"</div>";
	document.getElementById("commande-coordonnées").innerHTML = contenuCoordonne;
	/* pour chaque article de la commande, les balises html et les details de l'article sont ajouté a la variable html */
	for (let article of commande.products) {
		let image = article.imageUrl;
		let nom = article.name;
		let prix = article.price;
		prixTotal += prix;
		prix /= 100;
		let description = article.description;
		let id = article._id;
		
		html += "<div class=\"objet panier\"  id=\""+id+"\">";
		html += "<img class=\"img-panier\" src=\""+image+"\"><br>";
		html += "<div class=\"details-panier\"><h3>"+nom+"</h3>"
		html += "<p>"+description+"</p>";
		html += "<div class=\"prix\">Prix : "+prix+"€</div>";
		html += "</div></div>";

	}
	/* ajout du prix total a la variable html */
	html += "<div class=\"total\" id=\"total\">Total de la commande : "+(prixTotal/100)+"€";
	/* insertion du contenu de la variable html dans le DOM */
	document.getElementById("commande-articles").innerHTML = html;
} 

afficheCommande();
