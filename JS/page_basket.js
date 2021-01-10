//  TODO: mettre l'action dans une fonction et l'intégrer
if (localStorage.length == 0) {
    const emptyBasket = document.createElement("div");
    emptyBasket.textContent = "le panier est vide";
    myBasketList.appendChild(emptyBasket);
} else {

    //    function...
}



let tabArticles = JSON.parse(localStorage.getItem("mesArticles"));


let arr = []
let arr2 = []
for (let current of tabArticles) {
    //    arr.push(current.article, current.id, current.price, current.image, current.quantity);


    const articleContainer = document.createElement("div");
    const articleContainerCol1 = document.createElement("div");
    const articleContainerCol1Z1 = document.createElement("div");
    const productPicture = document.createElement("img");
    const articleContainerCol1Z2 = document.createElement("div");
    const productName = document.createElement("h3");
    const productRef = document.createElement("div");
    const articleContainerCol2 = document.createElement("div");
    const productPrice = document.createElement("div");
    const articleContainerCol3 = document.createElement("div");
    const productQuantity = document.createElement("div");
    const articleContainerCol4 = document.createElement("div");
    const productTotal = document.createElement("div");


    //NOTE: création des classes pour mise en forme CSS
    articleContainer.classList.add("myBasket-list-article");
    articleContainerCol1.classList.add("myBasket-list-article-col1");
    articleContainerCol1Z1.classList.add("z1");
    productPicture.classList.add("myBasket-list-article-col1__picture");
    articleContainerCol1Z2.classList.add("z2");
    productName.classList.add("myBasket-list-article-col1__name");
    productRef.classList.add("myBasket-list-article-col1__ref");
    articleContainerCol2.classList.add("myBasket-list-article-col2");
    productPrice.classList.add("myBasket-list-article-col2__price");
    articleContainerCol3.classList.add("myBasket-list-article-col3");
    productQuantity.classList.add("myBasket-list-article-col3__quantity");
    articleContainerCol4.classList.add("myBasket-list-article-col4");
    productTotal.classList.add("myBasket-list-article-col4__total");

    //  NOTE: remplissage des div avec les données du panier depuis LocalStorage
    productPicture.setAttribute("src", current.image);
    productName.textContent = current.article;
    productRef.textContent = "ref : " + current.id;
    productPrice.textContent = current.price / 100 + " €";
    productQuantity.textContent = current.quantity;
    productTotal.textContent = current.quantity * (current.price / 100) + " €";

    //  NOTE: insertion des elements dans le DOM
    myBasketList.appendChild(articleContainer);
    articleContainer.appendChild(articleContainerCol1);
    articleContainerCol1.appendChild(articleContainerCol1Z1);
    articleContainerCol1Z1.appendChild(productPicture);
    articleContainerCol1.appendChild(articleContainerCol1Z2);
    articleContainerCol1Z2.appendChild(productName);
    articleContainerCol1Z2.appendChild(productRef);
    articleContainer.appendChild(articleContainerCol2);
    articleContainerCol2.appendChild(productPrice);
    articleContainer.appendChild(articleContainerCol3);
    articleContainerCol3.appendChild(productQuantity);
    articleContainer.appendChild(articleContainerCol4);
    articleContainerCol4.appendChild(productTotal);

    //  NOTE: ajout de tous les totaux pour faire le total global

    arr.push(current.quantity);
    arr2.push((current.price / 100) * current.quantity);
}
//  NOTE: formule de calcul du total + ajout des valaurs dans DOM
const reducer = (accumulator, currentValue) => accumulator + currentValue;
myRecapSpace3.textContent = arr.reduce(reducer);
myRecapSpace4.textContent = arr2.reduce(reducer) + " €";

//  NOTE: action envoi formulaire
formValid.onclick = () => {
    console.log(coordName + " - " + coordLName + " - " + coordAdress + " - " + coordCP + " - " + coordVille + " - " + coordEmail + " - " + coordTel);

}
