console.log("--- page de test ---");

//function getProducts() {
//    var apiUrl = "http://localhost:3000/api/teddies";
//
//    return fetch(apiUrl, {
//            method: "GET"
//        })
//        .then((data) => {
//            return data.json()
//        })
//        .then((json) => {
//            return json
//        })
//}

//getProducts();


function askWeather() {
    fetch("http://localhost:3000/api/teddies")
        .then(response => response.json())
        .then(response => {
        
        console.log(response);


            for (var i = 0; i < response.length; i++) {
                let elt = document.createElement("p");
                document.body.appendChild(elt);
                elt.textContent = response[i].imageUrl;
            }

        })
}

askWeather()
