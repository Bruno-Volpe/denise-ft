import api from './api';
import { Client } from './clientService';

export interface Proposal {
  id: string;
  clientId: string;
  partNumber: string;
  descricao: string;
  ncm: string;
  quantidade: number;
  valorVendaUnitario: number;
  valorVendaTotalItem: number;
  valorVendaTotalProposta: number;
  dadosFaturamento: string | null;
  custos: number;
  valorCustoUnitario: number;
  valorCustoTotal: number;
  client?: Client; // Optional, if backend sends populated data
}

// All fields seem to be required for creation based on the Insomnia collection
export type ProposalInput = Omit<Proposal, 'id' | 'client'>;

const proposalService = {
  getAll: async (): Promise<Proposal[]> => {
    const { data } = await api.get('/proposals');
    return data;
  },

  getById: async (id: string): Promise<Proposal> => {
    const { data } = await api.get(`/proposals/${id}`);
    return data;
  },

  create: async (proposalData: ProposalInput): Promise<Proposal> => {
    const { data } = await api.post('/proposals', proposalData);
    return data;
  },

  update: async (id: string, proposalData: ProposalInput): Promise<Proposal> => {
    const { data } = await api.put(`/proposals/${id}`, proposalData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/proposals/${id}`);
  },
};

export default proposalService;
