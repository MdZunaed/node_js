var http = require("http");
var URL = require("url");

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
    else if (req.url == "/url-parse") {

        res.writeHead(200, { 'Content-Type': 'text/html' })
        const myUrl = "https://github.com/MdZunaed/node_js";
        let myUrlObj = URL.parse(myUrl);
        let myUrlHost = myUrlObj.host;
        let pathName = myUrlObj.path;
        res.write("host: " + myUrlHost + ", path: " + pathName);
        res.end();
    }


});

server.listen(5000);
console.log("Server started");