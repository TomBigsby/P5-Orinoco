const apiUrl = "http://localhost:3000/api/teddies/";
const getProductsData = () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {

            for (let valeur of response) {

                //  NOTE: je limite volontairement le nombre d'articles à 4 pour le design
                response.length = 4;

                //  NOTE: Création des balises HTML des produits
                const productContainerCard = document.createElement("div");
                const productPictureImg = document.createElement("img");
                const productContainerNamePrice = document.createElement("div");
                const productName = document.createElement("div");
                const productPrice = document.createElement("div");
                const cardsContainer = document.getElementById("cardsContainer");
                const productLink = document.createElement("a");

                //  NOTE: création des classes pour mise en forme CSS
                productContainerCard.classList.add("card");
                productPictureImg.classList.add("card__image");
                productContainerNamePrice.classList.add("card-namePriceContainer");
                productName.classList.add("card-namePriceContainer__name");
                productPrice.classList.add("card-namePriceContainer__price");

                //  NOTE: ajout de l'image, du nom et du prix récupérés dans la BDD
                productName.textContent = valeur.name;
                productPrice.textContent = valeur.price / 100 + " €";
                productPictureImg.setAttribute("src", valeur.imageUrl);

                //  NOTE: insertion des elements dans le DOM
                cardsContainer.appendChild(productLink);
                productLink.appendChild(productContainerCard);
                productContainerCard.appendChild(productPictureImg);
                productContainerCard.appendChild(productContainerNamePrice);
                productContainerNamePrice.appendChild(productName);
                productContainerNamePrice.appendChild(productPrice);


                productLink.onclick = () => {
                    localStorage.setItem("monid", valeur._id);
                    location.href = "./product.html";
                };
            }

            //console.log(document.querySelector(".cardContainer").innerHTML);
        });
};

getProductsData();
