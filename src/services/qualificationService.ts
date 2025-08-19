import api from './api';

export interface Qualification {
  id: string;
  name: string;
}

export interface QualificationInput {
  name: string;
}

const qualificationService = {
  getAll: async (): Promise<Qualification[]> => {
    const { data } = await api.get('/qualifications');
    return data;
  },

  getById: async (id: string): Promise<Qualification> => {
    const { data } = await api.get(`/qualifications/${id}`);
    return data;
  },

  create: async (qualificationData: QualificationInput): Promise<Qualification> => {
    const { data } = await api.post('/qualifications', qualificationData);
    return data;
  },

  update: async (id: string, qualificationData: QualificationInput): Promise<Qualification> => {
    const { data } = await api.put(`/qualifications/${id}`, qualificationData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/qualifications/${id}`);
  },
};

export default qualificationService;
