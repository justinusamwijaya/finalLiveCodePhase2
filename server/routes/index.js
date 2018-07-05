const express = require('express');
const router = express.Router();
const staticRoutes = require('./static.js')
const userRoutes = require('./users.js')
const blogRoutes = require('./blogs.js')

/* GET home page. */
router.use('/', staticRoutes)
router.use('/users', userRoutes)
router.use('/blogs', blogRoutes)

module.exports = router;
