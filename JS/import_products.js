function getProductsData() {
    fetch("http://localhost:3000/api/teddies")
        .then(response => response.json())
        .then(response => {

            for (var i = 0; i < response.length - 1; i++) {
                const productName = document.getElementsByClassName("card-namePriceContainer__name");
                const productPrice = document.getElementsByClassName("card-namePriceContainer__price");

                //        console.log(productName[i].parentElement);

                const parentProduct_namePrice = document.getElementsByClassName("card-namePriceContainer");

                const parentProduct_picture = document.getElementsByClassName("card__image");

                const productPicture = parentProduct_picture[i].children[0];



                const newProductName = document.createElement("div")
                newProductName.classList.add("card-namePriceContainer__name");
                newProductName.textContent = response[i].name;

                const newProductPrice = document.createElement("div")
                newProductPrice.classList.add("card-namePriceContainer__price");
                newProductPrice.textContent = (response[i].price / 100) + " €";

                const newProductPicture = document.createElement("img")
                newProductPicture.setAttribute("src", response[i].imageUrl);


                parentProduct_namePrice[i].replaceChild(newProductName, productName[i]);
                parentProduct_namePrice[i].replaceChild(newProductPrice, productPrice[i]);
                parentProduct_picture[i].replaceChild(newProductPicture, productPicture);
            }


        });

}

getProductsData()


/*
const newElt = document.createElement("p");
let elt = document.querySelector("#main");

//console.log(document.querySelector("body").innerHTML);


newElt.textContent = "bob";

elt.appendChild(newElt);



//elt.replace(document.createElement("article"), newElt);
elt.textContent.replace("bob", newElt);

*/
