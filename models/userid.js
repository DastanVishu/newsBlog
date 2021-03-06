var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: String
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("UserId", UserSchema);