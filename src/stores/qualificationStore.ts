import { create } from 'zustand';
import qualificationService, { Qualification, QualificationInput } from '../services/qualificationService';

interface QualificationState {
  qualifications: Qualification[];
  isLoading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (newQualification: QualificationInput) => Promise<void>;
  update: (id: string, updatedQualification: QualificationInput) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const useQualificationStore = create<QualificationState>((set, get) => ({
  qualifications: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const qualifications = await qualificationService.getAll();
      set({ qualifications, isLoading: false });
    } catch (err) {
      set({ isLoading: false, error: 'Falha ao buscar qualificações.' });
    }
  },

  create: async (newQualification) => {
    try {
      const created = await qualificationService.create(newQualification);
      set((state) => ({
        qualifications: [...state.qualifications, created],
      }));
    } catch (err) {
      // O erro poderia ser propagado para a UI se necessário
      console.error('Falha ao criar qualificação:', err);
      throw new Error('Falha ao criar qualificação.');
    }
  },

  update: async (id, updatedQualification) => {
    try {
      const updated = await qualificationService.update(id, updatedQualification);
      set((state) => ({
        qualifications: state.qualifications.map((q) => (q.id === id ? updated : q)),
      }));
    } catch (err) {
      console.error('Falha ao atualizar qualificação:', err);
      throw new Error('Falha ao atualizar qualificação.');
    }
  },

  delete: async (id) => {
    try {
      await qualificationService.delete(id);
      set((state) => ({
        qualifications: state.qualifications.filter((q) => q.id !== id),
      }));
    } catch (err) {
      console.error('Falha ao deletar qualificação:', err);
      throw new Error('Falha ao deletar qualificação.');
    }
  },
}));
