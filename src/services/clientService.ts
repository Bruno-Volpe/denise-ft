import api from './api';
import { Qualification } from './qualificationService';

export interface Client {
  id: string;
  razaoSocial: string;
  cnpj: string;
  inscricaoEstadual: string;
  endereco: string;
  cidade: string;
  estado: string;
  contato: string;
  emailContato: string;
  telefone: string;
  qualificationId: string | null;
  qualification?: Qualification; // Optional, if backend sends populated data
}

export type ClientInput = Omit<Client, 'id' | 'qualification'>;

const clientService = {
  getAll: async (): Promise<Client[]> => {
    const { data } = await api.get('/clients');
    return data;
  },

  getById: async (id: string): Promise<Client> => {
    const { data } = await api.get(`/clients/${id}`);
    return data;
  },

  create: async (clientData: ClientInput): Promise<Client> => {
    const { data } = await api.post('/clients', clientData);
    return data;
  },

  update: async (id: string, clientData: ClientInput): Promise<Client> => {
    const { data } = await api.put(`/clients/${id}`, clientData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },
};

export default clientService;
