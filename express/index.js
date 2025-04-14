const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbUrl = "mongodb://localhost:27017/nodejs";
const app = express();

app.use(express.json()); // To encode-deocde body data

// Database Connection
mongoose.connect(dbUrl).then(() => {
    console.log("Database connected");
}).catch((error) => console.log(error));


/////////// Authentication ///////////

// Schema for Users

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        }
    },
    { timestamps: true }, { versionKey: false }
);

// Model for User

const userModel = mongoose.model("users", userSchema);

// To create account

app.post("/signup", (req, res) => {
    let user = req.body;
    bcrypt.genSalt(10, (error, salt) => {
        if (!error) bcrypt.hash(user.password, salt, (error, hashPass) => {
            if (!error) user.password = hashPass;
            userModel.create(user).then((doc) => {
                res.send({ message: "Success", data: doc });
            }).catch((error) => {
                console.log(error);
                res.status(400).send({ message: "Something went wrong!", error: error });
            });
        });
    });
});


// For Login

app.post("/login", (req, res) => {

    let reqUser = req.body;
    userModel.findOne({ email: reqUser.email }).then((user) => {
        if (user == null) {
            res.status(404).send({ message: "No user found with the email" });
        } else {
            bcrypt.compare(reqUser.password, user.password, (error, result) => {
                if (result == true) {

                    jwt.sign({ email: reqUser.email }, "testKey", (error, token) => {
                        if (!error)
                            res.send({ message: "Login Success", token: token, data: reqUser });
                    });
                } else {
                    res.status(400).send({ message: "Wrong Password" });
                }
            })
        }
    }).catch((error) => console.log(error));
});

// Endpoint that require token

app.get("/bank-balance", verifyToken, (req, res) => {
    res.send({
        message: "Success",
        data: {
            bank_account: "1964 8394 9375 9376",
            balance: 35789
        }
    });
});

function verifyToken(req, res, next) {
    if (req.headers.authorization == null) {
        res.status(400).send({ message: "Token is required" });
        return;
    }
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "testKey", (error, data) => {
        if (error == null) {
            next();
        } else {
            res.status(401).send({
                message: "Invalied token! Please Login again"
            });
        }
    });
}


/////////// Product CRUD ///////////

// Schema of Product

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        price: {
            type: Number,
            min: [0, "Price can't be negetive"],
            required: [true, "Price is required"]
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
        },
        category: {
            type: String,
            enum: ["Clothing", "Electronics", "Household"]
        },
    },
    { timestamps: true }, { versionKey: false }
);

// Model for Product

const productModel = mongoose.model("products", productSchema);

// Get all the products
app.get("/products", (req, res) => {
    productModel.find().then((products) => {
        res.send({
            message: "Success", data: products
        });
    }).catch((error) => {
        console.log(error);
        res.send({ message: "Something went wrong! Product not found" });
    });
});

// Get a single product
app.get("/products/:id", (req, res) => {
    productModel.find({ _id: req.params.id }).then((product) => {
        res.send({
            message: "Success",
            data: product
        });
    }).catch((error) => {
        console.log(error);
        res.send({ message: "Something went wrong! Product not found" });
    });

});

// Add new product
app.post("/products", (req, res) => {
    productModel.create(req.body)
        .then((doc) => {
            res.send({ message: "Success", data: doc });
        }).catch((error) => {
            console.log(error);
            res.send({ message: "Something went wrong! Product not added" });
        });
});

// Update a product
app.put("/products/:id", (req, res) => {
    productModel.updateOne({ _id: req.params.id }, req.body).then((info) => {
        res.send({
            message: "Success",
            data: info
        });
    }).catch((error) => {
        console.log(error);
        res.status(400).send({ message: "Something went wrong! Product not Updated" });
    });
});

// Delete a product
app.delete("/products/:id", (req, res) => {
    productModel.deleteOne({ _id: req.params.id }).then((info) => {
        res.send({
            message: "Success",
            data: info
        });
    }).catch((error) => {
        console.log(error);
        res.status(400).send({ message: "Something went wrong! Product not deleted" });
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