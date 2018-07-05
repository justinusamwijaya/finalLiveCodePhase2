const { User } = require('../models')
module.exports = {
    getUser:(req,res)=>{
        User.find({_id:req.params.id})
        .populate('blogs')
        .exec()
        .then(blogsFound =>{
            res.status(200).json(blogsFound)
        })
        .catch(errors=>{
            res.status(500).json(errors)
        })
    }
}