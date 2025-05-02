const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/dashboard', verifyToken, blogController.getBlogs);
router.post('/blog/create',verifyToken, blogController.createBlog);
router.get('/blog/edit/:id',verifyToken, blogController.getEditForm);
router.post('/blog/update/:id',verifyToken, blogController.updateBlog);
router.get('/blog/delete/:id',verifyToken, blogController.deleteBlog);
router.get('/blog/view/:id',verifyToken, blogController.getBlogById);

module.exports = router;
