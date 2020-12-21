function getProductsData() {
    fetch("http://localhost:3000/api/teddies/" + localStorage.getItem("monid"))
        .then(response => response.json())
        .then(response => {

            /*     for (let valeur of response.colors) {
                                        console.log(valeur);
            }*/


            const productPicture = document.createElement("img");
            const productDetails = document.createElement("div");
            const productDetailsTop = document.createElement("div");
            const productName = document.createElement("div");
            const productDesc = document.createElement("div");
            const productDetailsBottom = document.createElement("div");
            const lineVarPrice = document.createElement("div");
            const productVariantSelect = document.createElement("select");
            const productVariantOption1 = document.createElement("option");
            const productVariantOption2 = document.createElement("option");
            const productPrice = document.createElement("div");


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



            //  NOTE: remplissage des div avec les données de la BDD
            productPicture.setAttribute("src", response.imageUrl);
            productName.textContent = response.name;
            productDesc.textContent = response.description;

            //            productVariantOption1.textContent = "valeur1";
            //            productVariantOption2.textContent = "valeur2";

             //  FIXME: Corriger le menu déroulant - récup données
            for (var i = 0; i < response.colors.length; i++) {
//                console.log(response.colors[i]);
                
//                bob[i].setAttribute("value", response.colors[i]);
            }


            productPrice.textContent = response.price / 100 + " €";


            //  NOTE: insertion des elements dans le DOM
            productContainer.appendChild(productPicture);
            productContainer.appendChild(productDetails);
            productDetails.appendChild(productDetailsTop);
            productDetailsTop.appendChild(productName);
            productDetailsTop.appendChild(productDesc);
            productDetails.appendChild(productDetailsBottom);
            productDetailsBottom.appendChild(lineVarPrice);
            lineVarPrice.appendChild(productVariantSelect);
            lineVarPrice.appendChild(productPrice);
        });

}

getProductsData()
