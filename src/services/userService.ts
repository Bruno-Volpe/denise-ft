import api from './api';

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

// Password is sent on create/update, but not expected in listings.
export interface UserInput {
  email: string;
  password?: string; // Optional for updates where password is not changed
  role: 'ADMIN' | 'USER';
}

const userService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await api.get('/admin/users');
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await api.get(`/admin/users/${id}`);
    return data;
  },

  create: async (userData: UserInput): Promise<User> => {
    const { data } = await api.post('/admin/users', userData);
    return data;
  },

  update: async (id: string, userData: UserInput): Promise<User> => {
    const { data } = await api.put(`/admin/users/${id}`, userData);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/users/${id}`);
  },
};

export default userService;
