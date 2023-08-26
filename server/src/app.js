const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
require("../db/conn");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(cors({
    origin: ['*'],
    methods:['GET','POST'],
    credentials: true,
}));

// dotenv is used for securing your confidential info
// config accepts 2 obj key(path):value(the path of the file )

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});


app.get("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.set('Access-Control-Allow-Origin', '*');

    res.json("hello");

});

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
if ( process.env.NODE_ENV == "production"){

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
