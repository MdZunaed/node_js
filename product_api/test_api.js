let products = "http://localhost:8000/products";
let productById = "http://localhost:8000/products?id=1";


function getData() {
    fetch(productById).then((response) => {
        return response.json();
    }).then(
        (data) => {
            console.log(data);
        }
    ).catch((error) => {
        console.log(error);
    });
}