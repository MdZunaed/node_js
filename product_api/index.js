const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    console.log(req.method + '->' + req.url + ' ========>');

    if (req.url == "/products" && req.method == "GET") {
        fs.readFile("./products.json", "utf-8",
            (error, data) => {
                if (error == null) {
                    res.end(data);
                } else {
                    fs.end(error);
                }
            }
        );
    }
    else {
        res.end('Not Found');
    }
});

server.listen(8000);