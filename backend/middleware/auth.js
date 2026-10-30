const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Accès refusé. Aucun token d’authentification fourni.',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret_key_simple_pour_examen'
    );
    req.user = decoded;
    next();             
  } catch (error) {
    return res.status(403).json({
      message: 'Token invalide ou expiré. Veuillez vous reconnecter.',
    });
  }
};

module.exports = authMiddleware;
