const express = require('express');
const router = express.Router();
const { addBlog, getAllBlog, getOneBlog, updateBlog, deleteBlog } = require('../controllers').blogControllers
const { validation, uploadImg } = require('../middleware')
const uploadFunction = [ uploadImg.multer.single('img'), uploadImg.sendUploadToGCS ]
const auth = validation.authenticateToken

/* GET users listing. */
router.post('/', auth, uploadFunction, addBlog)
router.get('/', getAllBlog)
router.get('/:id', getOneBlog)
router.get('/category/:category', getAllBlog)
router.put('/:id', auth, updateBlog)
router.delete('/:id', auth, deleteBlog)

module.exports = router;
