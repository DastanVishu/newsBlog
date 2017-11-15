var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    UserName: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("UserId", UserSchema);