const mongoose = require('mongoose');

let db = mongoose.connect("mongodb://localhost:27017/nodejs").then(() => {
    console.log("Connection Successful");

}).catch((error) => {
    console.log("nongoDB connection error=======>", error);
});

// Schema
const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password should be minimum 6 character"],
            maxLength: [15, "Password should be maximum 15 character"],
        },
        age: {
            type: Number,
            min: [12, "Minimum age is 12"],
            max: [80, "Minimum age is 80"]
        },
        role: {
            type: String,
            enum: {
                values: ["user", "vendor", "rider"],
                message: "{VALUE} not allowed, Only user, vendor, rider is allowed"
            }
        }
    },
    // {
    //     timestamps: true, // adds createdAt and updatedAt
    // },
);

// Model

const userModel = mongoose.model("users", userSchema);

let user = {
    name: "Zunayed",
    password: "password",
    age: 21,
    role: "user",
}

// userModel.create(user).then((data) => {
//     console.log(data);
//     console.log("Data Inserted");
//     mongoose.disconnect();
// }).catch((error) => console.log(error));

userModel.find().then((data) => {
    console.log(data);
    mongoose.disconnect();
}).catch((error) => console.log(error));























// -To show DBs present in system
// show dbs

// -To create a new DB / Switch DB
// use db_name

// -To create a new collection
// db.createCollection(‘name’)

// -To view the collection in DB
// show collections

// -To create a new document in collection
// db.collection_name.insertOne( {})

// -To create multiple document in collection
// db.collection_name.insertMany( [ {}, {} ] )

// -To view document in collection
// db.collection_name.find()
