// NOTE: Si le panier n'est pas vide...
if (localStorage.getItem("mesArticles") != null) {

    // afficher le formulaire
    form.style.display = "flex";


    // NOTE: créer un tableau et le remplir avec les données du localStorage
    let tabArticles = JSON.parse(localStorage.getItem("mesArticles"));

    // NOTE: Création des tableaux necessaire pour calculer les prix
    let getTotalQty = [];
    let getTotalPrice = [];
    let orderProducts = [];

    //  NOTE: pour chaque article du tableau...
    for (let current of tabArticles) {

        //  NOTE: je créé une ligne "article"
        const articleContainer = document.createElement("div");
        const articleContainerCol1 = document.createElement("div");
        const articleContainerCol1Z1 = document.createElement("div");
        const productPicture = document.createElement("img");
        const articleContainerCol1Z2 = document.createElement("div");
        const productName = document.createElement("h3");
        const productRef = document.createElement("div");
        const productPrice_mobile = document.createElement("div");
        const productQuantity_mobile = document.createElement("div");
        const productTotal_mobile = document.createElement("div");
        const articleContainerCol2 = document.createElement("div");
        const productPrice = document.createElement("div");
        const articleContainerCol3 = document.createElement("div");
        const productQuantity = document.createElement("div");
        const articleContainerCol4 = document.createElement("div");
        const productTotal = document.createElement("div");


        //NOTE: création des classes pour mise en forme CSS
        articleContainer.classList.add("myBasketList-article");
        articleContainerCol1.classList.add("myBasketList-article-col1");
        articleContainerCol1Z1.classList.add("z1");
        productPicture.classList.add("myBasketList-article-col1__picture");
        articleContainerCol1Z2.classList.add("z2");
        productName.classList.add("myBasketList-article-col1__name");
        productRef.classList.add("myBasketList-article-col1__ref");

        productPrice_mobile.classList.add("myBasketList-article-col1__price_mobile");
        productQuantity_mobile.classList.add("myBasketList-article-col1__quantity_mobile");
        productTotal_mobile.classList.add("myBasketList-article-col1__total_mobile");

        articleContainerCol2.classList.add("myBasketList-article-col2");
        productPrice.classList.add("myBasketList-article-col2__price");
        articleContainerCol3.classList.add("myBasketList-article-col3");
        productQuantity.classList.add("myBasketList-article-col3__quantity");
        articleContainerCol4.classList.add("myBasketList-article-col4");
        productTotal.classList.add("myBasketList-article-col4__total");

        //  NOTE: remplissage des div avec les données du panier depuis LocalStorage
        productPicture.setAttribute("src", current.image);
        productName.textContent = current.article;
        productRef.textContent = "ref : " + current.id;
        productPrice.textContent = current.price / 100 + " €";
        productQuantity.textContent = current.quantity;
        productTotal.textContent = current.quantity * (current.price / 100) + " €";

        productPrice_mobile.textContent = "Prix : " + current.price / 100 + " €";
        productQuantity_mobile.textContent = "Quantité : " + current.quantity
        productTotal_mobile.textContent = "Total : " + (current.price / 100) * current.quantity + " €";


        //  NOTE: insertion des elements dans le DOM
        myBasketList.appendChild(articleContainer);
        articleContainer.appendChild(articleContainerCol1);
        articleContainerCol1.appendChild(articleContainerCol1Z1);
        articleContainerCol1Z1.appendChild(productPicture);
        articleContainerCol1.appendChild(articleContainerCol1Z2);
        articleContainerCol1Z2.appendChild(productName);
        articleContainerCol1Z2.appendChild(productRef);

        articleContainerCol1Z2.appendChild(productPrice_mobile);
        articleContainerCol1Z2.appendChild(productQuantity_mobile);
        articleContainerCol1Z2.appendChild(productTotal_mobile);

        articleContainer.appendChild(articleContainerCol2);
        articleContainerCol2.appendChild(productPrice);
        articleContainer.appendChild(articleContainerCol3);
        articleContainerCol3.appendChild(productQuantity);
        articleContainer.appendChild(articleContainerCol4);
        articleContainerCol4.appendChild(productTotal);

        //  NOTE: ajout de tous les totaux pour faire le total global
        getTotalQty.push(current.quantity);
        getTotalPrice.push((current.price / 100) * current.quantity);

        orderProducts.push(current.id)
    }
    //  NOTE: formule de calcul du total + ajout des valeurs dans le DOM
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    myRecapQuantity.textContent = getTotalQty.reduce(reducer);
    myRecapTotalPrice.textContent = getTotalPrice.reduce(reducer) + " €";


    //  NOTE: action sur bouton
    form.addEventListener("submit", function (event) {

        //  NOTE: envoi des données au serveur via Fetch POST
        // NOTE: 1 - récup des données dans un tableau
        let order = {
            contact: {
                firstName: formFirstname.value,
                lastName: formLastname.value,
                address: formAdress,
                city: formCity,
                email: formEmail
            },
            products: orderProducts
        };

        //NOTE: 2 - puis connection au serveur et envoi des données
        fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                body: JSON.stringify(order),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                const tabOrderInfos = {
                    number: json.orderId,
                    firstName: formFirstname.value,
                    totalPrice: getTotalPrice.reduce(reducer) + " €"
                };
                //  NOTE: récup du numéro de commande retourné par le serveur
                localStorage.setItem("orderInfos", JSON.stringify(tabOrderInfos));
                location.href = "order-confirm.html";
            })
            .catch(err => console.log(err));
        event.preventDefault();
    });

} else {
    //  NOTE: si le panier est vide, afficher message 
    const emptyBasket = document.createElement("div");
    emptyBasket.classList.add("emptyBasket");
    emptyBasket.textContent = "Le panier est vide";
    myBasketList.appendChild(emptyBasket);
    form.style.display = "none";
}
