const http = require('http');
const fs = require('fs');
const url = require('url');
const { json } = require('stream/consumers');

let server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);
    console.log(`${req.method} -> ${parsedUrl.pathname} ========>`);

    let products = fs.readFileSync("./products.json", 'utf-8');

    if (parsedUrl.pathname == "/products" && req.method == "GET" && parsedUrl.query.id == undefined) {
        res.end(products != undefined ? products : "No Products");
    } else if (parsedUrl.pathname == "/products" && req.method == "GET" && parsedUrl.query.id != undefined) {
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

    }
    else {
        res.end('Not Found');
    }
});

server.listen(8000);