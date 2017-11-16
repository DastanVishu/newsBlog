var express = require("express"),
    router  = express.Router(),
    BlogpostModel   = require("../models/post");

// landing page
router.get("/", function(req, res){
    res.render("landingPage");
    //res.send("hello");
});

// show the all bloges ( title )
router.get("/blog", function(req, res){
    res.render("blogs/blogPage");
});

// create a new blog
router.get("/blog/new", function(req, res){
    res.render("blogs/newblog");
});

// Describe the selected blog
router.get("/blog/:id", function(req, res){
    res.send("selected blog");
});

// edit the bolg
router.get("/blog/:id/edit", function(req, res){
    res.send("edit page");
});



module.exports = router;