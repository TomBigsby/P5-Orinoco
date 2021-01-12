//  TODO: mettre l'action dans une fonction et l'intégrer

if (localStorage.length != 0 || localStorage.getItem("mesArticles") != null) {



    let tabArticles = JSON.parse(localStorage.getItem("mesArticles"));


    let getTotalQty = []
    let getTotalPrice = []
    let orderProducts = []
    for (let current of tabArticles) {
        //    getTotalQty.push(current.article, current.id, current.price, current.image, current.quantity);

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
        articleContainer.classList.add("myBasketList-article");
        articleContainerCol1.classList.add("myBasketList-article-col1");
        articleContainerCol1Z1.classList.add("z1");
        productPicture.classList.add("myBasketList-article-col1__picture");
        articleContainerCol1Z2.classList.add("z2");
        productName.classList.add("myBasketList-article-col1__name");
        productRef.classList.add("myBasketList-article-col1__ref");
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
        getTotalQty.push(current.quantity);
        getTotalPrice.push((current.price / 100) * current.quantity);

        orderProducts.push(current.id)
    }
    //  NOTE: formule de calcul du total + ajout des valaurs dans DOM
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    myRecapQuantity.textContent = getTotalQty.reduce(reducer);
    myRecapTotalPrice.textContent = getTotalPrice.reduce(reducer) + " €";


    let form_OK = true;
    form.addEventListener("submit", function (event) {

        // Chaque fois que l'utilisateur tente d'envoyer les données
        // on vérifie que le champ email est valide.

        /*    if (!formEmail.validity.valid) {
                console.log("mail ok");
            }
            if (formTel.value.length != 10 || isNaN(formTel.value)) {
                form_OK = false;
            }*/


        //  FIXME: la condition ci-dessous n'est pas reconnue
        if (formFirstname.value == "") {
            console.log("rien");
            form_OK = false;
            formFirstname.classList.add("error");
        } else {
            formFirstname.classList.remove("error");
        }
        event.preventDefault();



        //  NOTE: envoi des données au serveur via Fetch POST
        //envoi au serveur :
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
                localStorage.setItem("orderInfos", JSON.stringify(tabOrderInfos));
                location.href = "order-confirm.html";
            })
            .catch(err => console.log(err));
    });



} else {
    const emptyBasket = document.createElement("div");
    emptyBasket.classList.add("emptyBasket");
    emptyBasket.textContent = "Le panier est vide";
    myBasketList.appendChild(emptyBasket);
}
