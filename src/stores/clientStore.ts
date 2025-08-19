import { create } from 'zustand';
import clientService, { Client, ClientInput } from '../services/clientService';

interface ClientState {
  clients: Client[];
  isLoading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (newClient: ClientInput) => Promise<void>;
  update: (id: string, updatedClient: ClientInput) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const useClientStore = create<ClientState>((set) => ({
  clients: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const clients = await clientService.getAll();
      set({ clients, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: 'Falha ao buscar clientes.' });
    }
  },

  create: async (newClient) => {
    try {
      const created = await clientService.create(newClient);
      set((state) => ({
        clients: [...state.clients, created],
      }));
    } catch (err) {
      console.error('Falha ao criar cliente:', err);
      throw new Error('Falha ao criar cliente.');
    }
  },

  update: async (id, updatedClient) => {
    try {
      const updated = await clientService.update(id, updatedClient);
      set((state) => ({
        clients: state.clients.map((c) => (c.id === id ? updated : c)),
      }));
    } catch (err) {
      console.error('Falha ao atualizar cliente:', err);
      throw new Error('Falha ao atualizar cliente.');
    }
  },

  delete: async (id) => {
    try {
      await clientService.delete(id);
      set((state) => ({
        clients: state.clients.filter((c) => c.id !== id),
      }));
    } catch (err)      {
      console.error('Falha ao deletar cliente:', err);
      throw new Error('Falha ao deletar cliente.');
    }
  },
}));
