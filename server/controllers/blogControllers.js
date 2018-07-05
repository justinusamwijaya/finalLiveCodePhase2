const { Blog } = require('../models')
const mongoose = require('mongoose')

module.exports = {
    addBlog:(req,res)=>{
        let { title, category, content } = req.body
        let newBlog = new Blog({
            title,
            category,
            content,
            image: req.file ? req.file.cloudStoragePublicUrl : '',
            author: mongoose.Types.ObjectId(req.user.id)
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
        let { category } = req.params
        category = category ? { category } : {}
        Blog.find(category)
        .populate('author', 'username')
        .exec()
        .then(allBlogs=>{
            res.status(200).json({
                msg:'seluruh blog telah diambil!',
                allBlogs
            })
        })
        .catch(errors=>{
            res.status(500).json(errors)
        })
    },
    getOneBlog:(req,res)=>{
        Blog.findById(req.params.id)
        .populate('author', 'username')
        .exec()
        .then(blogFound =>{
            res.status(200).json({
                msg:'blog telah didapatkan!',
                blogFound
            })
        })
        .catch(errors=>{
            res.status(500).json(errors)
        })
    },
    updateBlog:(req,res)=>{
        Blog.findById(req.params.id)
        .then(blogFound=>{
            if(req.user.id !== blogFound.author.toString()){
                return res.status(403).json({
                    msg:'tidak bisa update blog yang bukan milikmu!'
                })
            }else{
                if(req.file){
                    const Storage = require('@google-cloud/storage');

                    const storage = new Storage();
    
                    const bucketName = process.env.CLOUD_BUCKET;
                    const filename = blogFound.image.split('/')[blogFound.image.split('/').length-1];
                    storage
                    .bucket(bucketName)
                    .file(filename)
                    .delete()
                    .then(() => {
                        console.log(bucketName)
                        console.log(filename)
                        blogFound.image = req.file.cloudStoragePublicUrl
                        blogFound.content = req.body.content
                        blogFound.title = req.body.title
                        return blogFound.save(error=>{
                            if(error) return res.status(500).json(error)
                            res.status(200).json({
                                msg:'blog berhasil diupdate!'
                            })
                        })
                    })
                    .catch(err => {
                        return res.status(500).json(err)
                    });    
                }else{
                    blogFound.content = req.body.content
                    blogFound.title = req.body.title
                    blogFound.save(error=>{
                        if(error) return res.status(500).json(error)
                        res.status(200).json({
                            msg:'blog berhasil diupdate!'
                        })
                    })
                }
            }
        })
        .catch(errors=>{
            res.status(500).json(errors)
        })
    },
    deleteBlog:(req,res)=>{
        Blog.findById(req.params.id)
        .then(blogFound=>{
            if(req.user.id !== blogFound.author.toString()){
                return res.status(403).json({
                    msg:'tidak bisa update blog yang bukan milikmu!'
                })
            }else{
                blogFound.remove(error=>{
                    if(error) return res.status(500).json(error)
                    res.status(200).json({
                        msg:'blog berhasil dihapus!'
                    })
                })
            }
        })
        .catch(errors=>{
            res.status(500).json(errors)
        })
    }
}