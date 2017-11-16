var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    UserModel   = require("../models/userid");

// Handle the login logic
router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/blog",
    failureRedirect: "/login"
}),
function(req, res) {
    res.send("Login Logic Happens here");
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blog");
})

//handle sign-up logic
router.get("/register", function(req, res){
    res.render("signup");
});

// creating a new account
router.post("/register", function(req, res){
    //res.redirect("/blog");
    var Admin;
    UserModel.find({}, function(err, finded){
        if(err){
            console.log(err);
        } else{
            if(finded.length === 0){
                Admin = true;
            } else {
                Admin = false;
            }

            var newUser = new UserModel({username: req.body.username, admin: Admin});
            UserModel.register(newUser, req.body.password, function(err){
                if(err){
                    console.log(err);
                    return res.render("/register");
                }
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/blog");
                });
            });
        }
    });





});

module.exports = router;