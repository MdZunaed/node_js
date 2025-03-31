const http = require('http');

let server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.end("Request Complete");
    } else if (req.url === '/create') {
        res.end("Data Created");
    } else if (req.url === '/read') {
        res.end("Data Readed");
    } else if (req.url === '/update') {
        res.end("Data Updated");
    } else if (req.url === '/delete') {
        res.end("Data Deleted");
    } else if (req.url === '/get' && req.method == 'GET') {
        res.end("This is only GET method");
    } else {
        res.end("Url Not Found");
    }


    // res.write("Server is running");
    // console.log(req); // View the request object
    // res.end("Request Complete"); // Stop the request
});


server.listen(8000);