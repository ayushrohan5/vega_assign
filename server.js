const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); 
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const cors = require('cors');
const { verifyToken } = require('./middlewares/authMiddleware');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));


app.use('/api/auth', authRoutes);


app.get('/signup', (req, res) => {
  res.render('signup');
});

app.use('/', blogRoutes);
app.get('/login', (req, res) => res.render('login'));
app.get('/dashboard',verifyToken, (req, res) => res.render('dashboard',  { user: req.user }));
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
