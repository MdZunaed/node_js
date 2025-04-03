const http = require('http');
const fs = require('fs');
const url = require('url');

let server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    console.log(`${req.method} -> ${parsedUrl.pathname} ========>`);

    let products = fs.readFileSync("./products.json", 'utf-8');

    /// To fetch all the products
    if (parsedUrl.pathname == "/products" && req.method == "GET" && parsedUrl.query.id == undefined) {
        res.end(products != undefined ? products : "No Products");
    }

    /// To fetch specific product with id
    else if (parsedUrl.pathname == "/products" && req.method == "GET" && parsedUrl.query.id != undefined) {
        // JSON.parse(); convert JSON String into JSON Object
        let productsArray = JSON.parse(products);
        let product = productsArray.find((product) => {
            return product.id == parsedUrl.query.id;
        });

        // if(product != undefined){
        // res.end(JSON.stringify(product));
        // } else{
        //     res.end(JSON.stringify({
        //         'message': "Not found!"
        //     }));
        // }

        res.end(product != undefined ? JSON.stringify(product) : "Not found");
        // JSON.stringify(); convert JSON Object into JSON String

    }

    /// To add product
    else if (parsedUrl.pathname == "/products" && req.method == "POST") {
        let product = "";

        // To read chunk data from Body data
        req.on("data", (chunk) => {
            product += chunk;
        });

        // This event is called at the end of stream is recieved
        req.on("end", () => {
            let productsArray = JSON.parse(products);
            let newProduct = JSON.parse(product);
            productsArray.push(newProduct);
            fs.writeFile('./products.json', JSON.stringify(productsArray), (error) => {
                if (error == null) {
                    res.end("Product added");
                } else {
                    res.end("Error! Product not added");
                }
            });
        });

    }

    /// To delete product
    else if (parsedUrl.pathname == "/products" && req.method == "DELETE") {
        let productsArray = JSON.parse(products);
        let index = productsArray.findIndex((product) => {
            return product.id == parsedUrl.query.id;
        });

        productsArray.splice(index, 1);
        fs.writeFile('./products.json', JSON.stringify(productsArray), (error) => {
            if (error == null) {
                res.end("Product deleted");
            } else {
                res.end("Error! Product not deleted");
            }
        });
    }

    /// To Update a product
    else if (parsedUrl.pathname == "/products" && req.method == "PUT") {
        let product = "";

        req.on("data", (chunk) => {
            product += chunk;
        });
        req.on("end", () => {
            let productObj = JSON.parse(product);
            let productsArray = JSON.parse(products);

            let index = productsArray.findIndex((product) => {
                return product.id == parsedUrl.query.id;
            });

            if (index !== -1) {
                productsArray[index] = productObj;
                fs.writeFile("./products.json", JSON.stringify(productsArray), (error) => {
                    if (error == null) {
                        res.end("Product updated");
                    } else {
                        res.end("Error! Product not updated");
                    }
                });
            } else {
                res.end("Product not found");
            }
        });
    }

    /// To end response if any endpoint is not found
    else {
        res.end('Not Found');
    }
});

server.listen(8000);