var http = require("http");

var server = http.createServer(function (req, res) {
    //res.end("Hello World");

    if (req.url == "/") {

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>This is Homepage</h1>')
        res.end();

    }
    else if (req.url == "/about") {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>This is About Page</h1>')
        res.end();

    }
    else if (req.url == "/contact") {

        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('<h1>This is Contact Page</h1>')
        res.end();
    }
    else if (req.url == "/json") {

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write({
            data: {
                name: "zunaed",
                roll: 450197,
            }
        })
        res.end();
    }
});

server.listen(4000);
console.log("Server started");