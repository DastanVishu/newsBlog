var express = require("express"),
    router  = express.Router(),
    dateFormat = require("dateformat"),
    now = new Date();
    BlogpostModel   = require("../models/post"),
    middleware = require("../middleware");

// landing page
router.get("/", function(req, res){
    res.redirect("/blog");
    //res.send("hello");
});

// show the all bloges ( title )
router.get("/blog", function(req, res){
    BlogpostModel.find({}, function(err, allblog){
        if(err){
            console.log(err);
        } else{
            res.render("blogs/blogPage", {allblog});  
        }
    }); 
});

// create a new blog
router.get("/blog/new", middleware.isLoggedIn, function(req, res){
    res.render("blogs/newblog");
});

router.post("/blog/new", middleware.isLoggedIn, function(req, res){
    var a = dateFormat(now, "dd-mmm-yyyy");
    var title = req.body.heading,
        description = req.body.description,
        date = a,
        author = {
            id: req.user._id,
            username: req.user.username
        };
    var newblogpost = {title: title, description: description, date: date, author: author};
    // Creat a new BlogPost and save to DB
    BlogpostModel.create(newblogpost, function(err, newLyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to blog page
            res.redirect("/blog");
        }
    })
});

// Describe the selected blog
router.get("/blog/:id", function(req, res){
    BlogpostModel.findById(req.params.id, function(err, founded){
        if(err){
            console.log(err);
            res.redirect("/blog");
        }else{
            res.render("blogs/selectedblog", {selected: founded});
        }
    });
});

// edit the bolg
router.get("/blog/:id/edit", function(req, res){
    res.send("edit page");
});





module.exports = router;