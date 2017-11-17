var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    methodOverride          = require("method-override"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    dateFormat              = require("dateformat");


// Defined Shema
var UserModel       = require("./models/userid"),
    PostModel       = require("./models/post"),
    CommentModel    = require("./models/comment");

// requried routes
var blogpostRoutes  = require("./routes/Blogpost"),
    commentRoutes   = require("./routes/comment");
    loginRoutes     = require("./routes/login");

// connecting to Database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://dastan:vishal@ds113046.mlab.com:13046/bloggers");
//mongoose.connect("mongodb://localhost/Bloggers");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "my name is Dastan",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use( new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


// used routes
app.use(blogpostRoutes);
app.use(commentRoutes);
app.use(loginRoutes);



// app request listener
app.listen(process.env.PORT, process.env.IP, function(req, res){
    console.log("Sever is started...!!!");
});


