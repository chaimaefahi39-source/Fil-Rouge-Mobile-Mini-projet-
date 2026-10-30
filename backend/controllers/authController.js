const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    const { name, nom, email, password } = req.body;
    const userName = name || nom;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: 'Tous les champs (nom, email, mot de passe) sont obligatoires.',
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: 'Cet email est déjà utilisé par un autre compte.',
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name: userName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: 'Utilisateur créé avec succès !',
      user: {
        id: newUser.id,
        name: newUser.name,
        nom: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Erreur register :', error);
    return res.status(500).json({
      message: 'Erreur serveur lors de l’inscription.',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Veuillez renseigner votre email et votre mot de passe.',
      });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: 'Aucun compte associé à cette adresse email.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Mot de passe incorrect.',
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret_key_simple_pour_examen',
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      message: 'Connexion réussie !',
      token,
      user: {
        id: user.id,
        name: user.name,
        nom: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Erreur login :', error);
    return res.status(500).json({
      message: 'Erreur serveur lors de la connexion.',
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt'],
      order: [['createdAt', 'DESC']],
    });
    const formattedUsers = users.map((u) => ({
      id: u.id,
      name: u.name,
      nom: u.name,
      email: u.email,
      createdAt: u.createdAt,
    }));

    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error('Erreur getUsers :', error);
    return res.status(500).json({
      message: 'Erreur lors de la récupération des utilisateurs.',
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
};
