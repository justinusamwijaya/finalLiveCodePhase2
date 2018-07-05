const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers').staticControllers
const { validation } = require('../middleware')
const validateSignup = [ validation.signupValidator, validation.validate ]

/* GET users listing. */
router.post('/signup', validateSignup, signup)
router.post('/login', login)


module.exports = router;
