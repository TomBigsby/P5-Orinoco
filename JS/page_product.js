let nbArticle;

//  TODO: Optimisation/lisibilité : créer des fonctions pour chaque action et lancer uniquement les fonctions lors d'événements ET organiser les fonctions


function getProductsData() {
    fetch("http://localhost:3000/api/teddies/" + localStorage.getItem("monid"))
        .then(response => response.json())
        .then(response => {

            const productPicture = document.createElement("img");
            const productDetails = document.createElement("div");
            const productDetailsTop = document.createElement("div");
            const productName = document.createElement("div");
            const productDesc = document.createElement("div");
            const productDetailsBottom = document.createElement("div");
            const lineVarPrice = document.createElement("div");
            const productVariantSelect = document.createElement("select");
            const productPrice = document.createElement("div");
            const productValid = document.createElement("button");


            //  NOTE: création des classes pour mise en forme CSS
            const productContainer = document.getElementById("product-container");

            productPicture.classList.add("product-image");
            productDetails.classList.add("product-details");
            productDetailsTop.classList.add("product-details-top");
            productName.classList.add("product-details__name");
            productDesc.classList.add("product-details__description");
            productDetailsBottom.classList.add("product-details-bottom");
            lineVarPrice.classList.add("line-varPrice");
            productVariantSelect.classList.add("product-details__variations");
            productPrice.classList.add("product-details__price");
            productValid.classList.add("product-details__valid");


            //  NOTE: remplissage des div avec les données de la BDD
            productPicture.setAttribute("src", response.imageUrl);
            productName.textContent = response.name;
            productDesc.textContent = response.description;

            lineVarPrice.appendChild(productVariantSelect);


            //  NOTE: creation du tableau pour le comboBox + ajout du premier élément "action" SI l'article à plus d'une variation
            let productVariantOption = [];
            productVariantOption.push(document.createElement("option"));

            if (response.colors.length > 1) {
                productVariantOption[productVariantOption.length - 1].textContent = "-- Choisissez la couleur --";
                productVariantSelect.appendChild(productVariantOption[productVariantOption.length - 1]);
            }

            //  NOTE: alimentation de la comboBox avec une boucle
            for (var i = 0; i < response.colors.length; i++) {
                productVariantOption.push(document.createElement("option"));
                productVariantOption[productVariantOption.length - 1].textContent = response.colors[i];
                productVariantSelect.appendChild(productVariantOption[productVariantOption.length - 1]);
            }

            productPrice.textContent = response.price / 100 + " €";
            productValid.textContent = "Ajouter au panier";

            //  NOTE: insertion des elements dans le DOM
            productContainer.appendChild(productPicture);
            productContainer.appendChild(productDetails);
            productDetails.appendChild(productDetailsTop);
            productDetailsTop.appendChild(productName);
            productDetailsTop.appendChild(productDesc);
            productDetails.appendChild(productDetailsBottom);
            productDetailsBottom.appendChild(lineVarPrice);

            lineVarPrice.appendChild(productPrice);
            productDetailsBottom.appendChild(productValid);


            //  NOTE:  Action sur le bouton > ajout article au panier
            function addToBasket() {
                nbArticleDisplay.style.opacity = 0;

                if (typeof localStorage != 'undefined') {
                    nbArticle = localStorage.getItem("nbArticleCookie");
                    if (nbArticle != null) {
                        nbArticleDisplay.textContent = nbArticle;
                        nbArticleDisplay.style.opacity = 1;
                    } else {
                        nbArticle = 0;
                        nbArticleDisplay.style.opacity = 0;
                    }

                } else {
                    alert("localStorage n'est pas supporté");
                }
            }
            addToBasket()


            function animBulle() {
                window.requestAnimationFrame(function (time) {
                    window.requestAnimationFrame(function (time) {
                        bulle.className = "changing";
                    });
                });
                bulle.className = "c";
            }
            //  NOTE: rétablie la couleur du CB   
            productVariantSelect.addEventListener('change', (event) => {
                productVariantSelect.style.borderColor = "#FFF";
            });

            let myBasket
            productValid.onclick = () => {
                // si une des couleurs est bien sélectionnée, on ajoute l'article au panier
                if ((productVariantSelect.selectedIndex !== 0 && response.colors.length > 1) || (productVariantSelect.selectedIndex === 0 && response.colors.length == 1)) {

                    animBulle()

                    // incrémentation du nombre d'article dans le panier
                    nbArticle++;
                    nbArticleDisplay.textContent = nbArticle;
                    localStorage.setItem("nbArticleCookie", nbArticle);
                    addToBasket();
                    bulleText.textContent = response.name + " " + productVariantSelect.value + " ajouté au panier";

                    // NOTE: localstorage > Ajout de l'article mis au panier OU création du cookie mesArticles
                    let tabArticles = JSON.parse(localStorage.getItem("mesArticles")) || [];

                    let qty;
                    let currentQty;
                    let indexDoublon;
                    let colorSelected;
                    let trouve = false;

                    // Si le panier n'est pas vide
                    if (tabArticles.length > 0) {

                        // Boucle avec break si l'article cherché est trouvé
                        for (var i = 0; i < tabArticles.length && !trouve; i++) {

                            // Si l'article courant est dans le panier (ne renvoi pas "-1")
                            if (tabArticles[i].article.indexOf(response.name) !== -1) {
                                currentQty = tabArticles[i].quantity;
                                qty = currentQty + 1;

                                trouve = true;
                            } else {
                                qty = 1;
                            }
                            // NOTE: recherche correspondance article de la page avec données tableau (pour chaque élement du tableau) et défini son index dans le tab
                            if (tabArticles[i].article == response.name) {
                                indexDoublon = tabArticles.indexOf(tabArticles[i]);
                                colorSelected = productVariantSelect.value;
                            }
                        }
                    } else {
                        qty = 1;
                    }

                    //  Note : si l'article n'est pas en double > push infos de la page (response.xxx) SINON si l'article est en double > splice infos de la page (diff = qty = qty++)
                    if (indexDoublon === false || indexDoublon === undefined) {
                        tabArticles.push({
                            article: response.name,
                            id: response._id,
                            price: response.price,
                            image: response.imageUrl,
                            quantity: qty
                        });
                    } else {
                        // on remplace l'article avec les même données mais quantité +1
                        tabArticles.splice(indexDoublon, 1, {
                            article: response.name,
                            id: response._id,
                            price: response.price,
                            image: response.imageUrl,
                            quantity: qty
                        });
                    }

                    productVariantSelect.selectedIndex = 0;
                    //                    

                    //NOTE: localstorage >  remplacement de l'ancienne valeur de la variable mesArticles en localstorage par la nouvelle
                    localStorage.setItem("mesArticles", JSON.stringify(tabArticles));
                } else {
                    productVariantSelect.style.border = "2px solid red";

                }
            }
        });
}
// DEBUG: remise à zéro du nbre d'articles 
debug.addEventListener('click', function (e) {
    localStorage.removeItem("nbArticleCookie");
    nbArticleDisplay.textContent = "";
    nbArticleDisplay.style.opacity = 0;
    nbArticle = 0;
    localStorage.removeItem("mesArticles");
});
getProductsData()
