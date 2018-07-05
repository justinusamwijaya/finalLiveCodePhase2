const { blogSchema, Blog } = require('./blogs.js')
const { userSchema, User } = require('./users.js')

blogSchema.pre('save', function(next) {
    User.findById(this.author,(err,userFound)=>{
        if(err) return res.status(400)
        userFound.blogs.push(this)
        userFound.save()
        next();
    })
});

blogSchema.pre('remove', function(next) {
    User.update(
        { }, 
        { $pull: { blogs: this._id } },
        { multi: true })
    .exec();
    next();
})

module.exports = { User, Blog }