var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    passportLocalMongoose   = require("passport-local-mongoose");


// Defined Shema
var UserModel       = require("./models/userid"),
    PostModel       = require("./models/post"),
    CommentModel    = require("./models/comment");

// requried routes

mongoose.connect("mongodb://localhost/Bloggers");

// app request listener
app.listen(3000, function(req, res){
    console.log("Sever is started...!!!");
});


