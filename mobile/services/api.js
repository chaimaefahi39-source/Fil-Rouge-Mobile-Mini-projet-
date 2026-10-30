export const API_BASE_URL = 'http://10.0.2.2:5000/api';

export const registerUser = async (nom, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nom, name: nom, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Échec de l'inscription");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Identifiants invalides');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Impossible de récupérer les utilisateurs');
    }

    return data;
  } catch (error) {
    throw error;
  }
};
