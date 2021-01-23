// NOTE: recup du numéro de commande depuis Local Storage
let orderInfos = JSON.parse(localStorage.getItem("orderInfos"));

const firstName = document.createElement("span")
const number = document.createElement("span")
const totalPrice = document.createElement("span")

firstName.textContent = " " + orderInfos.firstName;
number.textContent = " " + orderInfos.number;
totalPrice.textContent = " : " + orderInfos.totalPrice;
totalPrice.style.fontWeight = "Bold";

message.appendChild(firstName);
orderNumber.appendChild(number);
totalOrder.appendChild(totalPrice);


// NOTE: Réinitialisation du panier et suppression de toutes les données des local Storage
    localStorage.removeItem("nbArticleCookie");
    localStorage.removeItem("orderInfos");
    localStorage.removeItem("mesArticles");


//  NOTE: Le bouton renvoi à l'accueil et réinitialise le panier.
homeButton.onclick = () => {
    location.href = "index.html";
}
