const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json()); // To encode-deocde body data

// Database Connection
mongoose.connect("mongodb://localhost:27017/nodejs").then(() => {
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
    {
        timestamps: true
    }
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
    { timestamps: true }
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