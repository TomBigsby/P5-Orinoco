function getProductsData() {
    fetch("http://localhost:3000/api/teddies/")
        .then(response => response.json())
        .then(response => {

            /* const productPicture = document.createElement("img");
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
             productDetailsBottom.appendChild(productValid);*/


            let tabArticles = JSON.parse(localStorage.getItem("mesArticles"));

            let arr = [];
            for (let current of tabArticles) {
                arr.push(current.article, current.id, current.price, current.image, current.couleur, current.quantity);


                const p = document.createElement("p");
                //                p.textContent = arr[arr.length - 1];
                p.textContent = current.article + " - " + current.id + " - " + current.couleur + " - " + current.price + " - " + current.image + " - " + current.quantity;
                myBasketList.appendChild(p);
            }



            /*let myBasket
productValid.onclick = () => {


}*/



        });
}

getProductsData();
