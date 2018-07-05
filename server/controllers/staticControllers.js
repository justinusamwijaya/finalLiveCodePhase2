const bcrypt = require('bcrypt')
const { User } = require('../models')

module.exports = {
    signup:(req,res)=>{
        let { username, email, password } = req.body
        password = bcrypt.hash(password,7)
        let newUser = new User({
            username,
            email,
            password,
            blogs:[],
        })
        User.create(newUser)
        .then(createdUser=>{
            res.status(200).json({
                msg: 'user baru telah terdaftar!',
                createdUser
            })
        })
        .catch(errors=>{
            res.status(500).json(errors)
        })
    },
    login:(req,res)=>{
        let { user, password } = req.body
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let searchParam = regex.test(user)?{ email:user }:{ username:user }
        User.findOne( searchParam ,(err,data)=>{
            if(err) return res.status(500).json(err)
            if(!data)return res.status(400).json({msg:"data tidak ditemukan!"}) 
            
            if(bcrypt.compareSync(password, data.password)){
                jwt.sign({ id:data._id,username:data.username },process.env.SECRETKEY,(err,result)=>{
                    if(err) res.status(500).json(err)
                    res.status(200).json({
                        token:result,
                        id:data._id,
                        username:data.username,
                    })
                })
            }else{
                res.status(403).json({
                    msg: "password yang dimasukkan tidak sesuai!"
                })
            }

        })
    }
}