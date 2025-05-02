const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const path = require('path');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImage = req.file ? '/uploads/' + req.file.filename : '';

    const user = new User({
      email,
      password: hashedPassword,
      profileImage
    });

    await user.save();
    return res.redirect('/login');

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(401).send('Invalid credentials');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).send('Invalid credentials');
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000, 
      });

      
      res.redirect('/dashboard');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };