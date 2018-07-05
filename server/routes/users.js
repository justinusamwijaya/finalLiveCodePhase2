const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers').userControllers

/* GET users listing. */
router.get('/:id', getUser)

module.exports = router;
