# 📱 Mini-Projet Examen : Backend Express & Mobile Expo

Projet complet et modulaire composé de deux dossiers indépendants : **`backend/`** (API REST Node.js/Express) et **`mobile/`** (Application mobile React Native/Expo).

---

## 🗂️ Structure du Projet

```text
RattRapage/
│
├── backend/                       # 🖥️ API REST (Node.js, Express, Sequelize, SQLite)
│   ├── config/
│   │   ├── database.js            # Connexion Sequelize à SQLite (database.sqlite)
│   │   └── db.js                  # Alias vers database.js
│   ├── models/
│   │   └── user.js                # Modèle User (autoIncrement, primaryKey, unique)
│   ├── middleware/
│   │   └── auth.js                # Middleware d'authentification JWT
│   ├── controllers/
│   │   └── authController.js      # Logique de register, login et getUsers
│   ├── server.js                  # Point d'entrée de l'API (port 5000)
│   ├── .env                       # Variables d'environnement locales
│   ├── .env.example               # Modèle des variables
│   └── package.json               # Dépendances backend
│
├── mobile/                        # 📱 Application Mobile (React Native / Expo)
│   ├── store/
│   │   └── authStore.js           # Store Zustand + expo-secure-store
│   ├── services/
│   │   └── api.js                 # Appels HTTP (fetch natif avec async/await)
│   ├── screens/
│   │   ├── LoginScreen.js         # Écran de connexion
│   │   ├── RegisterScreen.js      # Écran d'inscription
│   │   └── HomeScreen.js          # Écran d'accueil protégé (FlatList des utilisateurs)
│   ├── navigation/
│   │   └── AppNavigator.js        # Stack Navigation conditionnelle selon le token
│   ├── App.js                     # Point d'entrée de l'application Expo
│   └── package.json               # Dépendances mobiles
│
├── .gitignore                     # Exclusion des dossiers node_modules, .env et sqlite
└── README.md                      # Guide du projet et fiche pour l'oral
```

---

## 🚀 Démarrage du Projet

### 1. Lancer le Backend
Dans un premier terminal :
```bash
cd backend
npm install
npm start
```
*Le serveur démarre sur `http://localhost:5000` et crée automatiquement le fichier `database.sqlite`.*

### 2. Lancer l'Application Mobile
Dans un second terminal :
```bash
cd mobile
npm install
npx expo start
```
- Appuyez sur **`a`** pour lancer l'émulateur Android.
- Ou scannez le QR code avec l'application **Expo Go** sur votre smartphone.
  *(Sur smartphone physique, renseignez votre IP locale dans [mobile/services/api.js](file:///c:/Users/user/Desktop/RattRapage/mobile/services/api.js)).*
