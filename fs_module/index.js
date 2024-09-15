var fs = require("fs");
var http = require("http");

var server = http.createServer(function (req, res) {

    if (req.url == "/") {

        //Using sync

        let homePageData = fs.readFileSync("home.html");

        res.writeHead(200, { 'Content-Type': "text/html" });
        res.write(homePageData);
        res.end();


        // Using Async

        // fs.readFile("home.html", function (error, data) {

        //     res.writeHead(200, { 'Content-Type': "text/html" });
        //     res.write(data);
        //     res.end();
        // });

    }
    else if (req.url == "/fs-write") {

        // Using Sync

        let error = fs.writeFileSync('demo.txt', "This is node js Sync");
        if (error) {
            res.writeHead(500, { 'Content-Type': "text/html" });
            res.write("Failed to write file Sync");
            res.end();
        } else {
            res.writeHead(500, { 'Content-Type': "text/html" });
            res.write("File writing success with Sync");
            res.end();
        }

        // Using Async

        // fs.writeFile('demo.txt', "This is node js Async", function (error) {
        //     if (error) {
        //         res.writeHead(500, { 'Content-Type': "text/html" });
        //         res.write("Failed to write data Async");
        //         res.end();
        //     } else {
        //         res.writeHead(200, { 'Content-Type': "text/html" });
        //         res.write("File writing success with Async");
        //         res.end();
        //     }
        // });
    }
    else if (req.url == "/fs-rename") {

        // Using Sync

        let error = fs.renameSync('demo.txt', "demo_new.txt");
        if (error) {
            res.writeHead(500, { 'Content-Type': "text/html" });
            res.write("Failed to rename file Sync");
            res.end();

        } else {
            res.writeHead(200, { 'Content-Type': "text/html" });
            res.write("File Rename success with Sync");
            res.end();
        }

        // Using Async

        // fs.rename('demo.txt', "demo_new.txt", function (error) {
        //     if (error) {
        //         res.writeHead(500, { 'Content-Type': "text/html" });
        //         res.write("Failed to rename file Async");
        //         res.end();
        //     } else {
        //         res.writeHead(200, { 'Content-Type': "text/html" });
        //         res.write("File Rename success with Async");
        //         res.end();
        //     }
        // });
    }
    else if (req.url == "/fs-exist") {

        // Using Sync

        let result = fs.existsSync('demo.txt');
        if (result) {
            res.end("Exist");

        } else {
            res.end("Not Exist");
        }

        // Using Async

        // fs.exists('demo.txt', function(result){
        //     if (result) {

        //     res.end("Exist");

        // } else {
        //     res.end("Not Exist");
        // }

        // });

    }
    else if (req.url == "/fs-delete") {

        // Using Sync

        // let error = fs.unlink('demo_new.txt');
        // if (error) {
        //     res.writeHead(500, { 'Content-Type': "text/html" });
        //     res.write("Failed to delete file Sync");
        //     res.end();

        // } else {
        //     res.writeHead(200, { 'Content-Type': "text/html" });
        //     res.write("File delete success with Sync");
        //     res.end();
        // }

        // Using Async

        fs.unlink('demo_new.txt', function (error) {
            if (error) {
                res.writeHead(500, { 'Content-Type': "text/html" });
                res.write("Failed to delete file Sync");
                res.end();

            } else {
                res.writeHead(200, { 'Content-Type': "text/html" });
                res.write("File delete success with Sync");
                res.end();
            }
        });

    }
});

server.listen(4000);
console.log("fs server started");