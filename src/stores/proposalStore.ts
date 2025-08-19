import { create } from 'zustand';
import proposalService, { Proposal, ProposalInput } from '../services/proposalService';

interface ProposalState {
  proposals: Proposal[];
  isLoading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (newProposal: ProposalInput) => Promise<void>;
  update: (id: string, updatedProposal: ProposalInput) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const useProposalStore = create<ProposalState>((set) => ({
  proposals: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const proposals = await proposalService.getAll();
      set({ proposals, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: 'Falha ao buscar propostas.' });
    }
  },

  create: async (newProposal) => {
    try {
      const created = await proposalService.create(newProposal);
      set((state) => ({
        proposals: [...state.proposals, created],
      }));
    } catch (err) {
      console.error('Falha ao criar proposta:', err);
      throw new Error('Falha ao criar proposta.');
    }
  },

  update: async (id, updatedProposal) => {
    try {
      const updated = await proposalService.update(id, updatedProposal);
      set((state) => ({
        proposals: state.proposals.map((p) => (p.id === id ? updated : p)),
      }));
    } catch (err) {
      console.error('Falha ao atualizar proposta:', err);
      throw new Error('Falha ao atualizar proposta.');
    }
  },

  delete: async (id) => {
    try {
      await proposalService.delete(id);
      set((state) => ({
        proposals: state.proposals.filter((p) => p.id !== id),
      }));
    } catch (err) {
      console.error('Falha ao deletar proposta:', err);
      throw new Error('Falha ao deletar proposta.');
    }
  },
}));
