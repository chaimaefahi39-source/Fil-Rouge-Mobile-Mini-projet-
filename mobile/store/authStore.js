import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'user_token';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  isLoading: true,

  login: async (token, user = null) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      set({ token, user, isLoading: false });
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du token :', error);
    }
  },

  logout: async () => {
    try {
      set({ token: null, user: null, isLoading: false });
    } catch (error) {
      console.error('Erreur lors de la suppression du token :', error);
    }
  },

  loadToken: async () => {
    try {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (storedToken) {
        set({ token: storedToken, isLoading: false });
      } else {
        set({ token: null, isLoading: false });
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du token :', error);
      set({ token: null, isLoading: false });
    }
  },
}));
