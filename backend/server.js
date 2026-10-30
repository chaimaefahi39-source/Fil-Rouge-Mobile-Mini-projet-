const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const User = require('./models/user');

const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.json({ message: 'API Express opérationnelle !' });
});

app.post('/register', authController.register);
app.post('/api/register', authController.register);

app.post('/login', authController.login);
app.post('/api/login', authController.login);

app.get('/users', authMiddleware, authController.getUsers);
app.get('/api/users', authMiddleware, authController.getUsers);

sequelize
  .sync()
  .then(() => {
    console.log(' Base de données SQLite connectée et synchronisée.');
    app.listen(PORT, () => {
      console.log(` Serveur en écoute sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' Erreur de synchronisation base de données :', error);
  });
