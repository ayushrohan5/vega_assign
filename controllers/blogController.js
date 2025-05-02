const Blog = require('../models/blogModel');


exports.createBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    await Blog.create({ title, image, description });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error creating blog');
  }
};


exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render('dashboard', { user: req.user, blogs });
  } catch (error) {
    res.status(500).send('Error fetching blogs');
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image, description } = req.body;
    await Blog.findByIdAndUpdate(id, { title, image, description });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error updating blog');
  }
};


exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error deleting blog');
  }
};


exports.getEditForm = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render('editBlog', { blog, user:req.user });
};


exports.getBlogById = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
       // or your real user
      res.render('viewBlog', { blog, user:req.user });
    } catch (err) {
      res.status(500).send('Error loading blog');
    }
  };
