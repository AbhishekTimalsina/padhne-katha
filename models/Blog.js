const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    Date: {type: Date, default: Date.now},
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports= mongoose.model("Blog", BlogSchema)
