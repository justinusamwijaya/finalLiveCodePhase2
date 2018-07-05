const jwt = require('jsonwebtoken')
const { body,validationResult } = require('express-validator/check')
const { User } = require('../models')

module.exports = {
    signupValidator:[
        body('username').isLength({ min: 1 }).withMessage('username tidak bisa kosong!').custom(username => {
            return User.findOne({username}).then(userFound=>{
                if(userFound) return Promise.reject('username tidak tersedia!')
            })
        }).custom(username => {
            return new Promise((resolve,reject)=>{
                if(!/[0-9]/.test(username)) return reject('username harus punya karakter angka!');
                resolve()
            }).then()
            .catch(error=>{
                if(error) throw new Error(error)
            })
        }),
        body('email').isLength({ min: 1 }).withMessage('email tidak bisa kosong!').custom(email => {
            return User.findOne({email}).then(emailFound=>{
                if(emailFound) return Promise.reject('email tidak tersedia!')
            })
        }).custom(email=>{
            return new Promise((resolve,reject)=>{
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!regex.test(email)) return reject('harus email yang valid');
                resolve()
            }).then()
            .catch(error=>{
                if(error) throw new Error(error)
            })
        }),
        body('password').custom(password=>{
            return new Promise((resolve,reject)=>{
                if(!/[0-9]/.test(password)) return reject('password harus punya karakter angka!');
                resolve()
            }).then()
            .catch(error=>{
                if(error) throw new Error(error)
            })
 
        })
        .isLength({ min: 1 }).withMessage('password tidak bisa kosong!')
        .isLength({ min: 6 }).withMessage('password harus lebih dari 6 karakter!')
    ],
    validate:(req,res,next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    },
    authenticateToken:(req,res,next)=>{
        let token
        if(req.headers.authorization === undefined){
            res.status(403).json({
                msg: "you have not logged in!"
            })
        }
        else {
            token = req.headers.authorization.split(" ")[1]
        }
        jwt.verify(token,process.env.SECRETKEY,(err,decoded)=>{
            if(err) {
                res.status(403).json({
                    msg:"there's a problem with your authentication"
                })
            }else{
                req.user = decoded
                next()
            }
        })
    },
}