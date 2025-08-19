import { create } from 'zustand';
import userService, { User, UserInput } from '../services/userService';

interface UserState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (newUser: UserInput) => Promise<void>;
  update: (id: string, updatedUser: UserInput) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const users = await userService.getAll();
      set({ users, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: 'Falha ao buscar usuários.' });
    }
  },

  create: async (newUser) => {
    try {
      const created = await userService.create(newUser);
      set((state) => ({
        users: [...state.users, created],
      }));
    } catch (err) {
      console.error('Falha ao criar usuário:', err);
      throw new Error('Falha ao criar usuário.');
    }
  },

  update: async (id, updatedUser) => {
    try {
      // Don't send an empty password field
      if (updatedUser.password === '') {
        delete updatedUser.password;
      }
      const updated = await userService.update(id, updatedUser);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updated : u)),
      }));
    } catch (err) {
      console.error('Falha ao atualizar usuário:', err);
      throw new Error('Falha ao atualizar usuário.');
    }
  },

  delete: async (id) => {
    try {
      await userService.delete(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (err) {
      console.error('Falha ao deletar usuário:', err);
      throw new Error('Falha ao deletar usuário.');
    }
  },
}));
