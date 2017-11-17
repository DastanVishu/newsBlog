var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    BlogpostModel   = require("../models/post"),
    commentModel    = require("../models/comment"),
    middleware      = require("../middleware");


// Describe the selected blog
router.get("/blog/:id", function(req, res){
    BlogpostModel.findById(req.params.id, function(err, founded){
        if(err){
            console.log(err);
            res.redirect("/blog");
        }else{
            BlogpostModel.findById(req.params.id).populate("comments").exec(function(err, ComFounded){
                if(err){
                    console.log(err);
                } else {
                    res.render("blogs/selectedblog", {comt: ComFounded, selected:founded});
                }
            });
        }
    });
});    

router.get("/comment/:id", function(req, res){
    res.send("hello");
});

router.post("/comment/:id", middleware.isLoggedIn, function(req, res){
    BlogpostModel.findById(req.params.id, function(err, postmodel){
        if(err){
            console.log(err);
            res.redirect("/blog");
        } else {
            var text = req.body.text,
                author = {
                    id: req.user._id,
                    username: req.user.username
                };
            var value = { text: text, author: author};
            commentModel.create(value, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    postmodel.comments.push(comment);
                    postmodel.save();
                    res.redirect("/blog/" + postmodel._id);
                }
            });
        }
    });
});

module.exports = router;