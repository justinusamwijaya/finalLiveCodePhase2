const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: String,
    category: String,
    content: String,
    author: {type:Schema.Types.ObjectId,ref:'User'}
},{ timestamps:true })

const Blog = mongoose.model('Blog',blogSchema)

module.exports = { Blog, blogSchema }