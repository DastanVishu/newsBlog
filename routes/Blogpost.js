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
router.get("/blog/:id/edit", middleware.checkOwnership, function(req, res){
    BlogpostModel.findById(req.params.id, function(err, founded){
        if(err){
            console.log(err);
            res.redirect("/blog");
        }else{
            res.render("blogs/edit", {data: founded});
        }
    });
});

// Update blog post
router.put("/blog/:id/edit", middleware.checkOwnership, function(req, res){
    //find and update the correct blog
    BlogpostModel.findByIdAndUpdate(req.params.id, req.body.blogpost, function(err, updatedblog){
        if(err){
            res.redirect("/blog");
        } else{
            // redirect somewhere (show page)
            res.redirect("/blog/" + req.params.id);
        }
    });
});

// Destroy Blogpost route
router.delete("/:id", middleware.checkOwnership, function(req, res){
    // find the post and delete form the database
    BlogpostModel.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blog");
        } else {
            res.redirect("/blog");
        }
    });
});

//  filtered list of posts (filter by title, author)
router.post("/search", function(req, res){
    // for list of title
    var list = [];
    // for authorlist
    var authorlist = [];
    // for list counting
    var i = 0, j = 0;
    // find all post blog
    BlogpostModel.find({}, function(err, allblog){
        if(err){
            console.log(err);
        } else{
            // to find the particular data from given list
            allblog.forEach(function(founded){
                // find by title
                if(founded.title === req.body.searchdata){
                    list[i] = founded;
                    i = i+1;
                   // console.log(founded.title);
                } 
                // find by author name
                if(founded.author.username === req.body.searchdata){
                    authorlist[j] = founded;
                    j = j+1;
                }

            });
            res.render("blogs/searched", {titles: list, authorlist: authorlist});  
        }
    });
});


module.exports = router;