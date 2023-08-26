const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
require("../db/conn");
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://mern-app-zkd6.vercel.app');
    res.header('Access-Control-Request-Method', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Expose-Headers', 'Content-Type');

    next();
});

app.use(cors({
    origin: ['*'],
    methods: ['GET', 'POST'],
    credentials: true,
}));




// dotenv is used for securing your confidential info
// config accepts 2 obj key(path):value(the path of the file )

const PORT = process.env.PORT || 8000;
const User = require("../model/userSchema");

// middleware
// middleware's r fr sending the data through em cd clfirst it will go to middleware and then
// the next func
// it takes 3 params (req,res,next)

// to use a middleware use it in bw the get func bw the path & the params

// we link the router file to make our route easy
app.use(require("../router/auth"));

// heroku
if (process.env.NODE_ENV == "production") {

    app.use(express.static("client/build"));

    const path = require("path");

    app.get("*", (req, res) => {

        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    })


}

app.listen(PORT, () => console.log(`app listening on PORT ${PORT}!`));

// mongo user- vbj pass- BBmKsYRn4teOgSuI
// mongodb+srv://vbj:<password>@cluster0.incnj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// github- https://github.com/thapatechnical/MernProjectThapa/tree/main/server
// https://cloud.mongodb.com/v2/62165ed405192a5f5f05c215#metrics/replicaSet/6224d40003423a2be8740a0c/explorer/mernstack/users/find

// {
//   "name":"bil",
//   "email":"yes@gmail.com",
//   "phone":"987654321",
//   "work":"yes js",
//   "password":"dis",
//   "cpassword":"dis"
// }
