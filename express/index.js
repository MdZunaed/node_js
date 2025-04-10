const express = require('express');

const app = express();

app.get("/products", (req, res) => {
    res.send({ message: "Products from express", data: [] });
});

app.get("/products/:id", (req, res) => {
    res.send({
        message: "Single product", data: [{
            id: parseInt(req.params.id),
            name: "dummy"
        }]
    });
});

app.get("/login/:id", middleware, (req, res) => {
    res.send("Login Succesful");
});

function middleware(req, res, next) {
    if (req.params.id < 18) {
        res.status(401);
        res.send("Invalid Credential");
    } else {
        next();
    }
};

app.listen(8000, () => {
    console.log("Server is running");
});