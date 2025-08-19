import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (credentials) => {
        const { data } = await api.post('/auth/login', credentials);
        const { token, user } = data; // Supondo que a API retorna token e user

        set({ token, user, isAuthenticated: true });

        // Para o interceptor do axios funcionar corretamente entre reloads
        localStorage.setItem('jwt_token', token);
      },
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        localStorage.removeItem('jwt_token');
      },
    }),
    {
      name: 'auth-storage', // nome do item no localStorage
      onRehydrateStorage: (state) => {
        // Isso é chamado quando o estado é reidratado do storage.
        // Podemos usar isso para inicializar o token no interceptor se necessário,
        // mas a abordagem atual de ler do localStorage no interceptor é mais simples.
        console.log('Hydration finished for auth-storage.', state);
      },
    }
  )
);
