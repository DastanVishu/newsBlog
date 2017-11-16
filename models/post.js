var mongoose = require("mongoose");

var BlogpostSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserId"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Blogs", BlogpostSchema);