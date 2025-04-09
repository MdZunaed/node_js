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
    age: 17,
    role: "user",
}

// To Fetch data
userModel.find().then((data) => {
    console.log(data);
    mongoose.disconnect();
}).catch((error) => console.log(error));

// To sorting data
// userModel.find().sort({ age: 1 }).then((data) => {
//     console.log(data);
//     mongoose.disconnect();
// }).catch((error) => console.log(error));

// To limit data
// userModel.find().sort({ age: 1 }).limit(2).then((data) => {
//     console.log(data);
//     mongoose.disconnect();
// }).catch((error) => console.log(error));


// To Insert data
// userModel.create(user).then((data) => {
//     console.log(data);
//     console.log("Data Inserted");
//     mongoose.disconnect();
// }).catch((error) => console.log(error));


// To Delete item
// deleteOne() for single data, deleteMany() for multiple data
// userModel.deleteOne({ age: 21 }).then((data) => {
//     console.log(data);
// }).catch((error) => console.log(error));


// To Update item
// updateOne() for single data, updateMany() for multiple data
// userModel.updateOne(
//     // To select the data to update
//     { name: "Jarif" },

//     // To send the data which needed to update
//     { age: 21 }).then((data) => {
//         console.log(data);
//     }).catch((error) => console.log(error));
