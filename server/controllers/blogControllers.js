const { Blog } = require('../controllers')
const mongoose = require('mongoose')

module.exports = {
    addBlog:(req,res)=>{
        let { title, category, content } = req.body
        let newBlog = new Blog({
            title,
            category,
            content,
            author: mongoose.ObjectId(req.user.id)
        })
        Blog.create(newBlog)
        .then(createdBlog=>{
            res.status(200).json({
                msg:'blog berhasil dibuat!',
                createdBlog
            })
        })
    },
    getAllBlog:(req,res)=>{

    },
    getOneBlog:(req,res)=>{

    },
    updateBlog:(req,res)=>{

    },
    deleteBlog:(req,res)=>{

    }
}