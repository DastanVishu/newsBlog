var BlogpostModel   = require("../models/post");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next){
    // is user logged in or Admin?
    if(req.isAuthenticated()){
        BlogpostModel.findById(req.params.id, function(err, foundBlog){
            if(err){
                res.redirect("back");
            }else{
                // does user own the BlogPost?
                if(req.user.admin === "true"){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        // otherwise, redirect
        res.redirect("back");
    }
}

// check user are loggedIn or not
middlewareObj.isLoggedIn = function (req, res, next){
    // if user loggedIn then go to next page
	if(req.isAuthenticated()){
		return next();
    }
    // if not then redirect to login page
	res.redirect("/login");
}

module.exports = middlewareObj;